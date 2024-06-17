import React from 'react';
import { Container, Typography, Button, Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)({
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
});

const OrderSuccess = ({ orderId }) => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Typography sx={{ fontWeight: 'bold', fontSize: '1.7rem' }} mb={1} ml={5}>
        주문완료
      </Typography>
      <Divider sx={{ backgroundColor: 'rgba(128, 128, 128, 0.8)', width: '100%', mb: 2 }} />
      <StyledContainer>
        <Typography variant="h6" gutterBottom sx={{ mt: 0.5, my: 12 }}>
          주문이 성공적으로 완료되었습니다.
        </Typography>
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
    </Container>
  );
};

export default OrderSuccess;
