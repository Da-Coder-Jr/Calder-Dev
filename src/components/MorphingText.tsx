
import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MorphingTextProps {
  className?: string;
  texts: string[];
}

export function MorphingText({ texts, className }: MorphingTextProps) {
  const [currentIndex, setCurrentIndex] = useRef(0);
  const [displayText, setDisplayText] = useRef(texts[0]);
  const [isAnimating, setIsAnimating] = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const animate = useCallback(() => {
    if (isAnimating.current) return;
    
    isAnimating.current = true;
    const nextIndex = (currentIndex.current + 1) % texts.length;
    
    // Update state values
    currentIndex.current = nextIndex;
    setDisplayText.current = texts[nextIndex];
    
    // Reset animation flag after animation completes
    setTimeout(() => {
      isAnimating.current = false;
    }, 2000); // Match this with the animation duration
  }, [texts]);

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
  }, [animate]);

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
      <motion.div
        key={currentIndex.current}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        className="absolute inset-0 flex items-center justify-center"
      >
        {texts[currentIndex.current]}
      </motion.div>
    </div>
  );
}
