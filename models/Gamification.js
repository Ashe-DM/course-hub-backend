//Gamification.js
const mongoose = require('mongoose');

// Badge definitions
const badgeSchema = new mongoose.Schema({
  name: { type: String, required: true }, // "First Lesson", "Week Warrior"
  description: { type: String, required: true },
  icon: { type: String, required: true }, // URL or icon name
  type: { 
    type: String, 
    enum: ['bronze', 'silver', 'gold', 'platinum'], 
    default: 'bronze' 
  },
  points: { type: Number, default: 0 }, // Points awarded for earning this badge
  criteria: { type: String, required: true }, // How to earn it
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// User achievements/progress
const userPointsSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    unique: true 
  },
  
  // Points
  totalPoints: { type: Number, default: 0 },
  level: { type: Number, default: 1 }, // Calculated from points
  pointsToNextLevel: { type: Number, default: 100 },
  
  // Badges earned
  badges: [{
    badgeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Badge' },
    earnedAt: { type: Date, default: Date.now }
  }],
  
  // Streaks
  currentStreak: { type: Number, default: 0 }, // Days in a row
  longestStreak: { type: Number, default: 0 },
  lastActivityDate: { type: Date },
  
  // Activity breakdown
  pointsBreakdown: {
    lessonsCompleted: { type: Number, default: 0 },
    quizzesPassed: { type: Number, default: 0 },
    projectsSubmitted: { type: Number, default: 0 },
    presentationsGiven: { type: Number, default: 0 },
    helpfulComments: { type: Number, default: 0 }
  },
  
  // Leaderboard rank
  rank: { type: Number, default: 0 }, // Updated periodically
  
}, { timestamps: true });

// Points activity log
const pointsActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { 
    type: String, 
    enum: [
      'lesson_completed', 
      'quiz_passed', 
      'project_submitted', 
      'presentation_given',
      'comment_posted',
      'streak_maintained',
      'badge_earned'
    ], 
    required: true 
  },
  points: { type: Number, required: true },
  description: { type: String, required: true },
  relatedId: mongoose.Schema.Types.ObjectId, // Module, lesson, etc.
}, { timestamps: true });

// Export models
const Badge = mongoose.model('Badge', badgeSchema);
const UserPoints = mongoose.model('UserPoints', userPointsSchema);
const PointsActivity = mongoose.model('PointsActivity', pointsActivitySchema);

module.exports = { Badge, UserPoints, PointsActivity };