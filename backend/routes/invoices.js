const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice'); // Ensure the path is correct

// POST /api/invoices - Create a new invoice
router.post('/', async (req, res) => {
  const { quoteId, clientId, amountDue, dueDate, status } = req.body;  // Include clientId in the request body

  try {
    const invoice = new Invoice({
      quoteId,
      clientId,  // Save clientId
      amountDue,
      dueDate,
      status,
    });
    const savedInvoice = await invoice.save();
    res.status(201).json(savedInvoice); // Respond with the created invoice
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(400).json({ message: 'Error creating invoice', error });
  }
});

// GET /api/invoices - Retrieve all invoices
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find(); // Fetch all invoices from the database
    res.status(200).json(invoices); // Respond with the list of invoices
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ message: 'Error fetching invoices', error });
  }
});

// GET /api/invoices/:id - Retrieve a specific invoice by ID
router.get('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id); // Fetch invoice by ID
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.status(200).json(invoice); // Respond with the found invoice
  } catch (error) {
    console.error('Error fetching invoice:', error);
    res.status(500).json({ message: 'Error fetching invoice', error });
  }
});

// PUT /api/invoices/:id - Update a specific invoice by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedInvoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.status(200).json(updatedInvoice); // Respond with the updated invoice
  } catch (error) {
    console.error('Error updating invoice:', error);
    res.status(400).json({ message: 'Error updating invoice', error });
  }
});

// DELETE /api/invoices/:id - Delete a specific invoice by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!deletedInvoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.status(204).send(); // Respond with no content status
  } catch (error) {
    console.error('Error deleting invoice:', error);
    res.status(500).json({ message: 'Error deleting invoice', error });
  }
});

// Export the router
module.exports = router;
