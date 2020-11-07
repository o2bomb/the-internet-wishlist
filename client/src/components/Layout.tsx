import React from 'react'
import { Box } from '@chakra-ui/core';
import { NavBar } from './NavBar';

interface LayoutProps {
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
      <Box>
        <NavBar />
        <Box paddingX={4}>
          {children}
        </Box>
      </Box>
    );
}