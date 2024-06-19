import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    const [role, setRole] = useState(null);

    const [username, setUsername] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const isValid = checkTokenValidity(token);
            if (isValid) {
                setIsLoggedIn(true);
            } else {
                removeToken();
                removeRole();
                removeUsername();
                setIsLoggedIn(false);
            }
        } else {
            removeToken();
            removeRole();
            removeUsername();
            setIsLoggedIn(false);
        }
    }, []);

    const login = (token) => {
        const { role } = jwtDecode(token);
        const { username } = jwtDecode(token);
        const { id } = jwtDecode(token);
        setToken(token);
        localStorage.setItem('role', role);
        localStorage.setItem('username', username);
        localStorage.setItem('id', id);
        setRole(localStorage.getItem('role'));
        setUsername(localStorage.getItem('username'));
        setIsLoggedIn(true);
    };

    const logout = () => {
        removeToken();
        removeRole();
        removeUsername();
        setIsLoggedIn(false);
    };

    const setToken = (token) => {
        localStorage.setItem('token', token);
    };

    const removeToken = () => {
        localStorage.removeItem('token');
    };

    const removeRole = () => {
        localStorage.removeItem('role');
    };

    const removeUsername = () => {
        localStorage.removeItem('username');
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
            removeRole();
            removeUsername();
            return false;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                login,
                logout,
                setToken,
                removeToken,
                isTokenValid,
                checkTokenValidity,
                role,
                username,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
