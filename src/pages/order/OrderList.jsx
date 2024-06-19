import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    CircularProgress,
    Divider,
    Pagination,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
} from '@mui/material';
import { useToken } from '../../contexts/TokenContext'; // TokenContext 임포트
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트

const OrderList = () => {
    const { token } = useToken(); // Context에서 토큰 가져오기
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 3; // 한 페이지에 보여줄 주문 수
    const navigate = useNavigate(); // useNavigate 훅 사용

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://34.47.79.214:8080/mypage/orders', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                // 최신 주문순으로 정렬 (내림차순)
                const sortedData = data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
                setOrders(sortedData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [token]);

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

    // 현재 페이지에 해당하는 주문 데이터 계산
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    // 페이지 변경 핸들러
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // 숫자에 천 단위 구분자 추가 함수
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return (
        <Container maxWidth="md">
            {' '}
            {/* Container의 최대 너비를 "md"로 조정 */}
            <Typography sx={{ fontWeight: 'bold', fontSize: '1.7rem' }} mb={1} ml={5}>
                주문내역
            </Typography>
            <Divider sx={{ backgroundColor: 'rgba(128, 128, 128, 0.8)', width: '100%', mb: 2 }} />
            {currentOrders.length > 0 ? (
                <>
                    {currentOrders.map((order) => (
                        <Card key={order.id} sx={{ mb: 3 }}>
                            <CardContent>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid
                                        item
                                        xs={12}
                                        sm={3}
                                        container
                                        direction="column"
                                        justifyContent="space-between"
                                    >
                                        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                                            <Typography variant="subtitle2" sx={{ color: 'gray', marginRight: '8px' }}>
                                                {String(order.id).padStart(5, '0')}
                                            </Typography>
                                            <Typography variant="h6">
                                                {new Date(order.createdDate).toLocaleDateString()}
                                            </Typography>
                                        </Box>
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
                                            onClick={() => navigate(`/mypage/orders/${order.id}`)} // 버튼 클릭 시 경로 이동
                                        >
                                            주문상세 조회
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={6} container justifyContent="center" alignItems="center">
                                        {order.orderDetails.map((detail) => (
                                            <Box key={detail.id} mx={1} textAlign="center">
                                                <img
                                                    src={detail.orderImg}
                                                    style={{ width: '100px', height: '100px' }}
                                                />
                                                <Typography variant="body2">{detail.productName}</Typography>
                                            </Box>
                                        ))}
                                    </Grid>
                                    <Grid item xs={12} sm={3} container direction="column" justifyContent="flex-end">
                                        <Typography variant="h5" align="right">
                                            <Box component="span" sx={{ fontWeight: 'bold', marginRight: '2px' }}>
                                                {formatNumber(order.totalPrice)}
                                            </Box>
                                            <Box component="span" sx={{ fontSize: '0.875rem' }}>
                                                원
                                            </Box>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    ))}
                    <Box display="flex" justifyContent="center" mt={3}>
                        <Pagination
                            count={Math.ceil(orders.length / ordersPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                            sx={{
                                '& .MuiPaginationItem-root': {
                                    color: '#000000',
                                    '&:hover': {
                                        backgroundColor: '#82957E',
                                        color: '#ffffff',
                                    },
                                },
                                '& .MuiPaginationItem-previousNext': {
                                    color: '#000000',
                                },
                                '& .MuiPaginationItem-root.Mui-selected': {
                                    backgroundColor: '#586555',
                                    color: '#ffffff',
                                },
                            }}
                        />
                    </Box>
                </>
            ) : (
                <Typography variant="h6">No orders found.</Typography>
            )}
        </Container>
    );
};

export default OrderList;
