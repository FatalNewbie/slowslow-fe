import React, { useState } from 'react';
import { TextField, Button, Grid, MenuItem } from '@mui/material';

const ProductForm = ({ onSave, onClose, initialValue, brands, categories }) => {
    const [formData, setFormData] = useState(initialValue || {});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onSave(formData);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField fullWidth name="name" label="제품명" value={formData.name || ''} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    name="price"
                    label="가격"
                    type="number"
                    value={formData.price || ''}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    name="description"
                    label="설명"
                    multiline
                    rows={4}
                    value={formData.description || ''}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    select
                    name="brandId"
                    label="브랜드"
                    value={formData.brandId || ''}
                    onChange={handleChange}
                >
                    {brands.map((brand) => (
                        <MenuItem key={brand.id} value={brand.id}>
                            {brand.brandName}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    select
                    name="categoryId"
                    label="카테고리"
                    value={formData.categoryId || ''}
                    onChange={handleChange}
                >
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.categoryName}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    name="imageLink"
                    label="이미지 링크"
                    value={formData.imageLink || ''}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    저장
                </Button>
                <Button onClick={onClose} variant="contained" color="secondary" style={{ marginLeft: '10px' }}>
                    취소
                </Button>
            </Grid>
        </Grid>
    );
};

export default ProductForm;
