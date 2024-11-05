import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const invoiceResponse = await axios.get('http://localhost:4000/api/invoices');
        const quoteResponse = await axios.get('http://localhost:4000/api/quotes');
        const clientResponse = await axios.get('http://localhost:4000/api/clients');
        setInvoices(invoiceResponse.data);
        setQuotes(quoteResponse.data);
        setClients(clientResponse.data);
        console.log('Fetched Invoices:', invoiceResponse.data);
        console.log('Fetched Quotes:', quoteResponse.data);
        console.log('Fetched Clients:', clientResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchInvoices();
  }, []);

  const getQuoteName = (quoteId) => {
    const quote = quotes.find(q => q._id === quoteId);
    return quote ? quote.title : 'Unknown';
  };

  const getClientName = (clientId) => {
    const client = clients.find(c => c._id === clientId);
    return client ? client.name : 'Unknown';
  };

  const deleteInvoice = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/invoices/${id}`);
      setInvoices(invoices.filter(invoice => invoice._id !== id));
    } catch (error) {
      console.error('Error deleting invoice:', error);
    }
  };

  const editInvoice = (id) => {
    window.location.href = `/invoices/edit/${id}`;
  };

  return (
    <div>
      <h1>Existing Invoices</h1>
      <ul>
        {invoices.map(invoice => (
          <li key={invoice._id} style={{ marginBottom: '15px' }}>
            <div><strong>Invoice:</strong> {getQuoteName(invoice.quoteId)}</div>
            <div><strong>Client:</strong> {getClientName(invoice.clientId)}</div>
            <div><strong>Amount Due:</strong> {invoice.amountDue}</div>
            <div><strong>Status:</strong> {invoice.status}</div>
            <div><strong>Due Date:</strong> {new Date(invoice.dueDate).toLocaleDateString()}</div>
            <button onClick={() => editInvoice(invoice._id)}>Edit</button>
            <button onClick={() => deleteInvoice(invoice._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewInvoices;
