// seedModules.js - ENHANCED VERSION WITH WEEKS & ITEMS
const mongoose = require('mongoose');
require('dotenv').config();
const Module = require('./models/Module');

const defaultUnits = [
  {
    title: "Week 1: Getting Started",
    description: "Introduction to the topic and overview of course objectives.",
    order: 0,
    items: [
      {
        title: "Welcome to the Course",
        type: "article",
        duration: "5 min",
        content: "<h1>Welcome!</h1><p>Get an overview of what you’ll learn in this module.</p>",
        order: 0
      },
      {
        title: "Introduction Video",
        type: "video",
        duration: "8 min",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        order: 1
      }
    ]
  },
  {
    title: "Week 2: Deep Dive",
    description: "Explore the main tools, strategies, and examples for practical application.",
    order: 1,
    items: [
      {
        title: "Core Concepts Explained",
        type: "article",
        duration: "10 min",
        content: "<h2>Core Concepts</h2><p>Dive deeper into the main principles of this topic.</p>",
        order: 0
      },
      {
        title: "Case Study Discussion",
        type: "video",
        duration: "12 min",
        videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U",
        order: 1
      }
    ]
  }
];

// Define the modules
const modules = [
  {
    title: "Digital Marketing Softwares",
    name: "Digital Marketing Softwares",
    description: "Learn about tools and strategies for digital marketing.",
    imageUrl: "https://i.ibb.co/GDJYbQP/digital-softwares.webp",
    category: "Digital Marketing",
    rating: 4.8,
    totalMinutes: 0,
    units: JSON.parse(JSON.stringify(defaultUnits))
  },
  {
    title: "Industrial Marketing",
    name: "Industrial Marketing",
    description: "Explore strategies and tools for marketing products and services in industrial and B2B contexts.",
    imageUrl: "https://i.ibb.co/Vpgg03t6/cadenas-industrial-marketing-different.png",
    category: "Industrial Marketing",
    rating: 4.8,
    totalMinutes: 0,
    units: JSON.parse(JSON.stringify(defaultUnits))
  },
  {
    title: "Digital Marketing Seminar",
    name: "Digital Marketing Seminar",
    description: "An interactive seminar covering the latest trends, tools, and strategies in digital marketing.",
    imageUrl: "https://i.ibb.co/spdjsqzX/digital-marketing-conference.jpg",
    category: "Digital Marketing",
    rating: 4.8,
    totalMinutes: 0,
    units: JSON.parse(JSON.stringify(defaultUnits))
  },
  {
    title: "Intellectual Property Protection Law",
    name: "Intellectual Property Protection Law",
    description: "Understand the legal frameworks that protect creative and technological innovations.",
    imageUrl: "https://i.ibb.co/jkzK6qjr/Law.jpg",
    category: "Legal",
    rating: 4.8,
    totalMinutes: 0,
    units: JSON.parse(JSON.stringify(defaultUnits))
  },
  {
    title: "Digital Project Management",
    name: "Digital Project Management",
    description: "Master the principles, methodologies, and tools for managing digital projects effectively.",
    imageUrl: "https://i.ibb.co/jPq1VChB/What-is-Digital-Project-Management.webp",
    category: "Project Management",
    rating: 4.8,
    totalMinutes: 0,
    units: JSON.parse(JSON.stringify(defaultUnits))
  },
  {
    title: "SEM (SEO & SEA)",
    name: "SEM (SEO & SEA)",
    description: "Comprehensive coverage of Search Engine Marketing, combining organic and paid strategies.",
    imageUrl: "https://i.ibb.co/qYwQB43K/SEM.webp",
    category: "Digital Marketing",
    rating: 4.8,
    totalMinutes: 0,
    units: [
      {
        title: "Week 1: SEO Fundamentals",
        description: "Learn how search engines work and how to optimize your content for them.",
        order: 0,
        items: [
          {
            title: "What is SEO?",
            type: "article",
            duration: "6 min",
            content: "<p>SEO (Search Engine Optimization) helps improve visibility on Google.</p>",
            order: 0
          },
          {
            title: "On-Page SEO Techniques",
            type: "video",
            duration: "9 min",
            videoUrl: "https://www.youtube.com/embed/fN8iHkV0o7E",
            order: 1
          }
        ]
      },
      {
        title: "Week 2: Google Ads Campaigns",
        description: "Set up and optimize Google Ads for maximum ROI.",
        order: 1,
        items: [
          {
            title: "Creating a Google Ads Account",
            type: "article",
            duration: "7 min",
            content: "<p>Step-by-step guide to creating and managing your first Google Ads campaign.</p>",
            order: 0
          },
          {
            title: "Understanding Bidding Strategies",
            type: "video",
            duration: "10 min",
            videoUrl: "https://www.youtube.com/embed/1GJ7D9V0VSk",
            order: 1
          }
        ]
      }
    ]
  },
  {
    title: "Big Data",
    name: "Big Data",
    description: "Explore the concepts, technologies, and applications that drive data-driven decision making in modern organizations.",
    imageUrl: "https://i.ibb.co/Jjcs6Wj6/BIG-DATA.jpg",
    category: "Data Science",
    rating: 4.8,
    totalMinutes: 0,
    units: [
      {
        title: "Week 1: Introduction to Big Data",
        description: "Understand what Big Data is and why it matters.",
        order: 0,
        items: [
          {
            title: "The 3 Vs of Big Data",
            type: "article",
            duration: "8 min",
            content: "<p>Volume, Velocity, and Variety define Big Data. Let’s break them down.</p>",
            order: 0
          },
          {
            title: "Big Data in Action",
            type: "video",
            duration: "10 min",
            videoUrl: "https://www.youtube.com/embed/2zJYzJ3Fj9c",
            order: 1
          }
        ]
      },
      {
        title: "Week 2: Tools & Technologies",
        description: "Get to know Hadoop, Spark, and other key tools in Big Data ecosystems.",
        order: 1,
        items: [
          {
            title: "Introduction to Hadoop",
            type: "article",
            duration: "6 min",
            content: "<p>Hadoop is an open-source framework that simplifies distributed data processing.</p>",
            order: 0
          },
          {
            title: "Understanding Apache Spark",
            type: "video",
            duration: "11 min",
            videoUrl: "https://www.youtube.com/embed/N8M3J9aRjD8",
            order: 1
          }
        ]
      }
    ]
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    await Module.deleteMany({});
    console.log('🗑️ Cleared existing modules');
    await Module.insertMany(modules);
    console.log(`✅ Added ${modules.length} modules with structured weeks & items`);
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
