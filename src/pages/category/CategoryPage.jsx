import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

const CategoryPage = () => {
    const { id: categoryId } = useParams(); // useParams로부터 id를 가져와 categoryId로 사용
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 카테고리 정보 가져오기
        fetch(`http://localhost:8080/category/all`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const categoriesMap = {};
                data.forEach((category) => {
                    categoriesMap[category.id] = category.categoryName;
                });
                setCategories(categoriesMap);
            })
            .catch((error) => {
                setError(error);
            });

        // 해당 카테고리에 속한 상품 정보 가져오기
        fetch(`http://localhost:8080/category/${categoryId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setProducts(data.content);
                setLoading(false);
            })
            .catch((error) => {
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

    const getCategoryName = (categoryId) => {
        return categories[categoryId] || 'Unknown';
    };

    const handleCardClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <Container>
            <Typography variant="h5" gutterBottom fontWeight="semibold" letterSpacing={3} marginBottom={'20px'}>
                {getCategoryName(categoryId)} - 상품 목록
            </Typography>
            {products.length > 0 ? (
                <Grid container spacing={4}>
                    {products.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={4}>
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
            ) : (
                <Typography variant="body1">
                    {getCategoryName(categoryId)} 카테고리에 속하는 상품이 없습니다.
                </Typography>
            )}
        </Container>
    );
};

export default CategoryPage;
