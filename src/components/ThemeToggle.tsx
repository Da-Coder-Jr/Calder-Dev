
"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Stars } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
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

  // Particles for the dark mode only
  const particles = Array(10).fill(null);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      className={cn(
        "relative flex h-10 w-20 items-center overflow-hidden rounded-full border p-1 transition-colors duration-500",
        isDark 
          ? "border-zinc-700 bg-gradient-to-br from-zinc-900 to-zinc-800" 
          : "border-zinc-200 bg-gradient-to-br from-sky-100 to-white",
        className
      )}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        {isDark && (
          <AnimatePresence>
            {particles.map((_, i) => (
              <motion.div
                key={`star-${i}`}
                initial={{ 
                  opacity: 0,
                  scale: 0,
                  x: Math.random() * 20 - 10, 
                  y: Math.random() * 20 - 10
                }}
                animate={{ 
                  opacity: Math.random() * 0.7 + 0.3,
                  scale: Math.random() * 0.5 + 0.5,
                  x: Math.random() * 20 - 10,
                  y: Math.random() * 20 - 10
                }}
                transition={{
                  duration: Math.random() * 2 + 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${Math.max(1, Math.random() * 3)}px`,
                  height: `${Math.max(1, Math.random() * 3)}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </AnimatePresence>
        )}
        
        {!isDark && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-0 right-0 h-32 w-32 translate-x-12 translate-y-[-50%] rounded-full bg-yellow-300 blur-md"
          />
        )}
      </div>

      {/* Icons container */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-between px-2"
        initial={false}
      >
        <motion.div
          animate={{ 
            scale: !isDark ? 1 : 0.7,
            opacity: !isDark ? 1 : 0.5
          }}
          transition={{ duration: 0.4 }}
        >
          <Sun 
            className={cn(
              "h-5 w-5 transition-colors duration-300",
              isDark ? "text-zinc-500" : "text-yellow-500 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
            )} 
            strokeWidth={1.5}
          />
        </motion.div>
        
        <motion.div
          animate={{ 
            scale: isDark ? 1 : 0.7,
            opacity: isDark ? 1 : 0.5
          }}
          transition={{ duration: 0.4 }}
        >
          <Moon 
            className={cn(
              "h-5 w-5 transition-colors duration-300",
              isDark ? "text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" : "text-zinc-400"
            )} 
            strokeWidth={1.5}
          />
        </motion.div>
      </motion.div>
      
      {/* Sliding Indicator */}
      <motion.div 
        className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full shadow-lg"
        animate={{ 
          x: isDark ? "calc(100% - 2px)" : "0%",
          backgroundColor: isDark ? "rgb(30, 41, 59)" : "rgb(255, 255, 255)",
          boxShadow: isDark 
            ? "0 0 10px 2px rgba(96,165,250,0.3), inset 0 0 6px rgba(96,165,250,0.5)" 
            : "0 0 10px 2px rgba(250,204,21,0.3), inset 0 0 6px rgba(250,204,21,0.3)"
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
              key="moon"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.3 }}
              className="flex h-full w-full items-center justify-center"
            >
              <Stars className="h-4 w-4 text-blue-400" strokeWidth={1.5} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
              transition={{ duration: 0.3 }}
              className="flex h-full w-full items-center justify-center"
            >
              <Sun className="h-4 w-4 text-yellow-500" strokeWidth={1.5} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ripple effect on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className={cn(
                "absolute inset-0 rounded-full",
                isDark ? "bg-blue-400" : "bg-yellow-400"
              )}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}
