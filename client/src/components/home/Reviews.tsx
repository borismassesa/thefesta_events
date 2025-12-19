import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";
import reviewer1 from "@assets/stock_images/portrait_of_a_happy__5adf1c4f.jpg";
import reviewer2 from "@assets/stock_images/portrait_of_a_happy__2fe75321.jpg";
import reviewer3 from "@assets/stock_images/portrait_of_a_happy__419e5856.jpg";
import reviewer4 from "@assets/stock_images/portrait_of_a_happy__8aa4c718.jpg";
import reviewer5 from "@assets/stock_images/portrait_of_a_happy__f02f3ebf.jpg";
import reviewer6 from "@assets/stock_images/portrait_of_a_happy__7d5d47a1.jpg";

gsap.registerPlugin(ScrollTrigger);

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
  },
  {
    id: 7,
    name: "Alex & Sam",
    role: "Married Sept 2024",
    avatar: reviewer2,
    content: "The RSVP management tool saved us so much time. Cannot imagine planning without it.",
    rating: 5
  },
  {
    id: 8,
    name: "Linda Martinez",
    role: "Photographer",
    avatar: reviewer5,
    content: "Connecting with couples who match my style has never been easier. Love this platform.",
    rating: 5
  }
];

export function Reviews() {
  const containerRef = useRef<HTMLElement>(null);
  const column1Ref = useRef<HTMLDivElement>(null);
  const column2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Automatic Vertical Marquee
      
      // Function to create vertical loop
      const createVerticalLoop = (target: HTMLElement, direction: 'up' | 'down') => {
        const height = target.clientHeight / 2; // Since we duplicated content, half height is one full set
        
        if (direction === 'up') {
          gsap.to(target, {
            y: -height,
            duration: 30, // Adjust speed here
            ease: "linear",
            repeat: -1,
            modifiers: {
               y: gsap.utils.unitize(y => parseFloat(y) % height) // Seamless looping
            }
          });
        } else {
          // Downwards
           gsap.fromTo(target, 
            { y: -height }, 
            {
              y: 0,
              duration: 30,
              ease: "linear",
              repeat: -1,
              modifiers: {
                y: gsap.utils.unitize(y => parseFloat(y) % height - height)
              }
            }
          );
        }
      };

      if (column1Ref.current) {
        // Simple seamless loop approach using fromTo for robustness
        // We need to make sure the content is duplicated enough times.
        // Assuming 3 sets of duplicates for safety.
        
        // Column 1 moves UP (y goes negative)
        gsap.to(column1Ref.current, {
           yPercent: -33.33, // Move by 1/3 since we have 3 sets
           ease: "linear",
           duration: 20,
           repeat: -1
        });
      }

      if (column2Ref.current) {
        // Column 2 moves DOWN (y goes positive, start from negative)
        gsap.fromTo(column2Ref.current, 
          { yPercent: -33.33 },
          {
            yPercent: 0,
            ease: "linear",
            duration: 25, // Different speed for variation
            repeat: -1
          }
        );
      }
      
      // Pause on hover
      const container = containerRef.current;
      if (container) {
          container.addEventListener('mouseenter', () => gsap.globalTimeline.timeScale(0.2)); // Slow down instead of stop
          container.addEventListener('mouseleave', () => gsap.globalTimeline.timeScale(1));
      }

    }, containerRef);

    return () => {
      ctx.revert();
      gsap.globalTimeline.timeScale(1); // Reset timescale
    };
  }, []);

  // Split reviews into two columns
  const column1Reviews = REVIEWS.filter((_, i) => i % 2 === 0);
  const column2Reviews = REVIEWS.filter((_, i) => i % 2 !== 0);

  // Triple items for seamless loop (Original + Copy + Copy) to ensure no gaps
  const col1Items = [...column1Reviews, ...column1Reviews, ...column1Reviews];
  const col2Items = [...column2Reviews, ...column2Reviews, ...column2Reviews];

  return (
    <section ref={containerRef} className="relative w-full bg-surface border-b border-border overflow-hidden py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Column: Text Content (Sticky) */}
        <div className="lg:sticky lg:top-32 flex flex-col items-start gap-8 z-10">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[1px] bg-accent"></span>
              <span className="font-mono text-accent text-xs tracking-widest uppercase">
                Testimonials
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-primary leading-[1.1] mb-6">
              Loved by couples <br/>
              <span className="font-serif italic font-normal text-secondary">& professionals.</span>
            </h2>
            <p className="text-secondary text-lg leading-relaxed max-w-md font-light">
              Join thousands of happy users who have transformed their wedding planning experience with TheFesta.
            </p>
          </div>

          <div className="flex gap-8 mt-4">
             <div className="flex flex-col gap-2">
               <span className="text-3xl font-bold text-primary">4.9/5</span>
               <span className="text-sm text-secondary uppercase tracking-wider">Average Rating</span>
             </div>
             <div className="w-[1px] h-full bg-border"></div>
             <div className="flex flex-col gap-2">
               <span className="text-3xl font-bold text-primary">2k+</span>
               <span className="text-sm text-secondary uppercase tracking-wider">Verified Reviews</span>
             </div>
          </div>
        </div>

        {/* Right Column: Moving Cards */}
        <div className="relative h-[600px] md:h-[800px] overflow-hidden mask-gradient-y grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Vertical Gradients for masking */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-surface to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface to-transparent z-10 pointer-events-none"></div>

          {/* Column 1 - Moving Up */}
          <div className="overflow-hidden h-full relative">
              <div ref={column1Ref} className="flex flex-col gap-6">
                {col1Items.map((review, i) => (
                   <ReviewCard key={`col1-${i}`} review={review} />
                ))}
              </div>
          </div>

          {/* Column 2 - Moving Down */}
          <div className="overflow-hidden h-full relative pt-12 md:pt-0">
               <div ref={column2Ref} className="flex flex-col gap-6">
                {col2Items.map((review, i) => (
                   <ReviewCard key={`col2-${i}`} review={review} />
                ))}
              </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: typeof REVIEWS[0] }) {
  return (
    <div className="bg-background border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group w-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-border flex-shrink-0">
          <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-semibold text-primary text-sm">{review.name}</h4>
          <p className="text-[10px] text-secondary uppercase tracking-wide">{review.role}</p>
        </div>
      </div>
      
      <div className="flex gap-0.5 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={12} 
              className={`${i < review.rating ? "fill-accent text-accent" : "fill-border text-border"}`} 
            />
          ))}
      </div>

      <p className="text-secondary leading-relaxed text-sm italic">
        "{review.content}"
      </p>
    </div>
  )
}
