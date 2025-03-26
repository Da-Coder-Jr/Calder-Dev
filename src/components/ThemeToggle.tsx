
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      className={cn(
        "relative overflow-hidden flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300",
        isDark ? "bg-gradient-to-br from-indigo-900 to-purple-900" : "bg-gradient-to-br from-amber-300 to-yellow-500",
        className
      )}
    >
      <div className="absolute inset-0 backdrop-blur-sm bg-white/10 rounded-full" />
      
      <div className="relative z-10 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Moon className="w-6 h-6 text-yellow-300" strokeWidth={1.5} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Sun className="w-6 h-6 text-amber-500" strokeWidth={1.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Background stars for dark mode */}
      {isDark && (
        <>
          <motion.div 
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0], x: [-5, -8], y: [-5, -8] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            style={{ top: "25%", left: "25%" }}
          />
          <motion.div 
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0], x: [5, 8], y: [5, 8] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
            style={{ bottom: "30%", right: "30%" }}
          />
          <motion.div 
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: 1 }}
            style={{ top: "40%", right: "25%" }}
          />
        </>
      )}
      
      {/* Background clouds for light mode */}
      {!isDark && (
        <>
          <motion.div 
            className="absolute w-6 h-3 bg-white/70 rounded-full"
            animate={{ x: [0, 2, 0], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            style={{ top: "30%", left: "15%" }}
          />
          <motion.div 
            className="absolute w-4 h-2 bg-white/70 rounded-full"
            animate={{ x: [0, -2, 0], opacity: [0.6, 0.8, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
            style={{ bottom: "25%", right: "20%" }}
          />
        </>
      )}
    </motion.button>
  );
}
