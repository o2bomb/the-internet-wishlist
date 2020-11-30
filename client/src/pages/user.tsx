import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import { EntryCard } from "../components/EntryCard";
import { Layout } from "../components/Layout";
import { useGetHeartedEntriesQuery } from "../generated/graphql";
import { isAuth } from "../utils/isAuth";

const User: React.FC<{}> = ({}) => {
  isAuth();
  const { data, loading, error } = useGetHeartedEntriesQuery();

  const heartedEntries = () => {
    if (!data && loading) {
      return <Box>Loading...</Box>;
    }

    if (error) {
      console.log(error);
      return <Box>An error occured while looking for entries</Box>;
    }

    return (
      <>
        <Stack spacing={4}>
          {data?.heartedEntries.map((e, index) => (
            <Box key={index}>
              <EntryCard entry={e} />
            </Box>
          ))}
        </Stack>
      </>
    );
  };

  return <Layout variant="small">{heartedEntries()}</Layout>;
};

export default User;
