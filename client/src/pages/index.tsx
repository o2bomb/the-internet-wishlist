import { Box, Button, Stack } from "@chakra-ui/react";
import React from "react";
import { EntryCard } from "../components/EntryCard";
import { Layout } from "../components/Layout";
import { useGetEntriesQuery } from "../generated/graphql";

const Index = () => {
  const { loading, error, data, fetchMore } = useGetEntriesQuery({
    variables: {
      limit: 2,
    },
    notifyOnNetworkStatusChange: true, // sets loading to true whenever query is rerun
  });

  if (!data && loading) {
    return <Layout>Loading entries...</Layout>;
  }

  if (error) {
    console.log(error);
    return <Layout>An error occurred while loading entries</Layout>;
  }

  return (
    <Layout navigation>
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
    </Layout>
  );
};

export default Index;
