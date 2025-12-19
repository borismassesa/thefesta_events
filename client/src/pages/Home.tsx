import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/layout/Navbar";
import { MenuOverlay } from "@/components/layout/MenuOverlay";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { Services } from "@/components/home/Services";
import { Issues } from "@/components/home/Issues";
import { Reviews } from "@/components/home/Reviews";
import { FAQ } from "@/components/home/FAQ";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/layout/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Loader Animation
    const ctx = gsap.context(() => {
      const loadTl = gsap.timeline();
      
      // Select .loader-bar inside loaderRef
      loadTl.to('.loader-bar', { width: '100%', duration: 1.2, ease: "power2.inOut" })
            // Animate the loader container itself (using ref.current)
            .to(loaderRef.current, { yPercent: -100, duration: 0.8, ease: "expo.inOut" });
            
    }, loaderRef);

    // Lenis Setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="bg-background text-primary min-h-screen selection:bg-accent/20 selection:text-primary overflow-hidden">
      {/* Loader */}
      <div ref={loaderRef} className="loader fixed top-0 left-0 w-full h-screen bg-black z-[9999] flex flex-col justify-center items-center">
        <div className="uppercase text-xs text-zinc-500 tracking-[0.2em] font-mono mb-5">
          Initializing Core
        </div>
        <div className="loader-bar-bg w-[200px] h-[2px] bg-white/10 relative overflow-hidden">
          <div className="loader-bar absolute left-0 top-0 h-full bg-white w-0"></div>
        </div>
      </div>

      <Navbar onMenuClick={() => setMenuOpen(true)} />
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      
      <main>
        <Hero />
        {/* <Marquee /> */}
        <Services />
        <Issues />
        <Reviews />
        <FAQ />
        <CTA />
      </main>
      
      <Footer />
    </div>
  );
}
