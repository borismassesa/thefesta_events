import { useEffect, useRef } from "react";
import gsap from "gsap";

export function MenuOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, { 
        clipPath: 'inset(0 0 0 0)', 
        duration: 0.8, 
        ease: 'power4.inOut',
        pointerEvents: 'all'
      });
    } else {
      gsap.to(overlayRef.current, { 
        clipPath: 'inset(0 0 100% 0)', 
        duration: 0.8, 
        ease: 'power4.inOut',
        pointerEvents: 'none'
      });
    }
  }, [isOpen]);

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 bg-background z-40 flex flex-col justify-center items-center menu-overlay"
      style={{ clipPath: 'inset(0 0 100% 0)' }}
    >
      <div className="flex flex-col gap-6 text-center">
        {['Start', 'Issues', 'Features', 'Join'].map((item) => (
          <a 
            key={item}
            href={`#${item.toLowerCase()}`} 
            onClick={onClose}
            className="menu-link text-5xl md:text-7xl font-semibold tracking-tighter text-secondary hover:text-primary transition-colors"
          >
            {item}
          </a>
        ))}
      </div>
      <div className="absolute bottom-10 left-[5vw] right-[5vw] flex justify-between text-xs font-mono text-secondary uppercase">
        <span>v.2.4.0</span>
        <span>San Francisco, CA</span>
      </div>
    </div>
  );
}
