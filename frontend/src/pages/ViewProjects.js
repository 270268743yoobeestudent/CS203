import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewProjects = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsResponse, clientsResponse, jobsResponse, usersResponse] = await Promise.all([
          axios.get('http://localhost:4000/api/projects'),
          axios.get('http://localhost:4000/api/clients'),
          axios.get('http://localhost:4000/api/jobs'),
          axios.get('http://localhost:4000/api/users')
        ]);
        setProjects(projectsResponse.data);
        setClients(clientsResponse.data);
        setJobs(jobsResponse.data);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getClientName = (clientId) => {
    const client = clients.find(client => client._id === clientId);
    return client ? client.name : 'Unknown';
  };

  const getJobTitle = (jobId) => {
    const job = jobs.find(job => job._id === jobId);
    return job ? job.title : 'Unknown';
  };

  const getUserName = (userId) => {
    const user = users.find(user => user._id === userId);
    return user ? user.name : 'Unknown';
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/projects/${id}`);
      setProjects(projects.filter(project => project._id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const editProject = (id) => {
    window.location.href = `/projects/edit/${id}`;
  };

  return (
    <div>
      <h1>Existing Projects</h1>
      <ul>
        {projects.map(project => (
          <li key={project._id} style={{ marginBottom: '15px' }}>
            <div><strong>Title:</strong> {project.title}</div>
            <div><strong>Description:</strong> {project.description}</div>
            <div><strong>Client:</strong> {getClientName(project.client)}</div>
            <div><strong>Job:</strong> {getJobTitle(project.jobId)}</div>
            <div><strong>Status:</strong> {project.status}</div>
            <div><strong>Start Date:</strong> {new Date(project.startDate).toLocaleDateString()}</div>
            <div><strong>Due Date:</strong> {new Date(project.dueDate).toLocaleDateString()}</div>
            <div><strong>Assigned To:</strong> {getUserName(project.assignedTo)}</div>
            <button onClick={() => editProject(project._id)}>Edit</button>
            <button onClick={() => deleteProject(project._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewProjects;
