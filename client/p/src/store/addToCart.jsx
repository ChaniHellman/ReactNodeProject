import React from 'react';
import Axios from 'axios';
import { Button } from 'primereact/button';

const AddToCart = ({ Product, msgs }) => {
  const Add = async () => {
    try {
      const response = await Axios.post("http://localhost:2222/api/cart/add", 
        { prodId: Product._id },
        {
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        }
      );
      
      if (msgs.current) {
        msgs.current.show([
          { severity: 'success', detail: 'Product added to the cart successfully', life: 3000, className: 'custom-success-message' }
        ]);
      }
    } catch (error) {      
      if (msgs.current) {
        msgs.current.show([
          { severity: 'error', detail: 'Failed to add product to cart', life: 3000 }
        ]);
      }
    }
  }

  return (
    <Button label="Add to Cart" icon="pi pi-shopping-cart" onClick={Add} />
  );
}

export default AddToCart;
