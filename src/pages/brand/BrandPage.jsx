import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const BrandPage = () => {
    const { brandId } = useParams();
    const [products, setProducts] = useState([]);
    const [brandName, setBrandName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/brand/${brandId}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.brandName) {
                    setBrandName(data.brandName);
                    setProducts(data.content || []);
                } else {
                    setBrandName("");
                    setProducts([]);
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
            <div>
                <Typography variant="h5" gutterBottom fontWeight="semibold" letterSpacing={3}>{brandName} 브랜드의 상품 목록</Typography>
                {products.length > 0 ? (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>상품명</TableCell>
                                    <TableCell>가격</TableCell>
                                    <TableCell>설명</TableCell>
                                    <TableCell>이미지 링크</TableCell>
                                    <TableCell>카테고리</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map(product => (
                                    <TableRow key={product.id}>
                                        <TableCell>{product.id}</TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.price}</TableCell>
                                        <TableCell>{product.description}</TableCell>
                                        <TableCell><a href={product.imageLink} target="_blank" rel="noopener noreferrer">{product.imageLink}</a></TableCell>
                                        <TableCell>{product.category ? product.category.categoryName : 'Unknown'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Typography variant="body1">{brandName} 브랜드에 속하는 상품이 없습니다.</Typography>
                )}
            </div>
        </Container>
    );
};

export default BrandPage;
