import { Heading, Text } from "@chakra-ui/core";
import React from "react";
import { EditDeleteEntryButtons } from "../../components/EditDeleteEntryButtons";
import { Layout } from "../../components/Layout";
import { getEntryFromUrl } from "../../utils/getEntryFromUrl";

const Entry = ({}) => {
  const { data, loading, error } = getEntryFromUrl();

  if (loading) {
    return <Layout>Loading...</Layout>;
  }

  if (error) {
    return <Layout>{error.message}</Layout>;
  }

  if (!data?.entry) {
    return <Layout>Could not find entry</Layout>;
  }

  return (
    <Layout variant="small">
      <Heading mb={4} as="h2" size="lg">
        {data.entry.title}
      </Heading>
      {data.entry.text ? <Text mb={4}>{data.entry.text}</Text> : null}
      <EditDeleteEntryButtons
        id={data.entry.id}
        creatorId={data.entry.creatorId}
      />
    </Layout>
  );
};

export default Entry;
