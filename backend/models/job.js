const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    client: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    assignedTo: {
        type: String, // This can be an ObjectId if you have a User model
        required: true,
    },
});

// Create the model
const Job = mongoose.model('Job', jobSchema);

// Export the model
module.exports = Job;
