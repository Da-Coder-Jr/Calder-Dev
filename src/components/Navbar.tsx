
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

interface NavItem {
  name: string;
  url: string;
}

const navItems: NavItem[] = [
  { name: "Home", url: "#home" },
  { name: "About", url: "#about" },
];

export function Navbar() {
  const [activeTab, setActiveTab] = useState(navItems[0].name);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleResize();
    handleScroll();
    
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const matchingItem = navItems.find(item => item.url === `#${id}`);
          if (matchingItem) {
            setActiveTab(matchingItem.name);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
      rootMargin: "-100px 0px",
    });

    navItems.forEach(item => {
      const element = document.querySelector(item.url);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Mobile menu */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 p-4"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(15px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-background/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            <motion.button
              className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary"
              onClick={() => setIsMenuOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
            
            <div className="z-50 flex flex-col items-center gap-6">
              <ThemeToggle className="mb-4" />
              
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.url}
                  onClick={() => {
                    setActiveTab(item.name);
                    setIsMenuOpen(false);
                  }}
                  className={cn(
                    "relative px-8 py-4 text-xl font-medium rounded-lg transition-colors",
                    activeTab === item.name 
                      ? "text-primary" 
                      : "text-foreground/70 hover:text-primary"
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.1 * i }}
                >
                  {activeTab === item.name && (
                    <motion.div
                      className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                      layoutId="mobileNavIndicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  {item.name}
                </motion.a>
              ))}
              
              <motion.a 
                href="https://github.com/Da-Coder-Jr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 text-xl font-medium rounded-lg text-foreground/70 hover:text-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={24} />
                <span>GitHub</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Desktop navbar */}
      <motion.div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "py-2" : "py-4"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className={cn(
          "container max-w-6xl mx-auto px-4 flex items-center justify-between rounded-full transition-all duration-300",
          scrolled ? "glass-morphism" : ""
        )}>
          <motion.a 
            href="#home" 
            className="text-xl font-bold flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-gradient">Calder's</span>
            <span>Portfolio</span>
          </motion.a>
          
          <div className="flex items-center gap-4">
            {isMobile ? (
              <motion.button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 rounded-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            ) : (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-6">
                  {navItems.map((item) => (
                    <motion.a
                      key={item.name}
                      href={item.url}
                      onClick={() => setActiveTab(item.name)}
                      className={cn(
                        "relative px-3 py-2 text-sm font-medium transition-colors",
                        activeTab === item.name 
                          ? "text-primary" 
                          : "text-foreground/80 hover:text-primary"
                      )}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                      {activeTab === item.name && (
                        <motion.div
                          layoutId="navIndicator"
                          className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </motion.a>
                  ))}
                </div>
                
                <motion.a 
                  href="https://github.com/Da-Coder-Jr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={18} />
                  <span className="font-medium">GitHub</span>
                </motion.a>
              </div>
            )}
            
            <ThemeToggle />
          </div>
        </div>
      </motion.div>
    </>
  );
}
