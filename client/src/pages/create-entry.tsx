import React from "react";
import { gql } from "@apollo/client";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { PaginatedEntries, useCreateEntryMutation, useVerifyCaptchaLazyQuery } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { ReCAPTCHA } from "../components/ReCAPTCHA";

interface CreateEntryProps {}

const CreateEntry: React.FC<CreateEntryProps> = ({}) => {
  const router = useRouter();
  const [verifyCaptcha, { data, refetch }] = useVerifyCaptchaLazyQuery();
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
            <Stack spacing={2} direction="row" align="center">
              <Button isLoading={isSubmitting} type="submit" disabled={!data?.verifyCaptcha}>
                Create entry
              </Button>
              {!data?.verifyCaptcha ? <Text color="tomato">Please complete the captcha</Text> : null}
            </Stack>
          </Form>
        )}
      </Formik>
      <Box mt={4}>
        <ReCAPTCHA verifyCaptcha={verifyCaptcha} refetch={refetch} />
      </Box>
    </Layout>
  );
};

export default CreateEntry;
