import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)({
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
});

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <StyledContainer maxWidth="md">
      <Typography variant="h4" gutterBottom>주문완료</Typography>
      <Typography variant="h6" gutterBottom>주문이 성공적으로 완료되었습니다.</Typography>
      <Box mt={4} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: '#586555',
            color: '#ffffff',
            fontWeight: 'bold',
            borderRadius: '8px',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#82957E'
            }
          }}
          onClick={() => navigate('/')}
        >
          홈으로
        </Button>
        <Button
          variant="outlined"
          sx={{
            ml: 2,
            borderColor: '#586555',
            color: '#586555',
            fontWeight: 'bold',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#82957E',
              borderColor: '#82957E',
              color: '#ffffff',
            }
          }}
          onClick={() => navigate('/mypage/orders')}
        >
          주문내역 조회
        </Button>
      </Box>
    </StyledContainer>
  );
};

export default OrderSuccess;
