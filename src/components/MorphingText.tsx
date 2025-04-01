
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface MorphingTextProps {
  className?: string;
  texts: string[];
  interval?: number;
}

export function MorphingText({ texts, className, interval = 3000 }: MorphingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        
        // Reset animation flag after animation completes
        setTimeout(() => {
          setIsAnimating(false);
        }, 1000); // Animation duration
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [texts.length, interval, isAnimating]);

  const variants = {
    enter: {
      y: 20,
      opacity: 0,
      filter: "blur(8px)",
    },
    center: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      filter: "blur(8px)",
      transition: {
        duration: 0.5,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
      },
    }),
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
          <div className="flex overflow-hidden">
            {texts[currentIndex].split("").map((char, i) => (
              <motion.span
                key={`${currentIndex}-${i}`}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
