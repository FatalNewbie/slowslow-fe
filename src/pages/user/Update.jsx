import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserInfoUpdateForm = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        // 사용자 정보를 가져와 state에 저장
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('/api/v1/mypage');
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

        try {
            await axios.post('/api/v1/update', {
                name,
                password,
                phoneNumber,
            });
            alert('회원 정보가 수정되었습니다.');
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
