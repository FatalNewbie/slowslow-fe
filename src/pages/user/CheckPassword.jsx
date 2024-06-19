import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // AuthContext 임포트
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const PasswordCheckForm = () => {
    const { isLoggedIn } = useContext(AuthContext); // AuthContext에서 필요한 상태 가져오기

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
            if (!isLoggedIn) {
                // 로그인 상태가 아니면 로그인 페이지로 리다이렉트
                navigate('/login');
                return;
            }

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
        <Box sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Box
                sx={{
                    padding: '20px',
                    borderRadius: '4px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <h2>비밀번호 확인</h2>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                        <label>
                            <TextField
                                sx={{ width: 400, color: '#586555' }}
                                id="password-field"
                                label=""
                                type="password"
                                variant="outlined"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </label>
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            mb: 2,
                            height: 50,
                            width: 400,
                            backgroundColor: '#586555',
                            borderRadius: '10px',
                            '&:hover': {
                                backgroundColor: '#586555',
                            },
                            disabled: loading,
                        }}
                    >
                        {loading ? '로딩 중...' : '확인'}
                    </Button>

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
            </Box>
        </Box>
    );
};

export default PasswordCheckForm;
