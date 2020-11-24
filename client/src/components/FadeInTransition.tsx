import { motion } from "framer-motion";
import React from "react";

interface FadeInTransitionProps {}

export const FadeInTransition: React.FC<FadeInTransitionProps> = ({ children }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
          transition: {
            delay: 0.2,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};
