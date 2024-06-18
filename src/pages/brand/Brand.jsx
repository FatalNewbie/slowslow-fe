import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const BrandList = () => {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/brand/all')
            .then((response) => response.json())
            .then((data) => setBrands(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <Container>
            <div className="brand-list">
                <Typography variant="h5" gutterBottom>
                    브랜드 목록
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>브랜드명</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {brands.map((brand) => (
                                <TableRow key={brand.id}>
                                    <TableCell>
                                        <Link to={`/brand/${brand.id}`}>{brand.brandName}</Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Container>
    );
};

export default BrandList;
