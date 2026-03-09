const fs = require('fs');
const path = require('path');
const https = require('https');

const imageMap = {
    // Staycation hotel images
    '/images/staycation/atlantis-palm.jpg': 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop',
    '/images/staycation/rixos-premium.jpg': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
    '/images/staycation/hilton-rak.jpg': 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format&fit=crop',
    '/images/staycation/jumeirah-beach.jpg': 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop',
    '/images/staycation/st-regis.jpg': 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop',
    '/images/staycation/anantara.jpg': 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=800&auto=format&fit=crop',

    // Cruise images
    '/images/cruise/celebrity-ascent.jpg': 'https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=800&auto=format&fit=crop',
    '/images/cruise/icon-seas.jpg': 'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?q=80&w=800&auto=format&fit=crop',
    '/images/cruise/allure-seas.jpg': 'https://images.unsplash.com/photo-1580541631950-7282082b53ce?q=80&w=800&auto=format&fit=crop',
    '/images/cruise/msc-europa.jpg': 'https://images.unsplash.com/photo-1462400362591-9ca55235346a?q=80&w=800&auto=format&fit=crop',
    '/images/cruise/disney-wish.jpg': 'https://images.unsplash.com/photo-1534190239940-9ba8944ea261?q=80&w=800&auto=format&fit=crop',
    '/images/cruise/norwegian-prima.jpg': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop',

    // About Us leadership
    '/images/about/ceo.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    '/images/about/vp.jpg': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',

    // Contact page map placeholder
    '/images/contact/office-map.jpg': 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop',

    // Page banners
    '/images/banners/visa-banner.jpg': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1920&auto=format&fit=crop',
    '/images/banners/activities-banner.jpg': 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?q=80&w=1920&auto=format&fit=crop',
    '/images/banners/holidays-banner.jpg': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop',
    '/images/banners/staycation-banner.jpg': 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1920&auto=format&fit=crop',
    '/images/banners/cruise-banner.jpg': 'https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=1920&auto=format&fit=crop',
    '/images/banners/blog-banner.jpg': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1920&auto=format&fit=crop',
    '/images/banners/about-banner.jpg': 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop',
    '/images/banners/contact-banner.jpg': 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=1920&auto=format&fit=crop',
    '/images/banners/corporate-banner.jpg': 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1920&auto=format&fit=crop',
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
            file.on('finish', () => file.close(resolve));
            file.on('error', (err) => { fs.unlink(dest, () => reject(err)); });
        }).on('error', reject);
    });
}

async function main() {
    for (const [localPath, remoteUrl] of Object.entries(imageMap)) {
        const fullPath = path.join(__dirname, 'public', localPath);
        const dir = path.dirname(fullPath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        console.log(`Downloading → ${localPath}...`);
        try {
            await downloadImage(remoteUrl, fullPath);
        } catch (err) {
            console.error(`  FAILED: ${err.message}`);
        }
    }
    console.log('\nDone! All inner page images downloaded.');
}

main();
