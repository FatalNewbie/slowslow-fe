import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../list-styles.css';

const CategoryPage = () => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/category/${categoryId}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.content) {
                    setProducts(data.content);
                    setCategoryName(data.content.length > 0 ? data.content[0].category.name : ""); 
                } else {
                    setProducts([]);
                    setCategoryName("");
                }
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [categoryId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading products: {error.message}</p>;
    }

    return (
        <div>
            <div className="product-list">
                <div className="product-header">
                    <h2>{categoryName} 상품 목록</h2>
                </div>
                {products.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>상품명</th>
                                <th>가격</th>
                                <th>설명</th>
                                <th>이미지 링크</th>
                                <th>브랜드</th>
                            </tr>
                        </thead>
                        <tbody id="productList">
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.description}</td>
                                    <td><a href={product.imageLink} target="_blank" rel="noopener noreferrer">{product.imageLink}</a></td>
                                    <td>{product.brand ? product.brand.name : 'Unknown'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>해당 카테고리에 속하는 상품이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
