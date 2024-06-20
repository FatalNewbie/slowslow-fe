import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Divider, Button, Grid, Card, CardContent, CardMedia, TextField } from '@mui/material';

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cnt, setCnt] = useState(1); // 기본 수량은 1로 설정
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/product/${productId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [productId]);

    const handleCntChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value >= 1) {
            setCnt(value);
        } else {
            setCnt(1);
        }
    };

    const handleOrder = () => {
        // 주문 로직을 추가하시면 됩니다.
        console.log(`Ordered product ${product.name} with cnt ${cnt}`);
    };

    const handleAddToCart = () => {
        // 장바구니 추가 로직을 추가하시면 됩니다.
        console.log(`Added product ${product.id} to cart with cnt ${cnt}`);

        localStorage.setItem('productId', product.id);
        localStorage.setItem('productCnt', cnt);
        navigate('/cart/order');
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading product details: {error.message}</p>;
    }

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Typography variant="h5" gutterBottom fontWeight="bold" letterSpacing={3} mt={3}>
                        {product.name} - {product.brandName} / {product.categoryName}
                    </Typography>
                    <Card>
                        <CardMedia component="img" height="400" image={product.imageLink} alt={product.name} />
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="body1" gutterBottom>
                        판매가 {product.price}원
                    </Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <TextField
                        type="number"
                        label="Cnt"
                        variant="outlined"
                        value={cnt}
                        onChange={handleCntChange}
                        inputProps={{ min: 1 }}
                        style={{ marginBottom: '20px' }}
                    />
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                        Total {product.price * cnt}원
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOrder}
                        fullWidth
                        style={{ marginBottom: '10px' }}
                    >
                        주문하기
                    </Button>
                    <Button variant="outlined" color="primary" onClick={handleAddToCart} fullWidth>
                        장바구니에 담기
                    </Button>
                </Grid>
            </Grid>
            <Divider style={{ margin: '20px 0' }} />
            {/* 설명 */}
            <Typography variant="body1">{product.description}</Typography>
            <Typography variant="body1"></Typography>
        </Container>
    );
};

export default ProductDetail;
