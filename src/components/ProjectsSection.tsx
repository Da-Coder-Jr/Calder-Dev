
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Portfolio Website",
    description: "A personal portfolio website showcasing my skills and projects built with React and Tailwind CSS.",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/Da-Coder-Jr"
  },
  {
    title: "Web Development Projects",
    description: "Various web development projects featuring modern UI/UX design principles and responsive layouts.",
    tags: ["JavaScript", "HTML/CSS", "Responsive Design"],
    github: "https://github.com/Da-Coder-Jr"
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
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group relative rounded-2xl overflow-hidden bg-card border border-border h-full flex flex-col hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-secondary rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 py-2 px-4 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors text-sm"
                      >
                        <Github className="w-4 h-4" />
                        <span>View on GitHub</span>
                      </a>
                    )}
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
              href="https://github.com/Da-Coder-Jr"
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
