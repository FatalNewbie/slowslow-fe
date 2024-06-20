import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, CircularProgress, Box, Grid, Button, Divider, Modal, TextField } from '@mui/material';
import { AuthContext } from '../user/AuthContext'; // AuthContext 임포트

const OrderDetail = () => {
    const { orderId } = useParams(); // URL 파라미터에서 orderId 가져오기
    const { isLoggedIn, role, username } = useContext(AuthContext); // AuthContext 사용
    const navigate = useNavigate(); // useNavigate 훅 사용
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        console.log('Stored Token:', storedToken); // 토큰 값을 콘솔에 출력
        if (storedToken) {
            axios
                .get(`http://34.47.79.214:8080/api/v1/mypage/orders/${orderId}`, {
                    // URL에 /api/v1 추가
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${storedToken}`,
                    },
                })
                .then((response) => {
                    const data = response.data;
                    setOrder(data);
                    setFormData({
                        orderName: data.orderName,
                        orderTel: data.orderTel,
                        orderEmail: data.orderEmail,
                        shipName: data.shipName,
                        shipTel: data.shipTel,
                        shipAddr: data.shipAddr,
                        shipReq: data.shipReq,
                        orderDetails: data.orderDetails,
                        status: data.status,
                        totalPrice: data.totalPrice,
                        userId: data.userId,
                    });
                })
                .catch((error) => {
                    setError(error);
                    console.error('There was an error!', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            navigate('/login');
        }
    }, [orderId, navigate]);

    const handleCancelOrder = async () => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            navigate('/login');
            return;
        }

        try {
            const response = await axios.delete(`http://34.47.79.214:8080/api/v1/mypage/orders/${orderId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${storedToken}`,
                },
            });

            alert('주문이 취소되었습니다.');
            setOrder({ ...order, status: 'CANCELLED' });
            navigate('/mypage/orders'); // 주문 취소 후 mypage/orders로 리다이렉트
        } catch (err) {
            alert('주문 취소 중 오류가 발생했습니다.');
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            navigate('/login');
            return;
        }

        try {
            const response = await axios.put(`http://34.47.79.214:8080/api/v1/mypage/orders/${orderId}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${storedToken}`,
                },
            });

            const updatedOrder = response.data;
            setOrder(updatedOrder);
            handleCloseModal();
        } catch (err) {
            alert('주문 수정 중 오류가 발생했습니다.');
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Invalid Date';
        const date = new Date(dateString);
        if (isNaN(date)) return 'Invalid Date';
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString('ko-KR', options);
    };

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return (
            <Typography variant="h6" color="error">
                오류가 발생했습니다: {error.message}
            </Typography>
        );
    }

    return (
        <Container maxWidth="md">
            <Typography sx={{ fontWeight: 'bold', fontSize: '1.7rem' }} mb={1} ml={5}>
                주문상세
            </Typography>
            <Divider sx={{ backgroundColor: 'rgba(128, 128, 128, 0.8)', width: '100%', mb: 2 }} />
            {order ? (
                <Box>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={3} container direction="column" justifyContent="center">
                            <Typography variant="subtitle2" sx={{ color: 'gray', marginRight: '8px' }}>
                                {String(order.id).padStart(5, '0')}
                            </Typography>
                            <Typography variant="h6">{formatDate(order.createdDate)}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} container direction="column" spacing={2}>
                            {order.orderDetails.map((detail) => (
                                <Grid item key={detail.id} container spacing={2} alignItems="center">
                                    <Grid item>
                                        <img
                                            src={detail.orderImg}
                                            alt={detail.productName}
                                            style={{ width: '100px', height: '100px' }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2">{detail.productName}</Typography>
                                        <Typography variant="body2">수량: {detail.productCnt}</Typography>
                                        <Box component="span" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                                            {formatNumber(detail.productPrice)}
                                        </Box>
                                        <Box component="span" sx={{ fontSize: '0.875rem' }}>
                                            원
                                        </Box>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid item xs={12} sm={3} container direction="column" justifyContent="flex-end">
                            <Typography variant="h5" align="right">
                                <Box component="span" sx={{ fontSize: '0.875rem' }}>
                                    총 주문금액:{' '}
                                </Box>
                                <Box component="span" sx={{ fontWeight: 'bold', fontSize: '1.8rem' }}>
                                    {formatNumber(order.totalPrice)}
                                </Box>
                                <Box component="span" sx={{ fontSize: '0.875rem' }}>
                                    원
                                </Box>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 2 }} />
                    <Grid container spacing={16}>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                주문자
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                {order.orderName}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                {order.orderEmail}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                {order.orderTel}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                배송지
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                {order.shipName}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                {order.shipAddr}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                {order.shipTel}
                            </Typography>
                            <Divider sx={{ my: 1, mb: 2 }} />
                            <Typography variant="body2">요청사항: {order.shipReq}</Typography>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 2 }} />
                    <Box display="flex" justifyContent="center" mt={3}>
                        {order.status === 'PENDING' ? (
                            <>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#586555',
                                        color: '#ffffff',
                                        fontWeight: 'bold',
                                        borderRadius: '8px',
                                        boxShadow: 'none',
                                        margin: '0 16px',
                                        padding: '8px 16px',
                                        '&:hover': {
                                            backgroundColor: '#82957E',
                                        },
                                    }}
                                    onClick={handleOpenModal}
                                >
                                    주문 정보 수정
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#586555',
                                        color: '#ffffff',
                                        fontWeight: 'bold',
                                        borderRadius: '8px',
                                        boxShadow: 'none',
                                        margin: '0 16px',
                                        padding: '8px 16px',
                                        '&:hover': {
                                            backgroundColor: '#82957E',
                                        },
                                    }}
                                    onClick={handleCancelOrder}
                                >
                                    주문 취소
                                </Button>
                            </>
                        ) : (
                            <Typography variant="h6" align="center">
                                {order.status === 'SHIPPING' && '배송중'}
                                {order.status === 'CANCELLED' && '취소 완료'}
                                {order.status === 'COMPLETED' && '배송 완료'}
                                {order.status === 'FAILED' && '주문 실패'}
                            </Typography>
                        )}
                    </Box>
                </Box>
            ) : (
                <Typography variant="h6">Order not found.</Typography>
            )}

            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Box
                    sx={{
                        backgroundColor: 'white',
                        padding: 4,
                        borderRadius: 1,
                        boxShadow: 24,
                        width: '80%',
                        maxWidth: 600,
                        opacity: 0.9,
                    }}
                >
                    <Typography variant="h6" mb={2}>
                        주문 정보 수정
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="subtitle1" mb={2}>
                        주문자 정보
                    </Typography>
                    <TextField
                        fullWidth
                        label="이름"
                        name="orderName"
                        value={formData.orderName || ''}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="연락처"
                        name="orderTel"
                        value={formData.orderTel || ''}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="이메일"
                        name="orderEmail"
                        value={formData.orderEmail || ''}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <Typography variant="subtitle1" mb={2}>
                        배송지 정보
                    </Typography>
                    <TextField
                        fullWidth
                        label="이름"
                        name="shipName"
                        value={formData.shipName || ''}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="연락처"
                        name="shipTel"
                        value={formData.shipTel || ''}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="주소"
                        name="shipAddr"
                        value={formData.shipAddr || ''}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="요청사항"
                        name="shipReq"
                        value={formData.shipReq || ''}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <Box display="flex" justifyContent="flex-end" mt={3}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#586555',
                                color: '#ffffff',
                                fontWeight: 'bold',
                                borderRadius: '8px',
                                boxShadow: 'none',
                                marginRight: '8px',
                                padding: '8px 16px',
                                '&:hover': {
                                    backgroundColor: '#82957E',
                                },
                            }}
                            onClick={handleSubmit}
                        >
                            수정
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#586555',
                                color: '#ffffff',
                                fontWeight: 'bold',
                                borderRadius: '8px',
                                boxShadow: 'none',
                                padding: '8px 16px',
                                '&:hover': {
                                    backgroundColor: '#82957E',
                                },
                            }}
                            onClick={handleCloseModal}
                        >
                            취소
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
};

export default OrderDetail;
