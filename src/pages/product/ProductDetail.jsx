import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const ProductDetail = () => {
  return (
    <Box px={5} py={2}>
      <Typography sx={{ fontWeight: 'bold', fontSize: '1.7rem' }} mb={1} ml={5}>
        홈페이지
      </Typography>
      <Divider sx={{ backgroundColor: 'rgba(128, 128, 128, 0.8)', width: '100%', mb: 2 }} />
      <Typography>product db 출력 예정</Typography>
    </Box>
  );
};

export default ProductDetail;
