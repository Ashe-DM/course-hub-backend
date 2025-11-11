//server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const compression = require('compression');

// Only load .env file in development, not in production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();

// Debug: Check if environment variables are loaded
console.log('Environment check:');
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- MONGODB_URI exists:', !!process.env.MONGODB_URI);
console.log('- RENDER (Render specific):', process.env.RENDER);

// Middleware - runs before your routes
app.use(cors({
  origin: [
    'http://localhost:5173',  // Old React dev server (can remove later)
    'http://localhost:3000',  // ✅ Next.js dev server
    'https://course-hn4py1yoy-ashes-projects-d37a6780.vercel.app' // Your deployed frontend
  ],
  credentials: true
})); 
app.use(express.json());
app.use(compression());

// Routes
const modulesRouter = require('./routes/modules');
const authRouter = require('./routes/auth');
const progressRouter = require('./routes/progress');
const gamificationRouter = require('./routes/gamification');
const usersRouter = require('./routes/users');
const sitemapRouter = require('./routes/sitemap');

app.use('/api/modules', modulesRouter);
app.use('/api/auth', authRouter);
app.use('/api/progress', progressRouter);
app.use('/api/gamification', gamificationRouter);
app.use('/api/users', usersRouter);
app.use('/', sitemapRouter);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// Connect to MongoDB
const PORT = process.env.PORT || 5000;

console.log('Attempting to connect to MongoDB...');
console.log('MongoDB URI length:', process.env.MONGODB_URI ? process.env.MONGODB_URI.length : 'undefined');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`); // ⚠️ FIX: Remove template literal backticks
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    console.error('Full error details:', err.message);
  });