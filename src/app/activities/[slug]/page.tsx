import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiClock, FiCheck, FiX, FiCheckCircle } from "react-icons/fi";
import { getActivities, getActivityBySlug } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";

const ACTIVITY_CONTENT: Record<string, { description: string; highlights: string[]; inclusions: string[]; exclusions: string[] }> = {
    // ... skipping contents since we leave them intact for the rich text not in sanity.
    // Let me just copy the existing dictionary so I don't lose it.
    "dubai-trio-packages": {
        description: "The Dubai Trio Package combines three of Dubai's most iconic experiences into one unforgettable 2-day itinerary. Start with a thrilling desert safari featuring dune bashing and a traditional Bedouin-style BBQ dinner under the stars. Continue with a mesmerizing dhow cruise along Dubai Creek, enjoying spectacular skyline views. Cap it off with tickets to the observation deck of the legendary Burj Khalifa. This curated bundle is perfect for first-time visitors who want the ultimate Dubai introduction at an unbeatable price.",
        highlights: ["Red dune bashing with professional drivers and sandboarding", "Traditional BBQ dinner with live Tanoura and belly dance shows", "Luxury dhow cruise along Dubai Marina with international buffet", "Burj Khalifa 'At the Top' observation deck – Level 124 & 125 access"],
        inclusions: ["Desert Safari with BBQ Dinner", "Dhow Cruise Marina Dinner", "Burj Khalifa Entry Tickets", "Hotel Pick-up & Drop-off (Desert Safari)", "All taxes and fees"],
        exclusions: ["Personal expenses and souvenirs", "Alcoholic beverages", "Hotel transfers for Dhow Cruise and Burj Khalifa"],
    },
    "jet-car-dubai": {
        description: "Feel the raw power of a Jet Car as you race through the open waters of Dubai's coastline at speeds exceeding 80 km/h. This adrenaline-packed 20-minute ride in a custom-built water jet car lets you perform spins, drifts, and jumps on the Arabian Gulf – all while enjoying stunning views of the Burj Al Arab and Palm Jumeirah. No prior experience needed – just strap in and let the thrills begin. It's one of the most unique water sports experiences in the entire Middle East.",
        highlights: ["Reach speeds of up to 80+ km/h on the open sea", "360-degree spins and high-speed drifts on water", "Scenic views of Burj Al Arab, Palm Jumeirah, and Dubai skyline", "Professional instructor beside you throughout the ride"],
        inclusions: ["20-minute Jet Car ride", "Safety briefing and equipment", "Life jacket and safety gear", "Professional instructor onboard"],
        exclusions: ["Hotel pick-up & drop-off", "Photos and videos (available for purchase)", "Personal expenses"],
    },
    "yas-island-theme-parks": {
        description: "Explore the action-packed world of Yas Island in Abu Dhabi, home to some of the most thrilling theme parks on the planet. Your all-day pass grants access to Ferrari World – featuring the world's fastest roller coaster (Formula Rossa at 240 km/h), Yas Waterworld – a uniquely Emirati-themed waterpark with 40+ rides, and Warner Bros. World – an immersive indoor theme park. Whether you're a speed junkie, water baby, or family looking for a fun day out, Yas Island delivers non-stop entertainment.",
        highlights: ["Ferrari World: Home to Formula Rossa – the fastest coaster on Earth", "Yas Waterworld: 40+ rides and slides with Emirati storytelling", "Warner Bros. World: 6 immersive themed lands with beloved characters", "SeaWorld and other attractions within walking distance"],
        inclusions: ["Full-day theme park entry", "Air-conditioned coach transfer from Dubai", "Park map and itinerary guide", "Water and snacks on the bus"],
        exclusions: ["Meals inside the park", "Locker rentals", "Personal shopping and souvenirs", "Additional park tickets (if visiting multiple parks)"],
    },
    "ifly-dubai": {
        description: "Experience the thrill of skydiving without the plane at iFLY Dubai, located at City Centre Mirdif. This cutting-edge vertical wind tunnel generates airspeeds of up to 280 km/h, allowing you to float, spin, and soar in a safe, controlled environment. Whether you are a first-timer or a seasoned flyer, iFLY's certified instructors will guide you through every second. Each session includes two flights of 60 seconds each – that is the equivalent of 2 full skydives from 14,000 feet. It is the perfect activity for families, couples, and thrill-seekers of all ages.",
        highlights: ["State-of-the-art 10-meter-tall vertical wind tunnel", "Two flights of 60 seconds each, equivalent to 2 full skydives", "One-on-one guidance from certified flight instructors", "Suitable for ages 3 to 103 – no experience needed"],
        inclusions: ["2 indoor skydiving sessions (60 seconds each)", "All safety gear (suit, helmet, goggles, earplugs)", "Pre-flight training and briefing", "Personalized flight certificate"],
        exclusions: ["Video and photo packages", "Personal expenses", "Hotel transfers"],
    },
    "deep-dive-dubai": {
        description: "Plunge into the world's deepest swimming pool at Deep Dive Dubai, a purpose-built underwater wonderland plunging 60 meters below the surface. Explore a sunken city with abandoned apartments, a garage, an arcade, and even a library, all submerged in 14 million litres of crystal-clear, temperature-controlled freshwater. Whether you are a certified diver or a complete beginner doing your very first Discover Scuba experience, expert PADI instructors guide you every step of the way. It has been featured on national geographic and BBC as one of the top bucket-list adventures globally.",
        highlights: ["World's deepest pool at 60 meters – a Guinness World Record holder", "Fully submerged sunken city with realistic architecture", "Over 50 underwater cameras capturing your adventure", "Warm, crystal-clear freshwater maintained at 30°C"],
        inclusions: ["Full diving session (beginner or certified)", "All diving equipment (BCD, regulator, wetsuit, mask)", "Professional PADI instructor guidance", "Complimentary photos and video clips"],
        exclusions: ["PADI certification course (available separately)", "Additional dive sessions", "Meals and refreshments", "Hotel transportation"],
    },
    "desert-safari": {
        description: "Embark on the quintessential Dubai adventure – an unforgettable evening desert safari into the heart of the Arabian Desert. Your journey begins with an exhilarating dune-bashing session in a powerful 4x4 Land Cruiser, navigating the golden sand dunes of the Al Lahbab desert. Arrive at a traditional Bedouin-style camp to enjoy camel rides, sandboarding, henna painting, and an authentic BBQ dinner served under a canopy of stars. Watch mesmerizing live performances including Tanoura and belly dancing, and capture stunning sunset photos that will last a lifetime.",
        highlights: ["Heart-pumping dune bashing in a 4x4 Land Cruiser", "Complimentary camel ride and sandboarding in the desert", "Traditional henna painting and Arabica coffee", "Live Tanoura show, belly dance, and fire show at the camp"],
        inclusions: ["Pick-up and drop-off from Dubai hotels", "45-minute dune bashing session", "Unlimited BBQ dinner with vegetarian options", "Camel ride, sandboarding, and shisha", "Traditional entertainment and live shows"],
        exclusions: ["Quad biking (available at extra cost)", "Professional photography", "Alcoholic beverages", "VIP seating upgrade"],
    },
    "burj-khalifa": {
        description: "Stand atop the world's tallest building at a soaring 555 meters and witness Dubai like never before. The Burj Khalifa 'At The Top' experience takes you to the iconic observation decks on Levels 124 and 125, where floor-to-ceiling glass walls offer breathtaking 360-degree panoramic views of the city, the desert, and the Arabian Gulf beyond. High-powered telescopes let you zoom in on landmarks like the Palm Jumeirah and The World Islands. Time your visit for sunset and watch the city transform from golden daylight into a sparkling blanket of lights.",
        highlights: ["360-degree panoramic views from Levels 124 and 125", "High-speed elevator reaching the top in under 60 seconds", "Interactive telescopes with augmented reality overlays", "Best sunset spot in the entire UAE"],
        inclusions: ["At The Top entry tickets (Levels 124 & 125)", "Access to interactive multimedia presentation", "Complimentary access to the souvenir gallery"],
        exclusions: ["Level 148 'At The Top SKY' upgrade", "Meals at At.mosphere restaurant", "Hotel transfers", "Personal expenses"],
    },
    "dhow-cruise-dinner": {
        description: "Glide along the shimmering waters of Dubai Marina or Dubai Creek aboard a beautifully illuminated traditional wooden dhow. This 3-hour cruise dinner combines the romance of old Arabia with the glamour of modern Dubai. Enjoy a lavish international buffet featuring Arabic, Indian, and Continental cuisines while you sail past illuminated skyscrapers, bustling souks, and glittering waterfront promenades. Live entertainment including Tanoura dance and music creates the perfect ambiance for an unforgettable evening on the water.",
        highlights: ["Lavish international buffet with Arabic, Indian, and Continental dishes", "Sail past the iconic Marina skyline or historic Creek scenery", "Live Tanoura dance performance and background music", "Complimentary welcome refreshments and soft drinks"],
        inclusions: ["2-hour dhow cruise", "International buffet dinner", "Welcome drinks and soft beverages", "Live entertainment and Tanoura show"],
        exclusions: ["Hotel pick-up and drop-off", "Alcoholic beverages", "Photography packages", "Private table reservations"],
    },
    "seaworld-abu-dhabi": {
        description: "Discover the wonders of the ocean at SeaWorld Abu Dhabi on Yas Island – the region's first marine life theme park and the world's largest indoor marine-life experience. Spanning 5 immersive realms – One Ocean, Abu Dhabi Ocean, Rocky Point, Tropical Ocean, and Endless Ocean – the park takes you on a journey from the Arctic to the tropics. Encounter sharks, rays, sea turtles, dolphins, and thousands of fish as you explore 68,000+ square meters of marine habitats. Interactive rides, educational exhibits, and live presentations make this a must-visit for families.",
        highlights: ["World's largest indoor marine-life experience", "5 immersive realms covering polar to tropical ecosystems", "Up-close encounters with dolphins, sea lions, and rays", "Thrilling rides including the Manta and Eel-ectric coasters"],
        inclusions: ["Full-day entry to SeaWorld Abu Dhabi", "Access to all 5 realms and shows", "Round-trip coach transfer from Dubai", "Park map and guide"],
        exclusions: ["Animal encounter upgrades", "Meals and snacks inside the park", "Locker and souvenir purchases", "Photography packages"],
    },
    "museum-of-the-future": {
        description: "Step into a world that has not yet been built. The Museum of the Future is Dubai's architectural masterpiece and one of the most beautiful buildings in the world. This immersive experience transports you to the year 2071, exploring how humanity will live, work, and interact through advanced technology, space travel, and environmental solutions. Walk through the OSS Hope space station orbiting Earth, explore a digital Amazon rainforest teeming with 2,400 species, and engage with AI-driven exhibits in the Al Waha wellness center. It is less a museum and more a portal into tomorrow.",
        highlights: ["Stunning Arabic calligraphy facade – one of the most photographed buildings globally", "OSS Hope: Immersive space station experience set in 2071", "Digital Amazonian rainforest with 2,400+ species to discover", "Al Waha: A mindfulness and wellness space of the future"],
        inclusions: ["Entry ticket to Museum of the Future", "Access to all floors and exhibitions", "Guided AR and VR experiences included"],
        exclusions: ["Hotel pick-up and drop-off", "Food and beverages", "Gift shop purchases", "Special event tickets"],
    },
    "dubai-frame": {
        description: "See both the old and new Dubai in a single glance from the iconic Dubai Frame – a 150-meter-tall golden picture frame standing proudly in Zabeel Park. One side frames the modern skyline of Sheikh Zayed Road and Downtown Dubai, while the other reveals the historic neighborhoods of Deira and Karama. A glass-floored Sky Deck at the top offers vertigo-inducing views directly beneath your feet. Inside, a multimedia gallery takes you through Dubai's evolution from a small fishing village to a global megacity, making this one of the city's most insightful cultural attractions.",
        highlights: ["150-meter-tall observation deck with glass floor walkway", "Dual-view panorama: Historic Old Dubai meets futuristic New Dubai", "Multimedia gallery showcasing Dubai's transformation story", "Located in the green oasis of Zabeel Park"],
        inclusions: ["Entry ticket to Dubai Frame", "Access to Sky Deck and glass floor", "Multimedia gallery experience"],
        exclusions: ["Hotel transfers", "Personal expenses", "Food and beverages at the café", "Photography services"],
    },
    "hot-air-balloon": {
        description: "Rise before dawn and float silently over the Arabian Desert in a magical hot air balloon ride that will take your breath away. As the sun breaks over the endless dunes, you will soar up to 4,000 feet above the desert floor, witnessing a kaleidoscope of golden hues painting the landscape below. Spot wild gazelles, Arabian oryx and camels roaming freely in the Margham desert conservation area. After landing, celebrate with a traditional falcon show and a gourmet breakfast at your exclusive desert camp. This is the most serene and awe-inspiring way to experience the natural beauty of the UAE.",
        highlights: ["Sunrise flight over the Margham desert conservation area", "Soar up to 4,000 feet to see the vast Arabian Desert panorama", "Spot wild gazelles, camels, and Arabian oryx from above", "Post-flight gourmet breakfast and traditional falcon show"],
        inclusions: ["1-hour hot air balloon flight", "Hotel pick-up and drop-off from Dubai", "Gourmet breakfast at desert camp", "Professional falcon show", "Flight certificate and light refreshments"],
        exclusions: ["Personal expenses and souvenirs", "Upgraded photography packages", "Extended camel trek (available at cost)"],
    },
};

