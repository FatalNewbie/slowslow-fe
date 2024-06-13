import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ show, onClose, onSave }) => {
    const [categoryName, setCategoryName] = useState('');

    if (!show) {
        return null;
    }

    const handleSave = () => {
        if (categoryName.trim() !== '') {
            onSave(categoryName);
        } else {
            alert('브랜드 이름을 입력하세요.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>카테고리 추가</h2>
                <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="카테고리 이름 입력"
                />
                <button onClick={handleSave}>저장</button>
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default Modal;
