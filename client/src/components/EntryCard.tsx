import {
  Box,
  Flex,
  Heading,
  IconButton,
  Stack,
  Tag,
  useToast,
} from "@chakra-ui/core";
import React from "react";
import {
  RegularEntryFragment,
  useHeartEntryMutation,
} from "../generated/graphql";

interface EntryCardProps {
  entry: RegularEntryFragment;
}

export const EntryCard: React.FC<EntryCardProps> = ({ entry }) => {
  const { id, title, isHearted, text, points, creator } = entry;
  const toast = useToast();
  const [heartEntry] = useHeartEntryMutation();
  return (
    <Box padding={4} maxW="20rem" borderWidth="1px" rounded=".25rem">
      <Stack spacing={1}>
        <Flex direction="row" justifyContent="space-between">
          <Heading as="h3" size="md">
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
                });
              });
            }}
            variantColor={isHearted ? "red" : undefined}
            aria-label="Heart entry"
            icon="heart"
            isRound
          />
        </Flex>
        {text && <Box>{text}</Box>}
        <Box color="gray.500" letterSpacing="wide" fontSize="sm">
          {points ? `${points} points` : "No points"} &bull; By{" "}
          {creator ? creator.displayName : "Anonymous"}
        </Box>
        <Box></Box>
        <Stack flexWrap="wrap" direction="row">
          <Tag>idea</Tag>
          <Tag>animals</Tag>
          <Tag>...</Tag>
        </Stack>
      </Stack>
    </Box>
  );
};
