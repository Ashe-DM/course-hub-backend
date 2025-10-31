const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ['article', 'video', 'test', 'reading', 'lab', 'quiz'], 
    required: true 
  },
  title: { type: String, required: true },
  duration: { type: String, default: '' }, // "10 min", "1h", etc.
  content: { type: String, default: '' }, // For articles/readings/labs
  videoUrl: { type: String, default: '' }, // For videos
  // For quizzes/tests only
  questions: [{
    question: { type: String },
    options: [{ type: String }],
    correctAnswer: { type: Number },
    explanation: { type: String }
  }],
  order: { type: Number, default: 0 }
}, { timestamps: true });

const unitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  items: [itemSchema], // All content items in order
  order: { type: Number, default: 0 }
}, { timestamps: true });

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  name: { type: String, trim: true }, // Keep for backward compatibility
  description: { type: String, default: '' },
  imageUrl: { type: String, default: '' }, // Module cover image
  units: [unitSchema],
  category: { type: String, default: 'Digital Marketing' },
  rating: { type: Number, default: 4.8 },
  totalMinutes: { type: Number, default: 0 },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Who created it
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Enrolled students
  isPublished: { type: Boolean, default: false } // Draft or published
}, { timestamps: true });

// Virtual to ensure 'title' is always available
moduleSchema.virtual('displayTitle').get(function() {
  return this.title || this.name;
});

// Ensure virtuals are included in JSON
moduleSchema.set('toJSON', { virtuals: true });
moduleSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Module', moduleSchema);