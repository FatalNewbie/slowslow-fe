// src/components/Form.jsx
import React, { useState, useEffect } from 'react';

const Form = ({ initialValue, onSave, onClose }) => {
    const [inputValue, setInputValue] = useState(initialValue);

    useEffect(() => {
        setInputValue(initialValue);
    }, [initialValue]);

    const handleSave = () => {
        onSave(inputValue);
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="이름 입력"
            />
            <button onClick={handleSave}>저장</button>
            <button onClick={onClose}>닫기</button>
        </div>
    );
};

export default Form;
