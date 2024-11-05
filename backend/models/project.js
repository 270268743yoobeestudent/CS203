const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
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
        enum: ['Not Started', 'In Progress', 'Completed'],
        default: 'Not Started',
    },
    startDate: {
        type: Date,
        required: true,  // Make sure this is set as required if it's needed
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

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
