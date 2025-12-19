import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Issues() {
  const containerRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": function() {
          const wrapper = wrapperRef.current;
          if (!wrapper) return;
          
          const getScrollAmount = () => -(wrapper.scrollWidth - window.innerWidth);
          
          gsap.to(wrapper, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              pin: true,
              scrub: 1,
              end: () => `+=${wrapper.scrollWidth - window.innerWidth}`,
              invalidateOnRefresh: true
            }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const issues = [
    {
      id: 24,
      title: "The Void",
      desc: "Exploring the concept of emptiness in digital spaces and urban architecture.",
      img: "https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=2574&auto=format&fit=crop"
    },
    {
      id: 23,
      title: "Synthetic",
      desc: "The rise of AI generated realities and what it means for human creativity.",
      img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2574&auto=format&fit=crop"
    },
    {
      id: 22,
      title: "Origins",
      desc: "Tracing back the roots of modern interface paradigms to the 1970s.",
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2574&auto=format&fit=crop"
    },
    {
      id: 21,
      title: "Spectrum",
      desc: "Analyzing color theory in the age of HDR displays and wide gamut color spaces.",
      img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 20,
      title: "Silence",
      desc: "The importance of white space and silence in visual communication.",
      img: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <div className="relative w-full"> 
    {/* Wrapper for pin spacer */}
      <section ref={containerRef} id="issues" className="bg-surface text-primary py-20 md:py-24 overflow-hidden relative border-b border-border">
        <div className="px-6 md:px-12 mb-16 flex justify-between items-end">
          <div>
            <span className="font-mono text-accent text-xs tracking-widest uppercase mb-2 block">
              Library
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
              Recent <br /> Issues
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            <span className="text-xs font-mono text-secondary">
              DRAG TO EXPLORE -&gt;
            </span>
          </div>
        </div>

        <div className="horizontal-scroll-container w-full">
          <div ref={wrapperRef} className="horizontal-wrapper flex gap-[4vw] px-[5vw] w-fit items-center h-full">
            {issues.map((issue) => (
              <div key={issue.id} className="w-[85vw] md:w-[30vw] h-[50vh] md:h-[60vh] relative flex-shrink-0 group cursor-pointer">
                <div className="absolute inset-0 bg-background rounded-xl overflow-hidden border border-border">
                  <img 
                    src={issue.img} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 filter grayscale group-hover:grayscale-0" 
                    alt={`Issue ${issue.id}`} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 dark:to-black/90"></div>
                  <div className="absolute bottom-0 left-0 p-8 w-full text-white">
                    <div className="flex justify-between items-end border-b border-white/20 pb-4 mb-4">
                      <span className="text-4xl font-semibold tracking-tighter">
                        {issue.title}
                      </span>
                      <span className="font-mono text-xs">NO. {issue.id}</span>
                    </div>
                    <p className="text-sm text-zinc-300 line-clamp-2">
                      {issue.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Last Spacer Card */}
            <div className="w-[5vw]"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
