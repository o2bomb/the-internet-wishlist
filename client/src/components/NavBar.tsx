import { useApolloClient } from "@apollo/client";
import { AddIcon, ChevronUpIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { UserIcon } from "../constants";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useViewport } from "../utils/ViewportProvider";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { SearchInput } from "./SearchInput";

export interface NavBarProps {
  navigation?: boolean;
  searchInput?: React.ReactElement;
}

export const NavBar: React.FC<NavBarProps> = ({
  navigation = false,
  searchInput,
}) => {
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
              icon={isOpen ? <ChevronUpIcon /> : <UserIcon />}
              isRound
            />
            <MenuList>
              <NextLink href="/user">
                <MenuItem>View profile</MenuItem>
              </NextLink>
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

  const SearchInputComponent = searchInput;

  return (
    <Flex padding={4} align="center">
      <NextLink href="/" passHref>
        <Link>
          <Heading mr={4} as="h1">
            TIW
          </Heading>
        </Link>
      </NextLink>
      {navigation ? SearchInputComponent : null}
      <Box flex={1} mr={4} />
      <Box mr={4}>
        <DarkModeSwitch />
      </Box>
      {navigation ? (
        <>
          <NextLink href="/create-entry" passHref>
            {viewportValues.width < 720 ? (
              <IconButton icon={<AddIcon />} mr={4} aria-label="Create post" />
            ) : (
              <Button as={Link} mr={4}>
                Create a post
              </Button>
            )}
          </NextLink>
          {body}
        </>
      ) : null}
    </Flex>
  );
};
