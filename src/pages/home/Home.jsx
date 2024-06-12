import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const Home = () => {
  return (
    <Box px={10} py={5}>
      <Heading as="h1" fontSize="3xl" fontWeight="bold" mb={2} ml={6}>
        홈페이지
      </Heading>
      <Box height="1px" bg="rgba(128, 128, 128, 0.8)" width="100%" mb={4} />
      <Text>Welcome to the home page!</Text>
    </Box>
  );
};

export default Home;
