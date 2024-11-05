import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Invoices = () => {
  const [formData, setFormData] = useState({
    quoteId: '',
    clientId: '',  // Added clientId field
    amountDue: '',
    dueDate: '',
    status: 'Pending',
  });

  const [quotes, setQuotes] = useState([]);
  const [clients, setClients] = useState([]);  // State for clients

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/quotes');
        setQuotes(response.data);
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    };

    fetchQuotes();
  }, []);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/clients');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);  // Debug print to check data
    try {
      const response = await axios.post('http://localhost:4000/api/invoices', formData);
      alert('Invoice created successfully!');
      setFormData({
        quoteId: '',
        clientId: '',  // Reset clientId field
        amountDue: '',
        dueDate: '',
        status: 'Pending',
      });
    } catch (error) {
      console.error('Error creating invoice:', error);  // Log the error
      alert('Error: ' + (error.response?.data?.message || 'An error occurred.'));
    }
  };

  return (
    <div>
      <h1>Create Invoice</h1>
      <form onSubmit={handleSubmit}>
        <label>Quote:
          <select name="quoteId" value={formData.quoteId} onChange={handleChange} required>
            <option value="">Select a quote</option>
            {quotes.map((quote) => (
              <option key={quote._id} value={quote._id}>
                {quote.title} (ID: {quote._id})
              </option>
            ))}
          </select>
        </label>
        <label>Client:
          <select name="clientId" value={formData.clientId} onChange={handleChange} required>
            <option value="">Select a client</option>
            {clients.map(client => (
              <option key={client._id} value={client._id}>{client.name}</option>
            ))}
          </select>
        </label>
        <label>Amount Due:
          <input type="number" name="amountDue" value={formData.amountDue} onChange={handleChange} required />
        </label>
        <label>Due Date:
          <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required />
        </label>
        <label>Status:
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Overdue">Overdue</option>
          </select>
        </label>
        <button type="submit">Create Invoice</button>
      </form>
    </div>
  );
};

export default Invoices;
