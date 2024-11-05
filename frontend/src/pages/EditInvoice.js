import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditInvoice = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState({
    quoteId: '',
    clientId: '',  // Added clientId field
    amountDue: '',
    dueDate: '',
    status: ''
  });
  const [quotes, setQuotes] = useState([]);
  const [clients, setClients] = useState([]);  // State for clients

  useEffect(() => {
    const fetchInvoice = async () => {
      const response = await axios.get(`http://localhost:4000/api/invoices/${id}`);
      setInvoice(response.data);
    };
    fetchInvoice();
  }, [id]);

  useEffect(() => {
    const fetchQuotes = async () => {
      const response = await axios.get('http://localhost:4000/api/quotes');
      setQuotes(response.data);
    };
    fetchQuotes();
  }, []);

  useEffect(() => {
    const fetchClients = async () => {
      const response = await axios.get('http://localhost:4000/api/clients');
      setClients(response.data);
    };
    fetchClients();
  }, []);

  const handleChange = (e) => {
    setInvoice({
      ...invoice,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/invoices/${id}`, invoice);
      window.location.href = '/invoices/view';
    } catch (error) {
      console.error('Error updating invoice:', error);
    }
  };

  return (
    <div>
      <h1>Edit Invoice</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Quote:
          <select name="quoteId" value={invoice.quoteId} onChange={handleChange} required>
            <option value="">Select a quote</option>
            {quotes.map(quote => (
              <option key={quote._id} value={quote._id}>{quote.title}</option>
            ))}
          </select>
        </label>
        <label>
          Client:
          <select name="clientId" value={invoice.clientId} onChange={handleChange} required>  // Client selection box
            <option value="">Select a client</option>
            {clients.map(client => (
              <option key={client._id} value={client._id}>{client.name}</option>
            ))}
          </select>
        </label>
        <label>
          Amount Due:
          <input type="number" name="amountDue" value={invoice.amountDue} onChange={handleChange} required />
        </label>
        <label>
          Due Date:
          <input type="date" name="dueDate" value={invoice.dueDate.slice(0, 10)} onChange={handleChange} required />
        </label>
        <label>
          Status:
          <select name="status" value={invoice.status} onChange={handleChange} required>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Overdue">Overdue</option>
          </select>
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditInvoice;
