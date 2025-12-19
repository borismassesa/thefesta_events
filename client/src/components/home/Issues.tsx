import { useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import tableImg from "@assets/stock_images/wedding_table_settin_c7e6dce8.jpg";
import bouquetImg from "@assets/stock_images/wedding_bouquet_mode_ab76e613.jpg";
import cakeImg from "@assets/stock_images/wedding_cake_modern__2868fc7b.jpg";

import receptionImg from "@assets/stock_images/wedding_reception_li_3a8fab49.jpg";

gsap.registerPlugin(ScrollTrigger);
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
      id: 1,
      title: "Table Scapes",
      desc: "Creating the perfect dining atmosphere for your guests.",
      img: tableImg
    },
    {
      id: 2,
      title: "Floral Art",
      desc: "Modern bouquet trends for the contemporary bride.",
      img: bouquetImg
    },
    {
      id: 3,
      title: "Sweet Minimal",
      desc: "Why simple cakes are making a big comeback.",
      img: cakeImg
    },
    {
      id: 4,
      title: "Mood Lighting",
      desc: "Transforming your venue with the right illumination.",
      img: receptionImg
    }
  ];

  return (
    <div className="relative w-full"> 
    {/* Wrapper for pin spacer */}
      <section ref={containerRef} id="advice-ideas" className="bg-surface text-primary py-20 md:py-24 overflow-hidden relative border-b border-border">
        <div className="px-6 md:px-12 mb-16 flex justify-between items-end">
          <div>
            <span className="font-mono text-accent text-xs tracking-widest uppercase mb-2 block">
              Advice & Ideas
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
              Latest <br /> Stories
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
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                    alt={issue.title} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 dark:to-black/90"></div>
                  <div className="absolute bottom-0 left-0 p-8 w-full text-white">
                    <div className="flex justify-between items-end border-b border-white/20 pb-4 mb-4">
                      <span className="text-3xl md:text-4xl font-semibold tracking-tighter">
                        {issue.title}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-300 line-clamp-2 mb-6">
                      {issue.desc}
                    </p>
                    <button className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider hover:text-accent transition-colors">
                      View Article
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
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
