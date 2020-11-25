import React from "react";
import { Box } from "@chakra-ui/react";
import { NavBar, NavBarProps } from "./NavBar";
import { FadeInTransition } from "./FadeInTransition";

type LayoutVariant = "small" | "regular" | "large";

interface LayoutProps extends NavBarProps {
  variant?: LayoutVariant;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  variant,
  navigation,
  searchInput,
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
      <NavBar navigation={navigation} searchInput={searchInput} />
      <FadeInTransition>
        <Box marginX="auto" paddingX={4} maxW={maxWidth}>
          {children}
        </Box>
      </FadeInTransition>
    </Box>
  );
};
