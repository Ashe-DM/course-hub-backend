const User = require('../models/User');

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const { search, role, page = 1, limit = 20 } = req.query;
    
    // Build query
    let query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (role && role !== 'all') {
      query.role = role;
    }

    // Execute query with pagination
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await User.countDocuments(query);

    res.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalUsers: count
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID (admin only)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('enrolledModules');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Promote/demote user role (admin only)
exports.updateUserRole = async (req, res) => {
  try {
    const { userId, newRole } = req.body;

    // Validate role
    if (!['student', 'mentor', 'admin'].includes(newRole)) {
      return res.status(400).json({ 
        message: 'Invalid role. Must be: student, mentor, or admin' 
      });
    }

    // Don't allow users to demote themselves
    if (req.userId === userId && newRole !== 'admin') {
      return res.status(400).json({ 
        message: 'You cannot demote yourself from admin' 
      });
    }

    // Update user role
    const user = await User.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      success: true,
      message: `User role updated to ${newRole}`,
      user
    });
  } catch (error) {
    console.error('Update role error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Don't allow users to delete themselves
    if (req.userId === userId) {
      return res.status(400).json({ 
        message: 'You cannot delete your own account' 
      });
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get user statistics (admin only)
exports.getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const students = await User.countDocuments({ role: 'student' });
    const mentors = await User.countDocuments({ role: 'mentor' });
    const admins = await User.countDocuments({ role: 'admin' });

    // Recent users (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentUsers = await User.countDocuments({ 
      createdAt: { $gte: sevenDaysAgo } 
    });

    res.json({
      totalUsers,
      students,
      mentors,
      admins,
      recentUsers
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: error.message });
  }
};