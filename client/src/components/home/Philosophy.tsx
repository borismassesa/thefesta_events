import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import planningImg from "@assets/stock_images/wedding_planning_che_871a1473.jpg";
import marketplaceImg from "@assets/stock_images/wedding_venue_market_6bf548c4.jpg";
import vendorsImg from "@assets/stock_images/wedding_photographer_abdcbceb.jpg";
import rsvpImg from "@assets/stock_images/wedding_rsvp_guest_l_1043fb33.jpg";
import websiteImg from "@assets/stock_images/wedding_website_digi_53a3f730.jpg";
import adviceImg from "@assets/stock_images/wedding_inspiration__19a8f3a8.jpg";
import attireImg from "@assets/stock_images/wedding_dress_suit_r_bb9b914d.jpg";
import couplesImg from "@assets/stock_images/happy_wedding_couple_e3561dd1.jpg";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: "planning",
    title: "Planning Tools",
    description: "Stay organized with our comprehensive checklist, budget tracker, and timeline manager. We make the complex simple.",
    image: planningImg
  },
  {
    id: "marketplace",
    title: "Venue Marketplace",
    description: "Discover exclusive venues tailored to your style. From rustic barns to modern lofts, find the perfect backdrop for your story.",
    image: marketplaceImg
  },
  {
    id: "vendors",
    title: "Curated Vendors",
    description: "Connect with top-tier photographers, florists, and caterers. We vet every professional to ensure your day is in safe hands.",
    image: vendorsImg
  },
  {
    id: "rsvp",
    title: "RSVP & Guest List",
    description: "Effortlessly manage your guest list and RSVPs. detailed dietary requirements and plus-ones, all in one dashboard.",
    image: rsvpImg
  },
  {
    id: "website",
    title: "Wedding Website",
    description: "Create a stunning, personalized wedding website in minutes. Share your story and details with beautiful digital invites.",
    image: websiteImg
  },
  {
    id: "advice",
    title: "Ideas & Advice",
    description: "Get inspired with expert articles, style guides, and real wedding features. Expert advice for every step of the journey.",
    image: adviceImg
  },
  {
    id: "attire",
    title: "Attire & Rings",
    description: "Find the perfect fit. Browse collections of dresses, suits, and rings from designers you'll love.",
    image: attireImg
  },
  {
    id: "couples",
    title: "Find Couples",
    description: "Join a community of couples planning their big day. Share tips, ask questions, and find support from people just like you.",
    image: couplesImg
  }
];

export function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the left side content
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: ".service-visual",
        scrub: true,
      });

      // Detect active section
      const sections = gsap.utils.toArray<HTMLElement>(".service-item");
      sections.forEach((section, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) {
              setActiveIndex(i);
            }
          }
        });
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="philosophy" className="relative w-full bg-background border-b border-border">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Column - Sticky Visual */}
        <div className="service-visual h-[50vh] lg:h-screen sticky top-0 flex flex-col justify-center items-center p-6 lg:p-12 overflow-hidden bg-surface/30">
          <div className="relative w-full aspect-[4/3] lg:aspect-square max-w-xl rounded-2xl overflow-hidden shadow-2xl border border-border">
            {SERVICES.map((service, index) => (
              <div
                key={service.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transform scale-105"
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
            ))}
            
            {/* Progress Indicator */}
            <div className="absolute bottom-6 left-6 right-6 flex gap-2 z-20">
               {SERVICES.map((_, idx) => (
                 <div 
                   key={idx}
                   className={`h-1 rounded-full transition-all duration-300 ${
                     idx === activeIndex ? "w-8 bg-white" : "w-2 bg-white/40"
                   }`}
                 />
               ))}
            </div>
          </div>
        </div>

        {/* Right Column - Scrolling Content */}
        <div ref={rightColumnRef} className="flex flex-col py-12 lg:py-24 px-6 lg:px-16 gap-[50vh]">
          {/* Header */}
          <div className="mb-12">
             <span className="font-mono text-accent text-xs tracking-widest uppercase mb-4 block">
              Our Services
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-primary">
              Everything you need,<br />
              <span className="text-secondary">all in one place.</span>
            </h2>
          </div>

          {/* Service Items */}
          {SERVICES.map((service, index) => (
            <div 
              key={service.id} 
              className="service-item min-h-[30vh] flex flex-col justify-center transition-opacity duration-500"
              style={{ opacity: index === activeIndex ? 1 : 0.3 }}
            >
              <span className="text-6xl md:text-8xl font-bold text-surface-foreground/5 mb-4 select-none">
                0{index + 1}
              </span>
              <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
                {service.title}
              </h3>
              <p className="text-lg text-secondary leading-relaxed max-w-md">
                {service.description}
              </p>
            </div>
          ))}
          
          {/* Bottom Spacer to allow last item to scroll fully */}
          <div className="h-[20vh]"></div>
        </div>

      </div>
    </section>
  );
}
