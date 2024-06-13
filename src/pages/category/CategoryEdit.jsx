// src/components/BrandEdit.jsx
import React, { useState, useEffect } from 'react';
import './Modal.css';

const CategoryEdit = ({ show, onClose, onSave, categoryToEdit }) => {
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        if (categoryToEdit) {
            setCategoryName(CategoryEdit.categoryName);
        }
    }, [categoryToEdit]);

    const handleSave = () => {
        onSave(categoryName);
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>카테고리 수정</h2>
                <input 
                    type="text" 
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="수정할 카테고리 이름"
                />
                <button onClick={handleSave}>수정</button>
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default CategoryEdit;
