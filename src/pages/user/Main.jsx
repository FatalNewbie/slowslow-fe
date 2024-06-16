import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { checkTokenValidity, setToken, removeToken } from './utils/auth';

function Main() {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (checkTokenValidity()) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        removeToken();

        setIsLoggedIn(false);

        navigate('/');
    };

    return (
        <div>
            <h1>임시 메인페이지</h1>

            <nav>
                {isLoggedIn ? (
                    <button onClick={handleLogout}>
                        <FaSignOutAlt />
                    </button>
                ) : (
                    <button onClick={handleLogin}>
                        <FaSignInAlt />
                    </button>
                )}
            </nav>
        </div>
    );
}

export default Main;
