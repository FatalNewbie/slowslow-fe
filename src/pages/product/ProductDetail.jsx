import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Typography, Divider } from '@mui/material';

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading product details: {error.message}</p>;
    }

    return (
        <Container>
            <Typography variant="h5" gutterBottom fontWeight="semibold" letterSpacing={3}>
                Product Detail
            </Typography>
            <img src={product.imageLink} alt={product.name} style={{ maxWidth: '200px', maxHeight: '200px' }} />
            <Typography variant="body1">Name: {product.name}</Typography>
            <Typography variant="body1">BrandName: {product.brandName}</Typography>
            <Typography variant="body1">CategoryName: {product.categoryName}</Typography>
            <Typography variant="body1">Description: {product.description}</Typography>
            <Typography variant="body1">Price: {product.price}원</Typography>

            <Link to={`/product/${product.id}`}>
                {' '}
                {/* 이거 수정해서 장바구니, 주문으로 가면 될거 같아요 */}
                <button>주문하기</button>
            </Link>
            <Link to={`/product/${product.id}`}>
                {' '}
                {/* 이거 수정해서 장바구니, 주문으로 가면 될거 같아요 */}
                <button>장바구니</button>
            </Link>
            <Divider style={{ margin: '20px 0' }} />
        </Container>
    );
};

export default ProductDetail;
