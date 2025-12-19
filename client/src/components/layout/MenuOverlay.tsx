import { useEffect, useRef } from "react";
import { Link } from "wouter";
import gsap from "gsap";

const NAV_LINKS = [
  { name: "Planning Tools", href: "/planning" },
  { name: "Vendors", href: "/vendors" },
  { name: "Guests & RSVP", href: "/guests" },
  { name: "Wedding Websites", href: "/websites" },
  { name: "Inspiration", href: "/inspiration" },
  { name: "Shop", href: "/shop" },
];

export function MenuOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const tl = gsap.timeline();
      
      tl.to(overlayRef.current, { 
        clipPath: 'inset(0 0 0 0)', 
        duration: 0.6, 
        ease: 'power4.inOut',
        pointerEvents: 'all'
      });

      const links = linksRef.current?.children;
      if (links) {
        tl.fromTo(links, 
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.4, 
            stagger: 0.05, 
            ease: "power2.out" 
          },
          "-=0.2"
        );
      }

    } else {
      gsap.to(overlayRef.current, { 
        clipPath: 'inset(0 0 100% 0)', 
        duration: 0.6, 
        ease: 'power4.inOut',
        pointerEvents: 'none'
      });
    }
  }, [isOpen]);

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center menu-overlay"
      style={{ clipPath: 'inset(0 0 100% 0)' }}
    >
      {/* Close Button Area (invisible hit area or handled by Navbar button z-index) */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-4 text-primary hover:opacity-70 transition-opacity lg:hidden"
        aria-label="Close Menu"
      >
        <span className="sr-only">Close</span>
        {/* We rely on the Navbar button to toggle, but good to have a close action here if needed */}
      </button>

      <div ref={linksRef} className="flex flex-col gap-4 text-center">
        {NAV_LINKS.map((item) => (
          <Link key={item.name} href={item.href}>
            <a 
              onClick={onClose}
              className="menu-link text-3xl md:text-5xl font-bold tracking-tight text-secondary hover:text-primary transition-colors"
            >
              {item.name}
            </a>
          </Link>
        ))}
        
        <div className="h-px w-20 bg-border mx-auto my-4"></div>

        <div className="flex flex-col gap-3">
          <Link href="/login">
            <a onClick={onClose} className="text-lg font-medium text-primary">Log In</a>
          </Link>
          <Link href="/signup">
            <a onClick={onClose} className="text-lg font-medium bg-primary text-background px-6 py-2 rounded-full hover:bg-primary/90 transition-colors">Get Started</a>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-[5vw] right-[5vw] flex justify-between text-xs font-mono text-secondary uppercase opacity-50">
        <span>© {new Date().getFullYear()} The Festa</span>
        <span>Made with love</span>
      </div>
    </div>
  );
}
