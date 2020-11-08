import { Box, Flex, Heading, IconButton, Stack, Tag } from "@chakra-ui/core";
import React from "react";

interface EntryCardProps {
  title: string;
  text?: string | null;
  isHearted: boolean;
}

export const EntryCard: React.FC<EntryCardProps> = ({
  title,
  text,
  isHearted,
}) => {
  return (
    <Box padding={4} maxW="20rem" borderWidth="1px" rounded=".25rem">
      <Flex direction="row" justifyContent="space-between">
        <Heading mb={2} as="h3" size="md">
          {title}
        </Heading>
        {isHearted ? null : (
          <IconButton aria-label="Heart entry" icon="heart" isRound />
        )}
      </Flex>
      {text && <Box mb={2}>{text}</Box>}
      <Stack flexWrap="wrap" direction="row">
        <Tag>idea</Tag>
        <Tag>animals</Tag>
        <Tag>...</Tag>
      </Stack>
    </Box>
  );
};
