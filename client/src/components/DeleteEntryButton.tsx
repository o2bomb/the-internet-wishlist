import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { PaginatedEntries, useDeleteEntryMutation } from "../generated/graphql";

interface DeleteEntryButtonProps {
  id: number;
  redirect?: boolean;
}

export const DeleteEntryButton: React.FC<DeleteEntryButtonProps> = ({
  id,
  redirect,
}) => {
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteEntry, { error }] = useDeleteEntryMutation({
    update: (cache, { }) => {
      if (!error) {
        cache.modify({
          fields: {
            entries: (
              existing: PaginatedEntries | undefined,
              { readField }
            ) => {
              // Remove entry from cache after deleteing
              // https://stackoverflow.com/a/63514349
              return {
                ...existing,
                entries: existing?.entries.filter(
                  (e) => id !== readField("id", e)
                ),
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
          <Button
            onClick={async () => {
              try {
                await deleteEntry({
                  variables: {
                    id,
                  },
                });

                // close modal
                onClose();

                // send user back to index page
                if (redirect) {
                  router.push("/");
                }

                toast({
                  title: "Entry deleted successfully!",
                  status: "success",
                  duration: 1000,
                  isClosable: true,
                });
              } catch (e) {
                // Failed to delete entry
                if (redirect) {
                  router.push("/");
                }
              }
            }}
            colorScheme="red"
          >
            Delete entry
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <>
      <IconButton
        onClick={onOpen}
        icon={<DeleteIcon />}
        aria-label="Delete entry"
      />
      {ConfirmDelete}
    </>
  );
};
