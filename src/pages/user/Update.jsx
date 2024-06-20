import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // AuthContext 임포트
import { Box, Typography, Button, List, ListItem, ListItemText, TextField, Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import SvgIcon from '@mui/material/SvgIcon';

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}

const UserInfoUpdateForm = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const { logout, isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const location = useLocation();

    const isCurrentPage = (path) => {
        return location.pathname === path;
    };

    useEffect(() => {
        // 사용자 정보를 가져와 state에 저장
        const fetchUserInfo = async () => {
            try {
                if (!isLoggedIn) {
                    // 로그인 상태가 아니면 로그인 페이지로 리다이렉트
                    navigate('/login');
                    return;
                }

                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/v1/mypage', {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                setUsername(response.data.username);
                setName(response.data.name);
                setPhoneNumber(response.data.phoneNumber);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, [isLoggedIn, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 비밀번호와 비밀번호 확인이 일치하는지 확인
        if (password !== confirmPassword) {
            alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                'http://localhost:8080/api/v1/update',
                {
                    name,
                    password,
                    phoneNumber,
                },
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );
            alert('회원 정보가 수정되었습니다.');
            navigate('/mypage');
        } catch (error) {
            console.error('Error updating user info:', error);
            alert('회원 정보 수정에 실패했습니다.');
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
                            backgroundColor: isCurrentPage('/update') ? '#586555' : 'transparent',
                            color: isCurrentPage('/update') ? 'common.white' : 'inherit',
                            '&:hover': {
                                backgroundColor: isCurrentPage('/update') ? '#6d7b77' : '#f0f0f0',
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
                                </Box>{' '}
                                <Box sx={{ fontSize: 20, fontWeight: 'bold', color: 'rgb(195, 195, 195)' }}>
                                    회원정보 &gt;
                                </Box>
                                <Box sx={{ fontSize: 20, fontWeight: 'bold', color: `black` }}>회원정보수정</Box>
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

                    {/* 회원 정보 수정 폼 */}
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
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                <Typography variant="body1" sx={{ marginRight: '8px' }}>
                                    계&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;정
                                    |{' '}
                                </Typography>
                                <Typography variant="body1">{username}</Typography>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                <Typography variant="body1" sx={{ marginRight: '8px' }}>
                                    이&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;름
                                    |{' '}
                                </Typography>
                                <Typography variant="body1">{name}</Typography>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                <Typography variant="body1" sx={{ marginRight: '8px' }}>
                                    비&nbsp;&nbsp;&nbsp;밀&nbsp;&nbsp;&nbsp;번&nbsp;&nbsp;&nbsp;호 &nbsp;|{' '}
                                </Typography>
                                <TextField
                                    type="password"
                                    id="password"
                                    variant="outlined"
                                    value={password}
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    size="small"
                                />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                <Typography variant="body1" sx={{ marginRight: '8px' }}>
                                    비밀번호&nbsp;&nbsp;확인 &nbsp;|{' '}
                                </Typography>
                                <TextField
                                    type="password"
                                    id="confirmPassword"
                                    variant="outlined"
                                    value={confirmPassword}
                                    required
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    size="small"
                                />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body1" sx={{ marginRight: '8px' }}>
                                    전&nbsp;&nbsp;&nbsp;화&nbsp;&nbsp;&nbsp;번&nbsp;&nbsp;&nbsp;호 |{' '}
                                </Typography>
                                <TextField
                                    type="text"
                                    id="phoneNumber"
                                    variant="outlined"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    size="small"
                                />
                            </div>

                            <Button
                                type="submit"
                                color="primary"
                                sx={{
                                    mt: 7,
                                    mr: -5,
                                    bgcolor: '#586555',
                                    float: 'right',
                                    color: '#fff',
                                    width: '100px',
                                    '&:hover': {
                                        backgroundColor: '#6d7b77',
                                    },
                                }}
                            >
                                수정하기
                            </Button>
                        </form>
                    </Box>
                </Container>
            </Box>
        </Box>
        // <Box sx={{ flexGrow: 1 }}>
        //     <Grid container spacing={2}>
        //         <Grid xs={6}>
        //             <Box sx={{ fontSize: 27, fontWeight: 'bold' }}>회원정보수정</Box>
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
        //                 <Box sx={{ fontSize: 20, fontWeight: 'bold', color: 'rgb(195, 195, 195)' }}>마이페이지 &gt;</Box>
        //                 <Box sx={{ fontSize: 20, fontWeight: 'bold', color: 'rgb(195, 195, 195)' }}>회원정보 &gt;</Box>
        //                 <Box sx={{ fontSize: 20, fontWeight: 'bold', color: `black` }}>회원정보수정</Box>
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
        //                     // isCurrentPage 함수나 현재 페이지 상태를 통해 활성화 상태 관리
        // sx={{
        //     backgroundColor: isCurrentPage('/update') ? '#586555' : 'transparent',
        //     color: isCurrentPage('/update') ? 'common.white' : 'inherit',
        //     '&:hover': {
        //         backgroundColor: isCurrentPage('/update') ? '#6d7b77' : '#f0f0f0',
        //     },
        // }}
        //                 >
        //                     <ListItemText primary="회원정보" />
        //                 </ListItem>
        //                 <ListItem
        //                     button
        //                     onClick={() => navigate('/mypage/orders')}
        //                     // isCurrentPage 함수나 현재 페이지 상태를 통해 활성화 상태 관리
        //                     sx={{
        //                         backgroundColor: 'transparent', // 기본 배경색 설정
        //                         color: 'inherit', // 기본 글자색 설정
        //                         '&:hover': {
        //                             backgroundColor: '#f0f0f0', // 호버 배경색 설정
        //                         },
        //                     }}
        //                 >
        //                     <ListItemText primary="주문목록" />
        //                 </ListItem>
        //                 <ListItem
        //                     button
        //                     onClick={() => navigate('/deleteUser')}
        //                     // isCurrentPage 함수나 현재 페이지 상태를 통해 활성화 상태 관리
        //                     sx={{
        //                         backgroundColor: 'transparent', // 기본 배경색 설정
        //                         color: 'inherit', // 기본 글자색 설정
        //                         '&:hover': {
        //                             backgroundColor: '#f0f0f0', // 호버 배경색 설정
        //                         },
        //                     }}
        //                 >
        //                     <ListItemText primary="회원탈퇴" />
        //                 </ListItem>
        //             </List>
        //         </Box>

        // {/* 회원 정보 수정 폼 */}
        // <Box sx={{ ml: 60, pl: 6, pt: 4, pr: 6, pb: 4, flexGrow: 0.3, border: '2px solid #586555', borderRadius: '10px' }}>
        //     <form onSubmit={handleSubmit}>
        //         <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
        //             <Typography variant="body1" sx={{ marginRight: '8px' }}>
        //                 계&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;정 |{' '}
        //             </Typography>
        //             <Typography variant="body1">{username}</Typography>
        //         </div>
        //         <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
        //             <Typography variant="body1" sx={{ marginRight: '8px' }}>
        //                 이&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;름 |{' '}
        //             </Typography>
        //             <TextField id="outlined-basic" variant="outlined" value={name} size="small" />
        //         </div>
        //         <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
        //             <Typography variant="body1" sx={{ marginRight: '8px' }}>
        //                 비&nbsp;&nbsp;&nbsp;밀&nbsp;&nbsp;&nbsp;번&nbsp;&nbsp;&nbsp;호 |{' '}
        //             </Typography>
        //             <TextField
        //                 type="password"
        //                 id="password"
        //                 variant="outlined"
        //                 value={password}
        //                 onChange={(e) => setPassword(e.target.value)}
        //                 size="small"
        //             />
        //         </div>
        //         <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
        //             <Typography variant="body1" sx={{ marginRight: '8px' }}>
        //                 비밀번호&nbsp;&nbsp;확인 |{' '}
        //             </Typography>
        //             <TextField
        //                 type="password"
        //                 id="confirmPassword"
        //                 variant="outlined"
        //                 value={confirmPassword}
        //                 onChange={(e) => setConfirmPassword(e.target.value)}
        //                 size="small"
        //             />
        //         </div>
        //         <div style={{ display: 'flex', alignItems: 'center' }}>
        //             <Typography variant="body1" sx={{ marginRight: '8px' }}>
        //                 전&nbsp;&nbsp;&nbsp;화&nbsp;&nbsp;&nbsp;번&nbsp;&nbsp;&nbsp;호 |{' '}
        //             </Typography>
        //             <TextField
        //                 type="text"
        //                 id="phoneNumber"
        //                 variant="outlined"
        //                 value={phoneNumber}
        //                 onChange={(e) => setPhoneNumber(e.target.value)}
        //                 size="small"
        //             />
        //         </div>

        //         <Button
        //             type="submit"
        //             color="primary"
        //             sx={{
        //                 mt: 2,
        //                 bgcolor: '#586555',
        //                 float: 'right',
        //                 color: '#fff',
        //                 '&:hover': {
        //                     backgroundColor: '#6d7b77',
        //                 },
        //             }}
        //         >
        //             수정하기
        //         </Button>
        //     </form>
        // </Box>
        //     </Box>
        // </Box>
    );
};

export default UserInfoUpdateForm;
