// ──── WB TOURISM CONSTANTS ────

export const SITE_NAME = "Waseem Baig Tourism LLC";
export const SITE_TAGLINE = "Your Trusted Partner For All Travel Needs";
export const SITE_DESCRIPTION =
    "We are a travel company dedicated to creating smooth, memorable journeys through personalized planning, reliable service, and expert guidance.";
export const SITE_URL = "https://wbtourism.ae";

export const CONTACT = {
    dubai: {
        phone: "+971 58 875 9933",
        phoneHref: "tel:+971588759933",
        address:
            "Office No:5, Al Mashraf Tower 8th Floor, OPP Union Metro Station, Baniyas Road, Dubai, UAE",
        label: "Dubai Office",
    },
    email: "info@wbtourism.ae",
    emailHref: "mailto:info@wbtourism.ae",
    salesEmail: "info@wbtourism.ae", // Fallback to provided email if sales is not given
    whatsapp: "https://wa.me/971588759933",
    additionalPhones: [
        "+971 54 794 2969"
    ]
};

export const SOCIAL = {
    facebook: "https://www.facebook.com/people/WB-Tourism-LLC/61576807132933/#",
    youtube: "https://www.youtube.com/@wbtourism",
    instagram: "https://www.instagram.com/wb_tourismllc/",
    google: "https://maps.app.goo.gl/wbtourism",
    whatsapp: "https://wa.me/971588759933",
    tiktok: "https://www.tiktok.com/@wb_tourism_llc",
};

