const Progress = require('../models/Progress');
const Module = require('../models/Module');

// Get user's progress for a module
exports.getProgress = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const userId = req.userId;

    let progress = await Progress.findOne({ userId, moduleId });

    if (!progress) {
      // Create initial progress record
      progress = new Progress({
        userId,
        moduleId,
        completedItems: [],
        status: 'not_started'
      });
      await progress.save();
    }

    res.json(progress);
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all user's progress
exports.getAllProgress = async (req, res) => {
  try {
    const userId = req.userId;
    const progress = await Progress.find({ userId }).populate('moduleId');

    res.json(progress);
  } catch (error) {
    console.error('Get all progress error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Mark item as complete
exports.markItemComplete = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const { unitId, itemId } = req.body;
    const userId = req.userId;

    let progress = await Progress.findOne({ userId, moduleId });

    if (!progress) {
      progress = new Progress({
        userId,
        moduleId,
        completedItems: [],
        status: 'in_progress'
      });
    }

    // Check if item already completed
    const alreadyCompleted = progress.completedItems.some(
      item => item.unitId.toString() === unitId && item.itemId.toString() === itemId
    );

    if (!alreadyCompleted) {
      progress.completedItems.push({
        unitId,
        itemId,
        completedAt: new Date()
      });
    }

    // Update last accessed item
    progress.lastAccessedItem = { unitId, itemId };

    // Update status
    if (progress.status === 'not_started') {
      progress.status = 'in_progress';
    }

    // Check if module is completed
    const module = await Module.findById(moduleId);
    const totalItems = module.units.reduce((sum, unit) => sum + unit.items.length, 0);
    
    if (progress.completedItems.length >= totalItems) {
      progress.status = 'completed';
      progress.completedAt = new Date();
    }

    await progress.save();

    res.json({
      success: true,
      progress
    });
  } catch (error) {
    console.error('Mark complete error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Enroll user in module
exports.enrollModule = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const userId = req.userId;

    // Check if already enrolled
    let progress = await Progress.findOne({ userId, moduleId });

    if (progress) {
      return res.json({
        success: true,
        message: 'Already enrolled',
        progress
      });
    }

    // Create progress record
    progress = new Progress({
      userId,
      moduleId,
      completedItems: [],
      status: 'not_started'
    });

    await progress.save();

    res.status(201).json({
      success: true,
      message: 'Enrolled successfully',
      progress
    });
  } catch (error) {
    console.error('Enroll error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get enrolled modules for user
exports.getEnrolledModules = async (req, res) => {
  try {
    const userId = req.userId;

    const progress = await Progress.find({ userId })
      .populate('moduleId')
      .sort({ updatedAt: -1 });

    const modules = progress
      .filter(p => p.moduleId) // Filter out null modules
      .map(p => ({
        ...p.moduleId.toObject(),
        progress: p
      }));

    res.json(modules);
  } catch (error) {
    console.error('Get enrolled modules error:', error);
    res.status(500).json({ message: error.message });
  }
};