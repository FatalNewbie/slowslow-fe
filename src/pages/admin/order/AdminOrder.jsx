import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import AdminOrderItem from './AdminOrderItem';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { GiConsoleController } from 'react-icons/gi';

function AdminOrder() {
    //모든 주문의 목록을 담고 있는 변수
    const [allOrder, setAllOrder] = useState([]);
    // 주문준비중인 주문의 목록을 담고 있는 변수
    const [preparingOrder, setPreparingOrder] = useState(0);
    // 배송중인 주문의 목록을 담고 있는 변수
    const [shippingOrder, setShippingOrder] = useState(0);
    // 배송완료된 주문의 목록을 담고 있는 변수
    const [completedOrder, setCompletedOrder] = useState(0);

    const initAllOrder = async () => {
        const response = await fetch(`http://localhost:8080/admin/orders`);
        const data = await response.json();
        setAllOrder(data);
    };

    //초기값세팅.
    useEffect(() => {
        //allOrder변수 초기화.
        console.log('초기값세팅 호출');
        initAllOrder();
    }, []);

    return (
        <Box>
            <Container maxWidth="lg" sx={{ mb: 15 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={1}>
                        <Grid xs={12}>
                            <Box sx={{ fontSize: 27, fontWeight: 'bold' }}>회원주문관리</Box>
                        </Grid>
                    </Grid>
                    <hr
                        style={{
                            height: `2px`,
                            backgroundColor: `black`,
                            border: 'none',
                        }}
                    />
                </Box>
                <Box sx={{ flweGrow: 1 }}>
                    <Grid container spacing={4} sx={{ mt: 3 }}>
                        <Grid xs={3} sx={{ textAlign: `center` }}>
                            <Box sx={{ fontSize: 29, fontWeight: 'bold' }}>총주문수</Box>
                            <Box sx={{ fontSize: 29, fontWeight: 'bold', mt: 2 }}>{allOrder.length}</Box>
                        </Grid>
                        <Grid xs={3} sx={{ textAlign: `center` }}>
                            <Box sx={{ fontSize: 29, fontWeight: 'bold' }}>준비중</Box>
                            <Box sx={{ fontSize: 29, fontWeight: 'bold', mt: 2 }}>{preparingOrder}</Box>
                        </Grid>
                        <Grid xs={3} sx={{ textAlign: `center` }}>
                            <Box sx={{ fontSize: 29, fontWeight: 'bold' }}>배송중</Box>
                            <Box sx={{ fontSize: 29, fontWeight: 'bold', mt: 2 }}>{shippingOrder}</Box>
                        </Grid>
                        <Grid xs={3} sx={{ textAlign: `center` }}>
                            <Box sx={{ fontSize: 29, fontWeight: 'bold' }}>배송완료</Box>
                            <Box sx={{ fontSize: 29, fontWeight: 'bold', mt: 2 }}>{completedOrder}</Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ flexGrow: 1, mt: 10 }}>
                    <Grid
                        container
                        spacing={6}
                        sx={{
                            textAlign: `center`,
                            fontWeight: 'bold',
                            backgroundColor: `RGB(150,164,147)`,
                            height: 43,
                        }}
                    >
                        <Grid
                            xs={1}
                            p={0}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            주문번호
                        </Grid>
                        <Grid
                            xs={3}
                            p={0}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            주문내용
                        </Grid>
                        <Grid
                            xs={1.5}
                            p={0}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            주문총액
                        </Grid>
                        <Grid
                            xs={1}
                            p={0}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            주문자
                        </Grid>
                        <Grid
                            xs={1.5}
                            p={0}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            주문날짜
                        </Grid>
                        <Grid
                            xs={4}
                            p={0}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            상태관리
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    {console.log(allOrder)}
                    {allOrder.map((order) => (
                        // key는 React.js에서만, map안에서 component들을 render할 때 사용한다.

                        <Box key={order.id}>
                            {order.status !== 'CANCELLED' ? (
                                <AdminOrderItem
                                    orderId={order.id}
                                    totalPrice={order.totalPrice.toLocaleString('ko-KR')}
                                    orderName={order.orderName}
                                    orderDate={order.createdDate}
                                    orderStatus={order.status}
                                />
                            ) : (
                                ''
                            )}
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}

export default AdminOrder;
