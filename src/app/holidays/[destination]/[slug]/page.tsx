import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiClock, FiMapPin, FiCheckCircle } from "react-icons/fi";
import { getHolidays, getHolidayBySlug } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import Breadcrumb from "@/components/ui/Breadcrumb";

const HOLIDAY_CONTENT: Record<string, { description: string; itinerary: string[]; includes: string[] }> = {
    "turkey-travel-package": {
        description: "Discover the magic where East meets West on this incredible 8-day Turkey exploration. From the bustling Grand Bazaar and the Blue Mosque of Istanbul to the surreal fairy chimneys of Cappadocia and the white travertine terraces of Pamukkale, this package covers Turkey's greatest treasures. Enjoy hot air balloon rides over Cappadocia's lunar landscapes, cruise along the Bosphorus strait, and taste authentic Turkish cuisine from street-side kebab stalls to rooftop restaurants overlooking the Golden Horn.",
        itinerary: ["Day 1-3: Istanbul – Hagia Sophia, Blue Mosque, Topkapi Palace, Grand Bazaar, Bosphorus Cruise", "Day 4-5: Cappadocia – Hot air balloon ride, Göreme Open Air Museum, underground cities", "Day 6: Pamukkale – Cotton Castle travertine terraces and ancient Hierapolis ruins", "Day 7: Antalya – Old Town exploration, Düden Waterfalls, Mediterranean coast", "Day 8: Departure – Transfer to airport and farewell"],
        includes: ["Return flights (Economy Class)", "4-Star hotel accommodation with breakfast", "All inter-city transfers and domestic flights", "English-speaking licensed guides", "Hot air balloon ride in Cappadocia", "Bosphorus dinner cruise in Istanbul"],
    },
    "georgia-travel-package": {
        description: "Experience the untouched beauty of Georgia, a Caucasus gem where ancient monasteries cling to clifftops, snow-capped mountains frame lush green valleys, and Tbilisi's cobblestone streets buzz with wine bars and bohemian energy. This 5-day package takes you through Tbilisi's charming Old Town, the holy city of Mtskheta, the dramatic Kazbegi mountain region, and the wine country of Kakheti where wine has been made in clay qvevri pots for 8,000 years. Georgia offers incredible value, stunning landscapes, and some of the warmest hospitality in the world.",
        itinerary: ["Day 1: Arrive in Tbilisi – Old Town walking tour, sulfur baths, Bridge of Peace", "Day 2: Mtskheta & Jvari Monastery – UNESCO World Heritage sites and Svetitskhoveli Cathedral", "Day 3: Kazbegi – Drive the Georgian Military Highway, Ananuri Fortress, Gergeti Trinity Church", "Day 4: Kakheti wine region – Vineyard tours, traditional Supra feast, qvevri winemaking", "Day 5: Departure – Last-minute shopping at Dry Bridge Market and airport transfer"],
        includes: ["Return flights (Economy Class)", "4-Star hotel accommodation with breakfast", "All ground transportation and transfers", "English-speaking local guide", "Wine tasting tours in Kakheti", "Entrance fees to all monuments and museums"],
    },
    "armenia-holiday-package": {
        description: "Step into one of the world's oldest civilizations on this 4-day Armenian adventure. From the pink-hued streets of Yerevan to the shores of the stunning Lake Sevan, and from the ancient Garni pagan temple to the rock-hewn monastery of Geghard, Armenia offers a deeply moving travel experience. Witness Mount Ararat's twin peaks from the Khor Virap monastery, taste Armenian brandy at the Ararat Factory, and dine on lavash bread baked in traditional tonir ovens. Compact, affordable, and brimming with history — Armenia is the Caucasus's best-kept secret.",
        itinerary: ["Day 1: Yerevan – Cascade Complex, Republic Square, History Museum, Vernissage Market", "Day 2: Garni & Geghard – Pagan temple ruins, UNESCO-listed rock monastery, lavash baking", "Day 3: Khor Virap & Lake Sevan – Mount Ararat views, Sevanavank monastery, lakeside lunch", "Day 4: Departure – Ararat Brandy Factory tour and airport transfer"],
        includes: ["Return flights (Economy Class)", "3-Star+ hotel accommodation with breakfast", "All ground transportation with private vehicle", "Professional English-speaking guide", "Brandy tasting at Ararat Factory", "Entrance fees to all listed sites"],
    },
    "kenya-holiday-package": {
        description: "Embark on the African adventure of a lifetime with this 5-day Kenya safari package. Witness the raw beauty of the Masai Mara, one of the most famous wildlife reserves on Earth, home to the Big Five – lions, elephants, buffalo, leopards, and rhinoceros. Experience sunrise game drives across the golden savannah, visit a traditional Maasai village, and watch millions of wildebeest during the Great Migration. Extend your trip to Lake Nakuru to see thousands of flamingos painting the shoreline pink, or relax on the white-sand beaches of Diani along the Indian Ocean coast.",
        itinerary: ["Day 1: Arrive Nairobi – City tour, Giraffe Centre, Karen Blixen Museum", "Day 2: Masai Mara – Fly-in safari, afternoon game drive, Big Five spotting", "Day 3: Masai Mara – Full-day game drive, Maasai village visit, balloon safari (optional)", "Day 4: Lake Nakuru – Flamingo viewing, Rothschild giraffes, rhino sanctuary", "Day 5: Departure – Morning game drive, fly to Nairobi, departure transfer"],
        includes: ["Return flights (Economy Class)", "Safari lodge/tented camp with full board", "All game drives in 4x4 safari vehicles", "Domestic flights (Nairobi-Mara-Nakuru)", "Park entrance and conservation fees", "English-speaking safari guide"],
    },
    "kazakhstan-holiday-package": {
        description: "Explore the vast and mesmerizing landscapes of Kazakhstan, Central Asia's largest country, where futuristic cities rise from the endless steppe and ancient Silk Road history whispers through canyon walls. This 5-day package showcases the gleaming modern capital Astana (Nur-Sultan), the vibrant former capital Almaty nestled at the foot of the snow-capped Tien Shan mountains, and the breathtaking Charyn Canyon – Central Asia's answer to the Grand Canyon. Experience the warmth of Kazakh hospitality, taste beshbarmak and kumis, and ride horses across the legendary steppe.",
        itinerary: ["Day 1: Almaty – Green Bazaar, Panfilov Park, Zenkov Cathedral, Kok-Tobe cable car", "Day 2: Big Almaty Lake & Charyn Canyon – Turquoise alpine lake, dramatic canyon trek", "Day 3: Fly to Astana – Bayterek Tower, Khan Shatyr mall, Nur-Astana Mosque", "Day 4: Astana continued – National Museum, EXPO site, Palace of Peace and Reconciliation", "Day 5: Departure – Morning at leisure and airport transfer"],
        includes: ["Return flights (Economy Class)", "4-Star hotel accommodation with breakfast", "Domestic flight Almaty-Astana", "All sightseeing transfers", "English-speaking local guide", "Entrance fees to all listed attractions"],
    },
    "bali-holiday-package": {
        description: "Escape to the Island of the Gods on this enchanting 6-day Bali holiday package. From the lush emerald rice terraces of Tegalalang to the ancient sea temple of Tanah Lot perched on a rocky outcrop, Bali is a tropical paradise that blends spiritual tranquility with heart-pumping adventure. Explore Ubud's vibrant art galleries and the Sacred Monkey Forest, witness the dramatic Kecak fire dance at Uluwatu Temple, snorkel crystal-clear waters around Nusa Penida, and rejuvenate with world-class Balinese spa treatments. Whether it is a honeymoon, family vacation, or solo soul-searching trip, Bali delivers pure magic.",
        itinerary: ["Day 1: Arrive Bali – Airport transfer, welcome drink, beach sunset at Seminyak", "Day 2: Ubud – Tegalalang Rice Terraces, Sacred Monkey Forest, Tirta Empul water temple", "Day 3: Nusa Penida day trip – Kelingking Beach, Angel's Billabong, Crystal Bay snorkelling", "Day 4: Uluwatu & South Bali – Uluwatu Temple, Kecak fire dance, seafood dinner at Jimbaran Bay", "Day 5: Adventure day – White water rafting on Ayung River or Mount Batur sunrise trek", "Day 6: Departure – Balinese spa treatment and airport transfer"],
        includes: ["Return flights (Economy Class)", "5-Star resort or villa with breakfast", "All ground transportation with private driver", "Nusa Penida speedboat and snorkelling gear", "Kecak dance show tickets", "Balinese spa session"],
    },
    "mauritius-travel-package": {
        description: "Discover the pearl of the Indian Ocean on this luxurious 5-day Mauritius escape. Surrounded by coral reefs and turquoise lagoons, Mauritius is a tropical paradise where pristine beaches meet volcanic mountains, colonial plantations border lush botanical gardens, and the underwater waterfall illusion defies belief from above. Swim with dolphins in Tamarin Bay, explore the seven-colored earth of Chamarel, hike through the Black River Gorges, and savour the island's extraordinary Creole, French, and Indian fusion cuisine. Whether you seek romance, relaxation, or island adventure, Mauritius has it all.",
        itinerary: ["Day 1: Arrive Mauritius – Airport transfer, resort check-in, sunset at Flic en Flac", "Day 2: North Island tour – Port Louis, Pamplemousses Botanical Garden, Cap Malheureux", "Day 3: South-West tour – Chamarel 7-colored earth, Black River Gorges, underwater waterfall viewpoint", "Day 4: Marine adventure – Dolphin swimming in Tamarin Bay, Île aux Cerfs catamaran cruise", "Day 5: Departure – Morning at leisure, last-minute shopping, airport transfer"],
        includes: ["Return flights (Economy Class)", "5-Star beachfront resort, half-board", "All island tours with AC vehicle", "Catamaran cruise to Île aux Cerfs", "Dolphin swimming experience", "Airport transfers"],
    },
    "lombok-tour-package": {
        description: "Discover Lombok, Bali's quieter, equally stunning sister island, on this immersive 5-day adventure. With its towering Mount Rinjani volcano, pink sand beaches, world-class surf breaks, and the postcard-perfect Gili Islands, Lombok offers raw natural beauty without the crowds. Trek through traditional Sasak villages, snorkel alongside sea turtles in the crystalline waters of Gili Trawangan, explore the cascading Sendang Gile waterfalls, and witness some of the most spectacular sunsets in Southeast Asia. This package is ideal for nature lovers, honeymooners, and adventurers seeking an off-the-beaten-path island experience.",
        itinerary: ["Day 1: Arrive Lombok – Airport transfer, Kuta Mandalika beach sunset, Sasak village visit", "Day 2: Gili Islands – Fast boat to Gili Trawangan, snorkelling with turtles, underwater statues", "Day 3: Gili continued – Gili Air cycling tour, paddleboarding, beachfront dining", "Day 4: North Lombok – Sendang Gile Waterfall, Sembalun village, Rinjani viewpoint trek", "Day 5: Departure – Morning at Selong Belanak Beach, craftsmen village, airport transfer"],
        includes: ["Return flights (Economy Class)", "4-Star hotel/villa with breakfast", "Fast boat Gili Islands transfer", "All sightseeing tours with private guide", "Snorkelling equipment rental", "Airport transfers"],
    },
};

