import { useApolloClient } from "@apollo/client";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useViewport } from "../utils/ViewportProvider";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { SearchInput } from "./SearchInput";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const viewportValues = useViewport();
  const apolloClient = useApolloClient();
  const [logout] = useLogoutMutation();
  const { loading, data } = useMeQuery({
    skip: isServer(), // do not run this query on the server
  });

  let body = null;
  if (loading) {
  } else if (!data?.me) {
    // User is not logged in
    body = (
      <>
        <NextLink href="/login" passHref>
          <Link mr={4}>Login</Link>
        </NextLink>
        <NextLink href="/register" passHref>
          <Link>Register</Link>
        </NextLink>
      </>
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
              <MenuItem
                onClick={async () => {
                  await logout();
                  await apolloClient.resetStore(); // reset cache
                }}
              >
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
      <NextLink href="/">
        <Link>
          <Heading mr={4} as="h1">
            TIW
          </Heading>
        </Link>
      </NextLink>
      <SearchInput />
      <Box flex={1} mr={4} />
      <Box mr={4}>
        <DarkModeSwitch />
      </Box>
      <NextLink href="/create-entry" passHref>
        {viewportValues.width < 620 ? (
          <IconButton icon="add" mr={4} aria-label="Create post" />
        ) : (
          <Button as={Link} mr={4}>
            Create a post
          </Button>
        )}
      </NextLink>
      {body}
    </Flex>
  );
};
