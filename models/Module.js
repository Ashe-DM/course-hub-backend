const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ['reading', 'lab', 'quiz', 'video'], 
    required: true 
  },
  title: { type: String, required: true },
  duration: { type: String, default: '' }, // "10 min", "1h", etc.
  content: { type: String, default: '' }, // For readings/labs
  
  // For quizzes only
  questions: [{
    question: { type: String },
    options: [{ type: String }],
    correctAnswer: { type: Number },
    explanation: { type: String }
  }],
  
  order: { type: Number, default: 0 },
  completed: { type: Boolean, default: false }
}, { timestamps: true });

const unitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  items: [itemSchema], // All content items in order
  order: { type: Number, default: 0 }
}, { timestamps: true });

const moduleSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  units: [unitSchema]
}, { timestamps: true });

module.exports = mongoose.model('Module', moduleSchema);