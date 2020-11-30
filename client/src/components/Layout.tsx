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
    case "large":
      maxWidth = "100%";
      break;
    case "regular":
      maxWidth = "80rem";
      break;
    case "small":
      maxWidth = "40rem";
      break;
    default:
      maxWidth = "40rem";
  }

  return (
    <Box>
      <NavBar navigation={navigation} searchInput={searchInput} />
      <FadeInTransition>
        <Box marginX="auto" padding={4} maxW={maxWidth}>
          {children}
        </Box>
      </FadeInTransition>
    </Box>
  );
};
