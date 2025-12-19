import { useRef, useEffect } from "react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import tableImg from "@assets/stock_images/wedding_table_settin_c7e6dce8.jpg";
import bouquetImg from "@assets/stock_images/wedding_bouquet_mode_ab76e613.jpg";
import cakeImg from "@assets/stock_images/wedding_cake_modern__2868fc7b.jpg";

import receptionImg from "@assets/stock_images/wedding_reception_li_3a8fab49.jpg";

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
      <section ref={containerRef} id="advice-ideas" className="bg-surface text-primary py-20 md:py-32 overflow-hidden relative border-b border-border">
        
        {/* Editorial Header */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end border-b border-border/50 pb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-12 h-[1px] bg-accent"></span>
                <span className="font-mono text-accent text-xs tracking-widest uppercase">
                  Advice & Ideas
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-primary leading-[1.1]">
                Inspiration for <br/>
                <span className="font-serif italic font-normal text-secondary">your big day.</span>
              </h2>
            </div>
            
            <div className="flex flex-col items-start md:items-end gap-8">
              <p className="text-secondary text-lg md:text-xl max-w-md md:text-right leading-relaxed font-light">
                Expert guides, trending styles, and real wedding stories to help you plan a celebration that's uniquely yours.
              </p>
              
              <Link href="/services/advice">
                <a className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-background text-sm font-medium transition-all hover:bg-primary/90 hover:scale-105">
                  Browse All Articles
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Link>
            </div>
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
                    <div className="flex justify-between items-end w-full">
                      <button className="ml-auto flex items-center gap-2 text-sm font-medium uppercase tracking-wider hover:text-accent transition-colors">
                        View Article
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
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
