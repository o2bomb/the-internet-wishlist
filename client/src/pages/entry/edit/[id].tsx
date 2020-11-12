import { Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import {
  useGetEntryQuery,
  useUpdateEntryMutation,
} from "../../../generated/graphql";
import { getIdFromUrl } from "../../../utils/getIdFromUrl";

export const EditEntry = ({}) => {
  const router = useRouter();
  const intId = getIdFromUrl();
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

  return (
    <Layout variant="small">
      <Formik
        initialValues={{
          title: data.entry.title,
          text: data.entry.text,
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
          } catch (e) {
            setErrors({
              text: e.graphQLErrors[0].message,
            });
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="title"
              label="Title"
              placeholder="I wish..."
              disabled
            />
            <InputField name="text" label="Description" textArea={true} />
            <Button mt={4} isLoading={isSubmitting} type="submit">
              Edit entry
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default EditEntry;
