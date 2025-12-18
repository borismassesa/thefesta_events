import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal-card').forEach((card: any) => {
        gsap.from(card, {
          opacity: 0.2,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 50%",
            scrub: 1
          }
        });
      });

      gsap.to(".philosophy-progress", {
        y: "0%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="philosophy" className="grid grid-cols-1 md:grid-cols-2 gap-12 px-[5vw] py-32 border-b border-border relative">
      <div className="sticky top-32 h-fit">
        <span className="font-mono text-accent text-xs tracking-widest uppercase mb-4 block">
          Philosophy
        </span>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-primary mb-8 section-title">
          <span className="inline-block overflow-hidden align-bottom">
            <span className="inline-block pb-1">Signal over</span>
          </span>
          <br />
          <span className="inline-block overflow-hidden align-bottom">
            <span className="inline-block text-secondary pb-1">noise.</span>
          </span>
        </h2>
        <div className="hidden md:flex flex-col items-center h-[50vh] max-h-[400px] mt-8">
          <div className="w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)] z-10"></div>
          <div className="w-px flex-1 bg-border relative overflow-hidden my-2">
            <div className="philosophy-progress absolute top-0 left-0 w-full h-full bg-accent will-change-transform translate-y-[-100%]"></div>
          </div>
          <div className="w-1.5 h-1.5 bg-border rounded-full z-10"></div>
        </div>
      </div>

      <div className="flex flex-col gap-24">
        <div className="reveal-card opacity-20 translate-y-12">
          <p className="text-xl md:text-2xl leading-relaxed text-primary mb-6">
            The internet is broken. Algorithmic feeds prioritize outrage over insight. Chronicle is a quiet space tailored for deep reading.
          </p>
          <div className="aspect-video bg-surface rounded-lg border border-border overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" 
              alt="Cybersecurity" 
            />
            <div className="absolute bottom-4 left-4 z-20">
              <span className="text-xs font-mono text-white border border-white/20 px-2 py-1 rounded backdrop-blur-sm">
                01. Curation
              </span>
            </div>
          </div>
        </div>

        <div className="reveal-card opacity-20 translate-y-12">
          <p className="text-xl md:text-2xl leading-relaxed text-primary mb-6">
            We collaborate with the world's leading thinkers to produce issues that stand the test of time. No clickbait. No ads.
          </p>
          <div className="aspect-video bg-surface rounded-lg border border-border overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" 
              alt="Network" 
            />
            <div className="absolute bottom-4 left-4 z-20">
              <span className="text-xs font-mono text-white border border-white/20 px-2 py-1 rounded backdrop-blur-sm">
                02. Depth
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
