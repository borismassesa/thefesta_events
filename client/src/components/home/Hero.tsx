import { useState, useEffect, useRef } from "react";
import { Search, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

const HERO_SLIDES = [
  {
    id: 1,
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    poster: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg",
    author: "Evergreen Films",
    avatar: "https://picsum.photos/seed/vid1/50/50",
    color: "var(--surface)"
  },
  {
    id: 2,
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
    author: "Love & Lens",
    avatar: "https://picsum.photos/seed/vid2/50/50",
    color: "var(--surface)"
  },
  {
    id: 3,
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
    author: "Rustic Barns Co.",
    avatar: "https://picsum.photos/seed/vid3/50/50",
    color: "var(--surface)"
  },
];

function TypingEffect({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(words[0].length);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (index === words.length) return;

    // Pause before deleting
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2000); 
      return () => clearTimeout(timeout);
    }

    // Move to next word
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    // Typing/Deleting
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  // Reset index if words change (language switch)
  useEffect(() => {
    setIndex(0);
    setSubIndex(0);
    setReverse(false);
  }, [words]);

  return (
    <>
      {words[index]?.substring(0, subIndex)}
      <span className={`${blink ? "opacity-100" : "opacity-0"} transition-opacity duration-100 ml-1 font-light text-secondary`}>|</span>
    </>
  );
}

