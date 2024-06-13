import React from 'react';
import { Box, Flex, Text, IconButton, HStack, Image, Button } from '@chakra-ui/react';
import { FaUser, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import CampingImage from '../assets/campingicon.png'; // 이미지 파일 가져오기

const Header = () => {
  return (
    <Box as="header" bg="white" color="black" mt={16} boxShadow="md">
      <Flex justifyContent="space-between" alignItems="center" mb={10} px={20}>
        <Flex flex="1">
          {/* 왼쪽 공간 확보 */}
        </Flex>
        <HStack spacing={4}>
          <Image src={CampingImage} alt="캠핑" boxSize="70px" />
          <Text fontSize="3xl" fontWeight="bold" textAlign="center" letterSpacing="widest">
            늘짝늘짝
          </Text>
        </HStack>
        <Flex flex="1" justifyContent="flex-end" pr={12}>
          <HStack spacing={8}>
            <IconButton icon={<FaSignOutAlt size="1.8em" />} aria-label="Logout" variant="ghost" color="#444E42"  />
            <IconButton icon={<FaUser size="1.8em" />} aria-label="User" variant="ghost" color="#444E42"  />
            <IconButton icon={<FaShoppingCart size="1.8em" />} aria-label="Cart" variant="ghost" color="#444E42"  />
          </HStack>
        </Flex>
      </Flex>
      <Flex bg="#586555" py={3} px={4} justifyContent="center">
        <HStack spacing={6}>
          <Button variant="ghost" color="white">
            브랜드
          </Button>
          <Button variant="ghost" color="white">
            카테고리
          </Button>
          <Text color="white" cursor="pointer">
            텐트, 타프
          </Text>
          <Text color="white" cursor="pointer">
            침낭, 매트
          </Text>
          <Text color="white" cursor="pointer">
            퍼니처
          </Text>
          <Text color="white" cursor="pointer">
            라이팅
          </Text>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
