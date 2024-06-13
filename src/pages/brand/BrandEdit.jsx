// src/components/BrandEdit.jsx
import React, { useState, useEffect } from 'react';
import './Modal.css';

const BrandEdit = ({ show, onClose, onSave, brandToEdit }) => {
    const [brandName, setBrandName] = useState('');

    useEffect(() => {
        if (brandToEdit) {
            setBrandName(brandToEdit.brandName);
        }
    }, [brandToEdit]);

    const handleSave = () => {
        onSave(brandName);
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>브랜드 수정</h2>
                <input 
                    type="text" 
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="수정할 브랜드 이름"
                />
                <button onClick={handleSave}>수정</button>
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default BrandEdit;
