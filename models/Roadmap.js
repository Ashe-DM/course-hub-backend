const mongoose = require('mongoose');

const roadmapStepSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  modules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Module' }], // Related modules
  order: { type: Number, default: 0 },
  estimatedTime: { type: String, default: '' }, // "2 weeks", "1 month"
  isOptional: { type: Boolean, default: false }
}, { timestamps: true });

const roadmapSchema = new mongoose.Schema({
  title: { type: String, required: true }, // "Web Development", "UI/UX Design"
  description: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  category: { type: String, required: true }, // "Development", "Design", "Marketing"
  difficulty: { 
    type: String, 
    enum: ['beginner', 'intermediate', 'advanced'], 
    default: 'beginner' 
  },
  steps: [roadmapStepSchema], // Learning path steps
  totalDuration: { type: String, default: '' }, // "3 months", "6 months"
  prerequisites: { type: String, default: '' }, // What students need to know
  outcomes: [{ type: String }], // What students will learn
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isPublished: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Roadmap', roadmapSchema);