const express = require('express');
const router = express.Router();
const Module = require('../models/Module');

router.get('/sitemap.xml', async (req, res) => {
  try {
    const modules = await Module.find();
    const baseUrl = process.env.FRONTEND_URL || 'https://course-hub-tau-eight.vercel.app';
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Homepage
    xml += '  <url>\n';
    xml += '    <loc>' + baseUrl + '/</loc>\n';
    xml += '    <lastmod>' + new Date().toISOString().split('T')[0] + '</lastmod>\n';
    xml += '    <changefreq>daily</changefreq>\n';
    xml += '    <priority>1.0</priority>\n';
    xml += '  </url>\n';
    
    // Module pages
    modules.forEach(module => {
      xml += '  <url>\n';
      xml += '    <loc>' + baseUrl + '/module/' + module._id + '</loc>\n';
      xml += '    <lastmod>' + module.updatedAt.toISOString().split('T')[0] + '</lastmod>\n';
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.8</priority>\n';
      xml += '  </url>\n';
    });
    
    xml += '</urlset>';
    
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    console.error('Sitemap error:', error);
    res.status(500).send('Error generating sitemap');
  }
});

module.exports = router;