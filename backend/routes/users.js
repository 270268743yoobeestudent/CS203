const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    console.log('Fetched Users:', users); // Debug print
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw Error('User not found');
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  const { name, username, email, password, role } = req.body;
  try {
    const newUser = new User({ name, username, email, password, role });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    if (err.code === 11000) { // Handle duplicate key error
      res.status(400).json({ msg: 'Username or email already exists' });
    } else {
      res.status(400).json({ msg: err.message });
    }
  }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) throw Error('User not found');
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw Error('User not found');
    res.status(200).json({ msg: 'User deleted' });
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
});

module.exports = router;
