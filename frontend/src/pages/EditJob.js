// src/pages/EditJob.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditJob = () => {
  const { id } = useParams();
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
    const fetchJobDetails = async () => {
      try {
        const jobResponse = await axios.get(`http://localhost:4000/api/jobs/${id}`);
        setJob(jobResponse.data);

        const clientsResponse = await axios.get('http://localhost:4000/api/clients');
        setClients(clientsResponse.data);

        const usersResponse = await axios.get('http://localhost:4000/api/users');
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };
    fetchJobDetails();
  }, [id]);

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/jobs/${id}`, job);
      window.location.href = '/jobs/view';
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  return (
    <div>
      <h1>Edit Job</h1>
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
          <input type="date" name="dueDate" value={job.dueDate ? new Date(job.dueDate).toISOString().split('T')[0] : ''} onChange={handleChange} required />
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
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditJob;
