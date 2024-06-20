import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { Grid, Button } from '@mui/material';
import { FaRegCreditCard } from 'react-icons/fa';
import { Margin, Padding } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
    const navigate = useNavigate();

    const handleAdminOrder = () => {
        navigate('/admin/order');
    };

    const handleAdminProduct = () => {
        navigate('/admin/product');
    };

    const handleAdminCategory = () => {
        navigate('/admin/category');
    };

    return (
        <Box justifyContent="center" sx={{ '& button': { mt: 3, mb: 2, ml: 4, mr: 4 } }}>
            {/* <Divider sx={{ backgroundColor: 'rgba(128, 128, 128, 0.8)', width: '100%', mb: 1 }} /> */}
            <Box display="flex" justifyContent="center">
                <Button
                    variant="outlined"
                    sx={{
                        color: 'rgba(128, 128, 128, 1)',
                        border: '1px solid rgba(128, 128, 128, 0.8)',
                        fontSize: '24px',
                        width: '350px',
                        height: '150px',
                        borderRadius: '12px',
                    }}
                    onClick={handleAdminOrder}
                >
                    주문 관리
                </Button>
                <Button
                    variant="outlined"
                    sx={{
                        color: 'rgba(128, 128, 128, 1)',
                        border: '1px solid rgba(128, 128, 128, 0.8)',
                        fontSize: '24px',
                        width: '350px',
                        height: '150px',
                        borderRadius: '12px',
                    }}
                >
                    회원 관리
                </Button>
            </Box>
            <Box display="flex" justifyContent="center">
                <Button
                    variant="outlined"
                    sx={{
                        color: 'rgba(128, 128, 128, 1)',
                        border: '1px solid rgba(128, 128, 128, 0.8)',
                        fontSize: '24px',
                        width: '350px',
                        height: '150px',
                        borderRadius: '12px',
                    }}
                    onClick={handleAdminCategory}
                >
                    카테고리 추가
                </Button>
                <Button
                    variant="outlined"
                    sx={{
                        color: 'rgba(128, 128, 128, 1)',
                        border: '1px solid rgba(128, 128, 128, 0.8)',
                        fontSize: '24px',
                        width: '350px',
                        height: '150px',
                        borderRadius: '12px',
                    }}
                    onClick={handleAdminProduct}
                >
                    제품 추가
                </Button>
            </Box>
        </Box>
    );
};

export default AdminHome;
