
import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  className?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
}

export function GridPattern({
  width = 40,
  height = 40,
  x = 0,
  y = 0,
  strokeWidth = 1,
  strokeOpacity = 0.1,
  className,
}: GridPatternProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);
  
  const patternVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.02,
      },
    },
  };
  
  const lineVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: {
      opacity: strokeOpacity,
      pathLength: 1,
      transition: { 
        duration: 1.5,
        ease: "easeInOut"
      },
    },
  };
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get mouse position relative to viewport
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      >
        <motion.g
          variants={patternVariants}
          initial="hidden"
          animate={controls}
          style={{
            translateX: mousePosition.x * 0.01,
            translateY: mousePosition.y * 0.01,
          }}
        >
          {/* Horizontal lines */}
          {Array.from({ length: Math.floor(height / 2) }, (_, i) => (
            <motion.line
              key={`h-${i}`}
              variants={lineVariants}
              x1={0}
              y1={i * 2 + y}
              x2={width}
              y2={i * 2 + y}
              strokeLinecap="round"
            />
          ))}
          
          {/* Vertical lines */}
          {Array.from({ length: Math.floor(width / 2) }, (_, i) => (
            <motion.line
              key={`v-${i}`}
              variants={lineVariants}
              x1={i * 2 + x}
              y1={0}
              x2={i * 2 + x}
              y2={height}
              strokeLinecap="round"
            />
          ))}
        </motion.g>
      </svg>
    </div>
  );
}

import { useState } from 'react';
