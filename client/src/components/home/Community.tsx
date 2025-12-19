import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Import stock images
import img1 from "@assets/stock_images/portrait_of_happy_di_c8a24a47.jpg";
import img2 from "@assets/stock_images/portrait_of_happy_di_b4c479f6.jpg";
import img3 from "@assets/stock_images/portrait_of_happy_di_923e31ae.jpg";
import img4 from "@assets/stock_images/portrait_of_happy_di_e387d645.jpg";
import img5 from "@assets/stock_images/portrait_of_happy_di_d654e779.jpg";
import img6 from "@assets/stock_images/portrait_of_happy_di_c22f0f87.jpg";
import img7 from "@assets/stock_images/portrait_of_happy_di_870f496e.jpg";
import img8 from "@assets/stock_images/portrait_of_happy_di_aaf3ea01.jpg";
import img9 from "@assets/stock_images/portrait_of_happy_di_a267e549.jpg";
import img10 from "@assets/stock_images/portrait_of_happy_di_2732c45f.jpg";

// Re-use some existing ones to fill the grid
import existing1 from "@assets/stock_images/portrait_of_a_happy__5adf1c4f.jpg";
import existing2 from "@assets/stock_images/portrait_of_a_happy__2fe75321.jpg";
import existing3 from "@assets/stock_images/portrait_of_a_happy__419e5856.jpg";
import existing4 from "@assets/stock_images/portrait_of_a_happy__8aa4c718.jpg";
import existing5 from "@assets/stock_images/portrait_of_a_happy__f02f3ebf.jpg";

gsap.registerPlugin(ScrollTrigger);

const AVATARS = [
  { img: img1, name: "Alice M.", role: "Bride", quote: "Found my dream venue in minutes!" },
  { img: img2, name: "David K.", role: "Groom", quote: "Budget tools are a lifesaver." },
  { img: img3, name: "Sophie L.", role: "Planner", quote: "My clients love the collaboration features." },
  { img: img4, name: "James R.", role: "Photographer", quote: "Great way to connect with couples." },
  { img: img5, name: "Emma T.", role: "Bride", quote: "So much inspiration in one place." },
  { img: img6, name: "Lucas P.", role: "Groom", quote: "Made the guest list easy to manage." },
  { img: img7, name: "Olivia S.", role: "Maid of Honor", quote: "Helped me plan the perfect shower." },
  { img: img8, name: "Noah B.", role: "Venue Owner", quote: "Increased our bookings significantly." },
  { img: img9, name: "Ava C.", role: "Bride", quote: "I love the checklist feature!" },
  { img: img10, name: "Ethan H.", role: "Groom", quote: "Stress-free planning journey." },
  { img: existing1, name: "Sarah J.", role: "Bride", quote: "Highly recommend to everyone." },
  { img: existing2, name: "Michael W.", role: "Planner", quote: "Best platform for event pros." },
  { img: existing3, name: "Jessica L.", role: "Vendor", quote: "Simple and effective tools." },
  { img: existing4, name: "Daniel M.", role: "Groom", quote: "Saved us so much time." },
  { img: existing5, name: "Emily R.", role: "Bride", quote: "A must-have for weddings." },
  // Duplicates to create density
  { img: img1, name: "Chloe D.", role: "Bride", quote: "Found my dream venue in minutes!" },
  { img: img3, name: "Ryan G.", role: "Groom", quote: "Budget tools are a lifesaver." },
  { img: img5, name: "Zoe K.", role: "Planner", quote: "My clients love the collaboration features." },
  { img: img7, name: "Justin F.", role: "Photographer", quote: "Great way to connect with couples." },
  { img: img9, name: "Grace H.", role: "Bride", quote: "So much inspiration in one place." },
  { img: existing1, name: "Kevin T.", role: "Groom", quote: "Made the guest list easy to manage." },
  { img: existing3, name: "Lily P.", role: "Maid of Honor", quote: "Helped me plan the perfect shower." },
  { img: img2, name: "Brandon S.", role: "Venue Owner", quote: "Increased our bookings significantly." },
  { img: img4, name: "Mia V.", role: "Bride", quote: "I love the checklist feature!" },
  { img: img6, name: "Caleb N.", role: "Groom", quote: "Stress-free planning journey." },
  { img: img8, name: "Hannah B.", role: "Bride", quote: "Highly recommend to everyone." },
  { img: img10, name: "Isaac L.", role: "Planner", quote: "Best platform for event pros." },
  { img: existing2, name: "Victoria M.", role: "Vendor", quote: "Simple and effective tools." },
  { img: existing4, name: "Jack O.", role: "Groom", quote: "Saved us so much time." },
  { img: existing5, name: "Samantha K.", role: "Bride", quote: "A must-have for weddings." },
   { img: img1, name: "Alice M.", role: "Bride", quote: "Found my dream venue in minutes!" },
  { img: img2, name: "David K.", role: "Groom", quote: "Budget tools are a lifesaver." },
  { img: img3, name: "Sophie L.", role: "Planner", quote: "My clients love the collaboration features." },
  { img: img4, name: "James R.", role: "Photographer", quote: "Great way to connect with couples." },
  { img: img5, name: "Emma T.", role: "Bride", quote: "So much inspiration in one place." },
  { img: img6, name: "Lucas P.", role: "Groom", quote: "Made the guest list easy to manage." },
  { img: img7, name: "Olivia S.", role: "Maid of Honor", quote: "Helped me plan the perfect shower." },
  { img: img8, name: "Noah B.", role: "Venue Owner", quote: "Increased our bookings significantly." },
  { img: img9, name: "Ava C.", role: "Bride", quote: "I love the checklist feature!" },
  { img: img10, name: "Ethan H.", role: "Groom", quote: "Stress-free planning journey." },
  { img: existing1, name: "Sarah J.", role: "Bride", quote: "Highly recommend to everyone." },
  { img: existing2, name: "Michael W.", role: "Planner", quote: "Best platform for event pros." },
  { img: existing3, name: "Jessica L.", role: "Vendor", quote: "Simple and effective tools." },
  { img: existing4, name: "Daniel M.", role: "Groom", quote: "Saved us so much time." },
  { img: existing5, name: "Emily R.", role: "Bride", quote: "A must-have for weddings." },
];

