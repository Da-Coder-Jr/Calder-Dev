
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NavLogo } from "@/components/NavLogo";
import { Button } from "@/components/ui/button";

interface NavItem {
  name: string;
  url: string;
}

const navItems: NavItem[] = [
  { name: "Home", url: "#home" },
  { name: "About", url: "#about" },
  { name: "Projects", url: "#projects" },
];

const MotionLink = motion.a;

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
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 p-4"
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
              className="absolute right-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"
              onClick={() => setIsMenuOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
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
                    "relative rounded-lg px-8 py-4 text-xl font-medium transition-colors",
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
                      className="absolute -z-10 inset-0 rounded-lg bg-primary/10"
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
                className="flex items-center gap-2 rounded-lg px-8 py-4 text-xl font-medium text-foreground/70 hover:text-primary"
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
      <motion.header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
          scrolled ? "py-2" : "py-4"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 transition-all duration-300",
          scrolled ? "glass-morphism" : ""
        )}>
          <NavLogo />
          
          <div className="flex items-center gap-4">
            {isMobile ? (
              <motion.button
                onClick={() => setIsMenuOpen(true)}
                className="rounded-lg p-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Menu size={24} />
              </motion.button>
            ) : (
              <div className="flex items-center gap-6">
                <nav className="flex items-center gap-1">
                  {navItems.map((item) => (
                    <MotionLink
                      key={item.name}
                      href={item.url}
                      onClick={() => setActiveTab(item.name)}
                      className={cn(
                        "relative px-4 py-2 text-sm font-medium transition-colors",
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
                          className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-primary"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </MotionLink>
                  ))}
                </nav>
                
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-2 border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:scale-105 transition-all duration-300"
                >
                  <motion.a 
                    href="https://github.com/Da-Coder-Jr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2"
                  >
                    <Github size={18} />
                    <span className="font-medium">GitHub</span>
                  </motion.a>
                </Button>
              </div>
            )}
            
            <ThemeToggle />
          </div>
        </div>
      </motion.header>
    </>
  );
}
