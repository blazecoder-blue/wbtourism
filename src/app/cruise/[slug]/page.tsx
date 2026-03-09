import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiClock, FiMapPin, FiAnchor } from "react-icons/fi";
import { getCruises, getCruiseBySlug } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import Breadcrumb from "@/components/ui/Breadcrumb";

const CRUISE_CONTENT: Record<string, { description: string; features: { title: string; text: string }[] }> = {
    "royal-caribbean-symphony": {
        description: "Set sail aboard the magnificent Symphony of the Seas – one of the largest and most revolutionary cruise ships ever built. With 18 decks of pure innovation, this floating city features 7 distinct neighborhoods, each with its own personality. Plunge down the Ultimate Abyss – the tallest slide at sea at over 10 stories – or surf real waves on the FlowRider. Dine across 20+ world-class restaurants ranging from Jamie's Italian to the robotic Bionic Bar where mechanized arms mix your cocktails. Entertainment includes Broadway-calibre shows, ice skating performances, and an open-air AquaTheater with high-diving acrobatics. With stops across 4 spectacular ports, this is the ultimate floating vacation.",
        features: [
            { title: "The Ultimate Abyss", text: "The tallest slide at sea – a 10-story dry slide plunging through the ship's interior." },
            { title: "Central Park at Sea", text: "An open-air garden with over 12,000 real plants, fine dining, and live music." },
            { title: "FlowRider & Zip Line", text: "Surf simulators and a 9-deck zip line across the ship's Boardwalk." },
            { title: "Broadway Entertainment", text: "Full-scale Broadway productions including Hairspray and original shows." },
        ],
    },
    "celebrity-apex": {
        description: "Experience modern luxury aboard Celebrity Apex, where cutting-edge design meets transformative travel. Designed with a focus on outward-facing spaces, the ship features the revolutionary Magic Carpet – a cantilevered platform that moves between decks on the ship's exterior, serving as a bar, restaurant, and tender boarding area depending on its position. The Eden – a three-story venue at the ship's aft – combines a restaurant, performance art venue, and lounge with floor-to-ceiling windows offering panoramic ocean views. Dine at 29 distinctive restaurants and bars, unwind at the SEA Thermal Suite spa, and explore 5 breathtaking ports across the Mediterranean.",
        features: [
            { title: "The Magic Carpet", text: "The world's first cantilevered floating platform reaching 13 stories above sea level." },
            { title: "Eden", text: "A three-story venue blending cuisine, performance art, and nature-inspired design." },
            { title: "SEA Thermal Suite", text: "A luxurious spa journey featuring heated tile loungers, salt rooms, and aromatherapy." },
            { title: "Infinite Verandas", text: "Revolutionary staterooms where a touch of a button transforms your cabin into an open-air balcony." },
        ],
    },
    "disney-magic": {
        description: "Create magical family memories aboard the Disney Magic, where beloved Disney storytelling comes alive on the high seas. From character breakfasts with Mickey and friends to Broadway-style shows featuring Tangled: The Musical and Disney Dreams, every moment is designed to enchant guests of all ages. Kids can explore the Oceaneer Club and Lab, while teens hang out at Vibe. Adults enjoy exclusive spaces including the Quiet Cove Pool, Palo – an upscale Italian restaurant with ocean views – and After Hours, a nightlife district featuring themed lounges. The Disney Magic offers a uniquely immersive cruise experience that no other line can match.",
        features: [
            { title: "Character Encounters", text: "Meet Mickey, Minnie, Elsa, and dozens of beloved Disney characters throughout the ship." },
            { title: "Tangled: The Musical", text: "A full Broadway-quality theatrical production exclusive to Disney Cruise Line." },
            { title: "AquaDunk Water Slide", text: "A thrilling body slide starting with a trap-door drop, extending over the ship's edge." },
            { title: "Palo Fine Dining", text: "Adults-only Northern Italian restaurant with panoramic views and premium wines." },
        ],
    },
    "msc-euribia": {
        description: "Sail the Arabian Gulf in spectacular style aboard MSC Euribia, one of the most environmentally advanced cruise ships afloat. Powered by LNG (liquefied natural gas), this beauty features a stunning hull adorned with a 215-meter-long artwork by artist Alex Fakso, celebrating the ocean's beauty. Inside, discover 6 pools, a Formula 1 racing simulator, a full-size bowling alley, and the immersive MSC Aurea Spa. Dine at specialty restaurants including the Butcher's Cut steakhouse and the elegant French restaurant L'Atelier Bistrot. With ports across Abu Dhabi, Sir Bani Yas Island, and Doha, this Arabian Gulf itinerary showcases the region's finest coastal treasures.",
        features: [
            { title: "215m Hull Artwork", text: "A breathtaking ocean-themed mural by artist Alex Fakso covering the entire ship exterior." },
            { title: "F1 Simulator", text: "A full-scale Formula 1 racing simulator offering a realistic Grand Prix experience." },
            { title: "MSC Aurea Spa", text: "Balinese-inspired spa with thermal suite, massage rooms, and ocean-view treatment cabins." },
            { title: "Yacht Club Suite", text: "An exclusive ship-within-a-ship concept with private pool, butler service, and premium dining." },
        ],
    },
    "discovery-princess": {
        description: "Embark on a 12-night Mediterranean odyssey aboard the Discovery Princess, the newest and most advanced ship in the Princess Cruises fleet. Featuring the signature MedallionClass experience, your OceanMedallion wearable unlocks a seamlessly personalized journey – from keyless stateroom entry to on-demand food and drinks delivered anywhere on the ship. The Sky Suite is one of the largest balcony staterooms at sea, perfect for watching sunsets over the Mediterranean. Enjoy Movies Under the Stars on the top-deck screen, world-class dining at SHARE by Curtis Stone, and the immersive Princess Theater shows. With stops at 5 stunning ports across the Mediterranean, this is a voyage of discovery in every sense.",
        features: [
            { title: "MedallionClass Technology", text: "OceanMedallion wearable device enabling contactless everything from entry to ordering." },
            { title: "Movies Under the Stars", text: "A 300-square-foot poolside screen showing films and live sports under the open sky." },
            { title: "SHARE by Curtis Stone", text: "Celebrity chef Curtis Stone's signature restaurant featuring modern Australian cuisine." },
            { title: "The Enclave Spa", text: "The flagship spa featuring Japanese baths, couples treatments, and a fitness centre." },
        ],
    },
    "queen-mary-2": {
        description: "Experience the golden age of ocean travel aboard the Cunard Queen Mary 2 – the only true ocean liner still in service today. Built to cross the Atlantic, the QM2 exudes a timeless elegance that no modern cruise ship can replicate. Black-tie gala evenings, a planetarium at sea (Illuminations), the world's largest floating library with 8,000 books, and the legendary Grills dining experience make this ship a class apart. With 14 nights visiting 7 ports, you will have ample time to explore while enjoying White Star Service – Cunard's hallmark of personal, attentive hospitality refined over 185 years of seafaring tradition.",
        features: [
            { title: "The Only Ocean Liner", text: "The QM2 is the only true ocean liner in operation, built for transatlantic crossings." },
            { title: "Illuminations Planetarium", text: "The only planetarium at sea, offering immersive full-dome space and nature shows." },
            { title: "Royal Court Theatre", text: "A stunning two-deck performance venue hosting West End and Broadway-quality shows." },
            { title: "Black-Tie Gala Nights", text: "Traditional formal evenings with ballroom dancing and champagne receptions." },
        ],
    },
    "po-iona": {
        description: "Cruise the Arabian Gulf in contemporary British style aboard P&O Cruises' Iona – the largest cruise ship built specifically for the British market. Powered by LNG, Iona features the stunning SkyDome – a retractable glass roof pool and entertainment venue that transforms from a pool party by day to an aerial entertainment space by night. Enjoy 30 dining options from Gary Rhodes' signature restaurant to tapas and street-food-style eateries. The 700-seat Grand Theatre hosts West End-style productions, while the infinity pool aft offers serene views of the open ocean. Iona is the perfect blend of entertainment and relaxation.",
        features: [
            { title: "SkyDome", text: "A retractable glass-roofed entertainment complex with pool, performances, and DJ sets." },
            { title: "Gary Rhodes' Restaurant", text: "Fine dining by the legendary British chef featuring modern British cuisine." },
            { title: "The Grand Theatre", text: "A 700-seat venue hosting West End-quality theatrical productions and live music." },
            { title: "Infinity Pool Aft", text: "A stunning adults-only infinity pool overlooking the ship's wake and the open ocean." },
        ],
    },
    "norwegian-epic": {
        description: "Discover boundless freedom aboard the Norwegian Epic, NCL's revolutionary Freestyle Cruising flagship that lets you vacation on your own terms. No fixed dining times, no assigned seating, no formal dress codes – just pure freedom to explore 10 nights across 6 stunning Mediterranean ports. The Epic features the legendary Blue Man Group in exclusive at-sea performances, Cirque Dreams & Dinner combining acrobatics with gourmet dining, and the Aqua Park with 3 multi-story water slides. Try the unique Studio staterooms designed for solo travelers, or splurge on The Haven – a private ship-within-a-ship sanctuary with butler service, a private pool, and exclusive restaurant.",
        features: [
            { title: "Freestyle Cruising", text: "No dress codes, no fixed dining times, no assigned seating – total vacation freedom." },
            { title: "Blue Man Group at Sea", text: "The world-famous Blue Man Group performs exclusively on Norwegian Epic." },
            { title: "The Haven", text: "An exclusive ship-within-a-ship sanctuary with private pool, sundeck, and butler service." },
            { title: "Aqua Park", text: "3 thrilling multi-story water slides and a kids' Aqua Park for younger guests." },
        ],
    },
};

