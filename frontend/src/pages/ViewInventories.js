import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewInventories = () => {
  const [inventories, setInventories] = useState([]);

  useEffect(() => {
    const fetchInventories = async () => {
      const response = await axios.get('http://localhost:4000/api/inventories');
      setInventories(response.data);
    };
    fetchInventories();
  }, []);

  const deleteInventory = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/inventories/${id}`);
      setInventories(inventories.filter(inventory => inventory._id !== id));
    } catch (error) {
      console.error('Error deleting inventory:', error);
    }
  };

  const editInventory = (id) => {
    window.location.href = `/inventories/edit/${id}`;
  };

  return (
    <div>
      <h1>Existing Inventories</h1>
      <ul>
        {inventories.map(inventory => (
          <li key={inventory._id} style={{ marginBottom: '15px' }}>
            <div><strong>Item Name:</strong> {inventory.itemName}</div>
            <div><strong>Quantity:</strong> {inventory.quantity}</div>
            <div><strong>Location:</strong> {inventory.location}</div>
            <div><strong>Price:</strong> ${inventory.price}</div>
            <div><strong>Description:</strong> {inventory.description}</div>
            <button onClick={() => editInventory(inventory._id)}>Edit</button>
            <button onClick={() => deleteInventory(inventory._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewInventories;
