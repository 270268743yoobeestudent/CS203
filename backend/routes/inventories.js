// routes/inventories.js
const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventory');

router.post('/', async (req, res) => {
    const { itemName, quantity, location, price, description } = req.body;

    try {
        const inventory = new Inventory({ itemName, quantity, location, price, description });
        const savedInventory = await inventory.save();
        res.status(201).json(savedInventory);
    } catch (error) {
        console.error('Error creating inventory item:', error);
        res.status(400).json({ message: 'Error creating inventory item', error });
    }
});

router.get('/', async (req, res) => {
    try {
        const inventories = await Inventory.find();
        res.status(200).json(inventories);
    } catch (error) {
        console.error('Error fetching inventory items:', error);
        res.status(500).json({ message: 'Error fetching inventory items', error });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { itemName, quantity, location, price, description } = req.body;

    try {
        const updatedInventory = await Inventory.findByIdAndUpdate(id, { itemName, quantity, location, price, description }, { new: true });
        if (!updatedInventory) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        res.status(200).json(updatedInventory);
    } catch (error) {
        console.error('Error updating inventory item:', error);
        res.status(400).json({ message: 'Error updating inventory item', error });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedInventory = await Inventory.findByIdAndDelete(id);
        if (!deletedInventory) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        res.status(200).json({ message: 'Inventory item deleted' });
    } catch (error) {
        console.error('Error deleting inventory item:', error);
        res.status(400).json({ message: 'Error deleting inventory item', error });
    }
});

module.exports = router;
