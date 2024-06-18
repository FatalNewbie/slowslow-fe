import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AuthContext } from './AuthContext';

const Login = () => {
    const { login } = useContext(AuthContext);

    const [showPassword, setShowPassword] = React.useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            // 토큰을 응답 헤더에서 가져오기
            const token = response.headers.get('Authorization');

            //localStorage에 토큰 저장
            login(token);

            navigate('/');
        } catch (error) {
            // 에러 처리 로직
            console.error('Login error:', error);
            // 에러 메시지를 사용자에게 표시하는 로직 추가
            setErrorMessage(error.message);
        }
    };

    return (
        <Box
            sx={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
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
                <h2>로그인</h2>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2, mt: 7 }}>
                        <TextField
                            sx={{
                                width: 400,
                                color: '#586555',
                            }}
                            id="input-with-sx"
                            label="이메일"
                            variant="outlined"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            name="username"
                        />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">비밀번호</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="password"
                                name="password"
                                onChange={handleChange}
                                value={formData.password}
                                sx={{ width: 400 }}
                            />
                        </FormControl>
                    </Box>

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            mb: 2,
                            width: 400,
                            backgroundColor: '#586555',
                            borderRadius: '10px',
                            '&:hover': {
                                backgroundColor: '#586555', // 마우스 오버 시 배경색 변경
                            },
                        }}
                    >
                        로그인
                    </Button>
                </form>
                <Button
                    sx={{ width: 400, color: '#586555', border: '2px solid #586555', borderRadius: '10px' }}
                    onClick={handleSignupClick}
                    variant="text"
                >
                    회원가입
                </Button>
            </Box>
        </Box>
    );
};

export default Login;
