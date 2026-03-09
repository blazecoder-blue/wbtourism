const fs = require('fs');
const path = require('path');
const https = require('https');

const imageMap = {
    // Visas
    '/images/visas/bahrain.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2024/02/Sudan-01-636x426.jpg',
    '/images/visas/oman.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2024/02/Sierra-Leone-04-636x426.jpg',
    '/images/visas/saudi.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2024/02/Senegal-01-636x426.jpg',
    '/images/visas/india.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2024/02/Nambia-4-636x426.jpg',
    '/images/visas/nigeria.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2024/02/Mozambique1-636x426.jpg',
    '/images/visas/turkey.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2024/02/mali-1-636x426.jpg',
    '/images/visas/egypt.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2024/02/Malawi-1-636x426.jpg',
    '/images/visas/uk.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2024/02/Madagascar-1-636x426.jpg',
    '/images/visas/schengen.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2024/01/Schengen-650x450-04-636x426.jpg',
    '/images/visas/singapore.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2024/02/Kenya-02-636x426.jpg',
    '/images/visas/philippines.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2024/02/Ivory-Coast-03-636x426.jpg',
    '/images/visas/ghana.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2024/02/Gabon-03-636x426.jpg',
    '/images/visas/australia.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2023/11/Australia-Web-Banner-650X450-02-636x426.jpg',
    '/images/visas/canada.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2023/11/canada-Web-Banner-650X450-02-636x426.jpg',
    '/images/visas/usa.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2023/11/USA-636x426.jpg',
    '/images/visas/russia.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2023/11/Russia-Web-Banner-650X450-02-636x426.jpg',
    '/images/visas/kenya.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2024/02/Kenya-02-636x426.jpg',
    '/images/visas/south-africa.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2024/02/Moracco-4-636x426.jpg',
    '/images/visas/china.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2023/11/rgJkzKRk-dubai-uae-1-636x426.jpg',
    '/images/visas/ethiopia.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2024/02/Ethopia-650x450-03-636x426.jpg',

    // Holidays
    '/images/holidays/turkey.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2026/01/Turkey-Travel-Package-from-Dubai-UAE.jpg',
    '/images/holidays/georgia.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2026/01/Georgia-Travel-Package-from-Dubai-UAE.jpg',
    '/images/holidays/armenia.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2026/01/Armenia-Holiday-Package-from-Dubai-UAE-2.jpg',
    '/images/holidays/kenya.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2026/01/Kenya-Holiday-Package-from-Dubai-UAE.jpg',
    '/images/holidays/kazakhstan.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2025/01/Kazakhstan-Holiday-Package-from-Dubai-UAE-4.jpg',
    '/images/holidays/bali.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2026/01/Bali-Holiday-package-from-Dubai-UAE.jpg',
    '/images/holidays/mauritius.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2026/01/Mauritius-Travel-Package-from-Dubai-UAE.jpg',
    '/images/holidays/lombok.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2026/01/Lombok-Tour-Package-from-Dubai-UAE.jpg',

    // Activities
    '/images/activities/dubai-trio.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2024/10/Tri-Budget-Half-Day-Dubai-City-Tour-With-Evening-Desert-Safari-636x426-1.jpg',
    '/images/activities/jet-car.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2024/10/8d0f2946-62e8-4fa6-add1-7c70d42ab740-636x426-1.jpg',
    '/images/activities/yas-island.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2024/10/Yas-Waterworld-636x426-1.jpg',
    '/images/activities/ifly.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2024/10/ifly_paramus4-1260x2400-1-636x426-1.jpg',
    '/images/activities/deep-dive.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2024/10/hero_image_d-636x426-1.jpg',
    '/images/activities/desert-safari.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2024/10/img_1695712532_1695712835__blb-636x426-1.jpg',
    '/images/activities/burj-khalifa.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2024/10/gyrocopter-flight-1-636x426-2.jpg',
    '/images/activities/dhow-cruise.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2024/10/Flyboard-Dubai-08-636x426-1.jpg',
    '/images/activities/seaworld.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2024/10/1388532319-636x426.jpg',
    '/images/activities/museum-future.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2024/10/1578652656-dhowcruise-raynatours-636x426-1.jpg',
    '/images/activities/dubai-frame.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2024/10/Untitleddesign14-Z4qt29Kj-636x426-1.jpg',
    '/images/activities/hot-air-balloon.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2024/10/dubai-dinner-in-the-sky-ticket-1-636x426-1.jpg',

    // Blogs
    '/images/blogs/travel-history.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2026/03/How-to-Build-a-Strong-Travel-History-for-Future-Visa-Approvals-2026-Guide-416x280.jpg',
    '/images/blogs/caucasus.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2026/02/Where-Europe-Meets-Asia-Top-Destinations-in-the-Caucasus-Region-416x280.jpg',
    '/images/blogs/bali-guide.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2026/03/IPL-2026-Travel-Guide-Turn-Team-Acronyms-into-Your-Next-India-Holiday-416x280.jpg',

    // Press
    '/images/press/award-2025.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2024/11/IMG_10131-416x280.jpeg',
    '/images/press/anniversary.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2024/11/IMG-20241118-WA0035-1-416x280.jpeg',
    '/images/press/travel-awards.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2024/11/IM__8597-1-2-416x280.jpg',

    // Hero backgrounds
    '/images/hero/holiday.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2026/02/Eid-Al-Fitr-Holiday-Packages-2026-Holiday-Deals-2.png',
    '/images/hero/visa.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/2026/02/Global-Visa-Assistance-Services-from-Dubai-UAE.png',
    '/images/hero/activities.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/slider/cache/a375aa18dce12b306040571e0d6f19a1/Vituzone-x-Satguru-Travel-from-Dubai-UAE.jpg',
    '/images/hero/corporate.jpg': 'https://www.satgurutravel.ae/wp-content/uploads/slider/cache/d8239bb65ccdfb50c5d2b51fe6f881e0/Arabian-Awards-2025-Best-Corporate-Travel-Management-Company-2025-for-Satguru-Travel-1-1.jpg',
};

async function downloadImage(url, dest) {
    // Use http if URL is http
    const lib = url.startsWith('https') ? require('https') : require('http');

    // Ensure absolute URL
    if (url.startsWith('//')) {
        url = 'https:' + url;
    }

    return new Promise((resolve, reject) => {
        // Add user-agent to prevent 403 Forbidden
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        };

        https.get(url, options, (res) => {
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
    console.log("Done overwriting images!");
}

main();
