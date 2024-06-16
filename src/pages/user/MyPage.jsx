import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('/api/v1/mypage', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
                navigate('/login'); // 토큰이 유효하지 않거나 에러가 발생하면 로그인 페이지로 리다이렉트
            });
        } else {
            navigate('/login');
        }
    }, [navigate]);

    if (!userData) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box px={5} py={2}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }} mb={2}>마이페이지</Typography>
            <Typography variant="h6">이름: {userData.name}</Typography>
            <Typography variant="h6">이메일: {userData.username}</Typography>
            <Typography variant="h6">전화번호: {userData.phoneNumber}</Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    localStorage.removeItem('token');
                    navigate('/login');
                }}
                sx={{ mt: 2 }}
            >
                로그아웃
            </Button>
        </Box>
    );
};

export default MyPage;
