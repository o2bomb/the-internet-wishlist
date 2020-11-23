import { gql } from "@apollo/client";
import { Button, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { PaginatedEntries, useCreateEntryMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface CreateEntryProps {}

const CreateEntry: React.FC<CreateEntryProps> = ({}) => {
  const router = useRouter();
  const [createEntry] = useCreateEntryMutation({
    update: (cache, { data }) => {
      const newEntry = data?.createEntry.entry;
      if (newEntry) {
        cache.modify({
          fields: {
            entries: (
              existing: PaginatedEntries | undefined
            ): PaginatedEntries => {
              // Update the cache when a new entry is created
              // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
              const newEntryRef = cache.writeFragment({
                data: newEntry,
                fragment: gql`
                  fragment NewEntry on Entry {
                    id
                  }
                `,
              });

              let cursor = existing?.cursor || newEntry?.createdAt || "";
              let hasMore = existing?.hasMore || true;
              return {
                cursor,
                hasMore,
                entries: [newEntryRef as any, ...(existing?.entries || [])],
              };
            },
          },
        });
      }
    },
  });

  return (
    <Layout variant="small">
      <Formik
        initialValues={{
          title: "",
          text: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await createEntry({
            variables: {
              title: values.title,
              text: values.text || null,
            },
          });

          if (response.data?.createEntry.errors) {
            setErrors(toErrorMap(response.data.createEntry.errors));
          } else if (response.data?.createEntry.entry) {
            // Redirect user to home page
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing={2} mb={4}>
              <InputField name="title" label="Title" placeholder="I wish..." />
              <InputField name="text" label="Description" textArea={true} />
            </Stack>
            <Button isLoading={isSubmitting} type="submit">
              Create entry
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default CreateEntry;
