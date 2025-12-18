import { useEffect, useRef } from "react";
import { Apple, ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Animation
      const tl = gsap.timeline();
      tl.from('.hero-title span span', { y: '110%', duration: 1, stagger: 0.1, ease: "power4.out" }, 0.5)
        .to('.hero-desc, .hero-btns', { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power2.out" }, "-=0.5");

      // Scroll Animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: true
        }
      });

      scrollTl.to(".hero-visual", {
        width: "100vw",
        height: "100vh",
        top: 0,
        right: 0,
        opacity: 1,
        mixBlendMode: "normal",
        borderRadius: 0,
        ease: "power2.inOut"
      }, 0)
      .to("#hero-img", {
        rotation: 0,
        scale: 1,
        filter: "blur(0px) grayscale(0%)",
        borderRadius: 0,
        opacity: 1,
        ease: "power2.inOut"
      }, 0);

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden border-b border-border">
      <section id="hero" className="relative h-full flex flex-col justify-center px-[5vw] pt-20">
        <div className="hero-glow"></div>

        {/* Visual Abstract */}
        <div className="hero-visual absolute right-0 md:right-[10%] top-1/4 w-[300px] md:w-[500px] aspect-[4/5] md:aspect-square opacity-60 z-0 pointer-events-none mix-blend-screen overflow-hidden rounded-2xl">
          <img 
            id="hero-img" 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
            className="w-full h-full object-cover rotate-12 blur-md grayscale opacity-80 will-change-transform origin-center scale-110" 
            alt="Abstract Data" 
          />
        </div>

        <div className="z-10 max-w-4xl mt-12 md:mt-0 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/10 bg-primary/5 mb-8 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
            <span className="text-[10px] uppercase tracking-widest font-mono text-secondary">
              New Issue Available
            </span>
          </div>

          <h1 className="hero-title text-[clamp(3rem,8vw,7rem)] leading-[0.9] font-semibold tracking-tight text-primary mb-8">
            <span className="block overflow-hidden"><span className="block">Information</span></span>
            <span className="block overflow-hidden"><span className="block text-secondary italic font-serif pr-4">Refined</span></span>
            <span className="block overflow-hidden"><span className="block">For clarity.</span></span>
          </h1>

          <p className="hero-desc text-lg md:text-xl text-secondary max-w-md leading-relaxed mb-10 opacity-0 translate-y-4">
            A digital magazine designed for the focused mind. Curated journalism, zero distractions, infinite depth.
          </p>

          <div className="hero-btns flex gap-4 opacity-0 translate-y-4">
            <button className="btn-glow px-8 py-3 rounded-full text-sm font-medium text-white flex items-center gap-2">
              <span>Download for iOS</span>
              <Apple size={16} />
            </button>
            <button className="px-8 py-3 rounded-full text-sm font-medium text-secondary hover:text-primary transition-colors border border-transparent hover:border-primary/10">
              Read Web Version
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-[5vw] flex items-center gap-4 text-xs font-mono text-secondary uppercase tracking-widest">
          <ArrowDown size={16} className="animate-bounce" />
          <span>Scroll to explore</span>
        </div>
      </section>
    </div>
  );
}
