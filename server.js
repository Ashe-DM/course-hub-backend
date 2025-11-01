const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const compression = require('compression');
require('dotenv').config();

const app = express();

// Middleware - runs before your routes
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Allow frontend
  credentials: true
})); 
app.use(express.json()); // Parses JSON from requests
app.use(compression());

// Routes
const modulesRouter = require('./routes/modules');
const authRouter = require('./routes/auth');
const progressRouter = require('./routes/progress');
const gamificationRouter = require('./routes/gamification'); // ✨ NEW
const sitemapRouter = require('./routes/sitemap');

app.use('/api/modules', modulesRouter);
app.use('/api/auth', authRouter);
app.use('/api/progress', progressRouter);
app.use('/api/gamification', gamificationRouter); // ✨ NEW
app.use('/', sitemapRouter);

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