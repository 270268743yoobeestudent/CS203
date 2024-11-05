// src/pages/CreateQuote.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateQuote = () => {
  const [quote, setQuote] = useState({
    title: '',
    description: '',
    client: '',
    amount: '',
    status: '',
    expiresOn: ''
  });
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clientsResponse = await axios.get('http://localhost:4000/api/clients');
        setClients(clientsResponse.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };
    fetchClients();
  }, []);

  const handleChange = (e) => {
    setQuote({
      ...quote,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/quotes', quote);
      window.location.href = '/quotes/view';
    } catch (error) {
      console.error('Error creating quote:', error);
    }
  };

  return (
    <div>
      <h1>Create Quote</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={quote.title} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={quote.description} onChange={handleChange} required />
        </label>
        <label>
          Client:
          <select name="client" value={quote.client} onChange={handleChange} required>
            <option value="">Select a client</option>
            {clients.map(client => (
              <option key={client._id} value={client._id}>{client.name}</option>
            ))}
          </select>
        </label>
        <label>
          Amount:
          <input type="number" name="amount" value={quote.amount} onChange={handleChange} required />
        </label>
        <label>
          Status:
          <select name="status" value={quote.status} onChange={handleChange} required>
            <option value="">Select status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </label>
        <label>
          Expires On:
          <input type="date" name="expiresOn" value={quote.expiresOn} onChange={handleChange} required />
        </label>
        <button type="submit">Create Quote</button>
      </form>
    </div>
  );
};

export default CreateQuote;
