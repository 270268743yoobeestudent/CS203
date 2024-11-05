import React, { useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '', // Ensure username is included
    email: '',
    password: '',
    role: 'User',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:4000/api/users', formData);
      console.log(response.data);
      alert('User created successfully!');
      setFormData({ name: '', username: '', email: '', password: '', role: 'User' });
    } catch (error) {
      console.error('There was an error creating the user!', error);
      setError('Error creating user. Please check the console for details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </label>
        <label>Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <label>Role:
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </label>
        <button type="submit">Create User</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Users;