export const NAV_ITEMS = [
    {
        label: "Visa",
        href: "/visa",
        hasMegaMenu: true,
        children: [
            { label: "Africa", href: "/visa?region=africa" },
            { label: "Asia", href: "/visa?region=asia" },
            { label: "Europe", href: "/visa?region=europe" },
            { label: "Middle East", href: "/visa?region=middle-east" },
            { label: "Latin America", href: "/visa?region=latin-america" },
            { label: "Australia", href: "/visa?region=australia" },
            { label: "Canada", href: "/visa?region=canada" },
            { label: "USA", href: "/visa?region=usa" },
            { label: "CIS", href: "/visa?region=cis" },
            { label: "Get Your Visa Appointment", href: "/contact", highlight: true },
        ],
    },
    { label: "Activities", href: "/activities" },
    { label: "Holidays", href: "/holidays" },
    { label: "Corporate Travel", href: "/corporate-travel" },
    { label: "Staycation", href: "/staycation" },
    { label: "Cruise", href: "/cruise" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact Us", href: "/contact" },
];

export const MORE_ITEMS = [
    { label: "Travel Insurance", href: "/travel-insurance" },
    { label: "Payment Partners", href: "/payment-partners" },
];

export const FOOTER_INFO_LINKS = [
    { label: "About Us", href: "/about-us" },
    { label: "Why Us", href: "/why-us" },
    { label: "Our Services", href: "/our-services" },
    { label: "Contact Us", href: "/contact" },
];

export const QUICK_LINKS = [
    "Customized Holiday Packages",
    "Global Visa Assistance",
    "Best Activities in UAE",
    "Umrah Packages",
    "Staycation Packages",
];

export const POPULAR_CRUISES = [
    { name: "Royal Caribbean International", ship: "Symphony of the Seas", ports: 4, duration: 7, price: 5999, slug: "royal-caribbean-symphony", image: "/images/activities/dhow-cruise.jpg", badge: "Most Popular" },
    { name: "Celebrity Cruises", ship: "Celebrity Apex", ports: 5, duration: 10, price: 8999, slug: "celebrity-apex", image: "/images/activities/dubai-trio.jpg", badge: "Luxury" },
    { name: "Disney Cruise Line", ship: "Disney Magic", ports: 3, duration: 5, price: 6499, slug: "disney-magic", image: "/images/activities/ifly.jpg" },
    { name: "MSC Cruises", ship: "MSC Euribia", ports: 6, duration: 8, price: 4299, slug: "msc-euribia", image: "/images/activities/seaworld.jpg" },
    { name: "Princess Cruises", ship: "Discovery Princess", ports: 5, duration: 12, price: 7199, slug: "discovery-princess", image: "/images/activities/museum-future.jpg" },
    { name: "Cunard Line", ship: "Queen Mary 2", ports: 7, duration: 14, price: 12999, slug: "queen-mary-2", image: "/images/activities/dubai-frame.jpg", badge: "Ultra Luxury" },
    { name: "P&O Cruises", ship: "Iona", ports: 4, duration: 7, price: 3499, slug: "po-iona", image: "/images/activities/desert-safari.jpg" },
    { name: "Norwegian Cruise Line", ship: "Norwegian Epic", ports: 6, duration: 10, price: 5499, slug: "norwegian-epic", image: "/images/activities/dubai-trio.jpg" },
];

export const STATS = [
    { value: 13, suffix: "+", label: "Years Experience" },
    { value: 18, suffix: "+", label: "Countries Presence" },
    { value: 13, suffix: "+", label: "Branches" },
    { value: 474, suffix: "+", label: "Employees" },
];

// ──── VISA DATA ────
export const VISAS = [
    { name: "Bahrain Visa", country: "Bahrain", region: "middle-east", slug: "bahrain-visa", image: "/images/visas/bahrain.jpg" },
    { name: "Oman E-Visa", country: "Oman", region: "middle-east", slug: "oman-e-visa", image: "/images/visas/oman.jpg" },
    { name: "Saudi Arabia E-Visa", country: "Saudi Arabia", region: "middle-east", slug: "saudi-arabia-e-visa", image: "/images/visas/saudi.jpg" },
    { name: "India E-Visa", country: "India", region: "asia", slug: "india-e-visa", image: "/images/visas/india.jpg" },
    { name: "Nigeria Visa", country: "Nigeria", region: "africa", slug: "nigeria-visa", image: "/images/visas/nigeria.jpg" },
    { name: "Turkey Visa", country: "Turkey", region: "middle-east", slug: "turkey-visa", image: "/images/visas/turkey.jpg" },
    { name: "Egypt Visa", country: "Egypt", region: "africa", slug: "egypt-visa", image: "/images/visas/egypt.jpg" },
    { name: "UK Visa", country: "United Kingdom", region: "europe", slug: "uk-visa", image: "/images/visas/uk.jpg" },
    { name: "Schengen Visa", country: "Schengen", region: "europe", slug: "schengen-visa", image: "/images/visas/schengen.jpg" },
    { name: "Singapore Visa", country: "Singapore", region: "asia", slug: "singapore-visa", image: "/images/visas/singapore.jpg" },
    { name: "Philippines Visa", country: "Philippines", region: "asia", slug: "philippines-visa", image: "/images/visas/philippines.jpg" },
    { name: "Ghana Visa", country: "Ghana", region: "africa", slug: "ghana-visa", image: "/images/visas/ghana.jpg" },
    { name: "Australia Visa", country: "Australia", region: "australia", slug: "australia-visa", image: "/images/visas/australia.jpg" },
    { name: "Canada Visa", country: "Canada", region: "canada", slug: "canada-visa", image: "/images/visas/canada.jpg" },
    { name: "USA Visa", country: "United States", region: "usa", slug: "usa-visa", image: "/images/visas/usa.jpg" },
    { name: "Russia Visa", country: "Russia", region: "cis", slug: "russia-visa", image: "/images/visas/russia.jpg" },
    { name: "Kenya Visa", country: "Kenya", region: "africa", slug: "kenya-visa", image: "/images/visas/kenya.jpg" },
    { name: "South Africa Visa", country: "South Africa", region: "africa", slug: "south-africa-visa", image: "/images/visas/south-africa.jpg" },
    { name: "China Visa", country: "China", region: "asia", slug: "china-visa", image: "/images/visas/china.jpg" },
    { name: "Ethiopia Visa", country: "Ethiopia", region: "africa", slug: "ethiopia-visa", image: "/images/visas/ethiopia.jpg" },
];

// ──── HOLIDAY DATA ────
export const HOLIDAYS = [
    { name: "Turkey Travel Package", destination: "Turkey", slug: "turkey-travel-package", duration: "8 Days", price: 2499, badge: "EID SPECIAL", image: "/images/holidays/turkey.jpg" },
    { name: "Georgia Travel Package", destination: "Georgia", slug: "georgia-travel-package", duration: "5 Days", price: 1899, badge: "EID SPECIAL", image: "/images/holidays/georgia.jpg" },
    { name: "Armenia Holiday Package", destination: "Armenia", slug: "armenia-holiday-package", duration: "4 Days", price: 1599, badge: "EID SPECIAL", image: "/images/holidays/armenia.jpg" },
    { name: "Kenya Holiday Package", destination: "Kenya", slug: "kenya-holiday-package", duration: "5 Days", price: 2199, badge: "EID SPECIAL", image: "/images/holidays/kenya.jpg" },
    { name: "Kazakhstan Holiday Package", destination: "Kazakhstan", slug: "kazakhstan-holiday-package", duration: "5 Days", price: 1799, badge: null, image: "/images/holidays/kazakhstan.jpg" },
    { name: "Bali Holiday Package", destination: "Indonesia", slug: "bali-holiday-package", duration: "6 Days", price: 2899, badge: null, image: "/images/holidays/bali.jpg" },
    { name: "Mauritius Travel Package", destination: "Mauritius", slug: "mauritius-travel-package", duration: "5 Days", price: 3299, badge: "POPULAR", image: "/images/holidays/mauritius.jpg" },
    { name: "Lombok Tour Package", destination: "Indonesia", slug: "lombok-tour-package", duration: "5 Days", price: 2599, badge: null, image: "/images/holidays/lombok.jpg" },
];

// ──── ACTIVITIES DATA ────
export const ACTIVITIES = [
    { name: "Dubai Trio Packages", slug: "dubai-trio-packages", duration: "2 Days", price: 305, image: "/images/activities/dubai-trio.jpg" },
    { name: "Jet Car Dubai", slug: "jet-car-dubai", duration: "20 Minutes", price: 799, image: "/images/activities/jet-car.jpg" },
    { name: "Yas Island Theme Parks", slug: "yas-island-theme-parks", duration: "8 Hours", price: 295, image: "/images/activities/yas-island.jpg" },
    { name: "iFly Dubai", slug: "ifly-dubai", duration: "2 Hours", price: 199, image: "/images/activities/ifly.jpg" },
    { name: "Deep Dive Dubai", slug: "deep-dive-dubai", duration: "3 Hours", price: 350, image: "/images/activities/deep-dive.jpg" },
    { name: "Desert Safari", slug: "desert-safari", duration: "6 Hours", price: 149, image: "/images/activities/desert-safari.jpg" },
    { name: "Burj Khalifa At The Top", slug: "burj-khalifa", duration: "2 Hours", price: 169, image: "/images/activities/burj-khalifa.jpg" },
    { name: "Dhow Cruise Dinner", slug: "dhow-cruise-dinner", duration: "3 Hours", price: 99, image: "/images/activities/dhow-cruise.jpg" },
    { name: "SeaWorld Abu Dhabi", slug: "seaworld-abu-dhabi", duration: "5 Hours", price: 330, image: "/images/activities/seaworld.jpg" },
    { name: "Museum of the Future", slug: "museum-of-the-future", duration: "3 Hours", price: 149, image: "/images/activities/museum-future.jpg" },
    { name: "Dubai Frame", slug: "dubai-frame", duration: "1.5 Hours", price: 50, image: "/images/activities/dubai-frame.jpg" },
    { name: "Hot Air Balloon Ride", slug: "hot-air-balloon", duration: "4 Hours", price: 899, image: "/images/activities/hot-air-balloon.jpg" },
];

// ──── TESTIMONIALS DATA ────
export const TESTIMONIALS = [
    {
        name: "Avez Mirza",
        avatar: "/images/testimonials/avatar1.jpg",
        text: "I had a great experience with Waseem Baig Tourism. The staff was polite, knowledgeable, and very helpful throughout the entire process. They explained all the travel options clearly and helped me choose the best one. Highly recommend!",
    },
    {
        name: "Umar Siddiqui",
        avatar: "/images/testimonials/avatar2.jpg",
        text: "I had a great experience with this travel and visa service. The team was very professional, helpful, and guided me through every step of the process smoothly. They handled all the documentation carefully and made the entire journey stress-free.",
    },
    {
        name: "Shalini Banerjee",
        avatar: "/images/testimonials/avatar3.jpg",
        text: "Very good service and supportive customer service. I did my visit visa from them and it was a very pleasant experience. Highly recommended.",
    },
    {
        name: "Sarah M.",
        avatar: "/images/testimonials/avatar4.jpg",
        text: "I needed a fast employment visa and the team at Waseem Baig Tourism delivered well before the deadline. Very professional and transparent process throughout.",
    },
    {
        name: "Mohammad K.",
        text: "Excellent service for family visit visas. The staff is highly knowledgeable and guided us through the documentation step-by-step. Thank you for making it so easy!",
        avatar: "/images/testimonials/avatar5.jpg",
    },
    {
        name: "James Williams",
        text: "Fantastic cruise experience organized by WB Tourism! The whole process from booking to boarding was smooth. The itinerary was perfect and we had the time of our lives.",
        avatar: "/images/testimonials/avatar6.jpg",
    },
];

// ──── BLOG DATA ────
export const BLOGS = [
    {
        title: "How to Build a Strong Travel History for Visa Approvals",
        slug: "build-strong-travel-history-visa-approvals",
        date: "March 3, 2026",
        excerpt: "In 2026, international travel is more accessible than ever - but visa approval processes have also become more data-driven and…",
        image: "/images/blogs/travel-history.jpg",
    },
    {
        title: "Top Destinations in the Caucasus Region",
        slug: "top-destinations-caucasus-region",
        date: "February 28, 2026",
        excerpt: "Straddling the historic Europe and Asia border, the Caucasus Region is one of the world's most fascinating crossroads of culture…",
        image: "/images/blogs/caucasus.jpg",
    },
    {
        title: "Bali Travel Guide 2026: Complete Handbook for First-Timers",
        slug: "bali-travel-guide-2026",
        date: "February 17, 2026",
        excerpt: "Bali continues to be one of the world's most captivating island destinations, and 2026 is shaping up to be an…",
        image: "/images/blogs/bali-guide.jpg",
    },
];

export const PRESS_RELEASES = [
    {
        title: "WB Tourism Wins Best Corporate Travel Management Award 2025",
        slug: "best-corporate-travel-award-2025",
        date: "November 25, 2024",
        image: "/images/press/award-2025.jpg",
    },
    {
        title: "WB Tourism Celebrates 13 Years of Service Excellence",
        slug: "13-years-service-excellence",
        date: "November 18, 2024",
        image: "/images/press/anniversary.jpg",
    },
    {
        title: "Stars Dazzle at Arabian Travel Awards 2024",
        slug: "arabian-travel-awards-2024",
        date: "November 18, 2024",
        image: "/images/press/travel-awards.jpg",
    },
];

export const STAYCATIONS = [
    { name: "Atlantis The Palm – Weekend Escape", location: "Dubai", duration: "2 Nights", rating: 5, price: 1299, slug: "atlantis-palm-weekend", image: "/images/holidays/turkey.jpg", badge: "Best Seller" },
    { name: "Rixos Premium Dubai – Beach Getaway", location: "Dubai, JBR", duration: "1 Night", rating: 5, price: 999, slug: "rixos-premium-beach", image: "/images/holidays/georgia.jpg" },
    { name: "Hilton Ras Al Khaimah – Family Fun", location: "Ras Al Khaimah", duration: "2 Nights", rating: 5, price: 649, slug: "hilton-rak-family", image: "/images/holidays/bali.jpg" },
    { name: "Jumeirah Beach Hotel – Leisure Stay", location: "Dubai", duration: "3 Nights", rating: 5, price: 1599, slug: "jumeirah-beach-leisure", image: "/images/holidays/mauritius.jpg", badge: "Luxury Deals" },
    { name: "St. Regis Abu Dhabi – Luxury Retreat", location: "Abu Dhabi", duration: "2 Nights", rating: 5, price: 1199, slug: "st-regis-abudhabi", image: "/images/holidays/armenia.jpg" },
    { name: "Anantara Al Jabal – Mountain Escape", location: "Al Ain", duration: "1 Night", rating: 5, price: 899, slug: "anantara-mountain-escape", image: "/images/holidays/kazakhstan.jpg" },
];
