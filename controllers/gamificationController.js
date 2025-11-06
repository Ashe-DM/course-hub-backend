//gamificationController.js
const { UserPoints, PointsActivity, Badge } = require('../models/Gamification');

// Get user's points and achievements
exports.getUserGamification = async (req, res) => {
  try {
    const userId = req.userId;
    
    let userPoints = await UserPoints.findOne({ userId }).populate('badges.badgeId');
    
    if (!userPoints) {
      // Create initial record
      userPoints = new UserPoints({
        userId,
        totalPoints: 0,
        level: 1,
        currentStreak: 0
      });
      await userPoints.save();
    }
    
    res.json(userPoints);
  } catch (error) {
    console.error('Get gamification error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Award points for an action
exports.awardPoints = async (req, res) => {
  try {
    const userId = req.userId;
    const { action, points, description, relatedId } = req.body;
    
    let userPoints = await UserPoints.findOne({ userId });
    
    if (!userPoints) {
      userPoints = new UserPoints({ userId });
    }
    
    // Add points
    userPoints.totalPoints += points;
    
    // Calculate level (every 1000 points after level 5)
    if (userPoints.totalPoints < 100) userPoints.level = 1;
    else if (userPoints.totalPoints < 250) userPoints.level = 2;
    else if (userPoints.totalPoints < 500) userPoints.level = 3;
    else if (userPoints.totalPoints < 1000) userPoints.level = 4;
    else if (userPoints.totalPoints < 2000) userPoints.level = 5;
    else userPoints.level = 5 + Math.floor((userPoints.totalPoints - 2000) / 1000);
    
    // Calculate points to next level
    if (userPoints.level < 2) userPoints.pointsToNextLevel = 100;
    else if (userPoints.level < 3) userPoints.pointsToNextLevel = 250;
    else if (userPoints.level < 4) userPoints.pointsToNextLevel = 500;
    else if (userPoints.level < 5) userPoints.pointsToNextLevel = 1000;
    else if (userPoints.level === 5) userPoints.pointsToNextLevel = 2000;
    else userPoints.pointsToNextLevel = 2000 + ((userPoints.level - 5) * 1000);
    
    // Update streak if daily activity
    const today = new Date().setHours(0, 0, 0, 0);
    const lastActivity = userPoints.lastActivityDate 
      ? new Date(userPoints.lastActivityDate).setHours(0, 0, 0, 0)
      : null;
    
    if (lastActivity) {
      const daysDiff = Math.floor((today - lastActivity) / (1000 * 60 * 60 * 24));
      if (daysDiff === 1) {
        // Consecutive day
        userPoints.currentStreak += 1;
        if (userPoints.currentStreak > userPoints.longestStreak) {
          userPoints.longestStreak = userPoints.currentStreak;
        }
      } else if (daysDiff > 1) {
        // Streak broken
        userPoints.currentStreak = 1;
      }
    } else {
      userPoints.currentStreak = 1;
    }
    
    userPoints.lastActivityDate = new Date();
    
    // Update points breakdown
    if (action === 'lesson_completed') {
      userPoints.pointsBreakdown.lessonsCompleted += points;
    } else if (action === 'quiz_passed') {
      userPoints.pointsBreakdown.quizzesPassed += points;
    } else if (action === 'project_submitted') {
      userPoints.pointsBreakdown.projectsSubmitted += points;
    } else if (action === 'presentation_given') {
      userPoints.pointsBreakdown.presentationsGiven += points;
    }
    
    await userPoints.save();
    
    // Log activity
    const activity = new PointsActivity({
      userId,
      action,
      points,
      description,
      relatedId
    });
    await activity.save();
    
    res.json({
      success: true,
      userPoints,
      activity
    });
  } catch (error) {
    console.error('Award points error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Award a badge
exports.awardBadge = async (req, res) => {
  try {
    const userId = req.userId;
    const { badgeId } = req.body;
    
    const userPoints = await UserPoints.findOne({ userId });
    if (!userPoints) {
      return res.status(404).json({ message: 'User points not found' });
    }
    
    // Check if already has this badge
    const hasBadge = userPoints.badges.some(b => b.badgeId.toString() === badgeId);
    if (hasBadge) {
      return res.status(400).json({ message: 'Badge already earned' });
    }
    
    // Get badge info
    const badge = await Badge.findById(badgeId);
    if (!badge) {
      return res.status(404).json({ message: 'Badge not found' });
    }
    
    // Add badge
    userPoints.badges.push({
      badgeId,
      earnedAt: new Date()
    });
    
    // Add badge points
    userPoints.totalPoints += badge.points;
    
    await userPoints.save();
    
    res.json({
      success: true,
      badge,
      userPoints
    });
  } catch (error) {
    console.error('Award badge error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
    const { period = 'all' } = req.query; // 'week', 'month', 'all'
    
    let query = {};
    
    if (period === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      query.updatedAt = { $gte: weekAgo };
    } else if (period === 'month') {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      query.updatedAt = { $gte: monthAgo };
    }
    
    const leaderboard = await UserPoints.find(query)
      .populate('userId', 'name email avatar')
      .sort({ totalPoints: -1 })
      .limit(100);
    
    // Add ranks
    const leaderboardWithRanks = leaderboard.map((entry, index) => ({
      rank: index + 1,
      ...entry.toObject()
    }));
    
    res.json(leaderboardWithRanks);
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all badges
exports.getAllBadges = async (req, res) => {
  try {
    const badges = await Badge.find({ isActive: true }).sort({ type: 1, points: 1 });
    res.json(badges);
  } catch (error) {
    console.error('Get badges error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Create badge (admin only)
exports.createBadge = async (req, res) => {
  try {
    const badge = new Badge(req.body);
    await badge.save();
    res.status(201).json(badge);
  } catch (error) {
    console.error('Create badge error:', error);
    res.status(400).json({ message: error.message });
  }
};