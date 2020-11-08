import React from "react";
import { useRouter } from "next/router";
import { Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { Layout } from "../components/Layout";
import { InputField } from "../components/InputField";
import { useCreateEntryMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface CreateEntryProps {}

const CreateEntry: React.FC<CreateEntryProps> = ({}) => {
  const router = useRouter();
  const [createEntry] = useCreateEntryMutation();

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
              text: values.text || null
            }
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
            <InputField name="title" label="Title" placeholder="I wish..." />
            <InputField name="text" label="Description" />
            <Button mt={4} isLoading={isSubmitting} type="submit">Create entry</Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default CreateEntry;