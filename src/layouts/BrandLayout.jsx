import React from 'react';
import { Outlet } from 'react-router-dom';
import { Grid } from '@mui/material';
import BrandSidebar from '../pages/brand/BrandSidebar';

const BrandLayout = () => {
    return (
        <Grid container>
            <Grid item xs={3}>
                <BrandSidebar />
            </Grid>
            <Grid item xs={9}>
                <Outlet />
            </Grid>
        </Grid>
    );
};

export default BrandLayout;
