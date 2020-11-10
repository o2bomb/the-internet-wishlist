import { gql } from "@apollo/client";
import { Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

const Register: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [register] = useRegisterMutation({
    update: (cache, { data }) => {
      const newMe = data?.register.user;
      if (newMe) {
        cache.modify({
          fields: {
            me: (existing) => {
              // Update the cache when user is logged in
              const newMeRef = cache.writeFragment({
                data: newMe,
                fragment: gql`
                  fragment NewMe on User {
                    id
                  }
                `,
              });

              return newMeRef;
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
          username: "",
          email: "",
          password: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            variables: values,
          });

          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data?.register.errors));
          } else if (response.data?.register.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="username" label="Username" />
            <InputField name="email" label="Email" type="email" />
            <InputField name="password" label="Password" type="password" />
            <Button mt={4} isLoading={isSubmitting} type="submit">
              Create account
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default Register;
