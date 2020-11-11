import { Box, Button, Stack } from "@chakra-ui/core";
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
                // OLD WAY Of UPDATING QUERY IN CACHE
                // updateQuery: (
                //   previousValue,
                //   { fetchMoreResult }
                // ): GetEntriesQuery => {
                //   if (!fetchMoreResult) {
                //     return previousValue as GetEntriesQuery;
                //   }

                //   return {
                //     __typename: "Query",
                //     entries: {
                //       __typename: "PaginatedEntries",
                //       cursor: (fetchMoreResult as GetEntriesQuery).entries.cursor,
                //       hasMore: (fetchMoreResult as GetEntriesQuery).entries
                //         .hasMore,
                //       entries: [
                //         ...previousValue.entries.entries,
                //         ...(fetchMoreResult as GetEntriesQuery).entries.entries,
                //       ],
                //     },
                //   };
                // },
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
