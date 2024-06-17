import React, { useState } from 'react';
import { Modal, TextField, Button } from '@material-ui/core';

const PasswordVerificationModal = ({ open, onClose, onVerify }) => {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleVerify = () => {
    // 서버에 비밀번호 확인 요청 보내기
    // 비밀번호가 올바르면 onVerify 콜백 함수 실행
    onVerify();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <TextField
          label="비밀번호"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          variant="outlined"
          style={{ marginBottom: '16px' }}
        />
        <Button variant="contained" color="primary" onClick={handleVerify}>
          확인
        </Button>
      </div>
    </Modal>
  );
};

export default PasswordVerificationModal;