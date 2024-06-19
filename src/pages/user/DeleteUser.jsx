import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // AuthContext 임포트
import { Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';

const DeleteUserForm = () => {
    const { logout, isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm('정말로 회원탈퇴를 하시겠습니까?');
        if (confirmDelete) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete('/api/v1/delete', {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                logout();
                navigate('/');
            } catch (error) {
                console.error('Error deleting user account:', error);
                alert('회원 탈퇴에 실패했습니다.');
            }
        }
    };

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
                            backgroundColor: 'transparent',
                            color: 'inherit',
                            '&:hover': {
                                backgroundColor: '#f0f0f0',
                            },
                        }}
                    >
                        <ListItemText primary="회원정보" />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => navigate('/orders')}
                        sx={{
                            backgroundColor: 'transparent',
                            color: 'inherit',
                            '&:hover': {
                                backgroundColor: '#f0f0f0',
                            },
                        }}
                    >
                        <ListItemText primary="주문목록" />
                    </ListItem>
                    <ListItem
                        button
                        onClick={handleDeleteAccount}
                        sx={{
                            backgroundColor: '#586555',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#6d7b77',
                            },
                        }}
                    >
                        <ListItemText primary="회원탈퇴" />
                    </ListItem>
                </List>
            </Box>

            {/* 회원 탈퇴 폼 */}
            <Box sx={{ ml: 60, pl: 6, pt: 4, pr: 6, pb: 4, flexGrow: 0.3, border: '2px solid #586555', borderRadius: '10px' }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    회원 탈퇴
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    정말로 회원 탈퇴를 하시겠습니까?
                </Typography>
                <Button
                    onClick={() => navigate('/mypage')}
                    variant="contained"
                    sx={{
                        bgcolor: '#586555',
                        color: '#fff',
                        float: 'right',
                        '&:hover': {
                            backgroundColor: '#6d7b77',
                        },
                    }}
                >
                    취&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소
                </Button>
                <Button
                    onClick={handleDeleteAccount}
                    variant="contained"
                    sx={{
                        bgcolor: '#586555',
                        color: '#fff',
                        float: 'right',
                        mr: '5px',
                        '&:hover': {
                            backgroundColor: '#6d7b77',
                        },
                    }}
                >
                    회원탈퇴
                </Button>
            </Box>
        </Box>
    );
};

export default DeleteUserForm;
