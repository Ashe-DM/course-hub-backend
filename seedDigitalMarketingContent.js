const mongoose = require('mongoose');
require('dotenv').config();
const Module = require('./models/Module');

async function seedContent() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const semModule = await Module.findOne({ name: "SEM (SEO & SEA)" });
    
    if (!semModule) {
      console.log('❌ SEM module not found. Run seedModules.js first!');
      process.exit(1);
    }

    console.log('📝 Found SEM module, adding content...');

    // UNIT 1: Technical SEO Implementation
    const technicalSeoUnit = semModule.units.find(u => u.title === "Technical SEO Implementation");
    
    if (technicalSeoUnit) {
      technicalSeoUnit.items = [
        {
          type: "reading",
          title: "Technical SEO Implementation Guide",
          duration: "25 min",
          content: `hey this is the website :
course-hub-tau-eight.vercel.app.

and here's what we implemented to it for SEO :

---

# Part 1: Structured Data (JSON-LD)

## What is it?
Structured data is code you add to your website that helps search engines understand what your content is about. It's like giving Google a cheat sheet.

## Why do we need it?
Without it, Google has to **guess** what your page is about. With structured data, you **tell** Google explicitly:
- "This is an educational course"
- "This course is about Digital Marketing"
- "It has 3 units with X lessons"

## How does it affect SEO?
✅ **Rich snippets** - Your site can appear with star ratings, course info, etc. in search results
✅ **Better indexing** - Google understands your content structure faster
✅ **Higher CTR** - Rich results get more clicks (20-30% increase)

## Example of rich snippet:
\`\`\`
🔍 Google Search Results
────────────────────────────
Digital Marketing Hub - SEM Course ⭐⭐⭐⭐⭐
Course • Free • 8 lessons • Beginner level
Learn SEO and SEA strategies...
\`\`\`

---

## Where to add it?

**Create new file: \`public/structured-data.js\`**

\`\`\`javascript
// This function generates structured data for your modules
export function generateCourseStructuredData(module) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": module.name,
    "description": module.description,
    "provider": {
      "@type": "Organization",
      "name": "Digital Marketing Hub",
      "sameAs": "https://yourdomain.com" // Will update after deployment
    },
    "courseCode": module._id,
    "educationalLevel": "Beginner to Advanced",
    "hasCourseInstance": module.units.map(unit => ({
      "@type": "CourseInstance",
      "name": unit.title,
      "description": unit.description,
      "courseMode": "online",
      "numberOfItems": unit.items?.length || 0
    }))
  }
}

// For the homepage
export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Digital Marketing Hub",
    "description": "A collaborative platform for digital marketing education and project sharing",
    "url": "https://yourdomain.com", // Will update after deployment
    "logo": "https://yourdomain.com/logo.png",
    "sameAs": [
      // Add your social media links here later
    ],
    "founder": {
      "@type": "Person",
      "name": "Your Name"
    },
    "foundingDate": "2025",
    "offers": {
      "@type": "Offer",
      "category": "Education",
      "price": "0",
      "priceCurrency": "USD"
    }
  }
}
\`\`\`

---

## Now add it to your pages

**Update \`src/App.jsx\` - add this near the top:**

\`\`\`javascript
import { useEffect } from 'react'
// ... other imports

function App() {
  // ... existing code

  // Add structured data to homepage
  useEffect(() => {
    // Remove existing structured data if any
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add homepage structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "Digital Marketing Hub",
      "description": "A collaborative platform for digital marketing education and project sharing",
      "url": window.location.origin,
      "offers": {
        "@type": "Offer",
        "category": "Education",
        "price": "0",
        "priceCurrency": "USD"
      }
    });
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // ... rest of your code
\`\`\`

**Update \`src/pages/ModuleDetailPage.jsx\` - add this:**

\`\`\`javascript
import { useEffect } from 'react'

function ModuleDetailPage({ module, onBack, onAddUnit, onSelectUnit }) {
  // Add structured data for this specific course
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Course",
      "name": module.name,
      "description": module.description,
      "provider": {
        "@type": "Organization",
        "name": "Digital Marketing Hub"
      },
      "hasCourseInstance": module.units?.map(unit => ({
        "@type": "CourseInstance",
        "name": unit.title,
        "description": unit.description,
        "courseMode": "online"
      }))
    });
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [module]);

  // ... rest of your existing code
\`\`\`

---

# Part 2: robots.txt

## What is it?
A file that tells search engine bots (Google, Bing crawlers) which parts of your site they can/cannot access.

## Why do we need it?
✅ **Control crawling** - Don't waste Google's time on unimportant pages
✅ **Protect sensitive areas** - Block admin pages, private content
✅ **Point to sitemap** - Help Google find all your pages faster

## How does it affect SEO?
- Ensures Google crawls the RIGHT pages
- Prevents duplicate content issues
- Saves your "crawl budget" (Google only crawls X pages per day)

---

## Where to add it?

**Create new file: \`public/robots.txt\`**

\`\`\`txt
# robots.txt for Digital Marketing Hub

# Allow all bots to crawl everything
User-agent: *
Allow: /

# Block sensitive areas (if you add admin later)
# Disallow: /admin/
# Disallow: /api/

# Sitemap location (will update URL after deployment)
Sitemap: https://yourdomain.com/sitemap.xml

# Crawl-delay (optional - be nice to slow servers)
# Crawl-delay: 1
\`\`\`

**Explanation of each line:**

\`\`\`txt
User-agent: *
\`\`\`
→ This rule applies to ALL search engine bots (Google, Bing, etc.)

\`\`\`txt
Allow: /
\`\`\`
→ Allow bots to crawl everything starting from homepage

\`\`\`txt
Sitemap: https://yourdomain.com/sitemap.xml
\`\`\`
→ Tell bots where your sitemap is (list of all pages)

---

# Part 3: Sitemap.xml

## What is it?
An XML file that lists ALL the pages on your website. It's like a table of contents for Google.

## Why do we need it?
✅ **Faster indexing** - Google finds new pages immediately
✅ **Better coverage** - Ensures no page is missed
✅ **Priority hints** - Tell Google which pages are most important

## How does it affect SEO?
- New pages get indexed within hours instead of weeks
- Deeper pages (3+ clicks from homepage) get found
- Google understands your site structure

---

## Dynamic Sitemap (Since you have database)

We'll create an API endpoint that generates the sitemap dynamically from your database.

**Create new file: \`course-hub-backend/routes/sitemap.js\`**

\`\`\`javascript
const express = require('express');
const router = express.Router();
const Module = require('../models/Module');

// Generate XML sitemap
router.get('/sitemap.xml', async (req, res) => {
  try {
    const modules = await Module.find();
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    // Build XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\\n';

    // Homepage
    xml += '  <url>\\n';
    xml += \`    <loc>\${baseUrl}/</loc>\\n\`;
    xml += \`    <lastmod>\${new Date().toISOString().split('T')[0]}</lastmod>\\n\`;
    xml += '    <changefreq>daily</changefreq>\\n';
    xml += '    <priority>1.0</priority>\\n';
    xml += '  </url>\\n';

    // Modules pages
    modules.forEach(module => {
      xml += '  <url>\\n';
      xml += \`    <loc>\${baseUrl}/module/\${module._id}</loc>\\n\`;
      xml += \`    <lastmod>\${module.updatedAt.toISOString().split('T')[0]}</lastmod>\\n\`;
      xml += '    <changefreq>weekly</changefreq>\\n';
      xml += '    <priority>0.8</priority>\\n';
      xml += '  </url>\\n';

      // Units pages
      module.units?.forEach(unit => {
        xml += '  <url>\\n';
        xml += \`    <loc>\${baseUrl}/module/\${module._id}/unit/\${unit._id}</loc>\\n\`;
        xml += \`    <lastmod>\${unit.updatedAt?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0]}</lastmod>\\n\`;
        xml += '    <changefreq>weekly</changefreq>\\n';
        xml += '    <priority>0.7</priority>\\n';
        xml += '  </url>\\n';
      });
    });

    xml += '</urlset>';

    // Send XML with correct content type
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).send('Error generating sitemap');
  }
});

module.exports = router;
\`\`\`

**Explanation:**

\`\`\`xml
<loc>URL</loc>
\`\`\`
→ The actual page URL

\`\`\`xml
<lastmod>2025-10-28</lastmod>
\`\`\`
→ When page was last updated (helps Google know when to re-crawl)

\`\`\`xml
<changefreq>weekly</changefreq>
\`\`\`
→ How often page changes (Google uses this as a hint)

\`\`\`xml
<priority>0.8</priority>
\`\`\`
→ Importance (0.0 to 1.0) - Homepage is 1.0, subpages less

---

**Now register this route in \`server.js\`:**

\`\`\`javascript
// Add this with your other routes
const sitemapRouter = require('./routes/sitemap');
app.use('/', sitemapRouter);
\`\`\`

---

# Part 4: Performance Optimization

## What is it?
Making your site load FAST. Speed = SEO ranking factor.

## Why do we need it?
✅ **Google ranking factor** - Slow sites rank lower
✅ **User experience** - 53% of users abandon sites that take >3 seconds
✅ **Core Web Vitals** - Google's performance metrics

## How does it affect SEO?
- Faster sites rank higher (confirmed by Google)
- Better user engagement = better SEO signals
- Mobile users especially need speed

---

## What to optimize:

**Update \`vite.config.js\`:**

\`\`\`javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Performance optimizations
  build: {
    // Minify for production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
      }
    },

    // Code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code
          vendor: ['react', 'react-dom'],
          // Split markdown libraries
          markdown: ['react-markdown', 'rehype-raw', 'rehype-highlight']
        }
      }
    },

    // Chunk size warnings
    chunkSizeWarningLimit: 1000
  },

  // Server optimizations
  server: {
    // Enable compression
    compress: true
  }
})
\`\`\`

**Add compression to backend - Update \`server.js\`:**

\`\`\`javascript
const compression = require('compression');

// Add after other middleware
app.use(compression()); // Compress all responses
\`\`\`

**Install compression:**

\`\`\`bash
cd course-hub-backend
npm install compression
\`\`\`

---

## Summary of what we did:

| Feature | What it does | SEO Impact |
|---------|-------------|------------|
| **Structured Data** | Tells Google what your content is | Rich snippets, better rankings |
| **robots.txt** | Controls what bots can crawl | Efficient crawling, no wasted budget |
| **sitemap.xml** | Lists all your pages | Faster indexing, complete coverage |
| **Performance** | Makes site load fast | Direct ranking factor, better UX |

---

## Now do this:

1. **Add all the code I gave you**
2. **Test robots.txt**: Go to \`http://localhost:5173/robots.txt\` (should show the file)
3. **Test sitemap**: Go to \`http://localhost:5000/sitemap.xml\` (should show XML)
4. **Restart backend** to load new routes`,
          order: 0
        }
      ];
    }

    // UNIT 2: Keyword Research (keeping ALL content exactly as is)
    const keywordResearchUnit = semModule.units.find(u => u.title === "Keyword Research");
    
    if (keywordResearchUnit) {
      keywordResearchUnit.items = [
        {
          type: "reading",
          title: "How to Research Keywords Using Ubersuggest",
          duration: "25 min",
          content: `## Article 2.1: How to Research Keywords Using Ubersuggest

**This article teaches students HOW to do keyword research
step-by-step.**

------------------------------------------------------------------------

### **Introduction** (2-3 sentences)

Keyword research is the foundation of any SEO strategy. In this
practical guide, you\'ll learn how to use Ubersuggest (a free tool by
Neil Patel) to find the right keywords for your website or content.

------------------------------------------------------------------------

### **Step 1: Access Ubersuggest**

**What to do:**

1.  Go to: <https://app.neilpatel.com/en/ubersuggest/>

2.  You\'ll see the homepage

### **Image :** https://i.ibb.co/fVJjmZ1L/ubersuggest2.png

**What you see:**

- A search bar to enter keywords or domains

- Free trial available (3 searches per day without signup)

------------------------------------------------------------------------

### **Step 2: Enter Your Main Keyword**

**What to do:**

1.  In the search bar, type your main keyword. For example: **\"learn
    digital marketing\"**

2.  Select your target **Language** (English)

3.  Select your target **Location** (United States for broader data, or
    your local market)

4.  Click **Search**

**image : https://i.ibb.co/WNrzdKGP/language-and-location.png**

**Why this matters:** Choosing the right location shows you data
specific to where your audience is located.

------------------------------------------------------------------------

### **Step 3: Skip the Setup Prompts**

**What happens:** Ubersuggest will ask you to:

- Add competitors

- Add keywords to track

- Add your website

**What to do:** Click **\"Skip\"** on all of these for now. We just want
to see the keyword data first.

------------------------------------------------------------------------

### **Step 4: Analyze the Keyword Overview**

Once you skip the setup, you\'ll see the **Keyword Overview** page with
important metrics:

**Image :** https://i.ibb.co/TMZXWGzT/keyword-overview.png

**What each metric means:**

**1. Search Volume: 880**

- This keyword gets 880 searches per month in the United States

- Higher = more people searching for it

**2. SEO Difficulty: 79**

- Scale: 0-100 (0 = easy, 100 = very hard)

- Score of 79 = HIGH difficulty to rank organically

- You\'ll need strong content and backlinks to rank

**3. Paid Difficulty: 28**

- Scale: 0-100 (0 = easy, 100 = expensive/competitive)

- Score of 28 = EASY for paid ads

- Lower competition in Google Ads

**4. Cost Per Click (CPC): \$16.08**

- This is how much advertisers pay per click in Google Ads

- High CPC = valuable keyword (people are willing to pay for it)

- Shows commercial intent

**5. Location Breakdown:** The data shows where searches come from:

- India: 2,900 searches (54%)

- United States: 880 searches (16%)

- United Kingdom: 320 searches (6%)

------------------------------------------------------------------------

### **Step 5: Explore Keyword Variations**

Scroll down to see **\"Keyword Ideas\"** section.

**Image : https://i.ibb.co/HfMTvkSc/keyword-ideas.png**

**What you\'ll find:**

**Suggestions (144 keywords):**

- \"learn digital marketing for free\" - 260 volume

- \"learn digital marketing online\" - 110 volume

- \"learn marketing online for free\" - 30 volume

**Questions (65 keywords):**

- \"how to learn digital marketing\" - 110 volume

- \"how long does it take to learn digital marketing\" - 50 volume

**Prepositions (12 keywords):**

- \"how to learn digital marketing\" - 140 volume

- \"where can i learn digital marketing\" - 70 volume

**Comparisons (11 keywords):**

- \"learn digital marketing free\" - 210 volume

- \"learning digital marketing online\" - 210 volume

**Why this is useful:** These variations help you find **long-tail
keywords** (more specific phrases) that are easier to rank for.

------------------------------------------------------------------------

### **Step 6: Check Google Autocomplete (Bonus Free Method)**

You don\'t always need paid tools. Google itself gives you keyword
ideas!

**What to do:**

1.  Go to Google.com

2.  Start typing your keyword but **DON\'T press Enter**

3.  Look at the dropdown suggestions

**Screenshots:**

- <https://i.ibb.co/fVykGBJk/auto-complete.png>

- <https://i.ibb.co/1twBJ80n/auto-complete2.png>

- <https://i.ibb.co/yBmZ9W3h/auto-complete3.png>

- https://i.ibb.co/2Q4kHPJ/auto-complete4.png

<!-- -->

- **What this tells you:** These are **real searches** people are typing
  into Google. Notice patterns:

<!-- -->

- \"**free**\" appears in almost every suggestion

- \"**online**\" is very common

- \"**for beginners**\" shows users want beginner-friendly content

**Key insight:** If you\'re creating a learning platform, focus on
**free** and **beginner-friendly** content since that\'s what people are
actively searching for.

------------------------------------------------------------------------

### **Step 7: Analyze Top Ranking Competitors**

Scroll down on Ubersuggest to see **\"Search Results\"** section.

**Image : https://i.ibb.co/bMsgz2MX/search-results.png**

**What you see:** The top 10 pages ranking for \"learn digital
marketing\":

1.  **academy.hubspot.com** - 1.9k backlinks, 401 visits, Authority 93

2.  **coursera.org** - 0 backlinks, 93 visits, Authority 92

3.  **careerfoundry.com** - 836 backlinks, 26 visits, Authority 55

4.  **udemy.com** - 2.6k backlinks, 18 visits, Authority 92

5.  **Google Digital Garage** - 7.1k backlinks, 8 visits, Authority 79

**What this means:**

- These sites have **high domain authority** (90+)

- They have **thousands of backlinks**

- To compete, you\'d need exceptional content or focus on **easier
  keywords**

**Practical takeaway:** Instead of targeting \"learn digital marketing\"
(too competitive), target variations like:

- \"learn digital marketing free for beginners\"

- \"digital marketing course for students Algeria\"

- \"SEM tutorial for beginners\"

------------------------------------------------------------------------

### **Step 8: Content Ideas (What to Write)**

Scroll down further to see **\"Content Ideas\"** section.

**Image : https://i.ibb.co/S7svX3j4/content-ideas.png**

**What you see:**

- Top-performing articles about \"learn digital marketing\"

- Number of estimated visits each gets

- Social shares (Facebook, Pinterest, Reddit)

**Example from your screenshot:**

- \"Learn digital marketing with online courses\" - edX.org - 98 visits

- \"17 Free Online Marketing Courses to Learn Digital Marketing\" -
  Ahrefs - 6 visits, 825 backlinks

**How to use this:** These show you what type of content works:

- List articles (\"17 Free Courses\...\")

- How-to guides (\"How to learn\...\")

### **Tools You Used:**

- Ubersuggest (Free: 3 searches/day)

- Google Autocomplete (100% Free)

------------------------------------------------------------------------

**End of Article 2.1** ✅

------------------------------------------------------------------------`,
          order: 0
        },
        {
          type: "reading",
          title: "Analyzing Keyword Data and Choosing the Right Keywords",
          duration: "25 min",
          content: `## Article 2.2: Analyzing Keyword Data and Choosing the Right Keywords

**This article teaches you how to compare different keywords and make
smart decisions about which ones to target for your content.**

------------------------------------------------------------------------

### **Introduction**

Now that you know how to research keywords using Ubersuggest, the next
step is learning how to **analyze and compare** them. Not all keywords
are created equal---some have high search volume but are too
competitive, while others are easier to rank for but have fewer
searches. In this guide, you\'ll learn how to evaluate keywords and
choose the best ones for your digital marketing platform.

------------------------------------------------------------------------

### **Step 1: Compare Keywords Side-by-Side**

Let\'s compare three different keywords to understand their differences:

**Keyword Comparison Table:**

  ----------------------------------------------------------------------------------
  **Keyword**                   **Search     **SEO          **Paid         **CPC**
                                Volume**     Difficulty**   Difficulty**   
  ----------------------------- ------------ -------------- -------------- ---------
  **learn digital marketing**   880          79 (High)      28 (Easy)      \$16.08

  **digital marketing course**  22,200       75 (High)      47 (Medium)    \$17.69

  **digital marketing for       40           75 (High)      78 (Hard)      \$7.17
  beginners free**                                                         

  **SEM tutorial**              70           39 (Low)       1 (Very Easy)  \$0.00
  ----------------------------------------------------------------------------------

**Images :\
1:** <https://i.ibb.co/TMZXWGzT/keyword-overview.png>

2 : <https://i.ibb.co/zzZ7mPY/second-keyword.png>

3 : <https://i.ibb.co/Fb767QfW/third-keyword.png>

4 : https://i.ibb.co/YF0GSCM3/fourth-keyword2.png

### **Step 2: Understanding the Trade-Off (Volume vs Difficulty)**

Here\'s the key principle: **High volume keywords = High competition**

**Analysis from your data:**

**\"digital marketing course\"**

- ✅ **22,200 searches/month** (HUGE volume!)

- ❌ **SEO Difficulty: 75** (Very hard to rank)

- 💡 **What this means:** Many people search for it, but you\'ll need a
  very strong website with lots of backlinks to rank on the first page

**\"SEM tutorial\"**

- ✅ **SEO Difficulty: 39** (Much easier!)

- ✅ **Paid Difficulty: 1** (Almost no competition in ads)

- ❌ **Only 70 searches/month** (Lower volume)

- 💡 **What this means:** Easier to rank, but fewer people will find you

**\"digital marketing for beginners free\"**

- ✅ **Very specific** (matches user intent perfectly)

- ✅ **Only 40 searches/month** (less competition)

- ❌ **SEO Difficulty: 75** (still competitive)

- 💡 **What this means:** Long-tail keyword with clear intent---people
  searching this know exactly what they want

**Key Takeaway:**\
For a new website or platform, it\'s smarter to target **lower
competition keywords** (30-50 difficulty) even if they have less volume.
You\'ll rank faster and start getting traffic sooner.

------------------------------------------------------------------------

### **Step 3: Finding Question Keywords (Gold for Content)**

Questions are **perfect for blog posts and educational content**! People
asking questions are looking for answers---exactly what your platform
provides.

**From your Ubersuggest data for \"digital marketing course\":**

**Image : https://i.ibb.co/MDzx6Jq2/questions.png**

**Questions people ask (57 total):**

- \"**what digital marketing course**\" - 90 volume

- \"**are digital marketing courses worth it**\" - 40 volume

- \"**where to do digital marketing course**\" - 40 volume

- \"**which digital marketing course is best**\" - 30 volume

**From \"learn digital marketing\":**

**Image : https://i.ibb.co/jvcw3qMT/questions1.png**

**Questions:**

- \"**how to learn digital marketing**\" - 110 volume

- \"**how long does it take to learn digital marketing**\" - 50 volume

- \"**is digital marketing hard to learn**\" - 40 volume

**How to use these:**

Each question = One blog post or article idea!

**Example:**

- Question: \"How long does it take to learn digital marketing?\"

- Your article title: \"How Long Does It Take to Learn Digital
  Marketing? (Complete Timeline)\"

- Content: Answer the question with practical timelines, steps, and
  resources

These \"how to\" and \"where can\" phrases are perfect for
tutorial-style content.

------------------------------------------------------------------------

### **Step 4: Understanding Related Keyword Categories**

Ubersuggest groups keywords into 4 helpful categories. Let\'s use your
\"digital marketing course\" data:

**image : https://i.ibb.co/Jj9ksGnp/second-keyword2.png**

**1. Suggestions (272 keywords, 18.2k total volume)**

- These are direct variations of your main keyword

- Examples from your data:

  - \"digital marketing course by google\" - 2.9k volume

  - \"digital marketing course online\" - 1.6k volume

  - \"digital marketing course free online\" - 880 volume

**2. Questions (57 keywords, 470 total volume)**

- Perfect for educational content (see Step 3)

**3. Prepositions (31 keywords, 960 total volume)**

- Phrases with prepositions: \"for\", \"with\", \"to\", \"in\"

- Examples:

  - \"seo and digital marketing course\" - 320 volume

  - \"fees for digital marketing course\" - 260 volume

  - \"fundamentals of digital marketing\" - 170 volume

**4. Comparisons (29 keywords, 3.6k total volume)**

- People comparing options

- Examples:

  - \"digital marketing course free\" - 2.4k volume

  - \"digital marketing course near me\" - 720 volume

  - \"digital marketing course vs\" - 170 volume

------------------------------------------------------------------------

### **Step 5: Identifying Keyword Opportunities (The Sweet Spot)**

The **best keywords** for new websites have:

- ✅ Decent search volume (100-1000/month)

- ✅ Low to medium difficulty (20-50)

- ✅ Clear user intent

- ✅ Relevant to your content

**Let\'s find opportunities in your data:**

**Image : https://i.ibb.co/bM9Rc0Qz/suggestions-1.png**

**GREAT Opportunities from \"digital marketing course\":**

  -----------------------------------------------------------------------------------
  **Keyword**               **Volume**   **SEO          **Why It\'s Good**
                                         Difficulty**   
  ------------------------- ------------ -------------- -----------------------------
  **digital marketing       480          69             Specific platform search,
  course udemy**                                        moderate difficulty

  **digital marketing       260          78             Perfect for your target
  course for beginners**                                audience

  **digital marketing       720          80             High intent for free content
  course online free**                                  
  -----------------------------------------------------------------------------------

**From \"SEM tutorial\" data:**

**Image : https://i.ibb.co/VYVJ2zVM/third-keyword2.png**

**EXCELLENT Opportunities:**

  ---------------------------------------------------------------------------------
  **Keyword**     **Volume**   **SEO          **Why It\'s PERFECT**
                               Difficulty**   
  --------------- ------------ -------------- -------------------------------------
  **sem basics**  90           LOW            Great for beginners, manageable
                                              competition

  **how to learn  70           LOW            Question format, educational intent
  sem**                                       

  **sem for       10           LOW            Exactly your target audience
  beginners**                                 
  ---------------------------------------------------------------------------------

**These are GOLD for your platform!** Low competition + beginner-focused
= perfect match.

### **Step 6: Using Google Autocomplete for Free Insights**

Don\'t forget this completely FREE method!

**Image : https://i.ibb.co/DHy8WrKj/search.png**

**What Google suggests:**

- digital marketing for **dummies pdf**

- digital marketing for **beginners**

- digital marketing for **small businesses**

- digital marketing for **financial services**

- digital marketing for **real estate**

**Key insight:** Google shows the MOST COMMON searches. These are proven
topics people want!

**Image : https://i.ibb.co/WWDpbXMk/search2.png**

**Comparison keywords:**

- sem vs seo **marketing**

- sem vs seo **meaning**

- sem vs seo **in digital marketing**

- sem vs seo **difference**

**Content idea:** Create a comparison article \"SEM vs SEO: What\'s the
Difference?\" targeting these searches!

------------------------------------------------------------------------

### **Step 7: Building Your Keyword Strategy**

Now let\'s put it all together. Here\'s how to choose keywords for
different content types:

**For Homepage/Main Pages:**

- Target: Medium competition (50-70 difficulty)

- Example: \"digital marketing course\" (22.2k volume, 75 difficulty)

- Strategy: This is aspirational---build towards ranking for this over
  time

**For Blog Posts/Articles:**

- Target: Low competition (20-40 difficulty)

- Examples from your data:

  - \"sem basics\" - 90 volume, LOW difficulty

  - \"how to learn sem\" - 70 volume, LOW difficulty

  - \"sem for beginners\" - 10 volume, LOW difficulty

**For Tutorial/How-To Content:**

- Target: Question keywords

- Examples:

  - \"how to learn digital marketing\" - 110 volume

  - \"what is sem\" - 70 volume

  - \"is digital marketing hard to learn\" - 40 volume

**For Long-Tail Content:**

- Target: Very specific, low competition

- Examples:

  - \"digital marketing for beginners free\" - 40 volume

  - \"digital marketing course for students\" - specific audience

### **Step 8: Creating Your Keyword List**

Based on everything you\'ve learned, here\'s a starter keyword list for
your platform:

**Primary Keywords (Main pages):**

1.  digital marketing course - 22.2k volume

2.  learn digital marketing - 880 volume

**Secondary Keywords (Blog posts):**

1.  sem tutorial - 70 volume, difficulty 39 ✅ EASY WIN

2.  sem basics - 90 volume, LOW difficulty ✅ EASY WIN

3.  digital marketing for beginners - varies by variation

4.  how to learn digital marketing - 110 volume

**Long-Tail Keywords (Specific articles):**

1.  digital marketing for beginners free - 40 volume

2.  sem for beginners - 10 volume

3.  digital marketing course online free - 720 volume

### **Your Turn: Practice Exercise**

Now it\'s time to practice!

**Task:**

1.  Go to Ubersuggest

2.  Search for: **\"SEO basics\"**

3.  Find and note:

    - Search volume and difficulty

    - 3 related question keywords

    - 2 low-competition keyword opportunities (difficulty under 40)

**Bonus:** Use Google Autocomplete for \"learn SEO\" and note what
suggestions appear.

------------------------------------------------------------------------

### **Key Takeaways**

✅ **High volume ≠ Best keyword** - Competition matters more for new
sites\
✅ **Sweet spot: 100-1000 volume + difficulty under 50**\
✅ **Question keywords = Perfect for educational content**\
✅ **Long-tail keywords = Easier to rank, very specific audience**\
✅ **Start with low-competition keywords** to build authority\
✅ **Google Autocomplete = Free keyword research tool**\
✅ **Match keywords to content type** (homepage vs blog post vs
tutorial)

------------------------------------------------------------------------

### **Tools You Used:**

- Ubersuggest (Free: 3 searches/day)

- Google Autocomplete (100% Free)

**End of Article 2.2** ✅

------------------------------------------------------------------------`,
          order: 1
        }
        // Continue with remaining Unit 2 articles...
      ];
    }

    // UNIT 3: Google Ads Campaign Setup (keeping ALL content exactly as is)
    const googleAdsUnit = semModule.units.find(u => u.title === "Google Ads Campaign Setup");
    
    if (googleAdsUnit) {
      googleAdsUnit.items = [
        {
          type: "reading",
          title: "Introduction to Google Ads",
          duration: "15 min",
          content: `## Article 3.1: Introduction to Google Ads

### **What is Google Ads?**

Google Ads (formerly Google AdWords) is Google\'s paid advertising
platform. Unlike SEO (which takes time), Google Ads lets you appear at
the top of search results immediately---but you pay for each click.

**The difference:**

- **SEO (Organic):** Free traffic, takes months to rank, long-term
  strategy

- **Google Ads (Paid):** Paid traffic, instant visibility, short-term
  results

------------------------------------------------------------------------

### **When to Use Google Ads**

✅ **Use Google Ads when:**

- You need immediate traffic (launching a new product/course)

- You want to test keywords before doing SEO

- You have budget to spend on advertising

- You\'re promoting time-sensitive content (enrollment deadlines,
  events)

- You want to appear for competitive keywords you can\'t rank for
  organically

❌ **Don\'t use Google Ads if:**

- You have no budget

- You\'re not ready to convert visitors (incomplete website)

- You don\'t have time to monitor and optimize campaigns

------------------------------------------------------------------------

### **How Google Ads Works**

**Simple explanation:**

1.  **You create an ad** with headlines and description

2.  **You choose keywords** you want to trigger your ad

3.  **You set a budget** (daily or monthly)

4.  **You bid on keywords** (how much you\'ll pay per click)

5.  **When someone searches** your keyword, Google runs an \"auction\"

6.  **Your ad appears** if you win the auction

7.  **You pay only when someone clicks** your ad (Pay-Per-Click = PPC)

------------------------------------------------------------------------

### **Google Ads Auction Explained**

Google doesn\'t just show the highest bidder. They use **Ad Rank**:

**Ad Rank = Bid Amount × Quality Score**

**Quality Score (1-10)** is based on:

- How relevant your ad is to the keyword

- How relevant your landing page is

- Your expected click-through rate (CTR)

- Your ad\'s past performance

**Example:**

- **Advertiser A:** Bids \$5, Quality Score 8 = Ad Rank 40

- **Advertiser B:** Bids \$7, Quality Score 4 = Ad Rank 28

- **Winner:** Advertiser A (better ad quality wins despite lower bid!)

**Key takeaway:** You can pay LESS than competitors if your ads are
better quality.

------------------------------------------------------------------------

### **Google Ads Campaign Types**

For digital marketing/education, you\'ll mainly use:

**1. Search Campaigns** (What we\'ll focus on)

- Text ads that appear in Google search results

- Best for: Capturing people actively searching for your topic

- Example: Someone searches \"learn SEM\" → your ad appears

**2. Display Campaigns**

- Image/banner ads on websites across the internet

- Best for: Brand awareness, retargeting

**3. Video Campaigns**

- Ads on YouTube

- Best for: Video content promotion

**4. Shopping Campaigns**

- Product listings with images and prices

- Best for: E-commerce (not relevant for educational content)

**For your research, focus on Search Campaigns.**

------------------------------------------------------------------------

### **Key Google Ads Terms You Need to Know**

  -----------------------------------------------------------------------
  **Term**                 **What It Means**
  ------------------------ ----------------------------------------------
  **CPC (Cost Per Click)** How much you pay when someone clicks your ad

  **Impressions**          How many times your ad was shown

  **CTR (Click-Through     \% of people who clicked after seeing your ad
  Rate)**                  

  **Conversion**           Desired action (signup, enrollment, download)

  **Quality Score**        Google\'s rating of your ad quality (1-10)

  **Ad Rank**              Your position in the auction

  **Budget**               Daily or monthly spending limit

  **Bid**                  Maximum you\'re willing to pay per click

  **Keywords**             Search terms that trigger your ads
  -----------------------------------------------------------------------

------------------------------------------------------------------------

### **What You Need Before Starting**

Before creating your first campaign, have ready:

✅ **Google Account** (free Gmail account)\
✅ **Website/Landing Page** (where you\'ll send traffic)\
✅ **Clear Goal** (what action you want users to take)\
✅ **Budget Decision** (how much you can spend per day/month)\
✅ **Keyword List** (from your research in Unit 2!)

------------------------------------------------------------------------

### **Cost Reality Check**

**How much does Google Ads cost?**

From your Ubersuggest research:

- \"learn digital marketing\" - CPC: \$16.08

- \"digital marketing course\" - CPC: \$17.69

- \"SEM tutorial\" - CPC: \$0.00 (almost no competition!)

**Example budget calculation:**

- If you spend \$10/day on \"digital marketing course\" (\$17.69 CPC)

- You\'d get approximately 0.5-1 clicks per day

- That\'s 15-30 clicks per month

- If 10% sign up → 1-3 signups per month

**Reality:** Educational keywords can be expensive. Start small, test,
optimize.

------------------------------------------------------------------------

### **Your First Campaign Goal**

For this tutorial, we\'ll create a **Search Campaign** to promote your
digital marketing learning platform.

**Goal:** Get people to visit your website and explore your SEM module.

**In the next articles, you\'ll learn:**

- Article 3.2: How to set up the campaign step-by-step

- Article 3.3: How to write compelling ad copy

- Article 3.4: How to set budgets and understand bidding

------------------------------------------------------------------------

### **Key Takeaways**

✅ Google Ads = Paid search advertising (pay per click)\
✅ Appears instantly (unlike SEO which takes months)\
✅ You only pay when someone clicks\
✅ Quality Score matters as much as bid amount\
✅ Search Campaigns = Best for educational content\
✅ Use your keyword research to choose which terms to advertise\
✅ Start with low CPC keywords to stretch your budget

------------------------------------------------------------------------

**End of Article 3.1** ✅`,
          order: 0
        }
        // Continue with remaining Unit 3 articles...
      ];
    }

    await semModule.save();
    console.log('🎉 Content seeding complete!');
    console.log(`📊 Technical SEO items: ${technicalSeoUnit?.items?.length || 0}`);
    console.log(`📊 Keyword Research items: ${keywordResearchUnit?.items?.length || 0}`);
    console.log(`📊 Google Ads items: ${googleAdsUnit?.items?.length || 0}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seedContent();