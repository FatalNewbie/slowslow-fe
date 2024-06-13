import React, { useEffect, useState } from 'react';
import '../../list-styles.css';
import tentImage from '../../icons/tent_image.png';
import CategoryAdd from './CategoryAdd';
import CategoryEdit from './CategoryEdit';
import CategoryDelete from './CategoryDelete';

const CategoryListAdmin = () => {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteCategoryId, setDeleteCategoryId] = useState(null);
    const [categoryToEdit, setCategoryToEdit] = useState(null);
    
    useEffect(() => {
        fetch('http://localhost:8080/category/all')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleAddBrand = (categoryName) => {
        fetch('http://localhost:8080/category/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ categoryName }),
        })
        .then(response => response.json())
        .then(newCategory => {
            setCategories([...categories, newCategory]);
            setShowModal(false);
        })
        .catch(error => console.error('Error adding brand:', error));
    };

    const handleUpdateCategory = (categoryName) => {
        fetch(`http://localhost:8080/category/edit/${categoryToEdit.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ categoryName }),
        })
        .then(response => response.json())
        .then(updatedCategory => {
            setCategories(categories.map(category => (category.id === updatedCategory.id ? updatedCategory : category)));
            setShowEditModal(false);
        })
        .catch(error => console.error('Error updating brand:', error));
    };

    const handleDeleteCategory = () => {
        fetch(`http://localhost:8080/category/delete/${deleteCategoryId}`, {
            method: 'DELETE',
        })
        .then(() => {
            setCategories(categories.filter(category => category.id !== deleteCategoryId));
            setShowDeleteModal(false);
        })
        .catch(error => console.error('Error deleting brand:', error));
    };

    return (
        <div>
            <div class="header">
                <img src={tentImage} alt="텐트 이미지"/>
                <h1>늘쩍늘쩍</h1>
            </div>
            <div class="category-list">
                <div class="category-header">
                    <h2>카테고리 목록 - 관리자 화면</h2>
                    <button class="category-add-button" onClick={() => setShowModal(true)}>카테고리 추가</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>카테고리명</th>
                            <th>수정</th>
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody id="categoryList">
                        {categories.map(category => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.categoryName}</td>
                                <td>
                                    <button onClick={() => {
                                        setCategoryToEdit(category);
                                        setShowEditModal(true);
                                    }}>수정</button>
                                </td>
                                <td><button onClick={() => {
                                        setDeleteCategoryId(category.id);
                                        setShowDeleteModal(true);
                                    }}>삭제</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <CategoryAdd 
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onSave={handleAddBrand}
                />
                <CategoryEdit
                    show={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    onSave={handleUpdateCategory}
                    brandToEdit={categoryToEdit}
                />
                <CategoryDelete
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleDeleteCategory}
                />
            </div>
        </div>
    );
};

export default CategoryListAdmin;