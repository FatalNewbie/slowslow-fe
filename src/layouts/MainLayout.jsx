import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Box } from '@chakra-ui/react';

const MainLayout = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box as="main" flex="1" p={4} paddingLeft="8%" paddingRight="8%">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;