import React from 'react';

function Main() {
    const handleLogout = () => {
        // 로그아웃 버튼을 눌렀을 때 실행되는 함수
        localStorage.removeItem('token'); // 로컬 스토리지에서 토큰 제거
        // 다른 로그아웃 관련 작업을 수행할 수 있음
    };

    return (
        <div>
            <h1>로그인 성공</h1>
            <button onClick={handleLogout}>로그아웃</button>
        </div>
    );
}

export default Main;
