import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material'; // Material-UI 라이브러리 사용 예시

const LatestModifiedProducts = ({ products, handleCardClick }) => {
    return (
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
    );
};

export default LatestModifiedProducts;
