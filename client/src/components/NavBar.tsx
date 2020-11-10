import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/core";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useApolloClient } from "@apollo/client";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const apolloClient = useApolloClient();
  const [logout, { loading: logoutLoading }] = useLogoutMutation();
  const { loading, data } = useMeQuery({
    skip: isServer(), // do not run this query on the server
  });
  let body = null;

  if (loading) {
  } else if (!data?.me) {
    // User is not logged in
    body = (
      <NextLink href="/login">
        <Button as={Link}>Login</Button>
      </NextLink>
    );
  } else {
    body = (
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={IconButton}
              aria-label="User options"
              icon={isOpen ? "chevron-up" : "user"}
              isRound
            />
            <MenuList>
              <MenuItem>View profile</MenuItem>
              <MenuDivider />
              <MenuItem onClick={async () => {
                await logout();
                await apolloClient.resetStore(); // reset cache
              }}>
                Logout
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    );
  }

  return (
    <Flex padding={4} align="center">
      <Heading mr={4} as="h1">
        TIW
      </Heading>
      <InputGroup>
        <InputLeftElement children={<Icon name="search" />} />
        <Input type="search" placeholder="Search for an entry..."></Input>
      </InputGroup>
      <Box flex={1} mr={4} />
      <NextLink href="/create-entry">
        <Button as={Link} mr={4}>
          Create a post
        </Button>
      </NextLink>
      {body}
    </Flex>
  );
};
