import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import '../css.css'

const Cart = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const { data } = await Axios.get("http://localhost:2222/api/cart/all", {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const imageBodyTemplate = (product) => {
        return <img id="img" src={product.prodId.picture} className="w-6rem shadow-2 border-round" />;
    };

    const priceBodyTemplate = (product) => {
        return formatCurrency(product.prodId.price);
    };

    const colorBodyTemplate = (product) => {
        return product.prodId.color || 'N/A';
    };

    const handleDelete = async (product) => {
        try {
            const { data } = await Axios.delete("http://localhost:2222/api/cart/delete", {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                },
                data: {
                    prodId: product.prodId._id
                }
            });
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const deleteButtonTemplate = (rowData) => {
        return (
            <Button
                icon="pi pi-trash"
                className="p-button-danger p-button-rounded p-button-sm"
                onClick={() => handleDelete(rowData)}
            />
        );
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Shopping Cart</span>
        </div>
    );

    const footer = `In total there are ${products.length} products.`;

    return (
        <div className="card cart-container">
            <h1 style={{ textAlign: 'center', fontSize: '4rem', marginTop: '10px', marginBottom: '20px', color: 'black', fontWeight: '900' }}>Cart</h1>

            <DataTable value={products} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}>
                <Column field="name" header="Name" body={(product) => product.prodId.name || 'N/A'}></Column>
                <Column id="my" header="Image" body={imageBodyTemplate} ></Column>
                <Column field="price" header="Price" body={priceBodyTemplate}></Column>
                <Column field="color" header="Color" body={colorBodyTemplate}></Column>
                <Column header="" body={deleteButtonTemplate}></Column>
            </DataTable>
        </div>
    );
};

export default Cart;
