
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/AuroraBackground";
import { GridPattern } from "@/components/GridPattern";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <AuroraBackground showRadialGradient={true}>
      <motion.section 
        className="min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <GridPattern className="fixed inset-0 -z-10 opacity-10" />
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full sm:w-10/12 md:w-8/12 text-center">
              <div
                className="bg-[url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)] 
                           h-[250px] sm:h-[350px] md:h-[400px] bg-center bg-no-repeat bg-contain"
                aria-hidden="true"
              >
                <motion.h1 
                  className="text-center text-6xl sm:text-7xl md:text-8xl pt-6 sm:pt-8 font-bold"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  404
                </motion.h1>
              </div>

              <motion.div 
                className="mt-[-50px]"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                  Looks like you're lost
                </h3>
                <p className="mb-6 sm:mb-5 text-muted-foreground">
                  The page you are looking for is not available!
                </p>

                <Button
                  variant="default"
                  onClick={() => navigate("/")}
                  className="my-5 bg-gradient-to-br from-primary via-primary/90 to-primary/80 hover:opacity-90"
                  size="lg"
                >
                  Go to Home
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </AuroraBackground>
  );
};

export default NotFound;
