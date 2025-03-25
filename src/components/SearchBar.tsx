
import { useState, useEffect, useRef } from "react";
import { Search, Send, X, User, Briefcase, Mail, Home, Github, FileText, Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface SearchAction {
  id: string;
  label: string;
  url: string;
  icon: React.ReactNode;
  description?: string;
  shortcut?: string;
  category?: string;
}

const searchActions: SearchAction[] = [
  {
    id: "home",
    label: "Go to Home",
    icon: <Home className="h-4 w-4 text-blue-500" />,
    url: "#home",
    description: "Main page",
    shortcut: "Alt+H",
    category: "Navigation",
  },
  {
    id: "about",
    label: "About Me",
    icon: <User className="h-4 w-4 text-purple-500" />,
    url: "#about",
    description: "Learn more about me",
    shortcut: "Alt+A",
    category: "Navigation",
  },
  {
    id: "projects",
    label: "View Projects",
    icon: <Briefcase className="h-4 w-4 text-green-500" />,
    url: "#projects",
    description: "See my work",
    shortcut: "Alt+P",
    category: "Navigation",
  },
  {
    id: "contact",
    label: "Contact Me",
    icon: <Mail className="h-4 w-4 text-amber-500" />,
    url: "#contact",
    description: "Get in touch",
    shortcut: "Alt+C",
    category: "Navigation",
  },
  {
    id: "github",
    label: "GitHub Profile",
    icon: <Github className="h-4 w-4 text-gray-600" />,
    url: "https://github.com",
    description: "View my repositories",
    category: "External",
  },
  {
    id: "resume",
    label: "Download Resume",
    icon: <FileText className="h-4 w-4 text-red-500" />,
    url: "#",
    description: "PDF format",
    category: "Document",
  },
  {
    id: "linkedin",
    label: "LinkedIn Profile",
    icon: <Linkedin className="h-4 w-4 text-blue-600" />,
    url: "https://linkedin.com",
    description: "Connect with me",
    category: "External",
  }
];

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredActions, setFilteredActions] = useState<SearchAction[]>(searchActions);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  useEffect(() => {
    if (debouncedQuery) {
      const filtered = searchActions.filter(action => 
        action.label.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        (action.description && action.description.toLowerCase().includes(debouncedQuery.toLowerCase())) ||
        (action.category && action.category.toLowerCase().includes(debouncedQuery.toLowerCase()))
      );
      setFilteredActions(filtered);
      setSelectedIndex(0);
    } else {
      setFilteredActions(searchActions);
    }
  }, [debouncedQuery]);
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredActions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && filteredActions.length > 0) {
      e.preventDefault();
      handleActionSelect(filteredActions[selectedIndex]);
    }
  };
  
  const handleActionSelect = (action: SearchAction) => {
    if (action.url.startsWith("#")) {
      window.location.href = action.url;
    } else {
      window.open(action.url, "_blank");
    }
    setIsOpen(false);
    setQuery("");
  };

  const container = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border hover:bg-background/90 transition-all duration-200 shadow-sm"
      >
        <Search className="w-4 h-4" />
        <span className="text-sm">Search...</span>
        <span className="text-xs text-muted-foreground hidden sm:inline-block ml-2 px-2 py-0.5 rounded bg-secondary">⌘K</span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-md z-50 px-4"
              variants={container}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="bg-background border border-border rounded-xl shadow-xl overflow-hidden">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search for anything..."
                    className="w-full py-4 pl-12 pr-12 bg-transparent border-b border-border focus:outline-none"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                    </button>
                  )}
                </div>
                
                <div className="max-h-[300px] overflow-y-auto">
                  {filteredActions.length === 0 ? (
                    <div className="py-10 text-center text-muted-foreground">
                      No results found for "{query}"
                    </div>
                  ) : (
                    <div className="p-2">
                      {filteredActions.map((action, index) => (
                        <motion.div
                          key={action.id}
                          variants={item}
                          onClick={() => handleActionSelect(action)}
                          className={cn(
                            "flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer",
                            selectedIndex === index 
                              ? "bg-primary/10" 
                              : "hover:bg-secondary"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-secondary">
                              {action.icon}
                            </div>
                            <div>
                              <div className="font-medium">{action.label}</div>
                              {action.description && (
                                <div className="text-xs text-muted-foreground">
                                  {action.description}
                                </div>
                              )}
                            </div>
                          </div>
                          {action.shortcut && (
                            <div className="text-xs px-2 py-1 rounded bg-secondary text-muted-foreground">
                              {action.shortcut}
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="p-3 border-t border-border">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Press <kbd className="px-2 py-0.5 rounded bg-secondary">↑</kbd> <kbd className="px-2 py-0.5 rounded bg-secondary">↓</kbd> to navigate</span>
                    <span>Press <kbd className="px-2 py-0.5 rounded bg-secondary">Enter</kbd> to select</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
