import { ApolloQueryResult, QueryLazyOptions } from "@apollo/client";
import { useColorMode } from "@chakra-ui/react";
import React from "react";
import ReCAPTCHAComponent from "react-google-recaptcha";
import { Exact, VerifyCaptchaQuery } from "../generated/graphql";

interface ReCAPTCHAProps {
  verifyCaptcha: (
    options?:
      | QueryLazyOptions<
          Exact<{
            token: string;
          }>
        >
      | undefined
  ) => void;
  refetch:
    | ((
        variables?:
          | Partial<
              Exact<{
                token: string;
              }>
            >
          | undefined
      ) => Promise<ApolloQueryResult<VerifyCaptchaQuery>>)
    | undefined;
}

export const ReCAPTCHA: React.FC<ReCAPTCHAProps> = ({
  verifyCaptcha,
  refetch,
}) => {
  const { colorMode } = useColorMode();

  return (
    <ReCAPTCHAComponent
      sitekey={process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY}
      onChange={(value: any) => {
        verifyCaptcha({
          variables: {
            token: value,
          },
        });
      }}
      onExpire={refetch}
      theme={colorMode}
    />
  );
};
