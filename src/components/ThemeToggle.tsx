
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
        "relative flex h-8 w-16 items-center rounded-full border p-1 transition-colors duration-300",
        isDark 
          ? "border-zinc-800 bg-zinc-950" 
          : "border-zinc-200 bg-white",
        className
      )}
    >
      <motion.div 
        className="absolute inset-0 flex items-center justify-between px-1.5"
        initial={false}
      >
        <Sun className={cn(
          "h-4 w-4 transition-colors duration-300",
          isDark ? "text-zinc-500" : "text-amber-500"
        )} strokeWidth={1.5} />
        <Moon className={cn(
          "h-4 w-4 transition-colors duration-300",
          isDark ? "text-blue-400" : "text-zinc-400"
        )} strokeWidth={1.5} />
      </motion.div>
      
      <motion.div 
        className="z-10 h-6 w-6 rounded-full bg-gradient-to-br shadow-md"
        animate={{ 
          x: isDark ? 0 : 32,
          backgroundColor: isDark ? "rgb(39, 39, 42)" : "rgb(229, 231, 235)" 
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="flex h-full w-full items-center justify-center"
            >
              <Moon className="h-3.5 w-3.5 text-blue-400" strokeWidth={1.5} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
              className="flex h-full w-full items-center justify-center"
            >
              <Sun className="h-3.5 w-3.5 text-amber-500" strokeWidth={1.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}
