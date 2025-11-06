//auth.js
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
exports.authenticate = (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ 
        message: 'No token provided, authorization denied' 
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'your-secret-key-change-in-production'
    );

    // Add user id to request
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ 
      message: 'Token is invalid or expired' 
    });
  }
};

// Optional: Middleware to check if user is admin
exports.isAdmin = (req, res, next) => {
  // This would require loading the user from DB
  // For now, we'll skip this and implement later if needed
  next();
};