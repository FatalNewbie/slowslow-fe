import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const isValid = checkTokenValidity(token);
            if (isValid) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
                removeToken();
            }
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        removeToken();
        setIsLoggedIn(false);
    };

    const setToken = (token) => {
        localStorage.setItem('token', token);
    };

    const removeToken = () => {
        localStorage.removeItem('token');
    };

    const isTokenValid = (token) => {
        try {
            // 토큰 디코딩
            const decoded = jwtDecode(token);

            // 만료 시간 확인
            const currentTime = Date.now() / 1000; // 현재 시간 (초 단위)
            const expirationTime = decoded.exp; // 토큰 만료 시간 (초 단위)

            // 토큰이 아직 유효한지 확인
            return currentTime < expirationTime;
        } catch (error) {
            // 토큰 디코딩 실패 시 처리
            console.error('Error decoding token:', error);
            return false;
        }
    };

    const checkTokenValidity = () => {
        const token = localStorage.getItem('token');
        if (token && isTokenValid(token)) {
            return true;
        } else {
            removeToken();
            return false;
        }
    };

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, login, logout, setToken, removeToken, isTokenValid, checkTokenValidity }}
        >
            {children}
        </AuthContext.Provider>
    );
};
