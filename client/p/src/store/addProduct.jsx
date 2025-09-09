import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

const AddProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState(""); 
  const [picture, setPicture] = useState("");
  const [productId, setProductId] = useState(null);
  const toast = React.useRef(null); 

  useEffect(() => {
    if (location.state) {
      const { name, color, price, _id, picture } = location.state;
      setName(name);
      setColor(color);
      setPrice(price);
      setProductId(_id);
      setPicture(`/${picture}`);
    }
  }, [location.state]);

  const validatePrice = (value) => {
    const number = parseFloat(value);
    return !isNaN(number) && number >= 0;
  };

  const add = async (e) => {
    e.preventDefault();
    if (!validatePrice(price)) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Invalid price value.', life: 3000 });
      return;
    }
    try {
      const response = await Axios.post("http://localhost:2222/api/prod/create",
        { name, color, price: parseFloat(price), picture },
        {
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        }
      );
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Product added successfully!' });
      navigate('/products');
    } catch (err) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to add product.' });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validatePrice(price)) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Invalid price value.', life: 3000 });
      return;
    }
    try {
      setPicture(`/${picture}`);
      const response = await Axios.put(`http://localhost:2222/api/prod/update`,
        { name, color, price: parseFloat(price), productId, picture },
        {
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        }
      );
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Product updated successfully!' });
      navigate('/products');
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to update product.' });
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="form-container">
        <form onSubmit={productId ? handleUpdate : add} className="p-fluid">
          <div className="p-field">
            <label htmlFor="name">Name</label>
            <InputText
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="color">Color</label>
            <InputText
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="price">Price</label>
            <InputText
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="picture">Picture URL</label>
            <InputText
              id="picture"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            label={productId ? 'Update' : 'Add'}
            icon="pi pi-save"
            className="p-button-primary"
          />
        </form>
      </div>
    </>
  );
};

export default AddProducts;
