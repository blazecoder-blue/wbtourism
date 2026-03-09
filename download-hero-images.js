const fs = require('fs');
const path = require('path');
const https = require('https');

const imageMap = {
  '/images/hero/holiday.jpg': 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1920&auto=format&fit=crop', // Scenic landscape
  '/images/hero/visa.jpg': 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1920&auto=format&fit=crop', // Airplane window
  '/images/hero/activities.jpg': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1920&auto=format&fit=crop', // Dubai skyline
  '/images/hero/corporate.jpg': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop', // Modern business buildings
};

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status Code: ${res.statusCode} for ${url}`));
      }
      
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
      file.on('error', (err) => {
        fs.unlink(dest, () => reject(err));
      });
    }).on('error', reject);
  });
}

async function main() {
  for (const [localPath, remoteUrl] of Object.entries(imageMap)) {
    const fullPath = path.join(__dirname, 'public', localPath);
    const dir = path.dirname(fullPath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    console.log(`Downloading ${remoteUrl} to ${localPath}...`);
    try {
      await downloadImage(remoteUrl, fullPath);
    } catch (err) {
      console.error(`Failed to download ${localPath}:`, err.message);
    }
  }
  console.log("Done updating hero images!");
}

main();
