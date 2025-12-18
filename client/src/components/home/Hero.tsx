import { useState, useEffect, useRef } from "react";
import { Search, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HERO_TABS = [
  { id: 'venues', label: 'Venues' },
  { id: 'vendors', label: 'Vendors' },
  { id: 'photos', label: 'Photos' },
  { id: 'ideas', label: 'Ideas' }
];

const POPULAR_TAGS = ['Rustic', 'Beach', 'Vintage', 'Modern', 'Boho'];

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
      const rect = visualRef.current!.getBoundingClientRect();
      const containerRect = containerRef.current!.getBoundingClientRect();
      
      const relativeTop = rect.top - containerRect.top;
      const relativeRight = containerRect.right - rect.right;
      const relativeWidth = rect.width;
      const relativeHeight = rect.height;

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

      // 2. Visual expands to fullscreen from the right
      // We start from the computed absolute position to avoid jumps
      scrollTl.fromTo(visualRef.current, 
        {
          position: 'absolute',
          top: relativeTop,
          right: relativeRight,
          width: relativeWidth,
          height: relativeHeight,
          borderRadius: "2.5rem",
          zIndex: 50
        },
        {
          top: 0,
          right: 0,
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
          duration: 1,
          ease: "power2.inOut"
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
      <section id="hero" className="w-full h-full max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative">
        
        {/* Text Content */}
        <div ref={contentRef} className="hero-content flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 z-10">
          
          {/* Headline with Masked Reveal */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary leading-[1.1] tracking-tight">
            <span className="block overflow-hidden hero-word">
              <span className="block">Plan Less</span>
            </span>
            <span className="block overflow-hidden hero-word">
              <span className="block">Celebrate More</span>
            </span>
          </h1>
          
          {/* Subhead */}
          <p className="hero-fade text-secondary text-lg md:text-xl max-w-lg leading-relaxed">
            Search over 250,000 local professionals, find the perfect venue, and create your wedding website—all in one place.
          </p>

          {/* Input Area Wrapper */}
          <div className="hero-fade w-full max-w-xl flex flex-col gap-6">
            
            {/* Tabs */}
            <div className="bg-surface p-1.5 rounded-full inline-flex self-center lg:self-start border border-border">
              {HERO_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-background text-primary shadow-sm'
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Bar with Beam Effect */}
            <div className="group w-full shiny-beam-input relative bg-surface rounded-full border border-border transition-all focus-within:ring-2 focus-within:ring-accent/20">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none z-10">
                <Search className="text-secondary group-focus-within:text-accent transition-colors" size={20} />
              </div>
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search vendors, venues, or ideas..."
                className="w-full pl-14 pr-16 py-5 bg-transparent border-none rounded-full text-primary placeholder:text-secondary focus:outline-none focus:ring-0 text-base md:text-lg relative z-10"
              />
              <button className="absolute right-3 top-2.5 bg-accent hover:brightness-110 text-white p-2.5 rounded-full transition-colors shadow-lg shadow-accent/20 z-10 cursor-pointer">
                 <Search size={20} />
              </button>
            </div>

            {/* Popular Tags */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 items-center text-sm">
              <span className="text-secondary font-medium">Trending:</span>
              {POPULAR_TAGS.map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1 border border-border rounded-full text-secondary hover:border-accent hover:text-accent transition-colors bg-surface"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Get Matched Banner */}
          <div className="hero-fade w-full max-w-xl bg-gradient-to-r from-accent/5 to-background border border-accent/10 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
               <div className="bg-background p-2 rounded-full shadow-sm text-accent border border-border">
                  <Sparkles size={20} />
               </div>
               <div className="text-left">
                  <div className="flex items-center gap-2 mb-0.5">
                     <h3 className="font-bold text-primary">Get Matched Now</h3>
                     <span className="bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">Free</span>
                  </div>
                  <p className="text-sm text-secondary leading-tight">Tell us your style, we'll find your dream team.</p>
               </div>
            </div>
             <button className="bg-primary text-background px-5 py-2.5 rounded-full text-sm font-bold hover:opacity-90 transition-all whitespace-nowrap cursor-pointer">
               Start Planning
             </button>
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
          <div className="absolute bottom-6 right-6 flex items-center gap-3 bg-white/90 dark:bg-black/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-all cursor-pointer z-20 border border-white/20">
            <span className="text-sm font-semibold text-black dark:text-white transition-all duration-300">
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
