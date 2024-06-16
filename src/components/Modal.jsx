// src/components/Modal.jsx
import React from 'react';
import './Modal.css';

const Modal = ({ show, title, children, onClose }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{title}</h2>
                {children}
            </div>
        </div>
    );
};

export default Modal;
