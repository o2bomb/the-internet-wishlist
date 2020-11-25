import { Box, Button, Stack } from "@chakra-ui/react";
import React from "react";
import { useGetEntriesQuery } from "../generated/graphql";
import { EntryCard } from "./EntryCard";

interface EntryListProps {}

export const EntryList: React.FC<EntryListProps> = ({}) => {
  const { loading, error, data, fetchMore } = useGetEntriesQuery({
    variables: {
      limit: 2,
    },
    notifyOnNetworkStatusChange: true, // sets loading to true whenever query is rerun
  });

  if (!data && loading) {
    return <Box>Loading entries...</Box>;
  }

  if (error) {
    console.log(error);
    return <Box>An error occurred while loading entries</Box>;
  }

  return (
    <Stack spacing={4}>
      {data?.entries.entries.map((e, index) => (
        <Box key={index}>
          <EntryCard entry={e} />
        </Box>
      ))}
      <Button
        isLoading={loading}
        onClick={() => {
          if (data?.entries.hasMore) {
            fetchMore({
              variables: {
                cursor: data?.entries.cursor,
              },
            });
          }
        }}
      >
        Load more
      </Button>
    </Stack>
  );
};
