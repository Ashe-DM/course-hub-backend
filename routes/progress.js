const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const { authenticate } = require('../middleware/auth');

// All routes require authentication
router.use(authenticate);

// Get all user's progress
router.get('/', progressController.getAllProgress);

// Get enrolled modules
router.get('/enrolled', progressController.getEnrolledModules);

// Get progress for specific module
router.get('/:moduleId', progressController.getProgress);

// Enroll in module
router.post('/:moduleId/enroll', progressController.enrollModule);

// Mark item as complete
router.post('/:moduleId/complete', progressController.markItemComplete);

module.exports = router;