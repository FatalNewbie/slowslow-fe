import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // AuthContext 임포트
import { Box, Typography, Button, List, ListItem, ListItemText, Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import SvgIcon from '@mui/material/SvgIcon';

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}

const DeleteUserForm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isCurrentPage = (path) => {
        return location.pathname === path;
    };

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
                            backgroundColor: isCurrentPage('/checkPasswordForUpdate') ? '#586555' : 'transparent',
                            color: isCurrentPage('/checkPasswordForUpdate') ? 'common.white' : 'inherit',
                            '&:hover': {
                                backgroundColor: isCurrentPage('/checkPasswordForUpdate') ? '#6d7b77' : '#f0f0f0',
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
                            backgroundColor: isCurrentPage('/deleteUser') ? '#586555' : 'transparent',
                            color: isCurrentPage('/deleteUser') ? 'common.white' : 'inherit',
                            '&:hover': {
                                backgroundColor: isCurrentPage('/deleteUser') ? '#6d7b77' : '#f0f0f0',
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
                                    마이페이지 &gt;{' '}
                                </Box>
                                <Box sx={{ fontSize: 20, fontWeight: 'bold', color: `black` }}>회원탈퇴</Box>
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
                    <Box
                        sx={{
                            padding: '20px',
                            borderRadius: '4px',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        {/* 회원 탈퇴 폼 */}
                        <Box
                            sx={{
                                pl: 6,
                                pt: 4,
                                pr: 6,
                                pb: 4,
                                flexGrow: 0.3,
                                border: '2px solid #586555',
                                borderRadius: '10px',
                            }}
                        >
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                회원 탈퇴
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                정말로 탈퇴하시겠습니까?
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
                                아니오
                            </Button>
                            <Button
                                onClick={() => navigate('/checkPasswordForDelete')}
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
                                &nbsp;&nbsp;&nbsp;네&nbsp;&nbsp;&nbsp;
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
        // <Box sx={{ flexGrow: 1 }}>
        //     <Grid container spacing={2}>
        //         <Grid xs={6}>
        //             <Box sx={{ fontSize: 27, fontWeight: 'bold' }}>회원탈퇴</Box>
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
        //                 <Box sx={{ fontSize: 20, fontWeight: 'bold', color: 'rgb(195, 195, 195)' }}>
        //                     마이페이지 &gt;
        //                 </Box>
        //                 <Box sx={{ fontSize: 20, fontWeight: 'bold', color: `black` }}>회원탈퇴</Box>
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
        //                         backgroundColor: 'transparent',
        //                         color: 'inherit',
        //                         '&:hover': {
        //                             backgroundColor: '#f0f0f0',
        //                         },
        //                     }}
        //                 >
        //                     <ListItemText primary="회원정보" />
        //                 </ListItem>
        //                 <ListItem
        //                     button
        //                     onClick={() => navigate('/mypage/orders')}
        //                     sx={{
        //                         backgroundColor: 'transparent',
        //                         color: 'inherit',
        //                         '&:hover': {
        //                             backgroundColor: '#f0f0f0',
        //                         },
        //                     }}
        //                 >
        //                     <ListItemText primary="주문목록" />
        //                 </ListItem>
        //                 <ListItem
        //                     button
        //                     onClick={() => navigate('/delete')}
        //                     sx={{
        //                         backgroundColor: '#586555',
        //                         color: '#fff',
        //                         '&:hover': {
        //                             backgroundColor: '#6d7b77',
        //                         },
        //                     }}
        //                 >
        //                     <ListItemText primary="회원탈퇴" />
        //                 </ListItem>
        //             </List>
        //         </Box>

        // {/* 회원 탈퇴 폼 */}
        // <Box
        //     sx={{
        //         ml: 60,
        //         pl: 6,
        //         pt: 4,
        //         pr: 6,
        //         pb: 4,
        //         flexGrow: 0.3,
        //         border: '2px solid #586555',
        //         borderRadius: '10px',
        //     }}
        // >
        //     <Typography variant="h6" sx={{ mb: 2 }}>
        //         회원 탈퇴
        //     </Typography>
        //     <Typography variant="body1" sx={{ mb: 2 }}>
        //         정말로 탈퇴하시겠습니까?
        //     </Typography>
        //     <Button
        //         onClick={() => navigate('/mypage')}
        //         variant="contained"
        //         sx={{
        //             bgcolor: '#586555',
        //             color: '#fff',
        //             float: 'right',
        //             '&:hover': {
        //                 backgroundColor: '#6d7b77',
        //             },
        //         }}
        //     >
        //         아니오
        //     </Button>
        //     <Button
        //         onClick={() => navigate('/checkPasswordForDelete')}
        //         variant="contained"
        //         sx={{
        //             bgcolor: '#586555',
        //             color: '#fff',
        //             float: 'right',
        //             mr: '5px',
        //             '&:hover': {
        //                 backgroundColor: '#6d7b77',
        //             },
        //         }}
        //     >
        //         &nbsp;&nbsp;&nbsp;네&nbsp;&nbsp;&nbsp;
        //     </Button>
        // </Box>
        //     </Box>
        // </Box>
    );
};

export default DeleteUserForm;
