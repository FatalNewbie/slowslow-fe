export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const removeToken = () => {
    localStorage.removeItem('token');
};

export const isTokenValid = (token) => {
    // 토큰 유효성 검사 로직 구현
    // 예: 토큰 만료 시간 확인
    const expirationTime = 3600; // 1시간
    const tokenIssuedAt = Date.now() / 1000;
    const tokenExpiresAt = tokenIssuedAt + expirationTime;
    return Date.now() / 1000 < tokenExpiresAt;
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
