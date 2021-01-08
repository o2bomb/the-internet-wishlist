import { gql } from "@apollo/client";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { ReCAPTCHA } from "../components/ReCAPTCHA";
import {
  useRegisterMutation,
  useVerifyCaptchaLazyQuery,
} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

const Register: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [verifyCaptcha, { data, refetch }] = useVerifyCaptchaLazyQuery();
  const [register] = useRegisterMutation({
    update: (cache, { data }) => {
      const newMe = data?.register.user;
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
            <Stack spacing={2} mb={4}>
              <InputField name="username" label="Username" />
              <InputField name="email" label="Email" type="email" />
              <InputField name="password" label="Password" type="password" />
            </Stack>
            <Stack spacing={2} direction="row" align="center">
              <Button
                isLoading={isSubmitting}
                disabled={!data?.verifyCaptcha}
                type="submit"
              >
                Create account
              </Button>
              {!data?.verifyCaptcha ? (
                <Text color="tomato">Please complete the captcha</Text>
              ) : null}
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

export default Register;
