import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Stack,
  Tag,
  TagLabel,
  IconButton,
  Text,
} from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import {
  PartialTagFragment,
  useGetTagsQuery,
  useTagEntryMutation,
} from "../generated/graphql";

interface EditEntryTagsModalProps {
  id: number;
  tags: PartialTagFragment[];
}

export const EditEntryTagsModal: React.FC<EditEntryTagsModalProps> = ({
  id,
  tags,
}) => {
  const { data, loading, error } = useGetTagsQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tagEntry] = useTagEntryMutation();
  const [tagsToRemove, setTagsToRemove] = useState<Set<PartialTagFragment>>(new Set(tags));

  const CurrentTags = () => {    
    return tagsToRemove.size === 0 ? (
      <>No tags currently attached to entry</>
    ) : (
      Array.from(tagsToRemove).map((t, index) => (
        <Tag key={index} mt={2}>
          <TagLabel>{t.displayName}</TagLabel>
        </Tag>
      ))
    );
  };

  const AvailableTags = () => {
    if (loading) {
      return <div>Loading tags...</div>;
    }

    if (error) {
      return <div>{error.message}</div>;
    }

    if (!data?.tags) {
      return <div>Could not get available tags</div>;
    }

    const currentTagIds = tags.map((t) => t.id);
    const availableTags = data.tags
      .filter((t) => {
        return !currentTagIds.includes(t.id);
      })
      .map((t, index) => (
        <Tag key={index} mt={2}>
          <IconButton
            onClick={() => {
              setTagsToRemove((prev) => {
                const newTagsToRemove = new Set(prev);
                newTagsToRemove.add(t);
                return newTagsToRemove;
              });
            }}
            ml={-2}
            mr={1}
            size="xs"
            icon="add"
            variant="ghost"
            aria-label="Add tag"
            isRound
          />
          <TagLabel>{t.displayName}</TagLabel>
        </Tag>
      ));
    return availableTags.length === 0 ? (
      <>No tags left to add. Would you like to create one?</>
    ) : (
      availableTags
    );
  };

  return (
    <>
      <Button onClick={onOpen}>Edit tags</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit entry tags</ModalHeader>
          <ModalBody>
            <Text mb={2} fontSize="lg">
              Current tags:
            </Text>
            <Stack flexWrap="wrap" direction="row" mt={-2} mb={4}>
              {CurrentTags()}
            </Stack>
            <Text mb={2} fontSize="lg">
              Available tags:
            </Text>
            <Stack flexWrap="wrap" direction="row" mt={-2}>
              {AvailableTags()}
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={async () => {
                await tagEntry({
                  variables: {
                    id,
                    tagIds: Array.from(tagsToRemove).map((t) => t.id),
                  },
                });
                onClose();
              }}
              variantColor="green"
            >
              Confirm selection
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
