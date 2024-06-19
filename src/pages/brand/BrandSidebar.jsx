import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, TextField } from '@mui/material';

const BrandSidebar = () => {
    const [brands, setBrands] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://34.47.79.214:8080/brand/all')
            .then((response) => response.json())
            .then((data) => setBrands(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const filteredBrands = brands.filter((brand) => brand.brandName.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div>
            <TextField
                label="브랜드 검색"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <List>
                <ListItem button component={Link} to={`/brand`}>
                    <ListItemText primary="전체 보기" />
                </ListItem>
                {filteredBrands.map((brand) => (
                    <ListItem button key={brand.id} component={Link} to={`/brand/${brand.id}`}>
                        <ListItemText primary={brand.brandName} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default BrandSidebar;
