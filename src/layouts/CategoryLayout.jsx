import React from 'react';
import { Outlet } from 'react-router-dom';
import { Grid } from '@mui/material';
import CategorySidebar from '../pages/category/CategorySidebar';

const CategoryLayout = () => {
    return (
        <Grid container>
            <Grid item xs={3}>
                <CategorySidebar />
            </Grid>
            <Grid item xs={9}>
                <Outlet />
            </Grid>
        </Grid>
    );
};

export default CategoryLayout;
