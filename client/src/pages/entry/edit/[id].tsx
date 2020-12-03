import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { EditEntryTags } from "../../../components/EditEntryTags";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import {
  PartialTagFragment,
  useGetEntryQuery,
  useMeQuery,
  useTagEntryMutation,
  useUpdateEntryMutation,
} from "../../../generated/graphql";
import { getIdFromUrl } from "../../../utils/getIdFromUrl";

export const EditEntry = ({}) => {
  const router = useRouter();
  const intId = getIdFromUrl();
  const toast = useToast();
  const { data: meData, loading: meLoading } = useMeQuery();
  const { data, loading } = useGetEntryQuery({
    skip: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [tagEntry] = useTagEntryMutation();
  const [updateEntry] = useUpdateEntryMutation();

  const [removableTags, setRemovableTags] = useState<PartialTagFragment[]>([]);

  useEffect(() => {
    if (data && !loading) {
      setRemovableTags(data.entry!.tags);
    }
  }, [data]);

  if (loading || meLoading) {
    return <Layout>Loading...</Layout>;
  }

  if (meData?.me?.id !== data?.entry?.creatorId) {
    return <Layout>You are not allowed to edit this post</Layout>;
  }

  if (!data?.entry) {
    return <Layout>Could not find entry</Layout>;
  }

  const { id, tags, title, text } = data.entry;

  return (
    <Layout variant="small">
      <Formik
        initialValues={{
          title,
          text: text || "",
        }}
        onSubmit={async (values, { setErrors }) => {
          let response;
          let response2;
          let isSuccess = false;
          try {
            if (values.text.length > 0 || (text || "").length > 0 ) {
              response = await updateEntry({
                variables: {
                  id: intId,
                  text: values.text,
                },
              });
            }

            if (removableTags.length > 0) {
              response2 = await tagEntry({
                variables: {
                  id: intId,
                  tagIds: removableTags.map((t) => t.id),
                },
              });
            }

            isSuccess = !!(response?.data?.updateEntry || response2?.data?.tagEntry); 

            if (isSuccess) {
              // send user back to previous page
              router.back();
              toast({
                title: "Entry udpated successfully!",
                status: "success",
                duration: 1000,
                isClosable: true,
              });
            }
          } catch (e) {
            setErrors({
              text: e.graphQLErrors[0].message,
            });
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing={2} mb={4}>
              <InputField
                name="title"
                label="Title"
                placeholder="I wish..."
                disabled
              />
              <InputField name="text" label="Description" textArea={true} />
              <Box>
                <Text mb={2}>Tags</Text>
                <EditEntryTags
                  tags={removableTags}
                  handleRemoveTag={(t) => {
                    setRemovableTags((prev) => {
                      return [...prev, t];
                    });
                  }}
                />
              </Box>
            </Stack>
            <Button mr={4} isLoading={isSubmitting} type="submit">
              Edit entry
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default EditEntry;
