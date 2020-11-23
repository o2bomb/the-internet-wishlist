import { Button, Flex, Stack, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { EditEntryTagsModal } from "../../../components/EditEntryTagsModal";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import {
  useGetEntryQuery,
  useUpdateEntryMutation
} from "../../../generated/graphql";
import { getIdFromUrl } from "../../../utils/getIdFromUrl";

export const EditEntry = ({}) => {
  const router = useRouter();
  const intId = getIdFromUrl();
  const toast = useToast();
  const { data, loading } = useGetEntryQuery({
    skip: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [updateEntry] = useUpdateEntryMutation();

  if (loading) {
    return <Layout>Loading...</Layout>;
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
          text,
        }}
        onSubmit={async (values, { setErrors }) => {
          let response;
          try {
            response = await updateEntry({
              variables: {
                id: intId,
                text: values.text || "",
              },
            });

            if (response.data?.updateEntry) {
              // send user back to previous page
              router.back();
            }

            toast({
              title: "Entry udpated successfully!",
              status: "success",
              duration: 1000,
              isClosable: true,
            });
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
            </Stack>
            <Flex>
              <Button mr={4} isLoading={isSubmitting} type="submit">
                Edit entry
              </Button>
              <EditEntryTagsModal id={id} tags={tags} />
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default EditEntry;
