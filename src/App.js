import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/user/Login';
import MainLayout from './layouts/MainLayout';
import Membership from './pages/user/Membership';
import './index.css'; // CSS 파일 임포트
import { AuthProvider } from './pages/user/AuthContext'; //로그인 전역 설정

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
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <Router>
                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            <Route index element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/membership" element={<Membership />} />
                        </Route>
                    </Routes>
                </Router>
            </ThemeProvider>
        </AuthProvider>
    );
};

export default App;
