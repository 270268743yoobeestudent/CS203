// src/pages/ViewJobs.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await axios.get('http://localhost:4000/api/jobs');
      setJobs(response.data);
    };
    fetchJobs();
  }, []);

  const deleteJob = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/jobs/${id}`);
      setJobs(jobs.filter(job => job._id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const editJob = (id) => {
    window.location.href = `/jobs/edit/${id}`;
  };

  return (
    <div>
      <h1>Existing Jobs</h1>
      {jobs.map(job => (
        <div key={job._id} className="job-card">
          <h3>{job.title}</h3>
          <p><strong>Description:</strong> {job.description}</p>
          <p><strong>Client:</strong> {job.client}</p>
          <p><strong>Status:</strong> {job.status}</p>
          <p><strong>Due Date:</strong> {new Date(job.dueDate).toLocaleDateString()}</p>
          <p><strong>Assigned To:</strong> {job.assignedTo}</p>
          <div className="job-actions">
            <button onClick={() => editJob(job._id)}>Edit</button>
            <button onClick={() => deleteJob(job._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewJobs;
