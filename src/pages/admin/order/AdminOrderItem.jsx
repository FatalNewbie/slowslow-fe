import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';

function AdminOrderItem({ orderId, totalPrice, orderName, orderDate, orderStatus }) {
    return (
        <Box sx={{ flexGrow: 1, mt: 3 }}>
            <Grid
                container
                spacing={6}
                sx={{
                    textAlign: `center`,
                    fontWeight: 'bold',

                    height: 43,
                }}
            >
                <Grid
                    xs={1}
                    p={0}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {orderId}
                </Grid>
                <Grid
                    xs={3}
                    p={0}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    주문내용
                </Grid>
                <Grid
                    xs={1.5}
                    p={0}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {totalPrice}
                </Grid>
                <Grid
                    xs={1}
                    p={0}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {orderName}
                </Grid>
                <Grid
                    xs={1.5}
                    p={0}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {orderDate}
                </Grid>
                <Grid
                    xs={4}
                    p={0}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {orderStatus}
                </Grid>
            </Grid>
        </Box>
    );
}

export default AdminOrderItem;
