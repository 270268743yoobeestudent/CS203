const express = require('express');
const router = express.Router();
const Client = require('../models/client');

// Get all clients
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get a client by ID
router.get('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) throw Error('Client not found');
    res.status(200).json(client);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
});

// Create a new client
router.post('/', async (req, res) => {
  const newClient = new Client(req.body);
  try {
    const client = await newClient.save();
    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// Update a client by ID
router.put('/:id', async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!client) throw Error('Client not found');
    res.status(200).json(client);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// Delete a client by ID
router.delete('/:id', async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) throw Error('Client not found');
    res.status(200).json({ msg: 'Client deleted' });
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
});

module.exports = router;
