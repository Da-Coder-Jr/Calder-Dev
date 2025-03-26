
import { motion } from "framer-motion";
import { Particles } from "./Particles";
import { cn } from "@/lib/utils";

interface ParticleLogoProps {
  className?: string;
}

export function ParticleLogo({ className }: ParticleLogoProps) {
  return (
    <div className={cn("relative flex items-center", className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex items-center gap-2"
      >
        <span className="text-gradient text-xl font-bold">Calder's</span>
        <span className="text-xl font-bold">Portfolio</span>
      </motion.div>
      <Particles
        className="absolute inset-0 -z-10"
        quantity={40}
        staticity={30}
        ease={60}
        size={0.8}
      />
    </div>
  );
}