export async function generateStaticParams() {
    const activities = await getActivities();
    return activities.map((activity: any) => ({
        slug: activity.slug,
    }));
}

export default async function ActivityDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const activity = await getActivityBySlug(resolvedParams.slug);

    if (!activity) {
        notFound();
    }

    const content = ACTIVITY_CONTENT[activity.slug] || {
        description: `Experience the magic of the UAE with ${activity.name}. This ${activity.duration || "amazing"} adventure promises unforgettable memories, spectacular views, and premium service from start to finish.`,
        highlights: ["Premium experience tailored for maximum enjoyment", "Guided assistance available throughout the journey", "Hassle-free booking with expert travel agents"],
        inclusions: ["Entry Tickets", "Professional Guide", "Refreshments"],
        exclusions: ["Personal Expenses", "Hotel Transfers (unless stated)"],
    };

    return (
        <>
            {/* Banner */}
            <section className="bg-gradient-to-r from-orange-700 to-amber-900 py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-20 w-80 h-80 rounded-full bg-white blur-3xl" />
                </div>
                <div className="relative z-10">
                    <p className="text-white/60 text-sm font-[Poppins] mb-2">Home / Activities / {activity.name}</p>
                    <h1 className="text-4xl md:text-5xl font-[Poppins] font-bold text-white max-w-4xl mx-auto leading-tight">
                        {activity.name}
                    </h1>
                </div>
            </section>

            {/* Content */}
            <section className="py-14 bg-bg-primary">
                <div className="max-w-[1200px] mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Left Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-gray-100">
                                <Image
                                    src={(activity.image as any)?.asset ? urlFor(activity.image).url() : activity.image}
                                    alt={activity.name}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 800px"
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-sm">
                                <h2 className="text-2xl font-[Poppins] font-bold text-text-primary mb-4">Overview</h2>
                                <p className="text-text-secondary leading-relaxed mb-6">
                                    {content.description}
                                </p>

                                <h3 className="text-xl font-[Poppins] font-bold text-text-primary mb-4 mt-8">Highlights</h3>
                                <ul className="space-y-3 mb-6">
                                    {content.highlights.map((highlight, i) => (
                                        <li key={i} className="flex gap-3 text-text-secondary">
                                            <FiCheckCircle className="text-accent-teal mt-1 flex-shrink-0" />
                                            <span>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                                    <div>
                                        <h3 className="text-xl font-[Poppins] font-bold text-text-primary mb-4">Inclusions</h3>
                                        <ul className="space-y-2">
                                            {content.inclusions.map((item, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                                                    <FiCheck className="text-green-500" /> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-[Poppins] font-bold text-text-primary mb-4">Exclusions</h3>
                                        <ul className="space-y-2">
                                            {content.exclusions.map((item, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                                                    <FiX className="text-red-500" /> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar (Booking Widget) */}
                        <div className="lg:col-span-1 border-gray-100">
                            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-[100px] border border-gray-100">
                                <div className="text-center pb-6 border-b border-gray-100 mb-6">
                                    <span className="text-sm text-text-muted font-[Poppins] uppercase font-bold tracking-wider">Starting From</span>
                                    <div className="text-4xl font-[Poppins] font-bold text-text-primary mt-2">
                                        <span className="text-xl text-text-muted">AED</span> {activity.price?.toLocaleString()}
                                    </div>
                                    {activity.duration && (
                                        <div className="flex items-center justify-center gap-2 text-text-secondary mt-3 text-sm">
                                            <FiClock /> <span>Duration: {activity.duration}</span>
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-lg font-[Poppins] font-bold text-text-primary mb-4 text-center">Book This Activity</h3>

                                <form className="space-y-4">
                                    <div>
                                        <label className="block text-xs text-text-secondary mb-1">Date</label>
                                        <input type="date" className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm bg-gray-50" />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-text-secondary mb-1">Guests</label>
                                        <select className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm bg-gray-50">
                                            <option>1 Person</option>
                                            <option>2 People</option>
                                            <option>3 People</option>
                                            <option>4+ People</option>
                                        </select>
                                    </div>

                                    <Link
                                        href={`/contact?service=activity&package=${activity.slug}`}
                                        className="block w-full text-center px-4 py-3 bg-secondary text-white font-[Poppins] font-bold rounded-lg hover:bg-secondary-hover transition-colors shadow-md mt-6"
                                    >
                                        Enquire Now
                                    </Link>
                                    <a
                                        href="https://wa.me/971588759933"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full text-center px-4 py-3 bg-[#25D366] text-white font-[Poppins] font-bold rounded-lg hover:bg-[#128C7E] transition-colors shadow-md"
                                    >
                                        Book via WhatsApp
                                    </a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
