const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const PORT = process.env.PORT || 4000;

// Load environment variables
dotenv.config({ path: './info.env' });
console.log('MongoDB URI:', process.env.MONGODB_URI);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import routes from backend/routes
const jobRoutes = require('./routes/jobs');
const quoteRoutes = require('./routes/quotes');
const invoiceRoutes = require('./routes/invoices');
const projectRoutes = require('./routes/projects');
const clientRoutes = require('./routes/clients');
const userRoutes = require('./routes/users');
const inventoryRoutes = require('./routes/inventories');

// Use routes
app.use('/api/jobs', jobRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/users', userRoutes);
app.use('/api/inventories', inventoryRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Job Management API! Use /api/jobs, /api/quotes, etc. to interact with the API.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
