import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

const CategoryPage = () => {
    const { id: categoryId } = useParams(); // useParams로부터 id를 가져와 categoryId로 사용
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/category/${categoryId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data.content);
                if (data.content.length > 0) {
                    setCategoryName(data.content[0].categoryName); // Assuming categoryId is the name
                } else {
                    setCategoryName("Unknown");
                }
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [categoryId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading products: {error.message}</p>;
    }

    return (
        <Container>
            <Typography variant="h5" gutterBottom fontWeight="semibold" letterSpacing={3}>
                {categoryName} 카테고리의 상품 목록
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
                    {categoryName} 카테고리에 속하는 상품이 없습니다.
                </Typography>
            )}
        </Container>
    );
};

export default CategoryPage;
