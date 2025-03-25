
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
    <motion.button
      className={cn(
        "flex w-10 h-10 rounded-full cursor-pointer justify-center items-center",
        isDark 
          ? "bg-zinc-800" 
          : "bg-zinc-100",
        className
      )}
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      role="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      tabIndex={0}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-white" strokeWidth={1.5} />
        ) : (
          <Sun className="w-5 h-5 text-zinc-700" strokeWidth={1.5} />
        )}
      </motion.div>
    </motion.button>
  );
}
