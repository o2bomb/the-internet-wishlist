import React from "react";
import { Flex } from "@chakra-ui/react";

interface TagContainerProps {}

export const TagContainer: React.FC<TagContainerProps> = ({ ...props }) => {
  return (
    <Flex flexWrap="wrap" mt={-2}>
      {React.Children.map(props.children, (child) => {
        const marginProps = {
          mt: 2,
          mr: 2,
        };

        if (React.isValidElement(child)) {
          return React.cloneElement(child, marginProps);
        }
        return child;
      })}
    </Flex>
  );
};
