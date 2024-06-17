import { jwtDecode } from 'jwt-decode';

export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const removeToken = () => {
    localStorage.removeItem('token');
};

export const isTokenValid = (token) => {
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

export const checkTokenValidity = () => {
    const token = localStorage.getItem('token');
    if (token && isTokenValid(token)) {
        return true;
    } else {
        removeToken();
        return false;
    }
};
