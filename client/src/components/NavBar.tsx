import { Box, Button, Flex, Heading, Icon, IconButton, Input, InputGroup, InputLeftElement } from '@chakra-ui/core';
import React from 'react';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <Flex padding={4} align="center">
      <Heading mr={4} as="h1">
        TIW
      </Heading>
      <InputGroup>
        <InputLeftElement children={<Icon name="search" />} />
        <Input type="search" placeholder="Search for an entry...">
        </Input>
      </InputGroup>
      <Box flex={1} mr={4} />
      <Button mr={4}>
        Create Entry
      </Button>
      <IconButton aria-label="User options" icon="user" isRound />
    </Flex>
  );
}