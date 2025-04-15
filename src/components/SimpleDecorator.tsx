
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SimpleDecoratorProps {
  className?: string;
  variant?: 'dot' | 'line' | 'corner';
  color?: string;
  animate?: boolean;
}

export function SimpleDecorator({
  className,
  variant = 'dot',
  color = 'currentColor',
  animate = true,
}: SimpleDecoratorProps) {
  const variants = {
    dot: (
      <div className={cn("relative flex items-center justify-center", className)}>
        <motion.div
          initial={animate ? { scale: 0 } : { scale: 1 }}
          animate={animate ? { scale: [0, 1.2, 1] } : undefined}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-2 w-2 rounded-full bg-primary"
        />
        <motion.div
          initial={animate ? { scale: 0, opacity: 0.5 } : { scale: 1, opacity: 0.5 }}
          animate={animate ? { scale: [0, 1], opacity: [0.5, 0] } : undefined}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute h-4 w-4 rounded-full bg-primary"
        />
      </div>
    ),
    line: (
      <motion.div
        initial={animate ? { scaleX: 0 } : { scaleX: 1 }}
        animate={animate ? { scaleX: 1 } : undefined}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn("h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20", className)}
        style={{ originX: 0 }}
      />
    ),
    corner: (
      <div className={cn("relative", className)}>
        <motion.div
          initial={animate ? { height: 0 } : { height: '100%' }}
          animate={animate ? { height: '100%' } : undefined}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute left-0 top-0 w-0.5 bg-primary"
        />
        <motion.div
          initial={animate ? { width: 0 } : { width: '100%' }}
          animate={animate ? { width: '100%' } : undefined}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          className="absolute left-0 top-0 h-0.5 bg-primary"
          style={{ originX: 0 }}
        />
      </div>
    ),
  };

  return variants[variant];
}
