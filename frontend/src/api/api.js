// src/api/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api'; // Adjust if needed

// Jobs API
export const getJobs = async () => {
    return await axios.get(`${BASE_URL}/jobs`);
};

export const createJob = async (jobData) => {
    return await axios.post(`${BASE_URL}/jobs`, jobData);
};

// Quotes API
export const getQuotes = async () => {
    return await axios.get(`${BASE_URL}/quotes`);
};

export const createQuote = async (quoteData) => {
    return await axios.post(`${BASE_URL}/quotes`, quoteData);
};

// Invoices API
export const getInvoices = async () => {
    return await axios.get(`${BASE_URL}/invoices`);
};

export const createInvoice = async (invoiceData) => {
    return await axios.post(`${BASE_URL}/invoices`, invoiceData);
};

// Projects API
export const getProjects = async () => {
    return await axios.get(`${BASE_URL}/projects`);
};

export const createProject = async (projectData) => {
    return await axios.post(`${BASE_URL}/projects`, projectData);
};

// Clients API
export const getClients = async () => {
    return await axios.get(`${BASE_URL}/clients`);
};

export const createClient = async (clientData) => {
    return await axios.post(`${BASE_URL}/clients`, clientData);
};

// Users API
export const getUsers = async () => {
    return await axios.get(`${BASE_URL}/users`);
};

// Inventories API
export const getInventories = async () => {
    return await axios.get(`${BASE_URL}/inventories`);
};

export const createInventory = async (inventoryData) => {
    return await axios.post(`${BASE_URL}/inventories`, inventoryData);
};
