import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, TextField } from '@mui/material';

const CategorySidebar = () => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://34.47.79.214:8080/category/all')
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const filteredCategories = categories.filter((category) =>
        category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <TextField
                label="카테고리 검색"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <List>
                <ListItem button component={Link} to={`/category`}>
                    <ListItemText primary="전체 보기" />
                </ListItem>
                {filteredCategories.map((category) => (
                    <ListItem button key={category.id} component={Link} to={`/category/${category.id}`}>
                        <ListItemText primary={category.categoryName} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default CategorySidebar;
