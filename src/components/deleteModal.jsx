import React from 'react';
import './Modal.css';
import { Typography } from '@mui/material';
const DeleteModal = ({ show, onClose, onConfirm }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal" style={{ padding: '20px' }}>
                <Typography sx={{ fontWeight: 'semibold', fontSize: '1.2rem', marginBottom: '10px' }}>
                    정말 삭제하시겠습니까?
                </Typography>
                <button onClick={onConfirm}>삭제</button>
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default DeleteModal;
