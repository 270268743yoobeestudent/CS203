const express = require('express');
const router = express.Router();
const Quote = require('../models/quote');

// Create a new quote
router.post('/', async (req, res) => {
  const { title, description, client, amount, status, expiresOn } = req.body;

  try {
    const newQuote = new Quote({
      title,
      description,
      client,
      amount,
      status,
      expiresOn
    });

    const savedQuote = await newQuote.save();
    res.status(201).json(savedQuote);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// Get all quotes
router.get('/', async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.status(200).json(quotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a quote by ID
router.get('/:id', async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) return res.status(404).json({ message: 'Quote not found' });
    res.status(200).json(quote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a quote
router.put('/:id', async (req, res) => {
  try {
    const updatedQuote = await Quote.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedQuote) return res.status(404).json({ message: 'Quote not found' });
    res.status(200).json(updatedQuote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a quote
router.delete('/:id', async (req, res) => {
  try {
    const deletedQuote = await Quote.findByIdAndDelete(req.params.id);
    if (!deletedQuote) return res.status(404).json({ message: 'Quote not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
