import React, { useState } from 'react';

const PasswordVerificationModal = ({ onVerify, onCancel }) => {
    const [currentPassword, setCurrentPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // 현재 비밀번호 확인 로직
        if (currentPassword === 'correctPassword') {
            // 비밀번호 확인 성공 시 정보 수정 페이지로 이동
            onVerify();
        } else {
            // 비밀번호 확인 실패 시 에러 메시지 표시 등의 처리
            alert('비밀번호가 일치하지 않습니다.');
        }
    };

    return (
        <div>
            <h2>현재 비밀번호 확인</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    현재 비밀번호:
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </label>
                <button type="submit">확인</button>
                <button type="button" onClick={onCancel}>
                    취소
                </button>
            </form>
        </div>
    );
};

export default PasswordVerificationModal;
