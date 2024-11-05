import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditQuote = () => {
  const { id } = useParams();
  const [quote, setQuote] = useState({
    title: '',
    description: '',
    client: '',
    amount: '',
    status: '',
    expiresOn: '',
  });
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchQuoteDetails = async () => {
      try {
        const quoteResponse = await axios.get(`http://localhost:4000/api/quotes/${id}`);
        setQuote(quoteResponse.data);

        const clientsResponse = await axios.get('http://localhost:4000/api/clients');
        setClients(clientsResponse.data);
      } catch (error) {
        console.error('Error fetching quote details:', error);
      }
    };
    fetchQuoteDetails();
  }, [id]);

  const handleChange = (e) => {
    setQuote({
      ...quote,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting Quote:', quote);  // Debug print
    try {
      const response = await axios.put(`http://localhost:4000/api/quotes/${id}`, quote);
      console.log('Response:', response);  // Debug print
      window.location.href = '/quotes/view';
    } catch (error) {
      console.error('Error updating quote:', error);
    }
  };

  return (
    <div>
      <h1>Edit Quote</h1>
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
              <option key={client._id} value={client._id}>{client.name}</option>  // Use _id for value
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
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditQuote;
