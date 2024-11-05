import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Projects = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    client: '',
    status: 'Not Started',
    startDate: '',
    dueDate: '',
    assignedTo: '',
  });

  const [jobs, setJobs] = useState([]);
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);  // State for users

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsResponse, clientsResponse, usersResponse] = await Promise.all([
          axios.get('http://localhost:4000/api/jobs'),
          axios.get('http://localhost:4000/api/clients'),
          axios.get('http://localhost:4000/api/users')
        ]);
        setJobs(jobsResponse.data);
        setClients(clientsResponse.data);
        setUsers(usersResponse.data);  // Set users state
      } catch (error) {
        console.error('Error fetching jobs, clients, or users:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/projects', formData);
      alert('Project created successfully!');
      setFormData({
        title: '',
        description: '',
        client: '',
        status: 'Not Started',
        startDate: '',
        dueDate: '',
        assignedTo: '',
      });
    } catch (error) {
      alert('Error: ' + (error.response?.data?.message || 'An error occurred.'));
    }
  };

  return (
    <div>
      <h1>Create Project</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </label>
        <label>Description:
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <label>Client ID:
          <select name="client" value={formData.client} onChange={handleChange} required>
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name} (ID: {client._id})
              </option>
            ))}
          </select>
        </label>
        <label>Job ID:
          <select name="jobId" value={formData.jobId} onChange={handleChange} required>
            <option value="">Select a job</option>
            {jobs.map((job) => (
              <option key={job._id} value={job._id}>
                {job.title} (ID: {job._id})
              </option>
            ))}
          </select>
        </label>
        <label>Status:
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
        <label>Start Date:
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
        </label>
        <label>Due Date:
          <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required />
        </label>
        <label>Assigned To:
          <select name="assignedTo" value={formData.assignedTo} onChange={handleChange} required>
            <option value="">Select a user</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>
        </label>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default Projects;
