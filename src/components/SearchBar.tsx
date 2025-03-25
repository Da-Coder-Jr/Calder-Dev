
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Send } from "lucide-react";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() === "") return;
    
    // Navigate to the section based on the query
    const section = query.toLowerCase();
    if (section.includes("home")) {
      document.querySelector("#home")?.scrollIntoView({ behavior: "smooth" });
    } else if (section.includes("about")) {
      document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
    } else if (section.includes("project")) {
      document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
    } else if (section.includes("contact")) {
      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
    }
    
    // Clear the search
    setQuery("");
    setIsFocused(false);
  };

  return (
    <div className="relative w-full max-w-sm">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search sections..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="w-full px-4 py-2 pl-10 pr-4 text-sm bg-background/50 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4">
            <AnimatePresence mode="wait">
              {query.length > 0 ? (
                <motion.div
                  key="send"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Send className="w-4 h-4 text-primary/60" />
                </motion.div>
              ) : (
                <motion.div
                  key="search"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Search className="w-4 h-4 text-muted-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </form>
      
      <AnimatePresence>
        {isFocused && (
          <motion.div 
            className="absolute top-full mt-2 w-full bg-background border border-border rounded-lg shadow-lg overflow-hidden z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="divide-y divide-border">
              <div 
                className="p-2 text-sm hover:bg-secondary/50 cursor-pointer transition-colors"
                onClick={() => {
                  setQuery("Home");
                  document.querySelector("#home")?.scrollIntoView({ behavior: "smooth" });
                  setIsFocused(false);
                }}
              >
                Home
              </div>
              <div 
                className="p-2 text-sm hover:bg-secondary/50 cursor-pointer transition-colors"
                onClick={() => {
                  setQuery("About");
                  document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
                  setIsFocused(false);
                }}
              >
                About
              </div>
              <div 
                className="p-2 text-sm hover:bg-secondary/50 cursor-pointer transition-colors"
                onClick={() => {
                  setQuery("Projects");
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                  setIsFocused(false);
                }}
              >
                Projects
              </div>
              <div 
                className="p-2 text-sm hover:bg-secondary/50 cursor-pointer transition-colors"
                onClick={() => {
                  setQuery("Contact");
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  setIsFocused(false);
                }}
              >
                Contact
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
