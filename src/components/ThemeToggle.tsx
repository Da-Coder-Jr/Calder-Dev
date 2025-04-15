
"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);
  
  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // First check localStorage
    const savedTheme = localStorage.getItem('theme');
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    let initialIsDark = false;
    
    if (savedTheme === 'dark') {
      initialIsDark = true;
    } else if (savedTheme === 'light') {
      initialIsDark = false;
    } else {
      // If no saved preference, use system preference
      initialIsDark = darkModeMediaQuery.matches;
    }
    
    setIsDark(initialIsDark);
    
    // Apply the theme immediately on component mount
    if (initialIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Listen for changes in the system preference
    const handler = (e: MediaQueryListEvent) => {
      // Only update if user hasn't set a preference
      if (!localStorage.getItem('theme')) {
        setIsDark(e.matches);
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };
    
    darkModeMediaQuery.addEventListener('change', handler);
    return () => darkModeMediaQuery.removeEventListener('change', handler);
  }, []);
  
  // Toggle theme function
  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <motion.div
      className={cn(
        "flex w-16 h-8 p-1 rounded-full cursor-pointer transition-colors",
        isDark 
          ? "bg-[#221F26] border border-[#403E43]" 
          : "bg-[#F5F5F7] border border-[#E0E0E5]",
        className
      )}
      onClick={toggleTheme}
      role="button"
      tabIndex={0}
      whileTap={{ scale: 0.95 }}
      initial={false}
    >
      <div className="flex justify-between items-center w-full">
        <motion.div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full",
          )}
          animate={{
            backgroundColor: isDark ? "#403E43" : "#FFFFFF",
            x: isDark ? 0 : 32
          }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 30 
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.div
                key="moon-icon"
                initial={{ opacity: 0, rotateZ: -90 }}
                animate={{ opacity: 1, rotateZ: 0 }}
                exit={{ opacity: 0, rotateZ: 90 }}
                transition={{ duration: 0.2 }}
              >
                <Moon 
                  className="w-4 h-4 text-[#D6BCFA]" 
                  strokeWidth={1.5}
                />
              </motion.div>
            ) : (
              <motion.div
                key="sun-icon"
                initial={{ opacity: 0, rotateZ: 90 }}
                animate={{ opacity: 1, rotateZ: 0 }}
                exit={{ opacity: 0, rotateZ: -90 }}
                transition={{ duration: 0.2 }}
              >
                <Sun 
                  className="w-4 h-4 text-[#33C3F0]" 
                  strokeWidth={1.5}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Fixed icons on the track */}
        <div className={cn(
          "flex justify-center items-center w-6 h-6 rounded-full transition-opacity duration-300",
          isDark ? "opacity-70" : "opacity-0"
        )}>
          <Sun 
            className="w-4 h-4 text-[#9F9EA1]" 
            strokeWidth={1.5}
          />
        </div>
        
        <div className={cn(
          "flex justify-center items-center w-6 h-6 rounded-full transition-opacity duration-300",
          !isDark ? "opacity-70" : "opacity-0"
        )}>
          <Moon 
            className="w-4 h-4 text-[#888888]" 
            strokeWidth={1.5}
          />
        </div>
      </div>
    </motion.div>
  );
}
