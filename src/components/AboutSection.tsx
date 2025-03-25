
import { motion } from "framer-motion";
import { Code, Paintbrush, Lightbulb, Rocket } from "lucide-react";

export function AboutSection() {
  const skills = [
    "JavaScript", "TypeScript", "React", "Next.js", 
    "Node.js", "HTML/CSS", "Tailwind CSS", "GraphQL",
    "SQL", "MongoDB", "Git", "AWS"
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
                I'm a passionate developer with a love for creating beautiful, functional digital experiences.
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
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                  <img 
                    src="/lovable-uploads/e120232b-9cb4-4910-8b0a-4e4bd8515cc1.png" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10"></div>
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
                  With over 5 years of experience in web development, I've worked on a variety of projects 
                  ranging from small business websites to complex enterprise applications. My approach combines 
                  technical expertise with an eye for design, ensuring that the end product is not only functional 
                  but also visually appealing and user-friendly.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="p-4 rounded-xl bg-card border border-border">
                  <Code className="w-8 h-8 text-primary mb-3" />
                  <h4 className="font-medium mb-1">Development</h4>
                  <p className="text-sm text-muted-foreground">Building robust web applications</p>
                </div>
                
                <div className="p-4 rounded-xl bg-card border border-border">
                  <Paintbrush className="w-8 h-8 text-primary mb-3" />
                  <h4 className="font-medium mb-1">Design</h4>
                  <p className="text-sm text-muted-foreground">Creating beautiful interfaces</p>
                </div>
                
                <div className="p-4 rounded-xl bg-card border border-border">
                  <Lightbulb className="w-8 h-8 text-primary mb-3" />
                  <h4 className="font-medium mb-1">Innovation</h4>
                  <p className="text-sm text-muted-foreground">Finding creative solutions</p>
                </div>
                
                <div className="p-4 rounded-xl bg-card border border-border">
                  <Rocket className="w-8 h-8 text-primary mb-3" />
                  <h4 className="font-medium mb-1">Growth</h4>
                  <p className="text-sm text-muted-foreground">Always learning new technologies</p>
                </div>
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
