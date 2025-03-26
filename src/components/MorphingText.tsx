
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface MorphingTextProps {
  className?: string;
  texts: string[];
}

export function MorphingText({ texts, className }: MorphingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const animate = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const nextIndex = (currentIndex + 1) % texts.length;
    setCurrentIndex(nextIndex);
    
    // Reset animation flag after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 2000); // Match this with the animation duration
  };

  useEffect(() => {
    // Start animation cycle
    intervalRef.current = setInterval(() => {
      animate();
    }, 3000); // Time between animations
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, texts.length, isAnimating]);

  const variants = {
    enter: {
      y: 20,
      opacity: 0,
    },
    center: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className={cn(
      "relative flex h-20 w-full items-center justify-center overflow-hidden text-center font-sans text-3xl md:h-24 md:text-4xl",
      className
    )}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 flex items-center justify-center"
        >
          {texts[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
