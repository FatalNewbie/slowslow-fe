import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../list-styles.css';

const CategoryPage = () => {
    const { id } = useParams();
    const [category, setCategory] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/category/${id}`)
            .then(response => response.json())
            .then(data => setCategory(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [id]);

    if (!category) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{category.categoryName}</h1>
        </div>
    );
};

export default CategoryPage;