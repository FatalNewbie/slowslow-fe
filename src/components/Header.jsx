import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Stack } from '@mui/material';
import { FaUser, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CampingImage from '../assets/campingicon.png'; // 이미지 파일 가져오기

const Header = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const handleBrandClick = () => {
        navigate(`/brand`);
    };

    const handleCategoryClick = () => {
        navigate(`/category`);
    };

    useEffect(() => {
        fetch('http://localhost:8080/category/all')
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 3, mb: 2 }}>
            <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', px: 8, mt: 7, mb: 4 }}>
                <Box sx={{ flex: 1, pl: 22 }} />
                <Stack direction="row" spacing={1.5} alignItems="center">
                    <img src={CampingImage} alt="캠핑" style={{ width: '65px', height: '65px', marginTop: '-14px' }} />
                    <Typography sx={{ fontWeight: 'bold', letterSpacing: 4, fontSize: '1.8rem' }}>늘짝늘짝</Typography>
                </Stack>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', pr: 22 }}>
                    <Stack direction="row" spacing={2}>
                        <IconButton color="inherit">
                            <FaSignOutAlt size="1.2em" />
                        </IconButton>
                        <IconButton color="inherit">
                            <FaUser size="1.2em" />
                        </IconButton>
                        <IconButton color="inherit">
                            <FaShoppingCart size="1.2em" />
                        </IconButton>
                    </Stack>
                </Box>
            </Toolbar>
            <Box sx={{ backgroundColor: '#586555', py: 1.2, display: 'flex', justifyContent: 'center' }}>
                <Stack direction="row" spacing={3} alignItems="center">
                    <Button sx={{ color: 'white', fontWeight: 'bold' }} onClick={() => handleBrandClick()}>
                        브랜드
                    </Button>
                    <Button sx={{ color: 'white', fontWeight: 'bold' }} onClick={() => handleCategoryClick()}>
                        카테고리
                    </Button>
                    {categories.slice(0, 4).map((category) => (
                        <Typography
                            variant="body2"
                            sx={{ color: 'white', cursor: 'pointer', alignSelf: 'center', fontSize: '0.875rem' }}
                        >
                            {category.categoryName}
                        </Typography>
                    ))}
                </Stack>
            </Box>
        </AppBar>
    );
};

export default Header;
