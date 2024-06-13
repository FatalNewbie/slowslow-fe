import React, { useEffect, useState } from 'react';
import '../../list-styles.css';
import tentImage from '../../icons/tent_image.png';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/category/all')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <div class="header">
                <img src={tentImage} alt="텐트 이미지"/>
                <h1>늘쩍늘쩍</h1>
            </div>
            <div className="category-list">
                <h2>카테고리 목록</h2>
                <table>
                    <thead>
                        <tr>
                            <th>카테고리명</th>
                        </tr>
                    </thead>
                    <tbody id="categoryList">
                        {categories.map(category => (
                                <tr key={category.id}>
                                    <Link to={`/category/${category.id}`}>{category.categoryName}</Link>
                                </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryList;
