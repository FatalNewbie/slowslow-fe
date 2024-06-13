import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../list-styles.css';

const BrandPage = () => {
    const { id } = useParams();
    const [brand, setBrand] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/brand/${id}`)
            .then(response => response.json())
            .then(data => setBrand(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [id]);

    if (!brand) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{brand.brandName} 상품 목록</h1>
        </div>
    );
};

export default BrandPage;