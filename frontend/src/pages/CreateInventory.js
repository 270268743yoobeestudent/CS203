import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Inventories = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: '',
    location: '',
    price: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/inventories', formData);
      alert('Inventory item created successfully!');
    } catch (error) {
      console.error('There was an error creating the inventory item!', error);
      alert('Error creating inventory item. Please try again.');
    }
  };

  return (
    <div>
      <h1>Create Inventory Item</h1>
      <form onSubmit={handleSubmit}>
        <label>Item Name:
          <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} required />
        </label>
        <label>Quantity:
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
        </label>
        <label>Location:
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        </label>
        <label>Price:
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </label>
        <label>Description:
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <button type="submit">Create Inventory Item</button>
      </form>
    </div>
  );
};

export default Inventories;
