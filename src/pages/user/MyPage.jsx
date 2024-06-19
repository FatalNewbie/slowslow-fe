import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
    const [userData, setUserData] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete('http://34.47.79.214:8080/api/v1/delete', {
                headers: {
                    Authorization: `${token}`,
                },
                params: {
                    username: username, // 현재 로그인한 사용자의 username
                },
            });
            localStorage.removeItem('token');
            navigate('/');
        } catch (error) {
            console.error('Error deleting user account:', error);
            alert('회원 탈퇴에 실패했습니다.');
        }
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
            <Typography variant="h4" sx={{ fontWeight: 'bold' }} mb={2}>
                마이페이지
            </Typography>
            <Typography variant="h6">이름: {userData.name}</Typography>
            <Typography variant="h6">이메일: {userData.username}</Typography>
            <Typography variant="h6">전화번호: {userData.phoneNumber}</Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    navigate('/checkPassword');
                }}
                sx={{ mt: 2 }}
            >
                정보 수정
            </Button>
            <Button variant="contained" color="primary" onClick={handleDeleteAccount} sx={{ mt: 2 }}>
                회원탈퇴
            </Button>
        </Box>
    );
};

export default MyPage;
