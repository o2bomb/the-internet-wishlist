import { Button } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useMeQuery } from "../generated/graphql";
import { DeleteEntryButton } from "./DeleteEntryButton";

interface EditDeleteEntryButtonsProps {
  id: number;
  creatorId?: number | null;
}

export const EditDeleteEntryButtons: React.FC<EditDeleteEntryButtonsProps> = ({
  id,
  creatorId,
}) => {
  const { data } = useMeQuery();

  return data?.me?.id === creatorId ? (
    <>
      <NextLink href="/entry/edit/[id]" as={`/entry/edit/${id}`} passHref>
        <Button mr={4}>Edit entry</Button>
      </NextLink>
      <DeleteEntryButton id={id} redirect />
    </>
  ) : null;
};
