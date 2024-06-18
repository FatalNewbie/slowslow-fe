import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Stack } from '@mui/material';
import { FaUser, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CampingImage from '../assets/campingicon.png'; // 이미지 파일 가져오기
import { checkTokenValidity, setToken, removeToken } from '../utils/auth';

const Header = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    useEffect(() => {
        const tokenIsValid = checkTokenValidity();
        console.log('Token is valid:', tokenIsValid); // 디버깅용 로그
        setIsLoggedIn(tokenIsValid);
    }, []);

    const handleHome = () => {
        navigate('/');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        removeToken();
        setIsLoggedIn(false);
        navigate('/');
    };

    const handleMyPage = () => {
        navigate('mypage');
    };
    return (
        <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 3, mb: 2 }}>
            <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', px: 8, mt: 7, mb: 4 }}>
                <Box sx={{ flex: 1, pl: 22 }} />
                <Box sx={{ cursor: 'pointer' }} onClick={handleHome}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <img
                            src={CampingImage}
                            alt="캠핑"
                            style={{ width: '65px', height: '65px', marginTop: '-14px' }}
                        />
                        <Typography sx={{ fontWeight: 'bold', letterSpacing: 4, fontSize: '1.8rem' }}>
                            늘짝늘짝
                        </Typography>
                    </Stack>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', pr: 22 }}>
                    <Stack direction="row" spacing={2}>
                        {isLoggedIn ? (
                            <>
                                <IconButton color="inherit" onClick={handleLogout}>
                                    <FaSignOutAlt size="1.2em" />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                <IconButton color="inherit" onClick={handleLogin}>
                                    <FaSignInAlt size="1.2em" />
                                </IconButton>
                            </>
                        )}
                        <IconButton color="inherit" onClick={handleMyPage}>
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
