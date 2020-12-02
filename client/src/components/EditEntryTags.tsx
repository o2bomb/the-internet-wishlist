import { AddIcon } from "@chakra-ui/icons";
import { IconButton, Stack, Tag, TagLabel } from "@chakra-ui/react";
import React from "react";
import { PartialTagFragment, useGetTagsQuery } from "../generated/graphql";
import { TagContainer } from "./TagContainer";

interface EditEntryTagsProps {
  tags: PartialTagFragment[];
  handleRemoveTag: (t: PartialTagFragment) => void;
}

export const EditEntryTags: React.FC<EditEntryTagsProps> = ({
  tags,
  handleRemoveTag,
}) => {
  const { data, loading, error } = useGetTagsQuery();

  const AvailableTags = () => {
    if (!data || loading) {
      return <div>Loading tags...</div>;
    }

    if (error) {
      return <div>{error.message}</div>;
    }

    const currentTagIds = tags.map((t) => t.id);
    const availableTags = data.tags
      .filter((t) => {
        return !currentTagIds.includes(t.id);
      })
      .map((t, index) => (
        <Tag key={index}>
          <IconButton
            onClick={() => {
              handleRemoveTag(t);
            }}
            ml={-2}
            mr={1}
            size="xs"
            icon={<AddIcon />}
            variant="ghost"
            aria-label="Add tag"
            isRound
          />
          <TagLabel>{t.displayName}</TagLabel>
        </Tag>
      ));

    return availableTags;
  };

  const CurrentTags = () => {
    return tags.map((t, index) => (
      <Tag key={index}>
        <TagLabel>{t.displayName}</TagLabel>
      </Tag>
    ));
  };

  return (
    <Stack spacing={2}>
      <TagContainer>{CurrentTags()}</TagContainer>
      <TagContainer>{AvailableTags()}</TagContainer>
    </Stack>
  );
};
