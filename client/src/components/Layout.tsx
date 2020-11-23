import React from "react";
import { Box } from "@chakra-ui/react";
import { NavBar } from "./NavBar";
import { motion } from "framer-motion";

type LayoutVariant = "small" | "regular" | "large";

interface LayoutProps {
  navigation?: boolean;
  variant?: LayoutVariant;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  variant,
  navigation,
}) => {
  let maxWidth;
  switch (variant) {
    case "small":
      maxWidth = "40rem";
      break;
    case "regular":
      maxWidth = "80rem";
      break;
    default:
      maxWidth = "100%";
  }

  return (
    <Box>
      <NavBar navigation={navigation} />
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
        <Box marginX="auto" paddingX={4} maxW={maxWidth}>
          {children}
        </Box>
      </motion.div>
    </Box>
  );
};
