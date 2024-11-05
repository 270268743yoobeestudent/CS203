import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';  // Ensure the correct path to CSS file
import logo from './logo.png';  // Ensure the correct path to logo image

const Navbar = () => {
  return (
    <div className="sidebar">
      <img src={logo} alt="Logo" className="logo" />
      <ul className="navbar">
        <li>
          <span>Jobs</span>
          <ul>
            <li><Link to="/jobs/create">Create Job</Link></li>
            <li><Link to="/jobs/view">View Jobs</Link></li>
          </ul>
        </li>
        <li>
          <span>Quotes</span>
          <ul>
            <li><Link to="/quotes/create">Create Quote</Link></li>
            <li><Link to="/quotes/view">View Quotes</Link></li>
          </ul>
        </li>
        <li>
          <span>Invoices</span>
          <ul>
            <li><Link to="/invoices/create">Create Invoice</Link></li>
            <li><Link to="/invoices/view">View Invoices</Link></li>
          </ul>
        </li>
        <li>
          <span>Projects</span>
          <ul>
            <li><Link to="/projects/create">Create Project</Link></li>
            <li><Link to="/projects/view">View Projects</Link></li>
          </ul>
        </li>
        <li>
          <span>Clients</span>
          <ul>
            <li><Link to="/clients/create">Create Client</Link></li>
            <li><Link to="/clients/view">View Clients</Link></li>
          </ul>
        </li>
        <li>
          <span>Users</span>
          <ul>
            <li><Link to="/users/create">Create User</Link></li>
            <li><Link to="/users/view">View Users</Link></li>
          </ul>
        </li>
        <li>
          <span>Inventories</span>
          <ul>
            <li><Link to="/inventories/create">Create Inventory</Link></li>
            <li><Link to="/inventories/view">View Inventories</Link></li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Navbar