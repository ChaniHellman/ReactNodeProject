import React, { useEffect, useState, useRef } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import AddToCart from './addToCart';
import '../css.css';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import 'primeicons/primeicons.css'; 

const Products2 = () => {
    const [products, setProducts] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const msgs = useRef(null);

    const fetchProducts = async () => {
        const { data } = await Axios.get("http://localhost:2222/api/prod/getAll");
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    if (products.length === 0) return <h1>No products</h1>;

    return (
        <div className="product-container">
            <Messages ref={msgs} className="messages-container" />
            <h1 style={{ textAlign: 'center', fontSize: '4rem',marginTop:'10px', marginBottom: '20px', color: 'black', fontWeight: '900' }}>Our Products</h1>
            {isAuthenticated && (
                <div className="cart-button-container">
                    <Link to="/cart">
                        <Button 
                            icon="pi pi-shopping-cart" 
                            className="p-button p-button-text cart-button"
                            aria-label="Cart">
                        </Button>
                    </Link>
                </div>
            )}
            <div className="product-grid">
                {products.map((prod) => (
                    <div className="product-card">
                        <div className="product-card-info">
                            <p className="product-card-name">{prod.name}</p>
                            <img src={prod.picture} className="product-card-image" />
                            <p className="product-card-price">${prod.price}</p>
                            {isAuthenticated && (
                                <AddToCart Product={prod} msgs={msgs} /> 
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products2;
