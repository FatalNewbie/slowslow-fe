import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, CircularProgress, Box, Grid, TextField, Button, Divider, Checkbox, FormControlLabel } from '@mui/material';
import { styled } from '@mui/system';
import { useToken } from '../../contexts/TokenContext'; // TokenContext 임포트

// 로컬 스토리지에서 장바구니 데이터를 가져오는 함수
const getCartData = () => {
  return JSON.parse(localStorage.getItem("orders")) || [];
};

const StyledContainer = styled(Container)({
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
});

const SectionTitle = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.5rem',
  marginBottom: '1rem',
  borderBottom: '2px solid #ccc',
  paddingBottom: '0.5rem',
});

const FormSection = styled(Box)({
  marginBottom: '2rem',
});

const OrderPage = () => {
  const { token, userId } = useToken(); // TokenContext에서 토큰과 userId 가져오기
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [orderPageData, setOrderPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    orderName: '',
    orderTel: '',
    orderEmail: '',
    shipName: '',
    shipTel: '',
    shipAddr: '',
    shipReq: ''
  });
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [agreementConfirmed, setAgreementConfirmed] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 가짜 데이터를 가져오는 함수
    const fetchOrderPage = () => {
      try {
        const cartData = getCartData();
        const totalPrice = cartData.reduce((total, item) => total + (item.productCnt * item.productPrice), 0);
        const data = {
          orderDetails: cartData,
          totalPrice,
          orderName: "홍길동",
          orderTel: "010-1234-5678",
          orderEmail: "hong@example.com",
          shipName: "홍길동",
          shipTel: "010-1234-5678",
          shipAddr: "서울특별시 홍지동 123-12, 201호",
          shipReq: "문 앞에 놔주세요."
        };
        setOrderPageData(data);
        setFormData({
          orderName: data.orderName,
          orderTel: data.orderTel,
          orderEmail: data.orderEmail,
          shipName: data.shipName,
          shipTel: data.shipTel,
          shipAddr: data.shipAddr,
          shipReq: data.shipReq
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderPage();
  }, []);

  const handleSubmitOrder = async () => {
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (!paymentConfirmed || !agreementConfirmed) {
      alert('결제 수단과 주문자 동의에 체크해주세요.');
      return;
    }

    const orderData = {
      ...formData,
      userId, // userId 추가
      orderDetails: orderPageData.orderDetails,
      totalPrice: orderPageData.totalPrice
    };

    console.log('Order Data:', orderData);

    try {
      const response = await fetch(`http://localhost:8080/orders?paymentConfirmed=${paymentConfirmed}&agreementConfirmed=${agreementConfirmed}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token // TokenContext에서 가져온 토큰 사용
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        if (response.status === 500) {
          // 주문 실패 시, 실패 페이지로 이동
          navigate('/orders/failure');
        } else {
          const errorResponse = await response.text();
          throw new Error(errorResponse);
        }
      }

      const updatedOrder = await response.json();
      console.log('Order placed successfully:', updatedOrder);
      // 주문 성공 시, 성공 페이지로 이동
      navigate('/orders/success');
    } catch (err) {
      alert('주문 중 오류가 발생했습니다: ' + err.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name === 'paymentConfirmed') {
      setPaymentConfirmed(checked);
    } else if (name === 'agreementConfirmed') {
      setAgreementConfirmed(checked);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6" color="error">오류가 발생했습니다: {error}</Typography>;
  }

  return (
    <StyledContainer maxWidth="md">
      <SectionTitle>주문/결제</SectionTitle>
      <FormSection>
        <SectionTitle variant="h6">주문 목록</SectionTitle>
        <Grid container spacing={2}>
          {orderPageData.orderDetails.map((detail) => (
            <Grid item xs={12} key={detail.productId}>
              <Box display="flex" alignItems="center" mb={2}>
                <img src={detail.orderImg} alt={detail.productName} style={{ width: '100px', height: '100px', borderRadius: '8px', marginRight: '1rem' }} />
                <Box>
                  <Typography variant="body1" fontWeight="bold">{detail.productName}</Typography>
                  <Typography variant="body2">수량: {detail.productCnt}</Typography>
                  <Typography variant="body2">{detail.productPrice.toLocaleString()}원</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1">총 상품 가격: {orderPageData.totalPrice.toLocaleString()}원</Typography>
        <Typography variant="body1">총 배송비: 3,000원</Typography>
        <Typography variant="h6">최종 결제 금액: {(orderPageData.totalPrice + 3000).toLocaleString()}원</Typography>
      </FormSection>
      <FormSection>
        <SectionTitle variant="h6">주문자 정보</SectionTitle>
        <TextField
          fullWidth
          label="이름"
          name="orderName"
          value={formData.orderName}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="연락처"
          name="orderTel"
          value={formData.orderTel}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="이메일"
          name="orderEmail"
          value={formData.orderEmail}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
      </FormSection>
      <FormSection>
        <SectionTitle variant="h6">배송지 정보</SectionTitle>
        <TextField
          fullWidth
          label="이름"
          name="shipName"
          value={formData.shipName}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="연락처"
          name="shipTel"
          value={formData.shipTel}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="주소"
          name="shipAddr"
          value={formData.shipAddr}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="요청사항"
          name="shipReq"
          value={formData.shipReq}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
      </FormSection>
      <FormSection>
        <SectionTitle variant="h6">결제 정보</SectionTitle>
        <FormControlLabel
          control={
            <Checkbox
              checked={paymentConfirmed}
              onChange={handleCheckboxChange}
              name="paymentConfirmed"
              color="primary"
            />
          }
          label="결제 수단에 체크해주세요."
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={agreementConfirmed}
              onChange={handleCheckboxChange}
              name="agreementConfirmed"
              color="primary"
            />
          }
          label="주문자 동의에 체크해주세요."
        />
      </FormSection>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          variant="contained"
          color="primary"
          size="large"
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
          onClick={handleSubmitOrder}
          disabled={!paymentConfirmed || !agreementConfirmed} // 결제 수단과 주문자 동의가 체크되지 않으면 버튼 비활성화
        >
          주문하기
        </Button>
      </Box>
    </StyledContainer>
  );
};

export default OrderPage;
