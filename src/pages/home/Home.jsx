import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider, Grid, Card, CardContent, CardMedia } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const banners = [
        'https://img.autocamping.co.kr/event/2024/240613Dair_main_PC.jpg', // 여기에 실제 이미지 경로를 입력하세요
        'https://img.autocamping.co.kr/event/2023/20231019SHELTER.jpg',
        'https://img.autocamping.co.kr/event/2022/event_0721.jpg',
    ];

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/product/all');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const randomProducts = getRandomProducts(data, 4);
                setProducts(randomProducts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchProducts();
    }, []);

    const getRandomProducts = (products, count) => {
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const handleCardClick = (productId) => {
        // 해당 제품 상세 페이지로 이동
        // navigate(`/product/${productId}`);
        console.log(`Navigate to product ${productId}`);
    };

    return (
        <Box px={5} py={2}>
            <Divider sx={{ backgroundColor: 'rgba(128, 128, 128, 0.8)', width: '100%', mb: 2 }} />
            <Slider {...settings}>
                {banners.map((banner, index) => (
                    <Box
                        key={index}
                        component="img"
                        src={banner}
                        alt={`Banner ${index + 1}`}
                        sx={{ width: '100%', height: 'auto' }}
                    />
                ))}
            </Slider>
            <Divider sx={{ backgroundColor: 'rgba(128, 128, 128, 0.8)', width: '100%', mb: 2, marginTop: '50px' }} />
            <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem', mt: 4, mb: 2 }}>최신 업데이트 상품</Typography>
            <Grid container spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={3}>
                        <Card onClick={() => handleCardClick(product.id)} style={{ cursor: 'pointer' }}>
                            <CardMedia component="img" height="140" image={product.imageLink} alt={product.name} />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    가격: {product.price}원
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Home;
