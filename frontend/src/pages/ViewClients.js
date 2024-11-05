import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewClients = () => {
  const [clients, setClients] = useState([]);

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

  const deleteClient = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/clients/${id}`);
      setClients(clients.filter(client => client._id !== id));
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const editClient = (id) => {
    window.location.href = `/clients/edit/${id}`;
  };

  return (
    <div>
      <h1>Existing Clients</h1>
      <ul>
        {clients.map(client => (
          <li key={client._id}>
            <p><strong>Name:</strong> {client.name}</p>
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Phone:</strong> {client.phone}</p>
            <p><strong>Address:</strong> {client.address}</p>
            <button onClick={() => editClient(client._id)}>Edit</button>
            <button onClick={() => deleteClient(client._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewClients;
