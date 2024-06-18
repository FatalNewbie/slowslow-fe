// src/components/Modal.jsx
import React from 'react';
import './Modal.css';
import { Typography } from '@mui/material';

const Modal = ({ show, title, children, onClose }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <Typography sx={{ fontWeight: 'semibold', fontSize: '1.5rem', marginBottom: '20px' }}>
                    {title}
                </Typography>
                {children}
            </div>
        </div>
    );
};

export default Modal;
