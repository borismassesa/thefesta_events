import { useState, useEffect, useRef } from "react";
import { Search, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HERO_TABS = [
  { id: 'venues', label: 'Venues' },
  { id: 'vendors', label: 'Vendors' },
  { id: 'planning', label: 'Planning' },
  { id: 'inspiration', label: 'Inspiration' }
];

const SEARCH_PLACEHOLDERS: Record<string, string> = {
  venues: "Search for rustic barns, beach resorts...",
  vendors: "Search photographers, florists, planners...",
  planning: "Search checklists, guest lists, budgets...",
  inspiration: "Search real weddings, style guides..."
};

const POPULAR_TAGS = ['Rustic', 'Beach', 'Vintage', 'Modern', 'Boho'];

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
  const [subIndex, setSubIndex] = useState(0);
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

    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000); // Wait longer before deleting
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 50 : 100); // Typing speed

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <>
      {words[index].substring(0, subIndex)}
      <span className={`${blink ? "opacity-100" : "opacity-0"} transition-opacity duration-100 ml-1 font-light text-primary`}>|</span>
    </>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState('venues');
  const [searchText, setSearchText] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Hero Animations with GSAP
    const ctx = gsap.context(() => {
      // Intro Animation Timeline
      const tl = gsap.timeline();
      
      // Animate text elements stagger in (Revealing from masked overflow)
      tl.from('.hero-word span', { 
        y: '110%', 
        duration: 1, 
        stagger: 0.1, 
        ease: "power4.out" 
      }, 0.5);

      // Animate other content fade in
      tl.from('.hero-fade', { 
        y: 20, 
        opacity: 0, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: "power2.out" 
      }, "-=0.5");

      // Animate visual element entry
      tl.from(visualRef.current, {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      }, 0);

      // Calculate initial position relative to viewport/container
      const startLeft = visualRef.current!.offsetLeft;
      const startTop = visualRef.current!.offsetTop;
      const startWidth = visualRef.current!.offsetWidth;
      const startHeight = visualRef.current!.offsetHeight;

      // Scroll Trigger for Visual Expansion (Cinematic Effect)
      // Visual expands to cover the full viewport
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%", // Determines how long the scroll takes
          pin: true,
          scrub: true
        }
      });

      // 1. Text fades out and moves up
      scrollTl.to(contentRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: "power2.out"
      }, 0);

      // 2. Visual expands to fullscreen
      // We start from the computed absolute position to avoid jumps
      scrollTl.fromTo(visualRef.current, 
        {
          position: 'absolute',
          left: startLeft,
          top: startTop,
          width: startWidth,
          height: startHeight,
          borderRadius: "2.5rem",
          zIndex: 40, // Lower z-index so it doesn't cover navbar (z-50)
          boxShadow: "0 0 0 rgba(0,0,0,0)",
          xPercent: 0
        },
        {
          left: "50%", // Robust centering
          xPercent: -50,
          top: "90px", // Push below navbar
          width: "94vw", // Slightly narrower to prevent edge clutter
          height: "calc(100vh - 110px)", // consistent bottom margin
          borderRadius: "1.5rem",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)", // Modern deep shadow
          zIndex: 40, // Maintain lower z-index than navbar
          duration: 1,
          ease: "power3.inOut" // Smoother easing
        }, 
        0
      );

      // 3. Optional: Zoom effect on video inside
      scrollTl.fromTo(".hero-video", 
        { scale: 1.1 },
        { scale: 1, duration: 1, ease: "power2.inOut" }, 
        0
      );

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
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden border-b border-border bg-background">
      <section id="hero" className="w-full h-full max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        
        {/* Text Content */}
        <div ref={contentRef} className="hero-content relative flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 z-10 w-full max-w-xl mx-auto lg:mx-0">
          
          {/* Headline with Masked Reveal */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-[1.05] tracking-tight max-w-[90%] lg:max-w-none h-[120px] md:h-[140px] lg:h-[160px]">
            <span className="block overflow-hidden hero-word">
              <span className="block">Plan Less,</span>
            </span>
            <span className="block overflow-hidden hero-word">
              <span className="block text-secondary">
                <TypingEffect words={["Celebrate More.", "Stress Less.", "Dream Bigger.", "Party Harder."]} />
              </span>
            </span>
          </h1>
          
          {/* Subhead - Simplified */}
          <p className="hero-fade text-secondary text-base md:text-lg max-w-md leading-relaxed">
            The all-in-one marketplace for venues, vendors, and planning tools. Discover inspiration and manage every detail in one place.
          </p>

          {/* Input Area Wrapper - Simplified */}
          <div className="hero-fade w-full max-w-lg flex flex-col gap-4 mt-2">
            
            {/* Quick Actions Row - Moved ABOVE search bar */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 items-center text-xs font-medium">
              <span className="text-secondary/80 uppercase tracking-wider mr-1">Browse:</span>
              {HERO_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary text-background border-primary'
                      : 'bg-transparent border-border text-secondary hover:border-primary/50 hover:text-primary hover:bg-surface'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Bar with Beam Effect - Cleaner look */}
            <div className="group w-full shiny-beam-input relative bg-surface rounded-full border border-border/50 transition-all focus-within:ring-2 focus-within:ring-primary/5 hover:border-primary/20 shadow-sm hover:shadow-md">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none z-10">
                <Search className="text-secondary group-focus-within:text-primary transition-colors" size={20} />
              </div>
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder={SEARCH_PLACEHOLDERS[activeTab] || "Search..."}
                className="w-full pl-12 pr-4 py-4 bg-transparent border-none rounded-full text-primary placeholder:text-secondary/60 focus:outline-none focus:ring-0 text-base font-normal relative z-10"
              />
              <div className="absolute right-1.5 top-1.5 bottom-1.5">
                 <button className="h-full bg-primary hover:bg-primary/90 text-background px-6 rounded-full text-sm font-medium transition-all shadow-sm cursor-pointer flex items-center gap-2">
                   Search
                 </button>
              </div>
            </div>

          </div>

          {/* Social Proof Badge - Updated to match design */}
          <div className="hero-fade flex items-center gap-4 mt-8 pl-2 pr-6 py-2 bg-surface rounded-full shadow-sm border border-border w-fit hover:scale-105 transition-transform duration-300 cursor-default">
             <div className="flex -space-x-3">
               {[10, 15, 20].map((i) => (
                 <div key={i} className="w-10 h-10 rounded-full border-[3px] border-surface overflow-hidden relative ring-1 ring-border">
                    <img 
                      src={`https://picsum.photos/seed/${i}/100/100`} 
                      alt="User" 
                      className="w-full h-full object-cover grayscale-[20%]" 
                    />
                 </div>
               ))}
             </div>
             <span className="text-sm text-secondary font-medium">
               Join <span className="text-primary font-bold">250,000+</span> couples planning today
             </span>
          </div>

        </div>

        {/* Hero Visual - Video Carousel */}
        <div ref={visualRef} className="hero-visual hidden lg:block relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl group bg-surface border border-border z-20">
          
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
          <div className="absolute bottom-6 right-6 flex items-center gap-3 bg-surface/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-all cursor-pointer z-20 border border-border">
            <span className="text-sm font-semibold text-primary transition-all duration-300">
              {HERO_SLIDES[currentSlide].author}
            </span>
            <img 
              src={HERO_SLIDES[currentSlide].avatar} 
              alt="Artist" 
              className="w-8 h-8 rounded-full border border-border" 
            />
          </div>
          
          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-6 flex gap-2 z-20">
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
