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

    const seoUnit = semModule.units.find(u => u.title === "Search Engine Optimization (SEO)");
    
    if (seoUnit) {
      seoUnit.items = [
        {
          type: "reading",
          title: "Introduction to SEO",
          duration: "15 min",
          content: `# Introduction to SEO

SEO stands for **Search Engine Optimization**. It is the process of making your website more visible in search engines like Google without paying for ads.

## The Four Main Elements of SEO

1. **Keyword Research** - Finding out what your target audience searches for
2. **On-Page SEO** - Optimizing webpages and their content
3. **Off-Page SEO** - Getting other sites to link to your site, which can boost its reputation
4. **Technical SEO** - Improving your site's overall performance and accessibility

---

## Search Engine Marketing vs Search Engine Optimization

Search engine marketing (SEM) promotes a business through unpaid or paid results on search engines, often both.

- **SEO** is the subset of SEM that focuses on organic results. It generates traffic that you don't have to pay the search engine for.
- **PPC** (Pay-per-click) marketing is the subset of SEM that focuses on sponsored (paid) results.

Paid results usually appear at the top with a "Sponsored" or "Ad" label, while organic results do not have this label.

---

## How Do Search Engines Work?

Search engines work by **crawling, indexing, and ranking** content on the internet.

### 1. Crawling
Search engines use automated programs called **bots** or **crawlers** to explore the web and discover content. They primarily follow hyperlinks to find new pages.

### 2. Indexing
After analyzing the content, the search engine determines if it's eligible for indexing. If it is, the content is added to the database of possible search results.

### 3. Ranking
When a user enters a query, the search engine tries to understand the search intent. It then uses a complex algorithm to present the best results from its index.

---

## Ranking Factors

Factors that influence your presence, positioning, and appearance on the SERP include:

- The relevancy and quality of your content
- The presence of keywords on your page
- The number and quality of links from other sites
- The speed and usability of your site`,
          order: 0
        },
        {
          type: "reading",
          title: "On-Page SEO",
          duration: "20 min",
          content: `# On-Page SEO

On-page SEO is the process of optimizing webpages to improve their search visibility. It focuses largely on using **keywords** effectively.

Keywords are relevant search terms you want the page to rank for. They help show search engines and users that your content is relevant to their search.

---

## Key On-Page SEO Elements

### 1. Title Tag

The title tag is the blue link that search engines show when they list your webpage on the SERP. Title tags max out at 75 characters.

**Best Practices:**
- ✓ Include the keyword
- ✓ Have only one H1 per page
- ✓ Keep title tags to 55-60 characters
- ✓ Indicate value

---

### 2. Meta Tags

Meta tags are snippets of code you can include within your webpage's HTML. The meta tags are usually located near the title tag code in the head of your HTML.

There are two meta tags:
- **Meta description** (limited to 150 characters)
- **Meta keywords**

---

### 3. Alt Text

Alt text provides descriptions for images, helping search engines understand image content and improving accessibility.

---

### 4. URL Structure

The unique part of the webpage address. Clean, descriptive URLs are better for SEO.

**Example:**
- Good: \`example.com/seo-guide\`
- Bad: \`example.com/page?id=123\`

---

### 5. Keywords

The first step in search engine optimization is to determine what keywords you're optimizing for.

---

### 6. Website Content

Your content should be:

- ✓ Aligned with the keyword's intent
- ✓ Provides a good experience
- ✓ Reads naturally
- ✓ Uses 'magic' words like "Quick," "Easy," and "Simple"
- ✓ Well organized

---

### 7. External & Internal Links

**Internal links:** Link to other blog posts on your site. This gives Google multiple pathways to any given post, making your site easier to crawl as a whole.

**External links:** Find 1-3 pages relevant to your topic on sites with high domain authority, and link to them. This helps build trust with Google.`,
          order: 1
        },
        {
          type: "reading",
          title: "Off-Page SEO",
          duration: "15 min",
          content: `# Off-Page SEO

Off-page SEO refers to actions taken outside of your own website to impact your rankings and influence how people discover and engage with your content.

In other words: off-page SEO is all the stuff that you do off of your site to get Google and other search engines to see your website as trustworthy and authoritative.

---

## 1. Backlinks

A backlink is a link created when one website links to another. Backlinks are also called "links", "inbound links", or "incoming links."

Backlinks are important to people moving around the internet and to SEO because they signal trust and authority to search engines.

---

## 2. Guest Blogging

Guest blogging involves writing a blog post for another website in your niche and including a link back to your website.

**Benefits:**
- Reach a new audience
- Establish yourself as an authority
- Earn valuable backlinks

---

## 3. Social Media Marketing

Using social media helps with SEO indirectly:

- **Share Content on Social Media** - Increase visibility
- **Engagement with Audience** - Build community
- **Build Relationships with Influencers** - Expand reach`,
          order: 2
        },
        {
          type: "reading",
          title: "Technical SEO",
          duration: "20 min",
          content: `# Technical SEO

Technical SEO refers to the process of improving a website's architecture and backend elements to improve its visibility and performance on search engines.

---

## 1. Ensure Mobile-Friendliness

Mobile-friendliness pertains to the level of optimization and design adequacy of a website for users accessing it through mobile devices.

### Tools for Testing Mobile-Friendliness

- **Google's Mobile-Friendly Test:** Google offers a simple tool that analyzes a URL and reports if the page has a mobile-friendly design.

- **Google Search Console:** The Mobile Usability report can identify pages on your site with usability problems on mobile devices.

---

## 2. Improve Site Speed

The speed at which a website loads is a crucial element impacting both user experience and SEO.

As page load times extend, there is a higher probability of users leaving the site.

**Why it matters:**
- Faster sites rank higher
- Better user experience
- Lower bounce rates
- Higher conversion rates

### Optimization Tips:
- Compress images
- Minify CSS and JavaScript
- Use browser caching
- Enable Gzip compression
- Use a Content Delivery Network (CDN)`,
          order: 3
        },
        {
          type: "quiz",
          title: "SEO Fundamentals Quiz",
          duration: "10 min",
          questions: [
            {
              question: "What does SEO stand for?",
              options: [
                "Search Engine Optimization",
                "Social Engine Optimization",
                "Search Engine Operation",
                "Site Engine Optimization"
              ],
              correctAnswer: 0,
              explanation: "SEO stands for Search Engine Optimization - the process of making your website more visible in search engines without paying for ads."
            },
            {
              question: "Which is NOT a main element of SEO?",
              options: [
                "Keyword Research",
                "On-Page SEO",
                "Paid Advertisements",
                "Technical SEO"
              ],
              correctAnswer: 2,
              explanation: "Paid advertisements are part of SEM, not SEO. SEO focuses on organic (unpaid) results."
            },
            {
              question: "What is the recommended length for a title tag?",
              options: [
                "30-40 characters",
                "55-60 characters",
                "75 characters",
                "No limit"
              ],
              correctAnswer: 1,
              explanation: "Title tags should be kept to 55-60 characters for optimal display in search results."
            },
            {
              question: "What are backlinks?",
              options: [
                "Links within your own website",
                "Links from other websites to yours",
                "Broken links on your site",
                "Links in your footer"
              ],
              correctAnswer: 1,
              explanation: "A backlink is a link created when one website links to another. They're important for building authority and trust."
            }
          ]
        }
      ];
    }

    const seaUnit = semModule.units.find(u => u.title === "Search Engine Advertising (SEA)");
    
    if (seaUnit) {
      seaUnit.items = [
        {
          type: "reading",
          title: "Introduction to SEM",
          duration: "15 min",
          content: `# Search Engine Marketing (SEM)

## Definition and Concept

Search Engine Marketing (SEM) is a digital marketing strategy used to increase the visibility of websites on search engine results pages (SERPs) through **paid advertising**.

Unlike Search Engine Optimization (SEO), which focuses on organic traffic, SEM relies on paid campaigns, mainly using platforms like:
- Google Ads
- Bing Ads

SEM allows businesses to target specific audiences based on keywords, demographics, location, and online behavior.

According to Google (2024), SEM remains one of the most cost-effective ways to reach potential customers at the exact moment they are searching for a related product or service.

---

## SEM Strategies

### Keyword Research and Targeting

The foundation of SEM lies in selecting the right keywords. Marketers use tools like Google Keyword Planner and SpyFu to identify high-performing keywords based on search volume and competition level.

**Short-tail keywords** (e.g., "digital marketing"):
- Bring high traffic
- Strong competition

**Long-tail keywords** (e.g., "affordable digital marketing agency in Algeria"):
- Target more specific audiences
- Better conversion rates

---

### Pay-Per-Click (PPC) Campaigns

SEM campaigns are primarily based on the PPC model, where advertisers pay only when a user clicks on their ad.

Google Ads is the most popular PPC platform, offering different campaign types:

- **Search Campaigns** - Text ads that appear on Google search results
- **Display Campaigns** - Visual ads shown across websites and YouTube
- **Shopping Campaigns** - Product-based ads for e-commerce businesses

---

### Ad Copy Optimization

Creating persuasive ad copy is essential for higher click-through rates (CTR).

Marketers test multiple headlines, call-to-action phrases, and landing page links using **A/B testing** to improve performance.

---

### Conversion Rate Optimization (CRO)

The goal of SEM is not just clicks but **conversions** - actual sales, downloads, or registrations.

Using Google Analytics, marketers:
- Track user behavior
- Identify which ads or keywords lead to conversions
- Make adjustments to maximize ROI (Return on Investment)

---

### Remarketing and Retargeting

This strategy targets users who have already visited a website but didn't complete a desired action (like making a purchase).

Tools like Google Ads' Remarketing Lists for Search Ads (RLSA) help brands reconnect with these potential customers through personalized ads.`,
          order: 0
        },
        {
          type: "reading",
          title: "SEM Tools",
          duration: "12 min",
          content: `# Essential SEM Tools

## 1. Google Ads

The primary tool for creating, managing, and analyzing paid search campaigns.

**Features:**
- Keyword bidding
- Ad scheduling
- Detailed reporting

📚 Source: https://ads.google.com/

---

## 2. Google Analytics

Used to measure website traffic, monitor campaign performance, and track conversion goals.

📚 Source: https://support.google.com/analytics/

---

## 3. SpyFu

A competitive intelligence tool that shows which keywords competitors are using in their paid and organic campaigns.

📚 Source: https://www.spyfu.com/

---

## 4. Moz Pro

Offers keyword tracking, site audits, and insights on how ads perform compared to competitors.

📚 Source: https://moz.com/products/pro

---

## 5. WordStream

Provides campaign optimization and budget management tools for small and medium businesses.

📚 Source: https://www.wordstream.com/search-engine-marketing

---

## 6. HubSpot Marketing Hub

Integrates SEM data with CRM tools to track leads and manage ad ROI across multiple platforms.

📚 Source: https://blog.hubspot.com/marketing/sem`,
          order: 1
        },
        {
          type: "reading",
          title: "Applications of SEO & SEM",
          duration: "18 min",
          content: `# Applications of SEO & SEM on Websites, Apps, and Blogs

## Application on Websites

Websites are the primary platforms where SEO and SEM strategies are applied to attract visitors and increase online visibility.

### SEO on Websites
Marketers optimize web pages by:
- Improving site structure
- Increasing loading speed
- Optimizing keyword density
- Crafting relevant content and meta descriptions
- Building internal links
- Ensuring responsive design

**Tools:** Google Search Console, Ahrefs

### SEM on Websites
Google Ads campaigns target specific search queries with paid advertisements that appear at the top of search results.

This combination ensures both organic and paid visibility, leading to better traffic acquisition and higher conversion rates.

---

## Application on Mobile Apps

In mobile environments, SEO transforms into **ASO (App Store Optimization)**.

### ASO Strategies
- Use keywords strategically in app title, description, and metadata
- Optimize screenshots and app icon
- Encourage positive reviews and ratings

### SEM for Apps
Google App Campaigns use machine learning to display ads across:
- Google Search
- YouTube
- Google Play Store

**Tools:** AppTweak, Appsflyer, Adjust

---

## Application on Blogs

Blogs rely heavily on SEO to attract readers organically.

### SEO for Blogs
- Keyword optimization
- Internal linking
- Content freshness
- Regular updates

**Tools:** Yoast SEO (WordPress), SEMrush

### SEM for Blogs
Run sponsored content or paid campaigns to boost reach for specific posts.

Platforms like Google Ads and Meta Ads help bloggers promote content to targeted audiences, generating traffic spikes and brand awareness.

---

## Summary

- **Websites:** Focus on visibility and conversion
- **Mobile Apps:** Enhance discoverability and downloads through ASO and targeted campaigns
- **Blogs:** Improve readership and authority through optimized content and paid promotions

Integrating both strategies provides a comprehensive digital marketing approach.`,
          order: 2
        },
        {
          type: "quiz",
          title: "SEM Fundamentals Quiz",
          duration: "10 min",
          questions: [
            {
              question: "What does SEM stand for?",
              options: [
                "Search Engine Marketing",
                "Social Engine Marketing",
                "Search Email Marketing",
                "Site Engine Management"
              ],
              correctAnswer: 0,
              explanation: "SEM stands for Search Engine Marketing - a strategy using paid advertising to increase visibility on search engines."
            },
            {
              question: "What does PPC stand for?",
              options: [
                "Pay Per Customer",
                "Pay Per Click",
                "Price Per Conversion",
                "Paid Page Content"
              ],
              correctAnswer: 1,
              explanation: "PPC is Pay-Per-Click - advertisers pay only when a user clicks on their ad."
            },
            {
              question: "Which keyword type has better conversion rates?",
              options: [
                "Short-tail keywords",
                "Long-tail keywords",
                "Both are equal",
                "Neither affects conversion"
              ],
              correctAnswer: 1,
              explanation: "Long-tail keywords target more specific audiences with better conversion rates."
            },
            {
              question: "What is ASO?",
              options: [
                "App Search Optimization",
                "App Store Optimization",
                "Advanced SEO",
                "Automated Search Operation"
              ],
              correctAnswer: 1,
              explanation: "ASO (App Store Optimization) is the process of improving visibility of mobile apps in app stores."
            }
          ]
        }
      ];
    }

    await semModule.save();
    console.log('🎉 Content seeding complete!');
    console.log(`📊 SEO items: ${seoUnit?.items?.length || 0}`);
    console.log(`📊 SEA items: ${seaUnit?.items?.length || 0}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seedContent();