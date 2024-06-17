import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/user/Login';
import MainLayout from './layouts/MainLayout';
import Membership from './pages/user/Membership';
import Admin from './pages/user/Admin';
import './index.css'; // CSS 파일 임포트
import { AuthProvider } from './pages/user/AuthContext'; //로그인 전역 설정
import { AuthContext } from './pages/user/AuthContext';
import { useContext, useEffect } from 'react';

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
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login />} />
                        <Route path="/membership" element={isLoggedIn ? <Navigate to="/" replace /> : <Membership />} />
                        <Route path="/admin" element={isLoggedIn ? <Admin /> : <Navigate to="/login" replace />} />
                        <Route path="/admin" element={isLoggedIn ? <Admin /> : <Navigate to="/login" replace />} />
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
