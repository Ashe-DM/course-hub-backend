const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  moduleId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Module', 
    required: true 
  },
  completedItems: [{
    unitId: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true 
    },
    itemId: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true 
    },
    completedAt: { 
      type: Date, 
      default: Date.now 
    }
  }],
  lastAccessedItem: {
    unitId: mongoose.Schema.Types.ObjectId,
    itemId: mongoose.Schema.Types.ObjectId
  },
  enrolledAt: { 
    type: Date, 
    default: Date.now 
  },
  completedAt: Date,
  status: { 
    type: String, 
    enum: ['not_started', 'in_progress', 'completed'], 
    default: 'not_started' 
  }
}, { timestamps: true });

// Compound index for fast lookups
progressSchema.index({ userId: 1, moduleId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);