// src/pages/ViewQuotes.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchQuotesAndClients = async () => {
      try {
        const quotesResponse = await axios.get('http://localhost:4000/api/quotes');
        setQuotes(quotesResponse.data);

        const clientsResponse = await axios.get('http://localhost:4000/api/clients');
        setClients(clientsResponse.data);
      } catch (error) {
        console.error('Error fetching quotes and clients:', error);
      }
    };
    fetchQuotesAndClients();
  }, []);

  const deleteQuote = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/quotes/${id}`);
      setQuotes(quotes.filter(quote => quote._id !== id));
    } catch (error) {
      console.error('Error deleting quote:', error);
    }
  };

  const editQuote = (id) => {
    window.location.href = `/quotes/edit/${id}`;
  };

  const getClientName = (clientId) => {
    const client = clients.find(client => client._id === clientId);
    return client ? client.name : 'Unknown Client';
  };

  return (
    <div>
      <h1>Existing Quotes</h1>
      {quotes.map(quote => (
        <div key={quote._id} className="quote-card">
          <p><strong>Job Title:</strong> {quote.title}</p>
          <p><strong>Total Amount:</strong> ${quote.amount || '0.00'}</p>
          <p><strong>Expires On:</strong> {new Date(quote.expiresOn).toLocaleDateString()}</p>
          <p><strong>Client:</strong> {getClientName(quote.client)}</p>
          <p><strong>Description:</strong> {quote.description}</p>
          <p><strong>Status:</strong> {quote.status}</p>
          <div className="quote-actions">
            <button onClick={() => editQuote(quote._id)}>Edit</button>
            <button onClick={() => deleteQuote(quote._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewQuotes;
