import React from 'react';
import { Box, Text, Flex, HStack } from '@chakra-ui/react';
import CampingImage from '../assets/campingicon.png'; // 이미지 파일 가져오기

const Footer = () => {
  return (
    <Box as="footer" bg="#586555" color="white" pt={20} px={4} pb={20}>
      <Flex direction="column" align="center">
        <HStack spacing={2} mb={20}>
          <img src={CampingImage} alt="캠핑" style={{ width: '50px', height: '50px' }} /> 
          <Text fontSize="3xl" fontWeight="bold" letterSpacing="widest">
            늘짝늘짝
          </Text>
        </HStack>
        <Box width="80%" height="1px" bg="rgba(255, 255, 255, 0.8)" mb={10}></Box>
        {/* <Divider borderColor="white" borderWidth="2px" width="80%" mb={10} /> */}
        <HStack spacing={10} mt={4} mb={10}>
          <Text fontSize="sm">박원정</Text>
          <Text fontSize="sm">고의성</Text>
          <Text fontSize="sm">김경래</Text>
          <Text fontSize="sm">김연지</Text>
          <Text fontSize="sm">김이삭</Text>
          <Text fontSize="sm">조한휘</Text>
        </HStack>
        <Text fontSize="sm" mt={20}>
          늘짝늘짝 @ 2024. All rights reserved.
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
