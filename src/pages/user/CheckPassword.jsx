import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PasswordCheckForm = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userToken = localStorage.getItem('token');

            const response = await axios.post(
                '/api/v1/checkPassword',
                { password },
                {
                    headers: {
                        Authorization: `${userToken}`,
                    },
                }
            );

            if (response.data === '정보 수정 폼으로 이동') {
                navigate('/update');
            } else {
                setMessage(response.data);
            }
            setPassword('');
        } catch (err) {
            setError(err.response.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                비밀번호:
                <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
            <button type="submit" disabled={loading}>
                {loading ? '로딩 중...' : '확인'}
            </button>

            {error && <p style={{ color: 'red' }}>Error: {JSON.stringify(error)}</p>}

            {message && (
                <div>
                    {typeof message === 'string' ? (
                        <p>{message}</p>
                    ) : (
                        <ul>
                            {Object.entries(message).map(([key, value]) => (
                                <li key={key}>
                                    {key}: {value}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </form>
    );
};

export default PasswordCheckForm;
