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

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/category/all')
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const filteredCategories = categories.filter((category) =>
        category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container>
            <div className="category-list">
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
            </div>
        </Container>
    );
};

export default CategoryList;
