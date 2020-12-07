import React from "react";
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import { Box, Link } from "@chakra-ui/react";

const Forbidden: React.FC<{}> = ({}) => {
  return (
    <Layout navigation>
      <Box>You are forbidden access to this resource.</Box>
      <NextLink href="/" passHref>
        <Link>
          <b>&larr; Back to home page</b>
        </Link>
      </NextLink>
    </Layout>
  );
};

export default Forbidden;
