const mongoose = require('mongoose');
require('dotenv').config();
const Module = require('./models/Module');

const modules = [
  { name: "Industrial Marketing", lessons: [], projects: [] },
  { name: "Reunion in Digital Marketing", lessons: [], projects: [] },
  { name: "Intellectual Property Law", lessons: [], projects: [] },
  { name: "SEM (SEO & SEA)", lessons: [], projects: [] },
  { name: "Digital Project Management", lessons: [], projects: [] },
  { name: "Big Data", lessons: [], projects: [] },
  { name: "Digital Marketing Softwares", lessons: [], projects: [] }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    
    // Clear existing modules (optional - remove this line if you want to keep Module 1)
    await Module.deleteMany({});
    console.log('🗑️  Cleared existing modules');
    
    // Add all modules
    await Module.insertMany(modules);
    console.log('✅ Added 7 modules!');
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });