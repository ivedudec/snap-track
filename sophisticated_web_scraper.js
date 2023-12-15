/* 
   filename: sophisticated_web_scraper.js
   content: A sophisticated web scraper that utilizes asynchronous requests, regular expressions, and DOM manipulation to extract specific information from multiple pages and save it to a file.
*/

const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

// Define the URLs to scrape
const urls = [
  'https://example.com/page1',
  'https://example.com/page2',
  'https://example.com/page3'
];

// Create an object to store the scraped data
const scrapedData = [];

// Helper function to extract necessary information from a webpage using Cheerio
async function scrape(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Extract information using CSS selectors
    const title = $('h1').text();
    const content = $('p').text();

    scrapedData.push({ title, content });
  } catch (error) {
    console.error(`Failed to scrape ${url}: ${error}`);
  }
}

// Asynchronously scrape all the URLs
async function scrapeAll() {
  try {
    const scrapePromises = urls.map(url => scrape(url));
    await Promise.all(scrapePromises);

    // Convert scrapedData to JSON string
    const jsonData = JSON.stringify(scrapedData, null, 2);

    // Save the data to a file
    fs.writeFileSync('scraped_data.json', jsonData);

    console.log('Scraping completed successfully!');
  } catch (error) {
    console.error(`Failed to scrape all URLs: ${error}`);
  }
}

// Start scraping
scrapeAll();