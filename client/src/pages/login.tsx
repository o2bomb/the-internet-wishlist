import React from "react";
import NextLink from "next/link";
import { gql } from "@apollo/client";
import { Button, Flex, Link } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [login] = useLoginMutation({
    update: (cache, { data }) => {
      const newMe = data?.login.user;
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
          usernameOrEmail: "",
          password: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            variables: values,
          });

          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data?.login.errors));
          } else if (response.data?.login.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="usernameOrEmail" label="Username or Email" />
            <InputField name="password" label="Password" type="password" />
            <Flex mt={4} justifyContent="space-between">
              <Button isLoading={isSubmitting} type="submit">
                Login
              </Button>
              <NextLink href="/register" passHref>
                <Link>Create a new account</Link>
              </NextLink>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default Login;
