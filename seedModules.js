const mongoose = require('mongoose');
require('dotenv').config();
const Module = require('./models/Module');

const modules = [
  {
    name: "Digital Marketing Softwares",
    description: "Learn about tools and strategies for digital marketing",
    units: [
      {
        title: "SEM (SEO&SEA) strategies and tools for websites, apps and blogs",
        description: "Comprehensive guide to Search Engine Marketing",
        items: [],
        order: 0
      }
    ]
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    
    await Module.deleteMany({});
    console.log('🗑️  Cleared existing modules');
    
    await Module.insertMany(modules);
    console.log('✅ Added module with unit!');
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });