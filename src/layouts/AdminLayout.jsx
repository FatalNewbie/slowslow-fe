import React from 'react';
import { Box } from '@mui/material';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function AdminLayout() {
    const navigate = useNavigate();

    if (localStorage.getItem('role') === 'ROLE_ADMIN') {
        return (
            <Box display="flex" flexDirection="column" minHeight="100vh" width="100%">
                {/* width 추가 */}
                <Header />
                <Box
                    component="main"
                    flex="1"
                    p={4}
                    sx={{ justifyContent: 'center', paddingLeft: '10%', paddingRight: '10%' }}
                >
                    <Outlet />
                </Box>
                <Footer />
            </Box>
        );
    } else {
        navigate('/');
    }
}

export default AdminLayout;
