
import { motion, useAnimation } from "framer-motion";
import { RainbowButton } from "./RainbowButton";
import { MorphingText } from "./MorphingText";
import { useEffect } from "react";

export function Hero() {
  const waveControls = useAnimation();
  
  useEffect(() => {
    // Start the waving animation
    const waveAnimation = async () => {
      while (true) {
        await waveControls.start({
          rotate: [0, 15, 0, 15, 0],
          transition: { duration: 1.5, repeat: 1, repeatDelay: 1 }
        });
        await new Promise(resolve => setTimeout(resolve, 4000));
      }
    };
    
    waveAnimation();
  }, [waveControls]);

  return (
    <section id="home" className="min-h-screen pt-20 pb-10 flex flex-col justify-center relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-yellow-300 dark:bg-yellow-700 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-300 dark:bg-pink-800 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 animate-pulse" style={{ animationDuration: '12s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-block py-1 px-4 mb-4 text-sm font-medium bg-background/50 border border-border backdrop-blur-sm text-primary rounded-full">Welcome to my portfolio</span>
          </motion.div>

          <div className="flex flex-col items-center gap-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight"
            >
              <div className="mb-3 flex items-center justify-center gap-4">
                <span>Hi, I'm</span>
                <span className="relative">
                  <span className="relative z-10 text-gradient">Calder</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/20 -z-0 transform -rotate-1"></span>
                </span>
                <motion.span
                  className="inline-block origin-bottom-right"
                  animate={waveControls}
                  style={{ originX: 0.7, originY: 0.7 }}
                >
                  👋
                </motion.span>
              </div>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8 w-full"
            >
              <MorphingText 
                texts={[
                  "I design amazing experiences",
                  "I build creative websites",
                  "I craft digital solutions",
                  "I turn ideas into reality"
                ]} 
                className="text-2xl md:text-4xl h-16 md:h-20"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex justify-center"
            >
              <RainbowButton
                onClick={() => window.open('https://github.com/Da-Coder-Jr', '_blank')}
              >
                View My GitHub
              </RainbowButton>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-24 max-w-4xl mx-auto bg-background/40 dark:bg-background/20 backdrop-blur-lg border border-border rounded-3xl p-6 shadow-xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">5+</h3>
              <p className="text-sm text-muted-foreground">Years Experience</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">50+</h3>
              <p className="text-sm text-muted-foreground">Projects Completed</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">20+</h3>
              <p className="text-sm text-muted-foreground">Happy Clients</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">∞</h3>
              <p className="text-sm text-muted-foreground">Coffee Consumed</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <a
          href="#about"
          className="w-8 h-12 border-2 border-primary rounded-full flex items-start justify-center p-1 hover-scale"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            className="w-1 h-2 bg-primary rounded-full"
          />
        </a>
      </div>
    </section>
  );
}
