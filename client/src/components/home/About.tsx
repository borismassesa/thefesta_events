import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text into lines/spans for animation
      // We'll manually structure the text for better control
      const lines = gsap.utils.toArray<HTMLElement>(".about-line");

      gsap.fromTo(lines, 
        { 
          opacity: 0.1, 
          y: 20,
          filter: "blur(8px)"
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 70%",
            scrub: 1,
            toggleActions: "play none none reverse"
          }
        }
      );

      // Parallax effect for the quote icon
      gsap.to(".quote-icon", {
        y: 50,
        rotation: 15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-surface py-32 lg:py-48 overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10"></div>
      
      <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-20">
        
        <div className="quote-icon absolute -top-12 -left-4 md:-left-12 opacity-10 text-primary">
          <Quote size={120} />
        </div>

        <div ref={textRef} className="flex flex-col gap-6 md:gap-8 text-center md:text-left">
          <h2 className="about-line text-lg font-mono text-accent tracking-widest uppercase mb-4">
            Our Philosophy
          </h2>
          
          <p className="about-line text-3xl md:text-5xl lg:text-6xl font-medium text-primary leading-[1.2] tracking-tight">
            We believe planning your celebration 
          </p>
          <p className="about-line text-3xl md:text-5xl lg:text-6xl font-medium text-primary leading-[1.2] tracking-tight">
            should be as <span className="font-serif italic font-normal text-accent">joyful</span> as the event itself.
          </p>
          
          <div className="h-4 md:h-8"></div>
          
          <p className="about-line text-xl md:text-2xl lg:text-3xl text-secondary font-light max-w-3xl leading-relaxed">
            TheFesta isn't just a platform; it's your partner in the art of gathering.
            We curate the exceptional, simplify the complex, and give you the space to dream.
          </p>
          
          <p className="about-line text-xl md:text-2xl lg:text-3xl text-secondary font-light max-w-3xl leading-relaxed">
            Because when the details are handled with care, you're free to focus on what truly matters: 
            <span className="text-primary font-normal"> The love, the laughter, and the memories that last a lifetime.</span>
          </p>
        </div>

      </div>
    </section>
  );
}
