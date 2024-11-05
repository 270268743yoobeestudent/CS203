import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import './styles/App.css';
import ViewJobs from './pages/ViewJobs';
import ViewQuotes from './pages/ViewQuotes';
import ViewInvoices from './pages/ViewInvoices';
import ViewProjects from './pages/ViewProjects';
import ViewClients from './pages/ViewClients';
import ViewUsers from './pages/ViewUsers';
import ViewInventories from './pages/ViewInventories';
import CreateJob from './pages/CreateJob';
import CreateQuote from './pages/CreateQuote';
import CreateInvoice from './pages/CreateInvoice';
import CreateProject from './pages/CreateProject';
import CreateClient from './pages/CreateClient';
import CreateUser from './pages/CreateUser';
import CreateInventory from './pages/CreateInventory';
import EditJob from './pages/EditJob';
import EditQuote from './pages/EditQuote';
import EditInvoice from './pages/EditInvoice';
import EditProject from './pages/EditProject';
import EditClient from './pages/EditClient';
import EditUser from './pages/EditUser';
import EditInventory from './pages/EditInventory';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/jobs/view" element={<ViewJobs />} />
            <Route path="/jobs/create" element={<CreateJob />} />
            <Route path="/jobs/edit/:id" element={<EditJob />} />
            <Route path="/quotes/view" element={<ViewQuotes />} />
            <Route path="/quotes/create" element={<CreateQuote />} />
            <Route path="/quotes/edit/:id" element={<EditQuote />} />
            <Route path="/invoices/view" element={<ViewInvoices />} />
            <Route path="/invoices/create" element={<CreateInvoice />} />
            <Route path="/invoices/edit/:id" element={<EditInvoice />} />
            <Route path="/projects/view" element={<ViewProjects />} />
            <Route path="/projects/create" element={<CreateProject />} />
            <Route path="/projects/edit/:id" element={<EditProject />} />
            <Route path="/clients/view" element={<ViewClients />} />
            <Route path="/clients/create" element={<CreateClient />} />
            <Route path="/clients/edit/:id" element={<EditClient />} />
            <Route path="/users/view" element={<ViewUsers />} />
            <Route path="/users/create" element={<CreateUser />} />
            <Route path="/users/edit/:id" element={<EditUser />} />
            <Route path="/inventories/view" element={<ViewInventories />} />
            <Route path="/inventories/create" element={<CreateInventory />} />
            <Route path="/inventories/edit/:id" element={<EditInventory />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
