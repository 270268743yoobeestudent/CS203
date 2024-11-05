// src/pages/CreateJob.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateJob = () => {
  const [job, setJob] = useState({
    title: '',
    description: '',
    client: '',
    status: '',
    dueDate: '',
    assignedTo: ''
  });
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchClientsAndUsers = async () => {
      try {
        const clientsResponse = await axios.get('http://localhost:4000/api/clients');
        setClients(clientsResponse.data);

        const usersResponse = await axios.get('http://localhost:4000/api/users');
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Error fetching clients and users:', error);
      }
    };
    fetchClientsAndUsers();
  }, []);

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/jobs', job);
      window.location.href = '/jobs/view';
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <div>
      <h1>Create Job</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={job.title} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={job.description} onChange={handleChange} required />
        </label>
        <label>
          Client:
          <select name="client" value={job.client} onChange={handleChange} required>
            <option value="">Select a client</option>
            {clients.map(client => (
              <option key={client._id} value={client.name}>{client.name}</option>
            ))}
          </select>
        </label>
        <label>
          Status:
          <select name="status" value={job.status} onChange={handleChange} required>
            <option value="">Select status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
        <label>
          Due Date:
          <input type="date" name="dueDate" value={job.dueDate} onChange={handleChange} required />
        </label>
        <label>
          Assigned To:
          <select name="assignedTo" value={job.assignedTo} onChange={handleChange} required>
            <option value="">Assign to a user</option>
            {users.map(user => (
              <option key={user._id} value={user.name}>{user.name}</option>
            ))}
          </select>
        </label>
        <button type="submit">Create Job</button>
      </form>
    </div>
  );
};

export default CreateJob;
