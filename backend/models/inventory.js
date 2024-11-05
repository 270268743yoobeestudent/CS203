// models/inventory.js
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;
