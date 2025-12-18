import { useState, useEffect, useRef } from "react";
import { Search, Sparkles, Heart, Star, Music } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HERO_TABS = [
  { id: 'venues', label: 'Venues' },
  { id: 'vendors', label: 'Vendors' },
  { id: 'photos', label: 'Photos' },
  { id: 'ideas', label: 'Ideas' }
];

const HERO_SLIDES = [
  {
    id: 1,
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    poster: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg",
    author: "Evergreen Films",
    avatar: "https://picsum.photos/seed/vid1/50/50",
    color: "#e8f4f8"
  },
  {
    id: 2,
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
    author: "Love & Lens",
    avatar: "https://picsum.photos/seed/vid2/50/50",
    color: "#f8e8e8"
  },
  {
    id: 3,
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
    author: "Rustic Barns Co.",
    avatar: "https://picsum.photos/seed/vid3/50/50",
    color: "#e8f8ec"
  },
];

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
      
      // Animate text elements stagger in
      tl.from('.hero-word span', { 
        y: '110%', 
        duration: 1.2, 
        stagger: 0.1, 
        ease: "power4.out" 
      }, 0.2);

      // Animate other content fade in
      tl.from('.hero-fade', { 
        y: 20, 
        opacity: 0, 
        duration: 1, 
        stagger: 0.1, 
        ease: "power2.out" 
      }, "-=0.8");

      // Animate visual element entry
      if (visualRef.current) {
        tl.from(visualRef.current, {
          x: 100,
          opacity: 0,
          duration: 1.4,
          ease: "power3.out"
        }, 0);
      }

      // Floating elements animation
      gsap.to('.floating-icon', {
        y: -15,
        rotation: 5,
        duration: 3,
        stagger: {
          each: 0.5,
          yoyo: true,
          repeat: -1
        },
        ease: "sine.inOut"
      });

      // Scroll Trigger logic (Only on desktop to avoid mobile jank)
      if (window.innerWidth > 1024) {
        // Calculate initial position relative to viewport/container
        const startLeft = visualRef.current!.offsetLeft;
        const startTop = visualRef.current!.offsetTop;
        const startWidth = visualRef.current!.offsetWidth;
        const startHeight = visualRef.current!.offsetHeight;

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=120%", 
            pin: true,
            scrub: 0.5
          }
        });

        // 1. Text fades out
        scrollTl.to(contentRef.current, {
          opacity: 0,
          y: -50,
          scale: 0.95,
          duration: 0.5,
          ease: "power2.out"
        }, 0);

        // 2. Visual expands to fullscreen
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
            xPercent: 0
          },
          {
            left: "50%",
            xPercent: -50,
            top: "90px",
            width: "96vw",
            height: "calc(100vh - 110px)",
            borderRadius: "1rem",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            zIndex: 40,
            duration: 1,
            ease: "power3.inOut"
          }, 
          0
        );
      }

    }, containerRef);

    // Slide Interval
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000); 

    return () => {
      ctx.revert();
      clearInterval(timer);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden border-b border-border bg-background">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <section id="hero" className="w-full h-full min-h-screen max-w-[1400px] mx-auto px-6 py-24 lg:py-0 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        
        {/* Text Content */}
        <div ref={contentRef} className="hero-content relative flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 z-10">
          
          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-[1.05] tracking-tight max-w-[90%] lg:max-w-none">
            <span className="block overflow-hidden hero-word">
              <span className="block font-sans font-semibold tracking-tighter">Plan Less.</span>
            </span>
            <span className="block overflow-hidden hero-word relative">
              <span className="block font-serif font-normal italic text-secondary relative z-10">Celebrate More.</span>
              {/* Underline accent */}
              <span className="absolute bottom-2 left-0 w-full h-3 bg-accent/10 -z-10 -rotate-1 rounded-full hidden lg:block"></span>
            </span>
          </h1>
          
          {/* Subhead */}
          <p className="hero-fade text-secondary text-lg md:text-xl max-w-lg leading-relaxed font-light">
            Your all-in-one platform for modern weddings. curated venues, top-tier vendors, and endless inspiration.
          </p>

          {/* Input Area Wrapper */}
          <div className="hero-fade w-full max-w-lg flex flex-col gap-6 mt-4">
            
            {/* Elevated Search Bar */}
            <div className="group w-full relative bg-surface/80 backdrop-blur-md rounded-2xl border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/20 focus-within:ring-2 focus-within:ring-primary/5 focus-within:border-primary/30 focus-within:shadow-xl shadow-sm">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none z-10">
                <Search className="text-secondary group-focus-within:text-primary transition-colors duration-300" size={22} />
              </div>
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search venues, photographers, florists..."
                className="w-full pl-14 pr-32 py-5 bg-transparent border-none rounded-2xl text-primary placeholder:text-secondary/50 focus:outline-none focus:ring-0 text-lg font-normal relative z-10"
              />
              <div className="absolute right-2 top-2 bottom-2">
                 <button className="h-full bg-primary hover:bg-primary/90 text-background px-8 rounded-xl text-sm font-medium transition-all shadow-md cursor-pointer flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]">
                   Search
                 </button>
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 items-center text-sm">
              <span className="text-secondary/60 font-medium mr-1">Browse:</span>
              {HERO_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-full border text-xs font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary text-background border-primary shadow-md'
                      : 'bg-transparent border-border text-secondary hover:border-primary/30 hover:bg-surface'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

          </div>

          {/* Trust Badge */}
          <div className="hero-fade flex items-center gap-4 text-xs font-medium text-secondary/70 mt-6 px-5 py-3 bg-white/50 dark:bg-black/20 rounded-full border border-border/40 backdrop-blur-md shadow-sm">
             <div className="flex -space-x-2">
               {[1,2,3].map(i => (
                 <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-black bg-gray-200 overflow-hidden">
                    <img src={`https://picsum.photos/seed/user${i}/50/50`} alt="User" className="w-full h-full object-cover" />
                 </div>
               ))}
             </div>
             <span>Join <strong>250,000+</strong> couples planning today</span>
          </div>

        </div>

        {/* Hero Visual - Video Carousel */}
        <div className="relative w-full h-[50vh] lg:h-auto lg:aspect-[4/5] flex items-center justify-center">
            
            {/* Floating Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl z-30 flex items-center justify-center floating-icon rotate-12 hidden lg:flex">
                <Heart className="text-red-400 fill-red-400/20" size={32} />
            </div>
            <div className="absolute top-1/2 -left-8 w-16 h-16 bg-white dark:bg-zinc-800 rounded-full shadow-lg z-30 flex items-center justify-center floating-icon -rotate-12 delay-700 hidden lg:flex">
                <Star className="text-yellow-400 fill-yellow-400/20" size={24} />
            </div>
            <div className="absolute bottom-20 -right-4 w-14 h-14 bg-white dark:bg-zinc-800 rounded-xl shadow-lg z-30 flex items-center justify-center floating-icon rotate-6 delay-300 hidden lg:flex">
                <Music className="text-blue-400" size={24} />
            </div>

            <div ref={visualRef} className="relative w-full h-full lg:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl group bg-surface border border-border z-20">
              
              {HERO_SLIDES.map((slide, index) => (
                <div 
                  key={slide.id}
                  className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                    index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>
              ))}
              
              {/* Dynamic Artist Credit */}
              <div className="absolute bottom-6 right-6 flex items-center gap-3 bg-white/90 dark:bg-black/90 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg cursor-pointer z-20 border border-white/20 transition-transform hover:scale-105">
                <span className="text-sm font-semibold text-black dark:text-white">
                  {HERO_SLIDES[currentSlide].author}
                </span>
                <img 
                  src={HERO_SLIDES[currentSlide].avatar} 
                  alt="Artist" 
                  className="w-8 h-8 rounded-full border border-gray-200" 
                />
              </div>
              
              {/* Slide Indicators */}
              <div className="absolute bottom-6 left-6 flex gap-2 z-20">
                  {HERO_SLIDES.map((_, idx) => (
                      <button 
                          key={idx} 
                          onClick={() => setCurrentSlide(idx)}
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                              idx === currentSlide ? 'w-8 bg-white shadow-glow' : 'w-2 bg-white/40 hover:bg-white/60'
                          }`}
                      />
                  ))}
              </div>
            </div>
        </div>
      </section>
    </div>
  );
}