export async function generateStaticParams() {
    const cruises = await getCruises();
    return cruises.map((cruise: any) => ({
        slug: cruise.slug,
    }));
}

export default async function CruiseDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const cruise = await getCruiseBySlug(resolvedParams.slug);

    if (!cruise) {
        notFound();
    }

    const content = CRUISE_CONTENT[cruise.slug] || {
        description: `Set sail on the magnificent ${cruise.ship} for an unforgettable ${cruise.duration}-night journey across ${cruise.ports} spectacular ports.`,
        features: [
            { title: "Luxurious Cabins", text: "Spacious staterooms with daily housekeeping and ocean views." },
            { title: "Gourmet Dining", text: "Multi-course meals and specialty restaurants." },
            { title: "World-Class Entertainment", text: "Broadway-style shows, live music, and deck parties." },
            { title: "Resort Amenities", text: "Multiple pools, fitness centres, and spa access." },
        ],
    };

    return (
        <>
            {/* Banner */}
            <section className="bg-gradient-to-r from-blue-800 to-cyan-900 py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 right-20 w-80 h-80 rounded-full bg-white blur-3xl" />
                </div>
                <div className="relative z-10">
                    <Breadcrumb items={[{ label: "Cruise", href: "/cruise" }, { label: cruise.name }]} />
                    <h1 className="text-4xl md:text-5xl font-[Poppins] font-bold text-white max-w-4xl mx-auto leading-tight">
                        {cruise.name}
                    </h1>
                </div>
            </section>

            {/* Content */}
            <section className="py-14 bg-bg-primary">
                <div className="max-w-[1200px] mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Left Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-gray-100">
                                <Image
                                    src={(cruise.image as any)?.asset ? urlFor(cruise.image).url() : cruise.image}
                                    alt={cruise.name}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 800px"
                                    className="object-cover"
                                    priority
                                />
                                {cruise.badge && (
                                    <span className="absolute top-4 left-4 px-4 py-1.5 bg-blue-600 text-white text-xs font-bold uppercase rounded shadow-lg tracking-wider z-10">
                                        {cruise.badge}
                                    </span>
                                )}
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-sm">
                                <div className="flex flex-wrap items-center gap-6 mb-6 pb-6 border-b border-gray-100">
                                    <div className="flex items-center gap-2 text-text-primary font-semibold">
                                        <FiAnchor className="text-accent-teal" /> <span>{cruise.ship}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-text-primary font-semibold">
                                        <FiMapPin className="text-accent-teal" /> <span>{cruise.ports} Ports</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-text-primary font-semibold">
                                        <FiClock className="text-accent-teal" /> <span>{cruise.duration} Nights</span>
                                    </div>
                                </div>

                                <h2 className="text-2xl font-[Poppins] font-bold text-text-primary mb-4">Voyage Overview</h2>
                                <p className="text-text-secondary leading-relaxed mb-8">
                                    {content.description}
                                </p>

                                <h3 className="text-xl font-[Poppins] font-bold text-text-primary mb-4">Ship Highlights</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                    {content.features.map((feature, i) => (
                                        <div key={i} className="bg-bg-primary p-4 rounded-xl border border-gray-100">
                                            <h4 className="font-bold text-text-primary mb-1">{feature.title}</h4>
                                            <p className="text-sm text-text-secondary">{feature.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar (Booking Widget) */}
                        <div className="lg:col-span-1 border-gray-100">
                            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-[100px] border border-gray-100">
                                <div className="text-center pb-6 border-b border-gray-100 mb-6">
                                    <span className="text-sm text-text-muted font-[Poppins] uppercase font-bold tracking-wider">Prices From</span>
                                    <div className="text-4xl font-[Poppins] font-bold text-text-primary mt-2">
                                        <span className="text-xl text-text-muted">AED</span> {cruise.price.toLocaleString()}
                                    </div>
                                    <span className="text-xs text-text-muted block mt-1">per person sharing</span>
                                </div>

                                <h3 className="text-lg font-[Poppins] font-bold text-text-primary mb-4 text-center">Plan Your Voyage</h3>

                                <form className="space-y-4">
                                    <div>
                                        <label className="block text-xs text-text-secondary mb-1">Departure Month</label>
                                        <input type="month" className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm bg-gray-50" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                        <div>
                                            <select className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm bg-gray-50">
                                                <option>Cabin Type</option>
                                                <option>Interior</option>
                                                <option>Ocean View</option>
                                                <option>Balcony</option>
                                                <option>Suite</option>
                                            </select>
                                        </div>
                                        <div>
                                            <select className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm bg-gray-50">
                                                <option>Guests</option>
                                                <option>1</option><option>2</option><option>3</option><option>4+</option>
                                            </select>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/contact?service=cruise&package=${cruise.slug}`}
                                        className="block w-full text-center px-4 py-3 bg-blue-700 text-white font-[Poppins] font-bold rounded-lg hover:bg-blue-800 transition-colors shadow-md mt-6"
                                    >
                                        Request Quote
                                    </Link>
                                    <a
                                        href="https://wa.me/971588759933"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full text-center px-4 py-3 bg-[#25D366] text-white font-[Poppins] font-bold rounded-lg hover:bg-[#128C7E] transition-colors shadow-md"
                                    >
                                        Speak to Cruise Expert
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
