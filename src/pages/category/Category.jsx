import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { Link } from 'react-router-dom';

const CategoryPage = () => {
    const { id: categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/category/all')
            .then((response) => response.json())
            .then((data) => {
                const allCategories = [{ id: 'all', categoryName: '전체 보기' }, ...data];
                setCategories(allCategories);
            })
            .catch((error) => console.error('Error fetching data:', error));

        fetchProducts(categoryId);
    }, [categoryId]);

    const fetchProducts = (categoryId) => {
        const url =
            categoryId && categoryId !== 'all'
                ? `http://localhost:8080/category/${categoryId}`
                : 'http://localhost:8080/products/all';

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setProducts(data.content || data); // Adjust according to your backend response
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    };

    const filteredCategories = categories.filter((category) =>
        category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCardClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <Container>
            <Grid container spacing={4}>
                <Grid item xs={3}>
                    <Typography variant="h5" gutterBottom>
                        카테고리 목록
                    </Typography>
                    <TextField
                        label="카테고리 검색"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>카테고리명</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredCategories.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell>
                                            <Link to={`/category/${category.id}`}>{category.categoryName}</Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="h5" gutterBottom>
                        상품 목록
                    </Typography>
                    {products.length > 0 ? (
                        <Grid container spacing={4}>
                            {products.map((product) => (
                                <Grid item key={product.id} xs={12} sm={6} md={4}>
                                    <Card onClick={() => handleCardClick(product.id)} style={{ cursor: 'pointer' }}>
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
                        <Typography variant="body1">해당 카테고리에 속하는 상품이 없습니다.</Typography>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default CategoryPage;
