import React, { useState } from 'react';
import axios from 'axios';

const Clients = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
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
      const response = await axios.post('http://localhost:4000/api/clients', formData);
      console.log(response.data);
      alert('Client created successfully!');
      setFormData({ name: '', email: '', phone: '', address: '' });
    } catch (error) {
      console.error('There was an error creating the client!', error);
      alert('Error: ' + (error.response?.data?.message || 'An error occurred.'));
    }
  };

  return (
    <div>
      <h1>Create Client</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Phone:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </label>
        <button type="submit">Create Client</button>
      </form>
    </div>
  );
};

export default Clients;
