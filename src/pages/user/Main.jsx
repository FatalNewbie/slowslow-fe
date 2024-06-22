import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from './AuthContext';
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Stack } from '@mui/material';

function Main() {
    const navigate = useNavigate();

    const [isLoggedIn, logout, checkTokenValidity] = useContext(AuthContext);

    useEffect(() => {
        checkTokenValidity();
    }, [checkTokenValidity]);

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        logout();

        navigate('/');
    };

    return (
        <div>
            <h1>임시 메인페이지</h1>

            <nav>
                {isLoggedIn ? (
                    <IconButton color="inherit" onClick={handleLogout}>
                        <FaSignOutAlt size="1.2em" />
                        <Typography>로그아웃</Typography>
                    </IconButton>
                ) : (
                    <IconButton color="inherit" onClick={handleLogin}>
                        <FaSignInAlt size="1.2em" />
                        <Typography>로그인</Typography>
                    </IconButton>
                )}
            </nav>
        </div>
    );
}

export default Main;
