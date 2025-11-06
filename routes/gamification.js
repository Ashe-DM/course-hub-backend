// gamification.js
const express = require('express');
const router = express.Router();
const gamificationController = require('../controllers/gamificationController');
const { authenticate } = require('../middleware/auth');

// All routes require authentication
router.use(authenticate);

// Get user's gamification data
router.get('/me', gamificationController.getUserGamification);

// Award points
router.post('/points', gamificationController.awardPoints);

// Award badge
router.post('/badges/award', gamificationController.awardBadge);

// Get leaderboard
router.get('/leaderboard', gamificationController.getLeaderboard);

// Get all badges
router.get('/badges', gamificationController.getAllBadges);

// Create badge (admin only - add admin middleware later)
router.post('/badges', gamificationController.createBadge);

module.exports = router;