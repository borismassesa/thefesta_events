import { useRef, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CTA() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      })
      .from(buttonRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 md:py-40 bg-primary text-primary-foreground relative overflow-hidden">
      
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-accent/10 blur-[100px]"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-secondary/20 blur-[120px]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center text-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 backdrop-blur-sm mb-8">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span className="text-xs font-medium tracking-wider uppercase text-primary-foreground/80">Start for free today</span>
        </div>

        <h2 ref={titleRef} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
          Ready to plan the <br/>
          <span className="font-serif italic font-normal text-accent">wedding of the century?</span>
        </h2>

        <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl leading-relaxed mb-12 font-light">
          Join thousands of couples who have simplified their planning journey. 
          No credit card required for the basic plan.
        </p>

        <div ref={buttonRef} className="flex flex-col sm:flex-row gap-4 items-center">
          <Link href="/signup">
            <a className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent text-primary font-semibold text-lg transition-all hover:bg-accent/90 hover:scale-105 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
              Get Started Now
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Link>
          <Link href="/demo">
            <a className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-transparent border border-primary-foreground/20 text-primary-foreground font-medium text-lg transition-all hover:bg-primary-foreground/10">
              View Demo
            </a>
          </Link>
        </div>

        <p className="mt-8 text-xs text-primary-foreground/40 uppercase tracking-widest">
          Trusted by 50,000+ Couples
        </p>

      </div>
    </section>
  );
}
