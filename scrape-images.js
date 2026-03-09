const https = require('https');
const fs = require('fs');

https.get('https://www.satgurutravel.ae/', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    // Extract image URLs
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    const bgRegex = /background-image:\s*url\s*\(\s*['"]?([^'"\)]+)['"]?\s*\)/g;
    
    let match;
    const images = new Set();
    
    while ((match = imgRegex.exec(data)) !== null) {
      images.add(match[1]);
    }
    
    while ((match = bgRegex.exec(data)) !== null) {
      images.add(match[1]);
    }
    
    fs.writeFileSync('scraped-images.json', JSON.stringify(Array.from(images), null, 2));
    console.log(`Found ${images.size} images`);
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
