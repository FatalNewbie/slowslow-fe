import React, { useEffect, useState } from 'react';
import '../../list-styles.css';
import tentImage from '../../icons/tent_image.png';
import { Link } from 'react-router-dom';

const BrandList = () => {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/brand/all')
            .then(response => response.json())
            .then(data => setBrands(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <div class="header">
                <img src={tentImage} alt="텐트 이미지"/>
                <h1>늘쩍늘쩍</h1>
            </div>
            <div className="brand-list">
                <h2>브랜드 목록</h2>
                <table>
                    <thead>
                        <tr>
                            <th>브랜드명</th>
                        </tr>
                    </thead>
                    <tbody id="brandList">
                        {brands.map(brand => (
                            <tr key={brand.id}>
                                <Link to={`/brand/${brand.id}`}>{brand.brandName}</Link>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BrandList;
