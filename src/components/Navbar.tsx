
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Menu, X } from "lucide-react";
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
      {/* Mobile menu button */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 bg-background/80 backdrop-blur-md rounded-full shadow-md border border-border"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMobile && (
        <motion.div
          className={`fixed inset-0 z-40 bg-background/90 backdrop-blur-md flex-col items-center justify-center gap-8 p-4 ${isMenuOpen ? 'flex' : 'hidden'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ThemeToggle className="mb-4" />
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.url}
              onClick={() => {
                setActiveTab(item.name);
                setIsMenuOpen(false);
              }}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                activeTab === item.name 
                  ? "bg-primary/10 text-primary" 
                  : "text-foreground/70 hover:text-primary hover:bg-primary/5"
              )}
            >
              <span>{item.name}</span>
            </a>
          ))}
          <a 
            href="https://github.com/Da-Coder-Jr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 rounded-lg text-foreground/70 hover:text-primary hover:bg-primary/5"
          >
            <Github size={20} />
            <span>GitHub</span>
          </a>
        </motion.div>
      )}
      
      {/* Desktop navbar - simplified like the reference */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "py-2 bg-background/80 backdrop-blur-md shadow-sm" : "py-4"
        )}
      >
        <div className="container max-w-6xl mx-auto flex items-center justify-between">
          <a href="#home" className="text-xl font-semibold flex items-center gap-2">
            <span className="text-primary">Calder's</span>
            <span>Portfolio</span>
          </a>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  onClick={() => setActiveTab(item.name)}
                  className={cn(
                    "relative text-sm font-medium transition-colors",
                    activeTab === item.name 
                      ? "text-primary" 
                      : "text-foreground/80 hover:text-primary"
                  )}
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
                </a>
              ))}
              <a 
                href="https://github.com/Da-Coder-Jr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <Github size={18} />
                <span>GitHub</span>
              </a>
            </div>
            
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}
