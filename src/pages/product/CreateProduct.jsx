import React, { useState, useEffect }  from 'react';
import { Box, Typography, Divider } from '@mui/material';

const ProductDetail = () => {
    const [product, setProduct] = useState(null);
  return (
    <Box px={5} py={2}>
      <Typography sx={{ fontWeight: 'bold', fontSize: '1.7rem' }} mb={1} ml={5}>
        Product 추가
      </Typography>
      <Divider sx={{ backgroundColor: 'rgba(128, 128, 128, 0.8)', width: '100%', mb: 2 }} />
      <Typography>데이터 추가</Typography>
    </Box>

  );
};

export default ProductDetail;
