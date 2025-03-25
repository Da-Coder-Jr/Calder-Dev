
import { motion } from "framer-motion";
import { SearchBar } from "./SearchBar";

export function Hero() {
  return (
    <section id="home" className="min-h-screen pt-20 pb-10 flex flex-col justify-center relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-yellow-300 dark:bg-yellow-700 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-300 dark:bg-pink-800 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 animate-pulse" style={{ animationDuration: '12s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-block py-1 px-3 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full">Welcome to my portfolio</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            <span className="text-gradient">Hi, I'm </span>
            <span className="relative inline-block">
              <span className="relative z-10">Alex</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/20 -z-0 transform -rotate-1"></span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 leading-relaxed"
          >
            I design and develop experiences that make people's lives simple.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#contact"
              className="px-8 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg hover-scale"
            >
              Contact Me
            </a>
            
            <SearchBar />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 max-w-4xl mx-auto bg-background/50 dark:bg-background/30 backdrop-blur-lg border border-border rounded-3xl p-6 shadow-xl"
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
