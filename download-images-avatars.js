const fs = require('fs');
const path = require('path');
const https = require('https');

const constantsContent = fs.readFileSync('src/lib/constants.ts', 'utf-8');
const avatarPaths = [...constantsContent.matchAll(/avatar:\s*"(.*?)"/g)].map(m => m[1]);

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
  for (const imgPath of avatarPaths) {
    const fullPath = path.join(__dirname, 'public', imgPath);
    const dir = path.dirname(fullPath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    if (!fs.existsSync(fullPath)) {
      const filename = path.basename(imgPath, '.jpg');
      
      console.log(`Downloading ${imgPath}...`);
      try {
        await downloadImage(`https://picsum.photos/seed/${filename}/200/200`, fullPath);
      } catch (err) {
        console.error(`Failed to download ${imgPath}:`, err.message);
      }
    }
  }
  console.log("Done downloading avatars!");
}

main();
