import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ show, onClose, onSave }) => {
    const [brandName, setBrandName] = useState('');

    if (!show) {
        return null;
    }

    const handleSave = () => {
        if (brandName.trim() !== '') {
            onSave(brandName);
        } else {
            alert('브랜드 이름을 입력하세요.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>브랜드 추가</h2>
                <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="브랜드 이름 입력"
                />
                <button onClick={handleSave}>저장</button>
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default Modal;
