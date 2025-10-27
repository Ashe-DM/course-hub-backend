const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware - runs before your routes
app.use(cors()); // Allows React (localhost:5173) to talk to Express
app.use(express.json()); // Parses JSON from requests

// Routes
const modulesRouter = require('./routes/modules');
app.use('/api/modules', modulesRouter);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// Connect to MongoDB
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/course-hub')
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });