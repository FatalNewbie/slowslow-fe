import React, { useEffect, useState, useContext } from 'react';
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
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import axios from 'axios'; // Axios 임포트
import { AuthContext } from '../user/AuthContext'; // AuthContext 임포트
import { useLocation, useNavigate } from 'react-router-dom';
import SvgIcon from '@mui/material/SvgIcon';

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}

const OrderList = () => {
    const { id, isLoggedIn, role, username } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 3;
    const navigate = useNavigate();
    const location = useLocation();

    const isCurrentPage = (path) => {
        return location.pathname === path;
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        console.log('Stored Token:', storedToken); // 토큰 값을 콘솔에 출력
        if (storedToken) {
            axios
                .get('http://localhost:8080/api/v1/mypage/orders', {
                    // URL에 /api/v1 추가
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${storedToken}`,
                    },
                })
                .then((response) => {
                    const data = response.data;
                    const sortedData = data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
                    setOrders(sortedData);
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
    }, [navigate]);

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

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid xs={6}>
                    <Box sx={{ fontSize: 27, fontWeight: 'bold' }}>주문목록</Box>
                </Grid>
                <Grid xs={6}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'right',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            gap: 1,
                            height: '100%',
                        }}
                    >
                        <Box sx={{ fontSize: 20, fontWeight: 'bold', color: 'rgb(195, 195, 195)' }}>마이페이지 &gt;</Box>
                        <Box sx={{ fontSize: 20, fontWeight: 'bold', color: `black` }}>주문목록</Box>
                    </Box>
                </Grid>
            </Grid>
            <hr
                style={{
                    height: `2px`,
                    backgroundColor: `black`,
                    border: 'none',
                }}
            />
            {/* 왼쪽 메뉴 */}
            <Box sx={{ width: 200, bgcolor: 'background.paper', position: 'fixed' }}>
                <Box className="bucket-list-header">
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        <HomeIcon color="white" />
                        마이페이지
                    </Typography>
                </Box>
                <List component="nav">
                    <ListItem
                        button
                        onClick={() => navigate('/mypage')}
                        // isCurrentPage 함수나 현재 페이지 상태를 통해 활성화 상태 관리
                        sx={{
                            backgroundColor: isCurrentPage('/checkPassword') ? '#586555' : 'transparent',
                            color: isCurrentPage('/checkPassword') ? 'common.white' : 'inherit',
                            '&:hover': {
                                backgroundColor: isCurrentPage('/checkPassword') ? '#6d7b77' : '#f0f0f0',
                            },
                        }}
                    >
                        <ListItemText primary="회원정보" />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => navigate('/mypage/orders')}
                        // isCurrentPage 함수나 현재 페이지 상태를 통해 활성화 상태 관리
                        sx={{
                            backgroundColor: 'transparent', // 기본 배경색 설정
                            color: 'inherit', // 기본 글자색 설정
                            '&:hover': {
                                backgroundColor: '#f0f0f0', // 호버 배경색 설정
                            },
                        }}
                    >
                        <ListItemText primary="주문목록" />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => navigate('/deleteUser')}
                        // isCurrentPage 함수나 현재 페이지 상태를 통해 활성화 상태 관리
                        sx={{
                            backgroundColor: 'transparent', // 기본 배경색 설정
                            color: 'inherit', // 기본 글자색 설정
                            '&:hover': {
                                backgroundColor: '#f0f0f0', // 호버 배경색 설정
                            },
                        }}
                    >
                        <ListItemText primary="회원탈퇴" />
                    </ListItem>
                </List>
            </Box>
            <Container maxWidth="md">
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
                                        <Grid item xs={12} sm={3} container direction="column" justifyContent="space-between">
                                            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                                                <Typography variant="subtitle2" sx={{ color: 'gray', marginRight: '8px' }}>
                                                    {String(order.id).padStart(5, '0')}
                                                </Typography>
                                                <Typography variant="h6">{new Date(order.createdDate).toLocaleDateString()}</Typography>
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
                                                onClick={() => navigate(`/mypage/orders/${order.id}`)}
                                            >
                                                주문상세 조회
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} sm={6} container justifyContent="center" alignItems="center">
                                            {order.orderDetails.map((detail) => (
                                                <Box key={detail.id} mx={1} textAlign="center">
                                                    <img
                                                        src={detail.orderImg}
                                                        alt={detail.productName} // alt 속성 추가
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
        </Box>
    );
};

export default OrderList;
