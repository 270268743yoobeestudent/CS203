import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditProject = () => {
  const { id } = useParams();
  const [project, setProject] = useState({
    title: '',
    description: '',
    client: '',
    jobId: '',
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
        const projectResponse = await axios.get(`http://localhost:4000/api/projects/${id}`);
        setProject(projectResponse.data);
        
        const [jobsResponse, clientsResponse, usersResponse] = await Promise.all([
          axios.get('http://localhost:4000/api/jobs'),
          axios.get('http://localhost:4000/api/clients'),
          axios.get('http://localhost:4000/api/users')
        ]);
        setJobs(jobsResponse.data);
        setClients(clientsResponse.data);
        setUsers(usersResponse.data);  // Set users state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/projects/${id}`, project);
      window.location.href = '/projects/view';
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  return (
    <div>
      <h1>Edit Project</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:
          <input type="text" name="title" value={project.title} onChange={handleChange} required />
        </label>
        <label>Description:
          <input type="text" name="description" value={project.description} onChange={handleChange} required />
        </label>
        <label>Client:
          <select name="client" value={project.client} onChange={handleChange} required>
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name} (ID: {client._id})
              </option>
            ))}
          </select>
        </label>
        <label>Job:
          <select name="jobId" value={project.jobId} onChange={handleChange} required>
            <option value="">Select a job</option>
            {jobs.map((job) => (
              <option key={job._id} value={job._id}>
                {job.title} (ID: {job._id})
              </option>
            ))}
          </select>
        </label>
        <label>Status:
          <select name="status" value={project.status} onChange={handleChange}>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
        <label>Start Date:
          <input type="date" name="startDate" value={project.startDate.slice(0, 10)} onChange={handleChange} />
        </label>
        <label>Due Date:
          <input type="date" name="dueDate" value={project.dueDate.slice(0, 10)} onChange={handleChange} required />
        </label>
        <label>Assigned To:
          <select name="assignedTo" value={project.assignedTo} onChange={handleChange} required>
            <option value="">Select a user</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProject;
