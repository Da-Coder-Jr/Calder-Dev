
import { motion } from "framer-motion";
import { useState, useEffect, useId } from "react";
import { cn } from "@/lib/utils";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container } from "@tsparticles/engine";

interface NavLogoProps {
  className?: string;
}

export function NavLogo({ className }: NavLogoProps) {
  const [init, setInit] = useState(false);
  const uniqueId = useId();
  
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container) => {
    console.log("Particles loaded");
  };

  return (
    <div className={cn("relative flex items-center", className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex items-center gap-2 py-2"
      >
        <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-xl font-bold text-transparent">
          Calder's
        </span>
        <span className="text-xl font-bold">Portfolio</span>
      </motion.div>
      
      <div className="absolute inset-0 -z-10">
        {init && (
          <Particles
            id={uniqueId}
            className="h-full w-full"
            particlesLoaded={particlesLoaded}
            options={{
              fullScreen: {
                enable: false,
                zIndex: 0
              },
              background: {
                color: {
                  value: "transparent",
                },
              },
              fpsLimit: 120,
              particles: {
                color: {
                  value: "#ffffff",
                },
                links: {
                  color: "#ffffff",
                  distance: 150,
                  enable: true,
                  opacity: 0.5,
                  width: 1,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: {
                    default: "bounce",
                  },
                  random: false,
                  speed: 2,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    value_area: 800, // Fix: changed 'area' to 'value_area'
                  },
                  value: 30,
                },
                opacity: {
                  value: 0.5,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: { min: 1, max: 3 },
                },
              },
              detectRetina: true,
            }}
          />
        )}
      </div>
    </div>
  );
}
