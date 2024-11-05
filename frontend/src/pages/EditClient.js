import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditClient = () => {
  const { id } = useParams();
  const [client, setClient] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const fetchClient = async () => {
      const response = await axios.get(`http://localhost:4000/api/clients/${id}`);
      setClient(response.data);
    };
    fetchClient();
  }, [id]);

  const handleChange = (e) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/clients/${id}`, client);
      window.location.href = '/clients/view';
    } catch (error) {
      console.error('Error updating client:', error);
    }
  };

  return (
    <div>
      <h1>Edit Client</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={client.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={client.email} onChange={handleChange} required />
        </label>
        <label>
          Phone:
          <input type="text" name="phone" value={client.phone} onChange={handleChange} required />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={client.address} onChange={handleChange} required />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditClient;
