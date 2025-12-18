import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <nav className="fixed top-0 w-full z-50 px-[5vw] py-5 flex justify-between items-center glass-nav transition-colors duration-300">
      <div className="flex items-center gap-2 z-50">
        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-background rounded-full"></div>
        </div>
        <span className="font-semibold text-sm tracking-tight text-primary">
          CHRONICLE
        </span>
      </div>

      <div className="flex items-center gap-6 z-50">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-secondary hover:text-primary transition-colors cursor-pointer p-2"
          aria-label="Toggle theme"
        >
          {mounted && theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <a href="#download" className="hidden md:block text-xs font-medium text-secondary hover:text-primary transition-colors">
          Get the App
        </a>
        <button 
          onClick={onMenuClick}
          className="menu-btn group flex flex-col gap-[5px] w-8 items-end cursor-pointer"
          aria-label="Menu"
        >
          <span className="w-full h-[1.5px] bg-primary transition-all duration-300 group-hover:w-3/4"></span>
          <span className="w-2/3 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full"></span>
        </button>
      </div>
    </nav>
  );
}
