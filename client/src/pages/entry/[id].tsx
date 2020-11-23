import { Heading, Stack, Tag, Text } from "@chakra-ui/react";
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

  const { title, text, id, creatorId, tags } = data.entry;
  return (
    <Layout variant="small">
      <Heading mb={4} as="h2" size="lg">
        {title}
      </Heading>
      {text ? <Text mb={4}>{text}</Text> : null}
      <Stack flexWrap="wrap" direction="row" mt={-2} mb={4}>
        {tags ? tags.map((t, index) => <Tag key={index} mt={2}>{t.displayName}</Tag>) : null}
      </Stack>
      <EditDeleteEntryButtons id={id} creatorId={creatorId} />
    </Layout>
  );
};

export default Entry;
