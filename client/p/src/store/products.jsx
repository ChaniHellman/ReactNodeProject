import React, { useEffect, useState, useRef } from 'react';
import Axios from 'axios';
import ProdItem from './prodItem';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast'; 
import { useNavigate } from 'react-router-dom';
import '../css.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const toast = useRef(null);
  const navigate = useNavigate(); 

  const fetchProducts = async () => {
    try {
      const { data } = await Axios.get("http://localhost:2222/api/prod/getAll");
      setProducts(data);
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error fetching products', life: 5000 });
    }
  };

  const handleDeleteError = (message) => {
    toast.current.show({ severity: 'error', summary: '', detail: message, life: 5000 }); 
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (products.length === 0) return (
    <div>
      <h1>No products</h1>
      <Button 
        label="Add Product" 
        icon="pi pi-plus" 
        className="add-product-button" 
        onClick={() => navigate('/add')} 
      />
    </div>
  );

  return (
    <div>
      <Toast ref={toast} position="top-right" /> 
      <Button 
        id="add-to-cart-button" 
        label="Add Product" 
        icon="pi pi-plus" 
        className="add-product-button" 
        onClick={() => navigate('/add')} 
      />
      <div className="product-grid">
        {products.map((prod) => (
          <div className="product-card-info">
            <ProdItem Product={prod} fetchProducts={fetchProducts} onDeleteError={handleDeleteError} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
