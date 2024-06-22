import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Form from './ProductForm';

const ProductModal = ({ show, title, onClose, onSave, initialValue, brands, categories }) => {
    return (
        <Dialog open={show} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Form
                    initialValue={initialValue}
                    onSave={onSave}
                    onClose={onClose}
                    brands={brands}
                    categories={categories}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    닫기
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductModal;
