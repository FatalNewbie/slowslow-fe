import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import AdminOrderItem from './AdminOrderItem';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { GiConsoleController } from 'react-icons/gi';
import CircularProgress from '@mui/material/CircularProgress';

function AdminOrder() {
    //모든 주문의 목록을 담고 있는 변수
    const [orderList, setOrderList] = useState([]);
    // 모든 주문 수(삭제 제외)의 목록을 담고 있는 변수
    const [allOrder, setAllOrder] = useState(0);
    // 주문준비중인 주문의 수를 담고 있는 변수
    const [preparingOrder, setPreparingOrder] = useState(0);
    // 배송중인 주문의 수를 담고 있는 변수
    const [shippingOrder, setShippingOrder] = useState(0);
    // 배송완료된 주문의 수를 담고 있는 변수
    const [completedOrder, setCompletedOrder] = useState(0);
    // 주문실패된 주문의 수를 담고 있는 변수
    const [failedOrder, setFailedOrder] = useState(0);

    // 백에서 모든 주문을 가져오고, status별 주문 수를 체크함.
    const init = async () => {
        const response = await fetch(`http://localhost:8080/admin/orders`);
        const data = await response.json();

        console.log(data);

        // 총 주문수(삭제건은 제외)
        let orderAll = 0;
        // 준비중 주문수
        let orderPreparing = 0;
        // 배송중 주문수
        let orderShipping = 0;
        // 배송완료 주문수
        let orderCompleted = 0;
        // 주문실패 주문수
        let orderFailed = 0;

        data.map((order) => {
            console.log(order.status);
            if (order.status === 'PENDING') {
                orderPreparing = orderPreparing + 1;
                orderAll = orderAll + 1;
            } else if (order.status === 'SHIPPING') {
                orderShipping = orderShipping + 1;
                orderAll = orderAll + 1;
            } else if (order.status === 'COMPLETED') {
                orderCompleted = orderCompleted + 1;
                orderAll = orderAll + 1;
            } else if (order.status === 'FAILED') {
                orderFailed = orderFailed + 1;
                orderAll = orderAll + 1;
            }
        });

        setAllOrder(orderAll);
        setPreparingOrder(orderPreparing);
        setShippingOrder(orderShipping);
        setCompletedOrder(orderCompleted);
        setFailedOrder(orderFailed);

        setOrderList(data);
    };

    //초기값세팅.
    useEffect(() => {
        //allOrder변수 초기화.

        init();
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
                    <Grid container spacing={5} sx={{ mt: 3 }}>
                        <Grid xs={2.4} sx={{ textAlign: `center` }}>
                            <Box sx={{ fontSize: 29, fontWeight: 'bold' }}>총주문수</Box>
                            <Box sx={{ fontSize: 29, fontWeight: 'bold', mt: 2 }}>{allOrder}</Box>
                        </Grid>
                        <Grid xs={2.4} sx={{ textAlign: `center` }}>
                            <Box sx={{ fontSize: 29, fontWeight: 'bold' }}>준비중</Box>
                            <Box sx={{ fontSize: 29, fontWeight: 'bold', mt: 2 }}>{preparingOrder}</Box>
                        </Grid>
                        <Grid xs={2.4} sx={{ textAlign: `center` }}>
                            <Box sx={{ fontSize: 29, fontWeight: 'bold' }}>배송중</Box>
                            <Box sx={{ fontSize: 29, fontWeight: 'bold', mt: 2 }}>{shippingOrder}</Box>
                        </Grid>
                        <Grid xs={2.4} sx={{ textAlign: `center` }}>
                            <Box sx={{ fontSize: 29, fontWeight: 'bold' }}>배송완료</Box>
                            <Box sx={{ fontSize: 29, fontWeight: 'bold', mt: 2 }}>{completedOrder}</Box>
                        </Grid>
                        <Grid xs={2.4} sx={{ textAlign: `center` }}>
                            <Box sx={{ fontSize: 29, fontWeight: 'bold' }}>주문실패</Box>
                            <Box sx={{ fontSize: 29, fontWeight: 'bold', mt: 2 }}>{failedOrder}</Box>
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
                            주문ID
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
                {orderList.length !== 0 ? (
                    <Box>
                        {orderList.map((order) => (
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
                ) : (
                    <Box sx={{ textAlign: 'center', mt: 13 }}>
                        <CircularProgress color="success" size={60} />
                    </Box>
                )}
            </Container>
        </Box>
    );
}

export default AdminOrder;

// 상태관리 바꾸면 위에 주문 수들 실시간으로 바꾸게 수정해야함.
// 바꿀떄마다 불러오지말고 변수 숫자 바꾸는 방법으로 가볍게.
// 삭제할떄는 그냥 전부 다시 불러와야할듯?
