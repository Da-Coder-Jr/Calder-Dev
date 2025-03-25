
import { motion } from "framer-motion";
import { Code, Paintbrush, Lightbulb, Rocket } from "lucide-react";

export function AboutSection() {
  const skills = [
    "JavaScript", "TypeScript", "React", "Next.js", 
    "Node.js", "HTML/CSS", "Tailwind CSS", "Framer Motion",
    "Git", "UI/UX Design"
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
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
              <span className="inline-block py-1 px-3 text-sm font-medium bg-primary/10 text-primary rounded-full">About Me</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Who I Am
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-2xl mx-auto"
            >
              <p className="text-lg text-muted-foreground">
                I'm Calder, a passionate developer with a love for creating beautiful, functional digital experiences.
              </p>
            </motion.div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="relative bg-gradient-to-br from-primary/10 via-secondary/20 to-primary/5 rounded-2xl p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Code className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Clean Code</h4>
                      <p className="text-sm text-muted-foreground">I write maintainable, efficient code</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Paintbrush className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Creative Design</h4>
                      <p className="text-sm text-muted-foreground">I craft beautiful user interfaces</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Problem Solving</h4>
                      <p className="text-sm text-muted-foreground">I find creative solutions to challenges</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Rocket className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Continuous Learning</h4>
                      <p className="text-sm text-muted-foreground">I'm always expanding my skills</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/5 rounded-2xl -z-10"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/5 rounded-2xl -z-10"></div>
              </div>
            </motion.div>
            
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h3 className="text-2xl font-bold mb-4">My Journey</h3>
                <p className="text-muted-foreground mb-6">
                  As a web developer, I focus on creating intuitive and engaging user experiences.
                  I'm passionate about both frontend and backend development, constantly exploring
                  new technologies and approaches to build better digital solutions.
                </p>
                <p className="text-muted-foreground">
                  When I'm not coding, you can find me learning about new technologies,
                  contributing to open source projects, or exploring creative design ideas.
                  Feel free to check out my <a href="https://github.com/Da-Coder-Jr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub</a> for 
                  my latest projects and contributions.
                </p>
              </motion.div>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-20"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">Skills & Technologies</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="px-4 py-2 bg-secondary rounded-full text-sm"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
