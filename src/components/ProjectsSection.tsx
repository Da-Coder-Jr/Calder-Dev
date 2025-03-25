
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    title: "Portfolio Website",
    description: "A personal portfolio website showcasing my projects and skills. Built with React and Tailwind CSS.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com",
    demo: "https://example.com"
  },
  {
    title: "E-commerce Platform",
    description: "A full-featured online store with product listings, cart functionality, and payment processing.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1015&auto=format&fit=crop",
    tags: ["Next.js", "TypeScript", "Stripe"],
    github: "https://github.com",
    demo: "https://example.com"
  },
  {
    title: "Task Management App",
    description: "A productivity application for managing tasks, projects, and deadlines with a clean interface.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1039&auto=format&fit=crop",
    tags: ["React", "Redux", "Node.js"],
    github: "https://github.com",
    demo: "https://example.com"
  }
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-2"
            >
              <span className="inline-block py-1 px-3 text-sm font-medium bg-primary/10 text-primary rounded-full">My Work</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Featured Projects
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-2xl mx-auto"
            >
              <p className="text-lg text-muted-foreground">
                Here are some of the projects I've worked on. Each project represents different skills and challenges.
              </p>
            </motion.div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group relative rounded-2xl overflow-hidden bg-card border border-border h-full flex flex-col hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="flex gap-3">
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.demo && (
                        <a 
                          href={project.demo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-secondary rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-card border border-border hover:bg-card/80 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>View More Projects on GitHub</span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
