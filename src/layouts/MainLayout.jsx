import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh" width="100%">
            {/* width 추가 */}
            <Header />
            <Box component="main" flex="1" p={4} sx={{ paddingLeft: '10%', paddingRight: '10%' }}>
                <Outlet />
            </Box>
            <Footer />
        </Box>
    );
};

export default MainLayout;
