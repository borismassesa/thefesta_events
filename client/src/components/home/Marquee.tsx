import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Cpu, Palette, Globe, FlaskConical, Briefcase } from "lucide-react";

export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".marquee-track", {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "linear"
      });
    }, trackRef);

    return () => ctx.revert();
  }, []);

  const items = [
    { icon: Cpu, label: "Technology" },
    { icon: Palette, label: "Design" },
    { icon: Globe, label: "Culture" },
    { icon: FlaskConical, label: "Science" },
    { icon: Briefcase, label: "Venture" }
  ];

  // Duplicate items for seamless loop
  const allItems = [...items, ...items, ...items, ...items];

  return (
    <section ref={trackRef} className="py-6 border-b border-border bg-surface/50 marquee-container overflow-hidden">
      <div className="marquee-track flex gap-12 whitespace-nowrap w-fit pl-12">
        {allItems.map((item, i) => (
          <div key={i} className="flex gap-12 items-center text-sm font-mono text-secondary uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <item.icon size={16} />
              {item.label}
            </span>
            <span className="w-1 h-1 bg-secondary rounded-full"></span>
          </div>
        ))}
      </div>
    </section>
  );
}
