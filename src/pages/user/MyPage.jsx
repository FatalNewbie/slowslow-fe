import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { AuthContext } from './AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const MyPage = () => {
    const [userData, setUserData] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const { logout, isLoggedIn } = useContext(AuthContext);

    const location = useLocation();

    const isCurrentPage = (path) => {
        return location.pathname === path;
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            axios
                .get('/api/v1/mypage', {
                    headers: {
                        Authorization: `${storedToken}`,
                    },
                })
                .then((response) => {
                    setUserData(response.data);
                    setUsername(response.data.username);
                })
                .catch((error) => {
                    console.error('There was an error!', error);
                    navigate('/login');
                });
        } else {
            navigate('/login');
        }
    }, [navigate]);

    if (!userData) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'flex-start', gap: 4 }}>
            {/* 왼쪽 메뉴 */}
            <Box sx={{ width: 200, bgcolor: 'background.paper', position: 'fixed' }}>
                <Box className="bucket-list-header">
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        마이페이지
                    </Typography>
                </Box>
                <List component="nav">
                    <ListItem
                        button
                        onClick={() => navigate('/mypage')}
                        sx={{
                            backgroundColor: isCurrentPage('/mypage') ? '#586555' : 'transparent',
                            color: isCurrentPage('/mypage') ? 'common.white' : 'inherit',
                            '&:hover': {
                                backgroundColor: isCurrentPage('/mypage') ? '#6d7b77' : '#f0f0f0',
                            },
                        }}
                    >
                        <ListItemText primary="회원정보" />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => navigate('/orders')}
                        sx={{
                            backgroundColor: isCurrentPage('/orders') ? '#586555' : 'transparent',
                            color: isCurrentPage('/orders') ? 'common.white' : 'inherit',
                            '&:hover': {
                                backgroundColor: isCurrentPage('/orders') ? '#6d7b77' : '#f0f0f0',
                            },
                        }}
                    >
                        <ListItemText primary="주문목록" />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => navigate('/deleteUser')}
                        sx={{
                            backgroundColor: isCurrentPage('/delete') ? '#586555' : 'transparent',
                            color: isCurrentPage('/delete') ? 'common.white' : 'inherit',
                            '&:hover': {
                                backgroundColor: isCurrentPage('/delete') ? '#6d7b77' : '#f0f0f0',
                            },
                        }}
                    >
                        <ListItemText primary="회원탈퇴" />
                    </ListItem>
                </List>
            </Box>

            {/* 오른쪽 컨텐츠 */}
            <Box sx={{ ml: 60, pl: 6, pt: 4, pr: 6, pb: 4, flexGrow: 0.3, border: '2px solid #586555', borderRadius: '10px' }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    {userData.name}님
                </Typography>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    계&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;정 | {userData.username}
                </Typography>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    전화번호 | {userData.phoneNumber}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/checkPassword')}
                    sx={{
                        mt: 2,
                        bgcolor: '#586555',
                        float: 'right',
                        '&:hover': {
                            backgroundColor: '#6d7b77',
                        },
                    }}
                >
                    정보 수정
                </Button>
            </Box>
        </Box>
    );
};

export default MyPage;
