import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditInventory = () => {
  const { id } = useParams();
  const [inventory, setInventory] = useState({
    itemName: '',
    quantity: '',
    location: '',
    price: '',
    description: ''
  });

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/inventories/${id}`);
        console.log('Fetched Inventory:', response.data); // Debug print
        setInventory(response.data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };
    fetchInventory();
  }, [id]);

  const handleChange = (e) => {
    setInventory({
      ...inventory,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/inventories/${id}`, inventory);
      window.location.href = '/inventories/view';
    } catch (error) {
      console.error('Error updating inventory item:', error);
    }
  };

  return (
    <div>
      <h1>Edit Inventory Item</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Item Name:
          <input type="text" name="itemName" value={inventory.itemName} onChange={handleChange} required />
        </label>
        <label>
          Quantity:
          <input type="number" name="quantity" value={inventory.quantity} onChange={handleChange} required />
        </label>
        <label>
          Location:
          <input type="text" name="location" value={inventory.location} onChange={handleChange} required />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={inventory.price} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={inventory.description} onChange={handleChange} required />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditInventory;
