import { gql } from "@apollo/client";
import { Box, Flex, Heading, IconButton, Stack, Tag, useToast } from "@chakra-ui/core";
import React from "react";
import {
  RegularEntryFragment,
  useHeartEntryMutation,
} from "../generated/graphql";

interface EntryCardProps {
  entry: RegularEntryFragment;
}

export const EntryCard: React.FC<EntryCardProps> = ({ entry }) => {
  const { id, title, isHearted, text } = entry;
  const toast = useToast();
  const [heartEntry] = useHeartEntryMutation();
  return (
    <Box padding={4} maxW="20rem" borderWidth="1px" rounded=".25rem">
      <Flex direction="row" justifyContent="space-between">
        <Heading mb={2} as="h3" size="md">
          {title}
        </Heading>
        <IconButton
          onClick={async () => {
            await heartEntry({
              variables: {
                id,
                deleteHeart: isHearted,
              },
            }).catch((e) => {
              // error occurred, notify user
              console.log(e);

              toast({
                title: "You must be logged in to like an entry!",
                status: "error",
                duration: 1000,
                isClosable: true,
              })
            });
          }}
          variantColor={isHearted ? "red" : undefined}
          aria-label="Heart entry"
          icon="heart"
          isRound
        />
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