export function Community() {
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple fade in for the container
       gsap.fromTo(".community-avatar", 
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: {
            amount: 1.5,
            grid: "auto",
            from: "center"
          },
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );
      
      gsap.fromTo(".community-text",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.5,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-background overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 flex flex-col items-center">
        
        {/* Avatar Grid - Dense and centered */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-5xl mx-auto mb-16 mask-linear-fade">
          {AVATARS.map((avatar, i) => (
             <HoverCard key={i} openDelay={0} closeDelay={100}>
              <HoverCardTrigger asChild>
                <div className="community-avatar cursor-pointer transition-transform hover:scale-110 hover:z-10 relative">
                  <Avatar className="w-10 h-10 md:w-12 md:h-12 border-2 border-background shadow-sm">
                    <AvatarImage src={avatar.img} alt={avatar.name} className="object-cover" />
                    <AvatarFallback className="text-[10px]">{avatar.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-64 p-4 shadow-xl border-border/60 bg-surface/95 backdrop-blur-sm" sideOffset={5}>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={avatar.img} />
                      <AvatarFallback>{avatar.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-primary">{avatar.name}</span>
                      <span className="text-xs text-secondary">{avatar.role}</span>
                    </div>
                  </div>
                  <p className="text-sm text-primary/80 italic leading-relaxed">
                    "{avatar.quote}"
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>

        {/* Text Content */}
        <div className="text-center community-text max-w-3xl px-4">
           <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-primary leading-[1.1] mb-6">
            The platform behind <br/>
            <span className="font-serif italic font-normal text-secondary">thousands of weddings.</span>
           </h2>
            
           <div className="flex gap-4 justify-center mt-8">
             <button className="px-6 py-2.5 rounded-full bg-primary text-background text-sm font-medium hover:bg-primary/90 transition-colors">
               Join Community
             </button>
             <button className="px-6 py-2.5 rounded-full border border-border text-primary text-sm font-medium hover:bg-surface transition-colors">
               Read Success Stories
             </button>
           </div>
        </div>

      </div>
    </section>
  );
}
