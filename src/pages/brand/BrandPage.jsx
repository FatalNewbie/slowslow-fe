import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

const BrandPage = () => {
    const { id: brandId } = useParams();
    const [products, setProducts] = useState([]);
    const [brandName, setBrandName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/brand/${brandId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data.content);
                if (data.content.length > 0) {
                    setBrandName(data.content[0].brandName); // Assuming brandId is the name
                } else {
                    setBrandName("Unknown");
                }
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [brandId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading products: {error.message}</p>;
    }

    return (
        <Container>
            <Typography variant="h5" gutterBottom fontWeight="semibold" letterSpacing={3}>
                {brandName} 브랜드의 상품 목록
            </Typography>
            {products.length > 0 ? (
                <Grid container spacing={4}>
                    {products.map(product => (
                        <Grid item key={product.id} xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={product.imageLink}
                                    alt={product.name}
                                />
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
            ) : (
                <Typography variant="body1">
                    {brandName} 브랜드에 속하는 상품이 없습니다.
                </Typography>
            )}
        </Container>
    );
};

export default BrandPage;
