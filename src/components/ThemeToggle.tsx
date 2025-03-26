
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Toggle } from "@/components/ui/toggle";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);
  
  // Check the system preference on initial load
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const initialIsDark = darkModeMediaQuery.matches || document.documentElement.classList.contains('dark');
    setIsDark(initialIsDark);
    
    // Apply the class immediately on component mount
    if (initialIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Listen for changes in the system preference
    const handler = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    
    darkModeMediaQuery.addEventListener('change', handler);
    return () => darkModeMediaQuery.removeEventListener('change', handler);
  }, []);
  
  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <Toggle 
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "rounded-full w-10 h-10 p-0 transition-colors border-none",
        isDark ? "bg-zinc-800 hover:bg-zinc-700" : "bg-zinc-100 hover:bg-zinc-200",
        className
      )}
      onClick={toggleTheme}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: isDark ? 0 : 180,
          scale: [0.8, 1] 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-yellow-300" strokeWidth={1.5} />
        ) : (
          <Sun className="w-5 h-5 text-amber-500" strokeWidth={1.5} />
        )}
      </motion.div>
    </Toggle>
  );
}
