import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const NAV_LINKS = [
  { name: "Planning", href: "/planning" },
  { name: "Vendors", href: "/vendors" },
  { name: "Guests", href: "/guests" },
  { name: "Websites", href: "/websites" },
  { name: "Inspiration", href: "/inspiration" },
  { name: "Shop", href: "/shop" },
];

export function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 px-6 md:px-12 py-4 flex justify-between items-center transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-3" : "bg-transparent py-5"
      }`}
    >
      {/* Logo */}
      <Link href="/">
        <a className="flex items-center gap-2 z-50 group">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
            <div className="w-3 h-3 bg-background rounded-full"></div>
          </div>
          <span className="font-bold text-lg tracking-tight text-primary">
            THE FESTA
          </span>
        </a>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-8 bg-background/50 px-8 py-2.5 rounded-full border border-border/40 backdrop-blur-sm shadow-sm">
        {NAV_LINKS.map((link) => (
          <Link key={link.name} href={link.href}>
            <a className={`text-sm font-medium transition-colors hover:text-primary ${
              location === link.href ? "text-primary" : "text-secondary"
            }`}>
              {link.name}
            </a>
          </Link>
        ))}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 z-50">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-secondary hover:text-primary transition-colors cursor-pointer p-2 rounded-full hover:bg-primary/5"
          aria-label="Toggle theme"
        >
          {mounted && theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
                <a className="text-sm font-medium text-primary hover:text-primary/80 transition-colors px-4 py-2">
                    Log In
                </a>
            </Link>
            <Link href="/signup">
                <a className="text-sm font-semibold bg-primary text-background px-5 py-2.5 rounded-full hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/20">
                    Get Started
                </a>
            </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden menu-btn group flex flex-col gap-[5px] w-8 items-end cursor-pointer p-1"
          aria-label="Menu"
        >
          <span className="w-full h-[2px] bg-primary transition-all duration-300 group-hover:w-3/4 rounded-full"></span>
          <span className="w-2/3 h-[2px] bg-primary transition-all duration-300 group-hover:w-full rounded-full"></span>
        </button>
      </div>
    </nav>
  );
}
