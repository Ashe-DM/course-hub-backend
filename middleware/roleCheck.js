//roleCheck.js
const User = require('../models/User');

// Middleware to check if user has required role(s)
exports.requireRole = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      // User ID should be attached by authenticate middleware
      if (!req.userId) {
        return res.status(401).json({ 
          message: 'Authentication required' 
        });
      }

      // Fetch user from database
      const user = await User.findById(req.userId);
      
      if (!user) {
        return res.status(404).json({ 
          message: 'User not found' 
        });
      }

      // Check if user's role is in the allowed roles
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ 
          message: `Access denied. This action requires ${allowedRoles.join(' or ')} role.`,
          requiredRole: allowedRoles,
          userRole: user.role
        });
      }

      // Attach user object to request for later use
      req.user = user;
      next();
    } catch (error) {
      console.error('Role check error:', error);
      res.status(500).json({ 
        message: 'Authorization error',
        error: error.message 
      });
    }
  };
};

// Shorthand middleware functions for common checks
exports.requireAdmin = exports.requireRole('admin');
exports.requireMentor = exports.requireRole('mentor', 'admin');
exports.requireStudent = exports.requireRole('student', 'mentor', 'admin');