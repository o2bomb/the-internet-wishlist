import React from "react";
import NextLink from "next/link";
import { Box, Flex, Heading, Link, Tag } from "@chakra-ui/react";
import { RegularEntryFragment, useMeQuery } from "../generated/graphql";
import { HeartButton } from "./HeartButton";

interface EntryCardProps {
  entry: RegularEntryFragment;
}

export const EntryCard: React.FC<EntryCardProps> = ({ entry }) => {
  const { id, title, text, points, creator, tags, creatorId } = entry;
  const { data } = useMeQuery();
  return (
    <Box padding={4} maxW="40rem" borderWidth="1px" rounded=".25rem">
      <Flex mb={2} direction="row" justifyContent="space-between">
        <NextLink href="/entry/[id]" as={`/entry/${id}`} passHref>
          <Link>
            <Heading as="h2" size="lg">
              {title}
            </Heading>
          </Link>
        </NextLink>
        {data?.me?.id === creatorId ? null : <HeartButton entry={entry} />}
      </Flex>
      {text && <Box mb={2}>{text}</Box>}
      <Box mb={2} color="gray.500" letterSpacing="wide" fontSize="sm">
        {points ? `${points} points` : "No points"} &bull; By{" "}
        {creator ? creator.displayName : "Anonymous"}
      </Box>
      <Flex wrap="wrap" mt={-2}>
        {tags ? tags.map((t, index) => <Tag key={index} mt={2} mr={2}>{t.displayName}</Tag>) : null}
      </Flex>
    </Box>
  );
};
