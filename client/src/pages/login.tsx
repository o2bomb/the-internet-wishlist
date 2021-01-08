import React from "react";
import NextLink from "next/link";
import { gql, useApolloClient } from "@apollo/client";
import { Button, Flex, Link, Stack } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const apolloClient = useApolloClient();
  const [login] = useLoginMutation({
    update: (cache, { data }) => {
      const newMe = data?.login.user;
      if (newMe) {
        cache.modify({
          fields: {
            me: () => {
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
            await apolloClient.resetStore(); // reset cache
            if (typeof router.query.next === "string") {
              router.push(router.query.next); // redirect to page specified by next parameter
            } else {
              router.push("/");
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing={2} mb={4}>
              <InputField name="usernameOrEmail" label="Username or Email" />
              <InputField name="password" label="Password" type="password" />
            </Stack>
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
