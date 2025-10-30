const mongoose = require('mongoose');
require('dotenv').config();
const Module = require('./models/Module');

const modules = [
  {
    title: "Digital Marketing Softwares", // ← ADDED title field
    name: "Digital Marketing Softwares",
    description: "Learn about tools and strategies for digital marketing",
    imageUrl: "https://i.ibb.co/GDJYbQP/digital-softwares.webp",
    category: "Digital Marketing",
    rating: 4.8,
    totalMinutes: 0,
    units: [] // ← Empty array - no units
  },
  {
    title: "Industrial Marketing", // ← ADDED title field
    name: "Industrial Marketing",
    description: "Explore strategies and tools for marketing products and services in industrial and B2B contexts.",
    imageUrl: "https://i.ibb.co/Vpgg03t6/cadenas-industrial-marketing-different.png",
    category: "Industrial Marketing", 
    rating: 4.8,
    totalMinutes: 0,
    units: [] // ← Empty array - no units
  },
  {
    title: "Digital Marketing Seminar", // ← ADDED title field
    name: "Digital Marketing Seminar",
    description: "An interactive seminar covering the latest trends, tools, and strategies in digital marketing.",
    imageUrl: "https://i.ibb.co/spdjsqzX/digital-marketing-conference.jpg",
    category: "Digital Marketing",
    rating: 4.8, 
    totalMinutes: 0,
    units: [] // ← Empty array - no units
  },
  {
    title: "Intellectual Property Protection Law", // ← ADDED title field
    name: "Intellectual Property Protection Law",
    description: "Understand the legal frameworks that protect creative and technological innovations.",
    imageUrl: "https://i.ibb.co/jkzK6qjr/Law.jpg",
    category: "Legal",
    rating: 4.8,
    totalMinutes: 0,
    units: [] // ← Empty array - no units
  },
  {
    title: "Digital Project Management", // ← ADDED title field
    name: "Digital Project Management", 
    description: "Master the principles, methodologies, and tools for managing digital projects effectively.",
    imageUrl: "https://i.ibb.co/jPq1VChB/What-is-Digital-Project-Management.webp",
    category: "Project Management",
    rating: 4.8,
    totalMinutes: 0,
    units: [] // ← Empty array - no units
  },
  {
    title: "SEM (SEO & SEA)", // ← ADDED title field
    name: "SEM (SEO & SEA)",
    description: "Comprehensive coverage of Search Engine Marketing, combining organic and paid strategies.",
    imageUrl: "https://i.ibb.co/qYwQB43K/SEM.webp",
    category: "Digital Marketing",
    rating: 4.8,
    totalMinutes: 0, 
    units: [] // ← Empty array - no units
  },
  {
    title: "Big Data", // ← ADDED title field
    name: "Big Data",
    description: "Explore the concepts, technologies, and applications that drive data-driven decision making in modern organizations.",
    imageUrl: "https://i.ibb.co/Jjcs6Wj6/BIG-DATA.jpg",
    category: "Data Science",
    rating: 4.8,
    totalMinutes: 0,
    units: [] // ← Empty array - no units
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    
    // Clear existing modules
    await Module.deleteMany({});
    console.log('🗑️  Cleared existing modules');
    
    // Insert new modules (without units)
    await Module.insertMany(modules);
    console.log(`✅ Added ${modules.length} modules without units`);
    console.log('📝 You can now add units and items through the web interface');
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });