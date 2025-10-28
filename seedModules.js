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
  },
  {
    name: "Industrial Marketing",
    description: "Explore strategies and tools for marketing products and services in industrial and B2B contexts.",
    units: [
      {
        title: "Industrial Marketing Fundamentals",
        description: "Introduction to the principles and challenges of marketing in industrial sectors.",
        items: [],
        order: 0
      },
      {
        title: "B2B Market Segmentation and Targeting",
        description: "Learn how to identify, segment, and target business customers effectively.",
        items: [],
        order: 1
      },
      {
        title: "Relationship Marketing and Key Account Management",
        description: "Understand how to build and maintain strong relationships with industrial clients.",
        items: [],
        order: 2
      }
    ]
  },
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
  },
  {
    name: "Digital Marketing Seminar",
    description: "An interactive seminar covering the latest trends, tools, and strategies in digital marketing.",
    units: [
      {
        title: "Emerging Trends in Digital Marketing",
        description: "Analyze new developments such as AI marketing, personalization, and automation.",
        items: [],
        order: 0
      },
      {
        title: "Case Studies and Best Practices",
        description: "Examine real-world examples of successful digital marketing campaigns.",
        items: [],
        order: 1
      },
      {
        title: "Panel Discussion and Q&A",
        description: "Engage with industry experts and peers in open discussions about digital marketing challenges.",
        items: [],
        order: 2
      }
    ]
  },
  {
    name: "Intellectual Property Protection Law",
    description: "Understand the legal frameworks that protect creative and technological innovations.",
    units: [
      {
        title: "Introduction to Intellectual Property",
        description: "Overview of IP types: patents, trademarks, copyrights, and trade secrets.",
        items: [],
        order: 0
      },
      {
        title: "Patent and Trademark Law",
        description: "Detailed study of protection mechanisms for inventions and brand identities.",
        items: [],
        order: 1
      },
      {
        title: "Digital Rights and Enforcement",
        description: "Explore how IP protection applies in digital environments and online media.",
        items: [],
        order: 2
      }
    ]
  },
  {
    name: "Digital Project Management",
    description: "Master the principles, methodologies, and tools for managing digital projects effectively.",
    units: [
      {
        title: "Foundations of Project Management",
        description: "Understand project lifecycles, roles, and responsibilities in digital contexts.",
        items: [],
        order: 0
      },
      {
        title: "Agile and Scrum Methodologies",
        description: "Learn iterative project management frameworks commonly used in digital teams.",
        items: [],
        order: 1
      },
      {
        title: "Digital Tools and Collaboration Platforms",
        description: "Hands-on use of project management tools such as Trello, Asana, and Jira.",
        items: [],
        order: 2
      }
    ]
  },
  {
    name: "SEM (SEO & SEA)",
    description: "Comprehensive coverage of Search Engine Marketing, combining organic and paid strategies.",
    units: [
      {
        title: "Search Engine Optimization (SEO)",
        description: "Learn on-page, off-page, and technical SEO techniques to boost visibility.",
        items: [],
        order: 0
      },
      {
        title: "Search Engine Advertising (SEA)",
        description: "Understand paid advertising strategies using Google Ads and other platforms.",
        items: [],
        order: 1
      },
      {
        title: "Analytics and Performance Tracking",
        description: "Discover how to measure and optimize SEM performance using analytics tools.",
        items: [],
        order: 2
      }
    ]
  },
  {
    name: "Big Data",
    description: "Explore the concepts, technologies, and applications that drive data-driven decision making in modern organizations.",
    units: [
      {
        title: "Introduction to Big Data",
        description: "Understand what Big Data is, its characteristics (volume, velocity, variety, veracity, value), and its impact on business and society.",
        items: [],
        order: 0
      },
      {
        title: "Big Data Technologies and Tools",
        description: "Learn about key technologies like Hadoop, Spark, and NoSQL databases for large-scale data processing.",
        items: [],
        order: 1
      },
      {
        title: "Data Analytics and Visualization",
        description: "Explore methods for extracting insights from data and presenting them using visualization tools.",
        items: [],
        order: 2
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