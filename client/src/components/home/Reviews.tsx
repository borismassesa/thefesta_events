import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Star } from "lucide-react";
import reviewer1 from "@assets/stock_images/portrait_of_a_happy__5adf1c4f.jpg";
import reviewer2 from "@assets/stock_images/portrait_of_a_happy__2fe75321.jpg";
import reviewer3 from "@assets/stock_images/portrait_of_a_happy__419e5856.jpg";
import reviewer4 from "@assets/stock_images/portrait_of_a_happy__8aa4c718.jpg";
import reviewer5 from "@assets/stock_images/portrait_of_a_happy__f02f3ebf.jpg";
import reviewer6 from "@assets/stock_images/portrait_of_a_happy__7d5d47a1.jpg";

const REVIEWS = [
  {
    id: 1,
    name: "Sarah & James",
    role: "Married June 2024",
    avatar: reviewer1,
    content: "TheFesta made our wedding planning incredibly smooth. The vendor marketplace is a game-changer!",
    rating: 5
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    role: "Event Planner",
    avatar: reviewer2,
    content: "As a professional planner, I use this platform for all my clients. The tools are intuitive and powerful.",
    rating: 5
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Groom",
    avatar: reviewer3,
    content: "I was dreading the planning process, but the budget tracker and guest list tools actually made it fun.",
    rating: 5
  },
  {
    id: 4,
    name: "Emily & David",
    role: "Married Aug 2024",
    avatar: reviewer4,
    content: "We found our dream venue and photographer within days. Highly recommended for any couple!",
    rating: 4
  },
  {
    id: 5,
    name: "Jessica Taylor",
    role: "Maid of Honor",
    avatar: reviewer5,
    content: "Helped me organize the best bridal shower ever. The inspiration section is gold.",
    rating: 5
  },
  {
    id: 6,
    name: "Robert Wilson",
    role: "Venue Owner",
    avatar: reviewer6,
    content: "Listing my venue here has brought in so many wonderful couples. Great community to be part of.",
    rating: 5
  }
];

export function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create seamless loop
      const totalWidth = trackRef.current?.scrollWidth || 0;
      const animation = gsap.to(".review-track", {
        x: -totalWidth / 2,
        duration: 40,
        ease: "linear",
        repeat: -1,
      });

      // Pause on hover
      const track = trackRef.current;
      if (track) {
        track.addEventListener("mouseenter", () => animation.pause());
        track.addEventListener("mouseleave", () => animation.play());
      }
      
      return () => {
         if (track) {
          track.removeEventListener("mouseenter", () => animation.pause());
          track.removeEventListener("mouseleave", () => animation.play());
         }
      }
    }, trackRef);

    return () => ctx.revert();
  }, []);

  // Duplicate items for loop
  const allReviews = [...REVIEWS, ...REVIEWS];

  return (
    <section className="py-24 bg-surface/50 border-b border-border overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-16 text-center">
        <span className="font-mono text-accent text-xs tracking-widest uppercase mb-4 block">
          Testimonials
        </span>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-primary leading-[1.1]">
          Loved by couples & pros.
        </h2>
      </div>

      <div className="relative w-full">
         {/* Gradients */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

        <div ref={trackRef} className="review-track flex gap-8 w-fit pl-8">
          {allReviews.map((review, i) => (
            <div 
              key={`${review.id}-${i}`} 
              className="w-[350px] md:w-[450px] bg-background border border-border p-8 rounded-2xl shadow-sm flex-shrink-0 hover:shadow-md transition-shadow cursor-default group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-border">
                  <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary">{review.name}</h4>
                  <p className="text-xs text-secondary uppercase tracking-wide">{review.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                   {[...Array(5)].map((_, i) => (
                     <Star 
                       key={i} 
                       size={14} 
                       className={`${i < review.rating ? "fill-accent text-accent" : "fill-border text-border"}`} 
                     />
                   ))}
                </div>
              </div>
              <p className="text-secondary leading-relaxed text-lg italic">
                "{review.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
