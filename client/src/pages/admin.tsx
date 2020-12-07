import { RepeatIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, IconButton, Stack } from "@chakra-ui/react";
import React from "react";
import { EntryCard } from "../components/EntryCard";
import { Layout } from "../components/Layout";
import { useGetReportedEntriesQuery } from "../generated/graphql";

const Admin: React.FC<{}> = ({}) => {
  const { data, loading, error, refetch } = useGetReportedEntriesQuery();

  if (error) {
    return (
      <Layout>
        An error occurred while loading this page: {error.message}
      </Layout>
    );
  }

  const reportedEntries = () => {
    if (!data || loading) {
      return <Box>Loading...</Box>;
    }

    return (
      <>
        <Flex justifyContent="space-between" align="center">
          <Heading as="h2" size="2xl" mb={4}>
            Reported entries
          </Heading>
          <IconButton
            icon={<RepeatIcon />}
            onClick={() => {
              refetch();
            }}
            aria-label="Refresh reported entries"
          />
        </Flex>
        <Stack spacing={4}>
          {data.reportedEntries.length === 0 ? (
            <Box>No reported entries yet</Box>
          ) : (
            data.reportedEntries.map((e, index) => (
              <Box key={index}>
                <EntryCard entry={e} />
              </Box>
            ))
          )}
        </Stack>
      </>
    );
  };

  return (
    <Layout variant="small" navigation>
      {reportedEntries()}
    </Layout>
  );
};

export default Admin;
