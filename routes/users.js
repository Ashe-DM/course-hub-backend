const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');
const { requireAdmin } = require('../middleware/roleCheck');

// All routes require authentication AND admin role
router.use(authenticate);
router.use(requireAdmin);

// Get all users with pagination and filters
router.get('/', userController.getAllUsers);

// Get user statistics
router.get('/stats', userController.getUserStats);

// Get user by ID
router.get('/:id', userController.getUserById);

// Update user role (promote/demote)
router.put('/role', userController.updateUserRole);

// Delete user
router.delete('/:userId', userController.deleteUser);

module.exports = router;