import React from "react";
import NextLink from "next/link";
import {
  Button,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useToast,
} from "@chakra-ui/core";
import { PaginatedEntries, useDeleteEntryMutation, useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";

interface EditDeleteEntryButtonsProps {
  id: number;
  creatorId?: number | null;
}

export const EditDeleteEntryButtons: React.FC<EditDeleteEntryButtonsProps> = ({
  id,
  creatorId,
}) => {
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useMeQuery();
  const [deleteEntry, { error }] = useDeleteEntryMutation({
    update: (cache, { data }) => {
      if (!error) {
        cache.modify({
          fields: {
            entries: (
              existing: PaginatedEntries | undefined, { readField }
             ) => {
              // Remove entry from cache after deleteing
              // https://stackoverflow.com/a/63514349
              return {
                ...existing,
                entries: existing?.entries.filter(e => id !== readField("id", e))
              };
            },
          },
        });
      }
    },
  });

  const ConfirmDelete = (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete entry?</ModalHeader>
        <ModalBody>This action cannot be undone!</ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={async () => {
            try {
              await deleteEntry({
                variables: {
                  id
                }
              })

              // send user back to index page
              router.push("/");
  
              toast({
                title: "Entry deleted successfully!",
                status: "success",
                duration: 1000,
                isClosable: true,
              });
            } catch (e) {
              // Failed to delete entry
              router.push("/");
            }
          }} variantColor="red">
            Delete entry
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return data?.me?.id === creatorId ? (
    <>
      <NextLink href="/entry/edit/[id]" as={`/entry/edit/${id}`} passHref>
        <Button mr={4}>Edit entry</Button>
      </NextLink>
      <IconButton onClick={onOpen} icon="delete" aria-label="Delete entry" />
      {ConfirmDelete}
    </>
  ) : null;
};
