
import { Github } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-10 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-xl font-semibold mb-2 flex items-center gap-2">
              <span className="text-primary">Calder's</span>
              <span>Portfolio</span>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Designing and developing experiences that make people's lives simple.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Da-Coder-Jr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/10 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-border/50 flex justify-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Calder's Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
