
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
    <div
      className={cn(
        "flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300",
        isDark 
          ? "bg-zinc-950 border border-zinc-800" 
          : "bg-white border border-zinc-200",
        className
      )}
      onClick={toggleTheme}
      role="button"
      tabIndex={0}
    >
      <div className="flex justify-between items-center w-full">
        <motion.div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full",
          )}
          animate={{
            backgroundColor: isDark ? "rgb(39, 39, 42)" : "rgb(229, 231, 235)",
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
                  className="w-4 h-4 text-white" 
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
                  className="w-4 h-4 text-gray-700" 
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
            className="w-4 h-4 text-gray-500" 
            strokeWidth={1.5}
          />
        </div>
        
        <div className={cn(
          "flex justify-center items-center w-6 h-6 rounded-full transition-opacity duration-300",
          !isDark ? "opacity-70" : "opacity-0"
        )}>
          <Moon 
            className="w-4 h-4 text-gray-600" 
            strokeWidth={1.5}
          />
        </div>
      </div>
    </div>
  );
}
