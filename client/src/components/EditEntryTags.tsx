import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tag,
  TagLabel,
  useDisclosure,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { PartialTagFragment, useCreateTagMutation, useGetTagsQuery } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { InputField } from "./InputField";
import { TagContainer } from "./TagContainer";

interface EditEntryTagsProps {
  tags: PartialTagFragment[];
  handleRemoveTag: (t: PartialTagFragment) => void;
}

export const EditEntryTags: React.FC<EditEntryTagsProps> = ({
  tags,
  handleRemoveTag,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, loading, error, refetch } = useGetTagsQuery();
  const [createTag] = useCreateTagMutation();

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
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new tag</ModalHeader>
            <Formik
              initialValues={{
                name: "",
              }}
              onSubmit={async (values, { setErrors }) => {
                const response = await createTag({
                  variables: {
                    name: values.name
                  },
                });

                if (response.data?.createTag.errors) {
                  setErrors(toErrorMap(response.data.createTag.errors));
                } else if (response.data?.createTag.tag) {
                  await refetch();
                  onClose();
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <ModalBody>
                  <Stack spacing={2} mb={4}>
                    <InputField
                      name="name"
                      label="Name"
                    />
                  </Stack>
                </ModalBody>
                <ModalFooter>
                  <Button mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" isLoading={isSubmitting} colorScheme="green">Create tag</Button>
                </ModalFooter>
                </Form>
              )}
            </Formik>
        </ModalContent>
      </Modal>
      <Stack spacing={2}>
        <TagContainer>{CurrentTags()}</TagContainer>
        <TagContainer>
          {AvailableTags()}
          <Tag onClick={onOpen} colorScheme="green" role="button" tabIndex={0}>
            <TagLabel>Create a new tag</TagLabel>
          </Tag>
        </TagContainer>
      </Stack>
    </>
  );
};