export async function generateStaticParams() {
    const holidays = await getHolidays();
    return holidays.map((pkg: any) => ({
        destination: pkg.destination.toLowerCase(),
        slug: pkg.slug,
    }));
}

export default async function HolidayDetailsPage({ params }: { params: Promise<{ destination: string, slug: string }> }) {
    const resolvedParams = await params;
    const pkg = await getHolidayBySlug(resolvedParams.slug);

    if (!pkg) {
        notFound();
    }

    const content = HOLIDAY_CONTENT[pkg.slug] || {
        description: `Immerse yourself in the incredible sights and sounds of ${pkg.destination} with our meticulously planned ${pkg.duration} holiday package.`,
        itinerary: ["Detailed daily itinerary available upon request"],
        includes: ["Return flights", "Hotel accommodation with breakfast", "Airport transfers", "Guided city tours"],
    };

    return (
        <>
            {/* Banner */}
            <section className="bg-gradient-to-r from-emerald-700 to-teal-900 py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-white blur-3xl" />
                </div>
                <div className="relative z-10">
                    <Breadcrumb
                        items={[
                            { label: "Holidays", href: "/holidays" },
                            { label: pkg.destination, href: `/holidays?destination=${pkg.destination.toLowerCase()}` },
                            { label: pkg.name }
                        ]}
                    />
                    <h1 className="text-4xl md:text-5xl font-[Poppins] font-bold text-white max-w-4xl mx-auto leading-tight">
                        {pkg.name}
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
                                    src={(pkg.image as any)?.asset ? urlFor(pkg.image).url() : pkg.image}
                                    alt={pkg.name}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 800px"
                                    className="object-cover"
                                    priority
                                />
                                {pkg.badge && (
                                    <span className="absolute top-4 left-4 px-4 py-1.5 bg-accent-red text-white text-xs font-bold uppercase rounded shadow-lg tracking-wider z-10">
                                        {pkg.badge}
                                    </span>
                                )}
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-sm">
                                <div className="flex flex-wrap items-center gap-6 mb-6 pb-6 border-b border-gray-100">
                                    <div className="flex items-center gap-2 text-text-primary font-semibold">
                                        <FiMapPin className="text-accent-teal" /> <span>{pkg.destination}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-text-primary font-semibold">
                                        <FiClock className="text-accent-teal" /> <span>{pkg.duration}</span>
                                    </div>
                                </div>

                                <h2 className="text-2xl font-[Poppins] font-bold text-text-primary mb-4">Trip Overview</h2>
                                <p className="text-text-secondary leading-relaxed mb-8">
                                    {content.description}
                                </p>

                                <h3 className="text-xl font-[Poppins] font-bold text-text-primary mb-4">Day-by-Day Itinerary</h3>
                                <div className="space-y-4 mb-8">
                                    {content.itinerary.map((day, index) => (
                                        <div key={index} className="flex gap-4 items-start">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-primary text-xs font-bold">{index + 1}</span>
                                            </div>
                                            <p className="text-text-secondary text-sm leading-relaxed">{day}</p>
                                        </div>
                                    ))}
                                </div>

                                <h3 className="text-xl font-[Poppins] font-bold text-text-primary mb-4">Package Includes</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                    {content.includes.map((item, i) => (
                                        <div key={i} className="flex gap-3 text-text-secondary">
                                            <FiCheckCircle className="text-primary mt-1 flex-shrink-0" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar (Booking Widget) */}
                        <div className="lg:col-span-1 border-gray-100">
                            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-[100px] border border-gray-100">
                                <div className="text-center pb-6 border-b border-gray-100 mb-6">
                                    <span className="text-sm text-text-muted font-[Poppins] uppercase font-bold tracking-wider">Package Price</span>
                                    <div className="text-4xl font-[Poppins] font-bold text-text-primary mt-2">
                                        <span className="text-xl text-text-muted">AED</span> {pkg.price.toLocaleString()}
                                    </div>
                                    <span className="text-xs text-text-muted block mt-1">per person sharing</span>
                                </div>

                                <h3 className="text-lg font-[Poppins] font-bold text-text-primary mb-4 text-center">Request a Quote</h3>

                                <form className="space-y-4">
                                    <input type="text" placeholder="Full Name" className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm bg-gray-50" />
                                    <input type="email" placeholder="Email Address" className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm bg-gray-50" />
                                    <input type="tel" placeholder="Phone Number" className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm bg-gray-50" />

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <select className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm bg-gray-50">
                                                <option>Adults</option>
                                                <option>1</option><option>2</option><option>3</option><option>4+</option>
                                            </select>
                                        </div>
                                        <div>
                                            <select className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm bg-gray-50">
                                                <option>Children</option>
                                                <option>0</option><option>1</option><option>2</option><option>3+</option>
                                            </select>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/contact?service=holiday&package=${pkg.slug}`}
                                        className="block w-full text-center px-4 py-3 bg-primary text-white font-[Poppins] font-bold rounded-lg hover:bg-primary-hover transition-colors shadow-md mt-6"
                                    >
                                        Send Enquiry
                                    </Link>
                                    <a
                                        href="https://wa.me/971588759933"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full text-center px-4 py-3 bg-[#25D366] text-white font-[Poppins] font-bold rounded-lg hover:bg-[#128C7E] transition-colors shadow-md"
                                    >
                                        WhatsApp Chat
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