export function Hero() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState('venues');
  const [searchText, setSearchText] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const HERO_TABS = [
    { id: 'venues', label: t('tabs.venues') },
    { id: 'vendors', label: t('tabs.vendors') },
    { id: 'planning', label: t('tabs.planning') },
    { id: 'inspiration', label: t('tabs.inspiration') }
  ];

  const TYPING_PHRASES = t('hero.typing', { returnObjects: true }) as string[];

  useEffect(() => {
    // Hero Animations with GSAP
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Common Text Animation (Intro)
      const tl = gsap.timeline();
      tl.from('.hero-word span', { 
        y: '110%', 
        duration: 1, 
        stagger: 0.1, 
        ease: "power4.out" 
      }, 0.5);

      tl.from('.hero-fade', { 
        y: 20, 
        opacity: 0, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: "power2.out" 
      }, "-=0.5");

      // Desktop Specifics
      mm.add("(min-width: 1024px)", () => {
        // Intro: Visual enters
        tl.from(visualRef.current, {
          x: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out"
        }, 0);

        // Scroll: Visual expands
        const startLeft = visualRef.current!.offsetLeft;
        const startTop = visualRef.current!.offsetTop;
        const startWidth = visualRef.current!.offsetWidth;
        const startHeight = visualRef.current!.offsetHeight;

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: true
          }
        });

        scrollTl.to(contentRef.current, {
          opacity: 0,
          y: -50,
          duration: 0.5,
          ease: "power2.out"
        }, 0);

        scrollTl.fromTo(visualRef.current, 
          {
            position: 'absolute',
            left: startLeft,
            top: startTop,
            width: startWidth,
            height: startHeight,
            borderRadius: "2.5rem",
            zIndex: 40,
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            xPercent: 0,
            opacity: 1
          },
          {
            left: "50%",
            xPercent: -50,
            top: "90px",
            width: "94vw",
            height: "calc(100vh - 110px)",
            borderRadius: "1.5rem",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            zIndex: 40,
            duration: 1,
            ease: "power3.inOut"
          }, 
          0
        );

        scrollTl.fromTo(".hero-video", { scale: 1.1 }, { scale: 1, duration: 1, ease: "power2.inOut" }, 0);
      });

      // Mobile Specifics
      mm.add("(max-width: 1023px)", () => {
        // No intro animation for visual (it stays hidden/opacity 0 via CSS or set here)
        gsap.set(visualRef.current, { opacity: 0, y: 50 }); // Ensure hidden initially

        // Scroll: Reveals visual
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: true
          }
        });

        scrollTl.to(contentRef.current, {
          opacity: 0,
          y: -50,
          duration: 0.5,
          ease: "power2.out"
        }, 0);

        // Animate Visual In
        scrollTl.fromTo(visualRef.current,
          {
             opacity: 0,
             scale: 0.8,
             position: 'absolute',
             left: '50%',
             xPercent: -50,
             top: '100%',     // Start from the very bottom
             yPercent: 0,     // No offset initially
             width: '90vw',
             height: '50vh',  // Keep consistent height
             zIndex: 40
          },
          {
             opacity: 1,
             scale: 1,
             top: '50%',      // Move to vertical center
             yPercent: -50,   // Center alignment
             left: '50%',
             xPercent: -50,
             width: '94vw',
             height: '50vh',
             borderRadius: "1.5rem",
             duration: 1,
             ease: "power3.out" // Smoother easing
          },
          0
        );
      });

    }, containerRef);


    // Slide Interval
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000); 

    return () => {
      ctx.revert();
      clearInterval(timer);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-[100dvh] w-full overflow-hidden border-b border-border bg-background flex flex-col justify-center">
      <section id="hero" className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-20 lg:py-0">
        
        {/* Text Content */}
        <div ref={contentRef} className="hero-content relative flex flex-col items-center lg:items-start text-center lg:text-left space-y-2 z-10 w-full max-w-xl mx-auto lg:mx-0">
          
          {/* Headline with Masked Reveal */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-[1.1] tracking-tight max-w-full lg:max-w-none min-h-[100px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[160px]">
            <span className="block overflow-hidden hero-word">
              <span className="block">{t('hero.headline.prefix')}</span>
            </span>
            <span className="block hero-word">
              <span className="block text-secondary">
                <TypingEffect words={TYPING_PHRASES} />
              </span>
            </span>
          </h1>
          
          {/* Subhead - Simplified */}
          <p className="hero-fade text-secondary text-sm sm:text-base md:text-lg max-w-md leading-relaxed px-1 sm:px-0">
            {t('hero.subhead')}
          </p>

          {/* Input Area Wrapper - Simplified */}
          <div className="hero-fade w-full max-w-lg flex flex-col gap-4 mt-6">
            
            {/* Quick Actions Row - Moved ABOVE search bar */}
            <div className="w-full flex justify-center lg:justify-start">
              <div className="flex flex-nowrap overflow-x-auto pb-2 -mb-2 mask-linear-fade lg:overflow-visible lg:pb-0 lg:mb-0 lg:flex-wrap gap-2 items-center text-xs font-medium no-scrollbar max-w-[100vw] px-4 lg:px-0 -mx-4 lg:mx-0">
                <span className="text-secondary/80 uppercase tracking-wider mr-1 hidden lg:inline-block">{t('hero.browse')}:</span>
                {HERO_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 rounded-lg border transition-all duration-200 whitespace-nowrap flex-shrink-0 text-xs sm:text-sm ${
                      activeTab === tab.id
                        ? 'bg-primary text-background border-primary'
                        : 'bg-transparent border-border text-secondary hover:border-primary/50 hover:text-primary hover:bg-surface'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar with Beam Effect - Cleaner look */}
            <div className="group w-full shiny-beam-input relative bg-surface rounded-full border border-border/50 transition-all focus-within:ring-2 focus-within:ring-primary/5 hover:border-primary/20 shadow-sm hover:shadow-md">
              <div className="absolute inset-y-0 left-4 lg:left-5 flex items-center pointer-events-none z-10">
                <Search className="text-secondary group-focus-within:text-primary transition-colors w-4 h-4 lg:w-5 lg:h-5" />
              </div>
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder={t('hero.searchPlaceholder')}
                className="w-full pl-10 lg:pl-12 pr-12 lg:pr-4 py-3 lg:py-4 bg-transparent border-none rounded-full text-primary placeholder:text-secondary/60 focus:outline-none focus:ring-0 text-[13px] sm:text-base font-normal relative z-10 truncate"
              />
              <div className="absolute right-1.5 top-1.5 bottom-1.5">
                 <button className="h-full bg-primary hover:bg-primary/90 text-background w-10 lg:w-auto lg:px-6 rounded-full text-sm font-medium transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2">
                   <span className="hidden lg:inline">{t('hero.search')}</span>
                   <Search className="lg:hidden w-4 h-4" />
                 </button>
              </div>
            </div>

          </div>

          {/* Social Proof Badge - Updated to match design */}
          <div className="hero-fade flex items-center gap-3 sm:gap-4 mt-8 pl-2 pr-4 sm:pr-6 py-2 bg-surface rounded-full shadow-sm border border-border w-full sm:w-fit hover:scale-105 transition-transform duration-300 cursor-default max-w-full">
             <div className="flex -space-x-3 flex-shrink-0">
               {[10, 15, 20].map((i) => (
                 <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-[3px] border-surface overflow-hidden relative ring-1 ring-border">
                    <img 
                      src={`https://picsum.photos/seed/${i}/100/100`} 
                      alt="User" 
                      className="w-full h-full object-cover grayscale-[20%]" 
                    />
                 </div>
               ))}
             </div>
             <span className="text-xs sm:text-sm text-secondary font-medium whitespace-nowrap overflow-hidden text-ellipsis">
               {t('hero.join', { countVal: '250,000' })}
             </span>
          </div>

        </div>

        {/* Hero Visual - Video Carousel */}
        <div ref={visualRef} className="hero-visual lg:block relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl group bg-surface border border-border z-20">
          
          {HERO_SLIDES.map((slide, index) => (
            <div 
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              style={{ backgroundColor: slide.color }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={slide.poster}
                className="hero-video w-full h-full object-cover"
              >
                <source src={slide.video} type="video/mp4" />
              </video>
              {/* Dark overlay for better text contrast if needed */}
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          ))}
          
          {/* Dynamic Artist Credit */}
          <div className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6 flex items-center gap-2 lg:gap-3 bg-surface/90 backdrop-blur-sm px-3 py-1.5 lg:px-4 lg:py-2 rounded-full shadow-lg hover:scale-105 transition-all cursor-pointer z-20 border border-border">
            <span className="text-xs lg:text-sm font-semibold text-primary transition-all duration-300">
              {HERO_SLIDES[currentSlide].author}
            </span>
            <img 
              src={HERO_SLIDES[currentSlide].avatar} 
              alt="Artist" 
              className="w-6 h-6 lg:w-8 lg:h-8 rounded-full border border-border" 
            />
          </div>
          
          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 flex gap-2 z-20">
              {HERO_SLIDES.map((_, idx) => (
                  <div 
                      key={idx} 
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === currentSlide ? 'w-6 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)]' : 'w-1.5 bg-white/50'
                      }`}
                  />
              ))}
          </div>

        </div>
      </section>
    </div>
  );
}
