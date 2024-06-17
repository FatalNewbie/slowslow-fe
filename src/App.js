import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/user/Login';
import Main from './pages/user/Main';
import MainLayout from './layouts/MainLayout';
import Membership from './pages/user/Membership';
import './index.css'; // CSS 파일 임포트
import MyPage from './pages/user/MyPage';

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    // 커스터마이징 옵션 추가
                },
            },
        },
    },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/main" element={<Main />} />
                        <Route path="/membership" element={<Membership />} />
                        <Route path="/myPage" element={<MyPage />} />
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
