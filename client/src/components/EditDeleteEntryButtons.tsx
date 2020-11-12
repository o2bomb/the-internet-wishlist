import React from "react";
import NextLink from "next/link";
import { Button, IconButton } from "@chakra-ui/core";
import { useDeleteEntryMutation, useMeQuery } from "../generated/graphql";

interface EditDeleteEntryButtonsProps {
  id: number;
  creatorId?: number | null;
}

export const EditDeleteEntryButtons: React.FC<EditDeleteEntryButtonsProps> = ({
  id,
  creatorId,
}) => {
  const { data } = useMeQuery();
  const [deleteEntry] = useDeleteEntryMutation();

  return data?.me?.id === creatorId ? (
    <>
      <NextLink href="/entry/edit/[id]" as={`/entry/edit/${id}`} passHref>
        <Button mr={4}>Edit entry</Button>
      </NextLink>
      <IconButton
        onClick={async () => {
          await deleteEntry({
            variables: {
              id,
            },
          });
        }}
        icon="delete"
        aria-label="Delete entry"
      />
    </>
  ) : null;
};
