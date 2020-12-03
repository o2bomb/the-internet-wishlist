import React from "react";
import NextLink from "next/link";
import { Box, Flex, Heading, Link, Stack, Tag } from "@chakra-ui/react";
import { RegularEntryFragment, useMeQuery } from "../generated/graphql";
import { HeartButton } from "./HeartButton";
import { TagContainer } from "./TagContainer";

interface EntryCardProps {
  entry: RegularEntryFragment;
}

export const EntryCard: React.FC<EntryCardProps> = ({ entry }) => {
  const { id, title, text, points, creator, tags, creatorId } = entry;
  const { data } = useMeQuery();
  return (
    <Flex
      justifyContent="space-between"
      padding={4}
      maxW="40rem"
      borderWidth="1px"
      rounded=".25rem"
    >
      <Stack spacing={2}>
        <NextLink href="/entry/[id]" as={`/entry/${id}`} passHref>
          <Link>
            <Heading as="h2" size="lg">
              {title}
            </Heading>
          </Link>
        </NextLink>
        {text && <Box>{text}</Box>}
        <Box color="gray.500" letterSpacing="wide" fontSize="sm">
          {points ? `${points} points` : "No points"} &bull; By{" "}
          {creator ? creator.displayName : "Anonymous"}
        </Box>
        {tags.length > 0 ? (
          <TagContainer>
            {tags.map((t, index) => (
              <Tag key={index}>{t.displayName}</Tag>
            ))}
          </TagContainer>
        ) : null}
      </Stack>
      <Flex>
        {data?.me?.id === creatorId ? null : <HeartButton entry={entry} />}
      </Flex>
    </Flex>
  );
};
