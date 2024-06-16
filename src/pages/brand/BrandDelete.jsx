import React from 'react';
import '../../components/Modal.css';

const BrandDelete = ({ show, onClose, onConfirm }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>정말 삭제하시겠습니까?</h2>
                <button onClick={onConfirm}>삭제</button>
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default BrandDelete;
