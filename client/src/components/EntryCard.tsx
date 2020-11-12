import React from "react";
import NextLink from "next/link";
import { Box, Flex, Heading, Link, Stack, Tag } from "@chakra-ui/core";
import { RegularEntryFragment, useMeQuery } from "../generated/graphql";
import { HeartButton } from "./HeartButton";

interface EntryCardProps {
  entry: RegularEntryFragment;
}

export const EntryCard: React.FC<EntryCardProps> = ({ entry }) => {
  const { id, title, text, points, creator, tags, creatorId } = entry;
  const { data } = useMeQuery();
  return (
    <Box padding={4} maxW="20rem" borderWidth="1px" rounded=".25rem">
      <Stack spacing={1}>
        <Flex direction="row" justifyContent="space-between">
          <NextLink href="/entry/[id]" as={`/entry/${id}`} passHref>
            <Link>
              <Heading as="h2" size="lg">
                {title}
              </Heading>
            </Link>
          </NextLink>
          {data?.me?.id === creatorId ? null : <HeartButton entry={entry} />}
        </Flex>
        {text && <Box>{text}</Box>}
        <Box color="gray.500" letterSpacing="wide" fontSize="sm">
          {points ? `${points} points` : "No points"} &bull; By{" "}
          {creator ? creator.displayName : "Anonymous"}
        </Box>
        <Box></Box>
        <Stack flexWrap="wrap" direction="row" mt={-2}>
          {tags ? tags.map((t) => <Tag mt={2}>{t.displayName}</Tag>) : null}
        </Stack>
      </Stack>
    </Box>
  );
};
