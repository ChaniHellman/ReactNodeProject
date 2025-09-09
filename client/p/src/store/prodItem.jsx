import Axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import '../css.css';

const ProdItem = ({ Product, fetchProducts, onDeleteError }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await Axios.delete("http://localhost:2222/api/prod/delete", {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                },
                data: {
                    id: Product._id
                }
            });
            fetchProducts();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                onDeleteError(error.response.data.message || 'Cannot delete product in use');
            } else {
                onDeleteError('An error occurred');
            }
        }
    };

    return (
        <div className="prod-item">
            <div className="prod-info">
                <h3 className="product-card-name">{Product.name}</h3>
                <img src={Product.picture} className="prod-item-image" />
                <p className="product-card-price">${Product.price}</p>
                <p className="prod-item-description">Color: {Product.color}</p>
            </div>
            <div className="prod-actions">
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={handleDelete} />
                <Button label="Update" icon="pi pi-pencil" className="p-button-secondary" id="update" onClick={() => navigate('/add', { state: Product })} />
            </div>
        </div>
    );
};

export default ProdItem;
