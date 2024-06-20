import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, Box, Typography, Button, List, ListItem, ListItemText, Card, CardContent } from '@mui/material';
import { AuthContext } from './AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import SvgIcon from '@mui/material/SvgIcon';
import { FaRegUser } from 'react-icons/fa';

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}

const MyPage = () => {
    const [userData, setUserData] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const { logout, isLoggedIn } = useContext(AuthContext);

    const location = useLocation();

    const isCurrentPage = (path) => {
        return location.pathname === path;
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            axios
                .get('http://localhost:8080/api/v1/mypage', {
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
                    navigate('/login');
                });
        } else {
            navigate('/login');
        }
    }, [navigate]);

    if (!userData) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row' }}>
            {/* 왼쪽 메뉴 */}
            <Box sx={{ width: 200, bgcolor: 'background.paper', position: 'relative' }}>
                <Box className="bucket-list-header">
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        <HomeIcon color="white" />
                        마이페이지
                    </Typography>
                </Box>
                <List component="nav">
                    <ListItem
                        button
                        onClick={() => navigate('/mypage')}
                        sx={{
                            backgroundColor: isCurrentPage('/mypage') ? '#586555' : 'transparent',
                            color: isCurrentPage('/mypage') ? 'common.white' : 'inherit',
                            '&:hover': {
                                backgroundColor: isCurrentPage('/mypage') ? '#6d7b77' : '#f0f0f0',
                            },
                        }}
                    >
                        <ListItemText primary="회원정보" />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => navigate('/mypage/orders')}
                        sx={{
                            backgroundColor: isCurrentPage('/mypage/orders') ? '#586555' : 'transparent',
                            color: isCurrentPage('/mypage/orders') ? 'common.white' : 'inherit',
                            '&:hover': {
                                backgroundColor: isCurrentPage('/mypage/orders') ? '#6d7b77' : '#f0f0f0',
                            },
                        }}
                    >
                        <ListItemText primary="주문목록" />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => navigate('/deleteUser')}
                        sx={{
                            backgroundColor: isCurrentPage('/delete') ? '#586555' : 'transparent',
                            color: isCurrentPage('/delete') ? 'common.white' : 'inherit',
                            '&:hover': {
                                backgroundColor: isCurrentPage('/delete') ? '#6d7b77' : '#f0f0f0',
                            },
                        }}
                    >
                        <ListItemText primary="회원탈퇴" />
                    </ListItem>
                </List>
            </Box>

            <Box sx={{ flexGrow: 1, mt: 3 }}>
                <Container maxWidth="md">
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Box sx={{ fontSize: 27, fontWeight: 'bold' }}>회원정보</Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    alignItems: 'flex-end',
                                    gap: 1,
                                    height: '100%',
                                }}
                            >
                                <Box sx={{ fontSize: 20, fontWeight: 'bold', color: 'rgb(195, 195, 195)' }}>
                                    마이페이지 &gt;
                                </Box>
                                <Box sx={{ fontSize: 20, fontWeight: 'bold', color: `black` }}>회원정보</Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <hr
                        style={{
                            height: `2px`,
                            backgroundColor: `black`,
                            border: 'none',
                        }}
                    />
                    <Card sx={{ mb: 3 }}>
                        <CardContent>
                            <Grid alignItems="center">
                                <Grid item xs={12} sm={3} container direction="row" mt={4} ml={5}>
                                    <FaRegUser fontSize={150} color="#586555" />
                                    <Box
                                        container
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="center"
                                        mb={2}
                                        pl={4}
                                    >
                                        <Box sx={{ mr: 2 }}>
                                            <Typography variant="h5" sx={{ mb: 2, mt: 3 }} color="#21272A">
                                                {userData.name} 님
                                            </Typography>
                                            <Typography variant="h6" sx={{ mb: 2 }}>
                                                이 메 일 | {userData.username}
                                            </Typography>
                                            <Typography variant="h6" sx={{ mb: 2 }}>
                                                전화번호 | {userData.phoneNumber}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/checkPasswordForUpdate')}
                        sx={{
                            mt: 2,
                            bgcolor: '#586555',
                            float: 'right',
                            '&:hover': {
                                backgroundColor: '#6d7b77',
                            },
                        }}
                    >
                        정보수정
                    </Button>
                </Container>
            </Box>
        </Box>
        // <Box sx={{ flexGrow: 1 }}>
        //     <Grid container spacing={2}>
        //         <Grid xs={6}>
        //             <Box sx={{ fontSize: 27, fontWeight: 'bold' }}>회원정보</Box>
        //         </Grid>
        //         <Grid xs={6}>
        //             <Box
        //                 sx={{
        //                     display: 'flex',
        //                     alignItems: 'right',
        //                     justifyContent: 'flex-end',
        //                     alignItems: 'flex-end',
        //                     gap: 1,
        //                     height: '100%',
        //                 }}
        //             >
        //                 <Box
        //                     sx={{
        //                         fontSize: 20,
        //                         fontWeight: 'bold',
        //                         color: 'rgb(195, 195, 195)',
        //                     }}
        //                 >
        //                     마이페이지 &gt;
        //                 </Box>
        //                 <Box sx={{ fontSize: 20, fontWeight: 'bold', color: `black` }}>회원정보</Box>
        //             </Box>
        //         </Grid>
        //     </Grid>
        //     <hr
        //         style={{
        //             height: `2px`,
        //             backgroundColor: `black`,
        //             border: 'none',
        //         }}
        //     />
        //     <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'flex-start', gap: 4 }}>
        //         {/* 왼쪽 메뉴 */}
        //         <Box sx={{ width: 200, bgcolor: 'background.paper', position: 'fixed' }}>
        //             <Box className="bucket-list-header">
        //                 <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        //                     <HomeIcon color="white" />
        //                     마이페이지
        //                 </Typography>
        //             </Box>
        //             <List component="nav">
        //                 <ListItem
        //                     button
        //                     onClick={() => navigate('/mypage')}
        //                     sx={{
        //                         backgroundColor: isCurrentPage('/mypage') ? '#586555' : 'transparent',
        //                         color: isCurrentPage('/mypage') ? 'common.white' : 'inherit',
        //                         '&:hover': {
        //                             backgroundColor: isCurrentPage('/mypage') ? '#6d7b77' : '#f0f0f0',
        //                         },
        //                     }}
        //                 >
        //                     <ListItemText primary="회원정보" />
        //                 </ListItem>
        //                 <ListItem
        //                     button
        //                     onClick={() => navigate('/mypage/orders')}
        //                     sx={{
        //                         backgroundColor: isCurrentPage('/mypage/orders') ? '#586555' : 'transparent',
        //                         color: isCurrentPage('/mypage/orders') ? 'common.white' : 'inherit',
        //                         '&:hover': {
        //                             backgroundColor: isCurrentPage('/mypage/orders') ? '#6d7b77' : '#f0f0f0',
        //                         },
        //                     }}
        //                 >
        //                     <ListItemText primary="주문목록" />
        //                 </ListItem>
        //                 <ListItem
        //                     button
        //                     onClick={() => navigate('/deleteUser')}
        //                     sx={{
        //                         backgroundColor: isCurrentPage('/delete') ? '#586555' : 'transparent',
        //                         color: isCurrentPage('/delete') ? 'common.white' : 'inherit',
        //                         '&:hover': {
        //                             backgroundColor: isCurrentPage('/delete') ? '#6d7b77' : '#f0f0f0',
        //                         },
        //                     }}
        //                 >
        //                     <ListItemText primary="회원탈퇴" />
        //                 </ListItem>
        //             </List>
        //         </Box>

        //         {/* 오른쪽 컨텐츠 */}
        //         <Box sx={{ ml: 60, pl: 6, pt: 4, pr: 6, pb: 4, flexGrow: 0.3, border: '2px solid #586555', borderRadius: '10px' }}>
        //             <Typography variant="h5" sx={{ mb: 2 }}>
        //                 {userData.name}님
        //             </Typography>
        //             <Typography variant="h6" sx={{ mb: 2 }}>
        //                 계&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;정 | {userData.username}
        //             </Typography>
        //             <Typography variant="h6" sx={{ mb: 2 }}>
        //                 전화번호 | {userData.phoneNumber}
        //             </Typography>
        //             <Button
        //                 variant="contained"
        //                 color="primary"
        //                 onClick={() => navigate('/checkPasswordForUpdate')}
        //                 sx={{
        //                     mt: 2,
        //                     bgcolor: '#586555',
        //                     float: 'right',
        //                     '&:hover': {
        //                         backgroundColor: '#6d7b77',
        //                     },
        //                 }}
        //             >
        //                 정보수정
        //             </Button>
        //         </Box>
        //     </Box>
        // </Box>
    );
};

export default MyPage;
