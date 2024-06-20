import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Button, List, ListItem, ListItemText, TextField, Container } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';
import Grid from '@mui/material/Unstable_Grid2';
import { AuthContext } from './AuthContext';

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}

const ConfirmDelete = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState('');
    const { username } = useContext(AuthContext);

    const location = useLocation();

    const isCurrentPage = (path) => {
        return location.pathname === path;
    };

    const handleDeleteAccount = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                'http://localhost:8080/api/v1/delete', // 회원 탈퇴 요청을 보내는 엔드포인트
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                    params: {
                        username: username,
                    },
                }
            );

            if (response.status === 200) {
                localStorage.removeItem('token'); // 로컬 스토리지에서 토큰 삭제
                alert('회원 탈퇴가 성공적으로 처리되었습니다.');
                navigate('/');
            } else {
                alert('회원 탈퇴에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error deleting user account:', error);
            alert('회원 탈퇴에 실패했습니다.');
        }
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
                                    회원탈퇴 &gt;
                                </Box>
                                <Box sx={{ fontSize: 20, fontWeight: 'bold', color: `black` }}>비밀번호확인</Box>
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
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <h2>정말 탈퇴하시겠습니까?</h2>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/mypage')}
                            sx={{
                                mt: 2,
                                mr: 41,
                                bgcolor: '#586555',
                                float: 'right',
                                '&:hover': {
                                    backgroundColor: '#6d7b77',
                                },
                            }}
                        >
                            아니오
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleDeleteAccount}
                            sx={{
                                mt: 2,
                                mr: 3,
                                bgcolor: '#586555',
                                float: 'right',
                                '&:hover': {
                                    backgroundColor: '#6d7b77',
                                },
                            }}
                        >
                            네
                        </Button>
                    </Box>
                </Container>
            </Box>
        </Box>
        // <Box sx={{ flexGrow: 1 }}>
        //     <Grid container spacing={2}>
        //         <Grid xs={6}>
        //             <Box sx={{ fontSize: 27, fontWeight: 'bold' }}>비밀번호확인</Box>
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
        // <Box sx={{ fontSize: 20, fontWeight: 'bold', color: 'rgb(195, 195, 195)' }}>회원탈퇴 &gt;</Box>
        // <Box sx={{ fontSize: 20, fontWeight: 'bold', color: `black` }}>비밀번호확인</Box>
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
        //     {/* 왼쪽 메뉴 */}
        //     <Box sx={{ width: 200, bgcolor: 'background.paper', position: 'fixed' }}>
        //         <Box className="bucket-list-header">
        //             <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        //                 <HomeIcon color="white" />
        //                 마이페이지
        //             </Typography>
        //         </Box>
        //         <List component="nav">
        //             <ListItem
        //                 button
        //                 onClick={() => navigate('/mypage')}
        //                 sx={{
        //                     backgroundColor: 'transparent',
        //                     color: 'inherit',
        //                     '&:hover': {
        //                         backgroundColor: '#f0f0f0',
        //                     },
        //                 }}
        //             >
        //                 <ListItemText primary="회원정보" />
        //             </ListItem>
        //             <ListItem
        //                 button
        //                 onClick={() => navigate('/mypage/orders')}
        //                 // isCurrentPage 함수나 현재 페이지 상태를 통해 활성화 상태 관리
        //                 sx={{
        //                     backgroundColor: 'transparent', // 기본 배경색 설정
        //                     color: 'inherit', // 기본 글자색 설정
        //                     '&:hover': {
        //                         backgroundColor: '#f0f0f0', // 호버 배경색 설정
        //                     },
        //                 }}
        //             >
        //                 <ListItemText primary="주문목록" />
        //             </ListItem>
        //             <ListItem
        //                 button
        //                 onClick={() => navigate('/delete')}
        //                 sx={{
        //                     backgroundColor: '#586555',
        //                     color: '#fff',
        //                     '&:hover': {
        //                         backgroundColor: '#6d7b77',
        //                     },
        //                 }}
        //             >
        //                 <ListItemText primary="회원탈퇴" />
        //             </ListItem>
        //         </List>
        //     </Box>
        //     <Box sx={{ justifyContent: 'center', alignItems: 'center' }}>
        //         <Box
        //             sx={{
        //                 padding: '20px',
        //                 borderRadius: '4px',
        //                 textAlign: 'center',
        //                 display: 'flex',
        //                 flexDirection: 'column',
        //                 alignItems: 'center',
        //             }}
        //         >
        //             <Box
        //                 sx={{
        //                     ml: 10,
        //                     pl: 6,
        //                     pt: 4,
        //                     pr: 6,
        //                     pb: 4,
        //                     flexGrow: 0.3,
        //                     border: '2px solid #586555',
        //                     borderRadius: '10px',
        //                 }}
        //             >
        // <h2>정말 탈퇴하시겠습니까?</h2>
        // <Button
        //     variant="contained"
        //     color="primary"
        //     onClick={() => navigate('/mypage')}
        //     sx={{
        //         mt: 2,
        //         ml: 1,
        //         bgcolor: '#586555',
        //         float: 'right',
        //         '&:hover': {
        //             backgroundColor: '#6d7b77',
        //         },
        //     }}
        // >
        //     아니오
        // </Button>
        // <Button
        //     variant="contained"
        //     color="primary"
        //     onClick={handleDeleteAccount}
        //     sx={{
        //         mt: 2,
        //         bgcolor: '#586555',
        //         float: 'right',
        //         '&:hover': {
        //             backgroundColor: '#6d7b77',
        //         },
        //     }}
        // >
        //     &nbsp;&nbsp;&nbsp;네&nbsp;&nbsp;&nbsp;
        // </Button>
        //             </Box>
        //         </Box>
        //     </Box>
        // </Box>
    );
};

export default ConfirmDelete;
