import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignupClick = () => {
        navigate('/membership');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            // 토큰을 응답 헤더에서 가져오기
            const token = response.headers.get('Authorization');

            // localStorage에 토큰 저장
            localStorage.setItem('token', token);

            navigate('/main');
        } catch (error) {
            console.error('Login error:', error);
            // 에러 처리 로직 추가
        }
    };

    return (
        <div>
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username"></label>
                    <input
                        type="text"
                        name="username"
                        placeholder="이메일"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password"></label>
                    <input
                        type="password"
                        name="password"
                        placeholder="비밀번호"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">로그인</button>
            </form>
            <button onClick={handleSignupClick}>회원가입</button>
        </div>
    );
};

export default Login;
