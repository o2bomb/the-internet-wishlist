import { RepeatIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, IconButton, Stack } from "@chakra-ui/react";
import React from "react";
import { EntryCard } from "../components/EntryCard";
import { Layout } from "../components/Layout";
import { useGetHeartedEntriesQuery } from "../generated/graphql";
import { isAuth } from "../utils/isAuth";

const User: React.FC<{}> = ({}) => {
  isAuth();
  const { data, loading, error, refetch } = useGetHeartedEntriesQuery({
    pollInterval: 1000 * 60 // poll every minute
  });

  const heartedEntries = () => {
    if (!data || loading) {
      return <Box>Loading...</Box>;
    }

    if (error) {
      console.log(error);
      return <Box>An error occured while looking for entries</Box>;
    }

    return (
      <>
        <Flex justifyContent="space-between" align="center" >
          <Heading as="h2" size="2xl" mb={4}>
            Your liked entries
          </Heading>
          <IconButton icon={<RepeatIcon />} onClick={() => { refetch() }} aria-label="Refresh liked entries" />
        </Flex>
        <Stack spacing={4}>
          {data.heartedEntries.length === 0 ? (
            <Box>You have not liked any posts yet</Box>
          ) : (
            data.heartedEntries.map((e, index) => (
              <Box key={index}>
                <EntryCard entry={e} />
              </Box>
            ))
          )}
        </Stack>
      </>
    );
  };

  return <Layout variant="small" navigation>{heartedEntries()}</Layout>;
};

export default User;
