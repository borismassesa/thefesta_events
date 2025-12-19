import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate elements as they scroll into view
      const animElements = gsap.utils.toArray<HTMLElement>(".animate-on-scroll");
      
      animElements.forEach((el, index) => {
        gsap.fromTo(el, 
          { 
            y: 50, 
            opacity: 0,
            filter: "blur(10px)"
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.1 // Stagger effect based on order
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-surface py-32 lg:py-48 overflow-hidden">
      
      <div className="flex flex-col md:px-10 w-full max-w-7xl border-primary/10 border-t mx-auto pt-24 pr-6 pb-24 pl-6 relative">
        
        {/* Badge */}
        <div className="flex justify-start mb-12 animate-on-scroll">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 backdrop-blur-sm text-accent text-sm font-medium tracking-wide uppercase hover:bg-primary/10 transition-colors cursor-default">
            <Sparkles className="w-4 h-4" />
            <span>About Us</span>
          </div>
        </div>

        {/* Main Headline / Text Block */}
        <div className="relative animate-on-scroll">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[80%] bg-accent/10 blur-[120px] -z-10 rounded-full pointer-events-none"></div>

          <h3 className="leading-[1.1] md:text-6xl lg:text-7xl text-5xl font-medium text-primary/40 tracking-tight max-w-6xl">
            <span className="text-primary">We are a planning intelligence engine</span> dedicated to transforming how couples <span className="text-primary">visualize their big day.</span> With a team of planners, engineers, and artists, we build tools that empower <span className="text-primary">ambitious couples</span> to design, organize, and celebrate at the speed of <span className="text-primary italic font-serif text-accent">love.</span>
          </h3>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 mt-24 pt-12 border-t border-primary/10 animate-on-scroll">
          {/* Stat 1 */}
          <div className="flex flex-col gap-2">
            <div className="md:text-7xl lg:text-8xl leading-none text-6xl font-light text-primary tracking-tighter">
              15k+
            </div>
            <div className="text-xl font-medium pl-1 text-secondary">
              Weddings Planned
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col gap-2">
            <div className="md:text-7xl lg:text-8xl leading-none text-6xl font-light text-primary tracking-tighter">
              99%
            </div>
            <div className="text-xl font-medium pl-1 text-secondary">
              Couple Satisfaction
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col gap-2">
            <div className="md:text-7xl lg:text-8xl leading-none text-6xl font-light text-primary tracking-tighter">
              2M+
            </div>
            <div className="text-xl font-medium pl-1 text-secondary">
              Guests Managed
            </div>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-col gap-2">
            <div className="md:text-7xl lg:text-8xl leading-none text-6xl font-light text-primary tracking-tighter">
              4.9
            </div>
            <div className="text-xl font-medium pl-1 text-secondary">
              Average Rating
            </div>
          </div>
        </div>

        {/* Company Logos */}
        <div className="mt-24 animate-on-scroll">
          <p className="text-lg font-medium mb-8 uppercase tracking-widest text-center md:text-left text-secondary">
            Featured in & Trusted By
          </p>
          <div className="flex flex-wrap gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 gap-x-8 gap-y-8 items-center justify-between">
            
            {/* Vogue */}
            <svg viewBox="0 0 24 24" className="h-8 w-auto fill-primary" xmlns="http://www.w3.org/2000/svg"><path d="M9.82 5.09h1.93V2.5H6.28v2.59h1.83c.96 0 .96.06.96 1.15v10.15l-4.5-12.2h-2.3L.02 18.91l-.02-13.8c0-1.12.02-1.15 1.15-1.15h1.94V2.5H.5v1.46h.88c.7 0 .86.23.86.8v15.93h2.6L10.38 6.6l5.72 14.09h2.51V4.76c0-.57.16-.8.86-.8h.88V2.5h-4.32v1.46h1.94c1.13 0 1.15.03 1.15 1.15l.02 13.06L14.6 4.21h-2.3l-3.3 11.2V6.24c0-1.09 0-1.15.82-1.15z"/></svg>

            {/* Brides */}
            <svg viewBox="0 0 100 30" className="h-8 w-auto fill-primary" xmlns="http://www.w3.org/2000/svg"><text x="0" y="20" fontFamily="serif" fontSize="24" fontWeight="bold">BRIDES</text></svg>

            {/* The Knot (Mock) */}
            <svg viewBox="0 0 120 30" className="h-8 w-auto fill-primary" xmlns="http://www.w3.org/2000/svg"><text x="0" y="20" fontFamily="sans-serif" fontSize="20" fontWeight="bold">The Knot</text></svg>

            {/* Martha Stewart Weddings (Mock) */}
            <svg viewBox="0 0 250 30" className="h-8 w-auto fill-primary" xmlns="http://www.w3.org/2000/svg"><text x="0" y="20" fontFamily="serif" fontSize="20">Martha Stewart Weddings</text></svg>
            
             {/* Bazaar (Mock) */}
             <svg viewBox="0 0 100 30" className="h-8 w-auto fill-primary" xmlns="http://www.w3.org/2000/svg"><text x="0" y="20" fontFamily="serif" fontSize="22" fontWeight="bold">BAZAAR</text></svg>

          </div>
        </div>
      </div>
    </section>
  );
}
