import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

function AdminOrderItem({ orderId, totalPrice, orderName, orderDate, orderStatus }) {
    const [value, setValue] = useState(orderStatus);

    // 주문상태 드롭박스 변경 이벤트 핸들러
    const handleChange = async (event) => {
        setValue(event.target.value);

        const url = `http://localhost:8080/admin/orders/${orderId}?status=${event.target.value}`;
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to update order status');
            }

            const updatedOrder = await response.json();
            console.log('Order updated successfully:', updatedOrder.status);
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    // 주문날짜에서 초를 제외하고 출력하기위한 변수
    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    return (
        <Box sx={{ flexGrow: 1, mt: 4 }}>
            <Grid
                container
                spacing={7}
                sx={{
                    textAlign: `center`,
                    fontWeight: 'bold',
                    borderBottom: 1,
                    height: 47,
                    backgroundColor: `RGB(233,233,233)`,
                    mr: -3,
                    ml: -3,
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
                    {/*주문금액*/ totalPrice}
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
                    {/*주문자*/ orderName}
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
                    {/*주문날짜*/ formatDateTime(orderDate)}
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
                    <Box sx={{}}>
                        <FormControl fullWidth>
                            <Select
                                value={value}
                                onChange={handleChange}
                                sx={{
                                    '& .MuiSelect-select': { padding: `8px` },
                                    minWidth: 180,
                                }}
                            >
                                <MenuItem value="PENDING">상품준비중</MenuItem>
                                <MenuItem value="SHIPPING">상품배송중</MenuItem>
                                <MenuItem value="COMPLETED">배송완료</MenuItem>
                                <MenuItem value="FAILED">주문실패</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
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
                    <Box>
                        <Button>주문삭제</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AdminOrderItem;
