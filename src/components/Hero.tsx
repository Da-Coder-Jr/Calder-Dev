
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
    <section id="home" className="relative flex min-h-screen flex-col justify-center overflow-hidden pb-10 pt-20">
      {/* Background gradient effects */}
      <div className="absolute -z-10 h-full w-full opacity-30">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-300 opacity-70 mix-blend-multiply filter blur-3xl dark:bg-purple-800 dark:mix-blend-lighten" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-1/3 right-1/4 h-80 w-80 animate-pulse rounded-full bg-yellow-300 opacity-70 mix-blend-multiply filter blur-3xl dark:bg-yellow-700 dark:mix-blend-lighten" style={{ animationDuration: '10s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 h-72 w-72 animate-pulse rounded-full bg-pink-300 opacity-70 mix-blend-multiply filter blur-3xl dark:bg-pink-800 dark:mix-blend-lighten" style={{ animationDuration: '12s' }}></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="mb-4 inline-block rounded-full border border-border bg-background/50 px-4 py-1 text-sm font-medium text-primary backdrop-blur-sm">Welcome to my portfolio</span>
          </motion.div>

          <div className="flex flex-col items-center gap-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl"
            >
              <div className="mb-3 flex items-center justify-center gap-4">
                <span>Hi, I'm</span>
                <span className="relative">
                  <span className="relative z-10 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">Calder</span>
                  <span className="absolute bottom-1 left-0 -z-0 h-3 w-full transform -rotate-1 bg-primary/20"></span>
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
                className="h-20 md:h-24"
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
      </div>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <motion.a
          href="#about"
          className="flex h-14 w-10 items-start justify-center rounded-full border-2 border-primary p-1"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            className="h-3 w-1.5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-primary"
          />
        </motion.a>
      </div>
    </section>
  );
}
