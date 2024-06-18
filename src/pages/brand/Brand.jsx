import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material';

const BrandList = () => {
    const [brands, setBrands] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/brand/all')
            .then((response) => response.json())
            .then((data) => setBrands(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const filteredBrands = brands.filter((brand) => brand.brandName.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <Container>
            <div className="brand-list">
                <Typography variant="h5" gutterBottom>
                    브랜드 목록
                </Typography>
                <TextField
                    label="브랜드 검색"
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
                                <TableCell>브랜드명</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredBrands.map((brand) => (
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
