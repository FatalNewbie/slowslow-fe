import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserInfoUpdateForm = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // 사용자 정보를 가져와 state에 저장
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://34.47.79.214:8080/api/v1/mypage', {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                setUsername(response.data.username);
                setName(response.data.name);
                setPassword(response.data.password);
                setPhoneNumber(response.data.phoneNumber);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };
        fetchUserInfo();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 비밀번호와 비밀번호 확인이 일치하는지 확인
        if (password !== confirmPassword) {
            alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return;
        }

        try {
            await axios.post(
                'http://34.47.79.214:8080/api/v1/update',
                {
                    name,
                    password,
                    phoneNumber,
                },
                {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`,
                    },
                }
            );
            alert('회원 정보가 수정되었습니다.');
            navigate('/mypage');
        } catch (error) {
            console.error('Error updating user info:', error);
            alert('회원 정보 수정에 실패했습니다.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">사용자 이름:</label>
                <input type="text" id="username" value={username} disabled />
            </div>
            <div>
                <label htmlFor="name">이름:</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password">비밀번호:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <label htmlFor="confirmPassword">비밀번호 확인:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="phoneNumber">전화번호:</label>
                <input
                    type="text"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </div>
            <button type="submit">수정하기</button>
        </form>
    );
};

export default UserInfoUpdateForm;
