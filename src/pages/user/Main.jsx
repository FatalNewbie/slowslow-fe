import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { checkTokenValidity, setToken, removeToken } from '../../utils/auth';
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Stack } from '@mui/material';

function Main() {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (checkTokenValidity()) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        removeToken();

        setIsLoggedIn(false);

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
