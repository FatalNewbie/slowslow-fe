import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

function Order() {
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 주문 페이지 데이터를 가져오는 함수
        const fetchOrderData = async () => {
            try {
                const response = await fetch('/orders/order-page'); // 실제 엔드포인트를 사용하세요
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setOrderData(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderData();
    }, []);

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
        <Container>
            <Typography variant="h4" gutterBottom>
                Order Page
            </Typography>
            {orderData ? (
                <List>
                    {orderData.orderDetails.map((detail) => (
                        <ListItem key={detail.id}>
                            <ListItemText
                                primary={detail.productName}
                                secondary={`Quantity: ${detail.quantity} - Price: ${detail.price}`}
                            />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant="h6">No order data available.</Typography>
            )}
        </Container>
    );
}

export default Order;
