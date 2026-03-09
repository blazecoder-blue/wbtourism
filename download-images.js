const fs = require('fs');
const path = require('path');
const https = require('https');

const constantsContent = fs.readFileSync('src/lib/constants.ts', 'utf-8');
const imagePaths = [...constantsContent.matchAll(/image:\s*"(.*?)"/g)].map(m => m[1]);

// Also add hero images since they might not be in constants
imagePaths.push('/images/hero/holiday.jpg', '/images/hero/visa.jpg', '/images/hero/activities.jpg', '/images/hero/corporate.jpg');

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location, dest).then(resolve).catch(reject);
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
  for (const imgPath of imagePaths) {
    const fullPath = path.join(__dirname, 'public', imgPath);
    const dir = path.dirname(fullPath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    if (!fs.existsSync(fullPath)) {
      const filename = path.basename(imgPath, '.jpg');
      const isAvatar = imgPath.includes('avatar');
      const width = isAvatar ? 200 : 800;
      const height = isAvatar ? 200 : 600;
      
      console.log(`Downloading ${imgPath}...`);
      try {
        await downloadImage(`https://picsum.photos/seed/${filename}/${width}/${height}`, fullPath);
      } catch (err) {
        console.error(`Failed to download ${imgPath}:`, err.message);
      }
    }
  }
  console.log("Done downloading images!");
}

main();
