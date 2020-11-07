import React from "react";
import { Box } from "@chakra-ui/core";
import { NavBar } from "./NavBar";

type LayoutVariant = "small" | "regular" | "large";

interface LayoutProps {
  variant?: LayoutVariant;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  let maxWidth;
  switch(variant) {
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
      <NavBar />
      <Box marginX="auto" paddingX={4} maxW={maxWidth}>{children}</Box>
    </Box>
  );
};
