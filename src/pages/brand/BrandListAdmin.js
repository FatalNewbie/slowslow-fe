import React, { useEffect, useState } from 'react';
import '../../list-styles.css';
import tentImage from '../../icons/tent_image.png';
import BrandAdd from './BrandAdd';
import BrandEdit from './BrandEdit';
import BrandDelete from './BrandDelete';

const BrandListAdmin = () => {
    const [brands, setBrands] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteBrandId, setDeleteBrandId] = useState(null);
    const [brandToEdit, setBrandToEdit] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/brand/all')
            .then(response => response.json())
            .then(data => setBrands(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleAddBrand = (brandName) => {
        fetch('http://localhost:8080/brand', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ brandName }),
        })
        .then(response => response.json())
        .then(newBrand => {
            setBrands([...brands, newBrand]);
            setShowAddModal(false);
        })
        .catch(error => console.error('Error adding brand:', error));
    };

    const handleUpdateBrand = (brandName) => {
        fetch(`http://localhost:8080/brand/edit/${brandToEdit.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ brandName }),
        })
        .then(response => response.json())
        .then(updatedBrand => {
            setBrands(brands.map(brand => (brand.id === updatedBrand.id ? updatedBrand : brand)));
            setShowEditModal(false);
        })
        .catch(error => console.error('Error updating brand:', error));
    };

    const handleDeleteBrand = () => {
        fetch(`http://localhost:8080/brand/delete/${deleteBrandId}`, {
            method: 'DELETE',
        })
        .then(() => {
            setBrands(brands.filter(brand => brand.id !== deleteBrandId));
            setShowDeleteModal(false);
        })
        .catch(error => console.error('Error deleting brand:', error));
    };

    return (
        <div>
            <div className="header">
                <img src={tentImage} alt="텐트 이미지"/>
                <h1>늘쩍늘쩍</h1>
            </div>
            <div className="brand-list">
                <div className="brand-header">
                    <h2>브랜드 목록 - 관리자 화면</h2>
                    <button className="brand-add-button" onClick={() => setShowAddModal(true)}>브랜드 추가</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>브랜드명</th>
                            <th>수정</th>
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody id="brandList">
                        {brands.map(brand => (
                            <tr key={brand.id}>
                                <td>{brand.id}</td>
                                <td>{brand.brandName}</td>
                                <td>
                                    <button onClick={() => {
                                        setBrandToEdit(brand);
                                        setShowEditModal(true);
                                    }}>수정</button>
                                </td>
                                <td>
                                    <button onClick={() => {
                                        setDeleteBrandId(brand.id);
                                        setShowDeleteModal(true);
                                    }}>삭제</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <BrandAdd 
                    show={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSave={handleAddBrand}
                />
                <BrandEdit
                    show={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    onSave={handleUpdateBrand}
                    brandToEdit={brandToEdit}
                />
                <BrandDelete
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleDeleteBrand}
                />
            </div>
        </div>
    );
};

export default BrandListAdmin;
