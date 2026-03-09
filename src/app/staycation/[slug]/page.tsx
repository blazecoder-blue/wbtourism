import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiClock, FiMapPin, FiStar } from "react-icons/fi";
import { getStaycations, getStaycationBySlug } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import Breadcrumb from "@/components/ui/Breadcrumb";

const STAYCATION_CONTENT: Record<string, { description: string; amenities: string[] }> = {
    "atlantis-palm-weekend": {
        description: "Escape to the iconic Atlantis, The Palm for a weekend of unparalleled luxury on Dubai's most famous man-made island. Wake up to sweeping views of the Arabian Gulf and the Dubai skyline from your elegantly appointed ocean-view room. Spend your days lounging at the private beach, exploring the Aquaventure Waterpark – the Middle East's largest waterpark featuring over 105 slides and attractions – or diving with 65,000 marine creatures at The Lost Chambers Aquarium. In the evening, dine at celebrity chef restaurants including Nobu and Gordon Ramsay's Bread Street Kitchen. This is pure five-star indulgence at its finest.",
        amenities: ["Complimentary access to Aquaventure Waterpark", "Entry to The Lost Chambers Aquarium", "Private beach access with sun loungers", "World-class spa and wellness centre", "Kids' club and family entertainment", "Over 30 restaurants and bars to choose from"],
    },
    "rixos-premium-beach": {
        description: "Discover the award-winning Rixos Premium Dubai at Jumeirah Beach Residence, where ultra-all-inclusive luxury meets the golden sands of JBR. Located directly on the beachfront with panoramic views of the Arabian Gulf and Dubai Marina skyline, this resort redefines the staycation experience. Enjoy unlimited access to the private beach, a temperature-controlled infinity pool, and Rixos' signature all-inclusive dining featuring Turkish, Asian, and international cuisines across multiple restaurants. The Anjana Spa offers traditional Turkish hammam experiences, and the resort's prime location puts you steps from The Walk at JBR's shops and cafés.",
        amenities: ["Ultra All-Inclusive dining at 5 restaurants", "Private beach with complimentary water sports", "Temperature-controlled infinity pool", "Anjana Spa with Turkish hammam", "Fully equipped fitness centre and yoga classes", "Steps from The Walk at JBR shopping promenade"],
    },
    "hilton-rak-family": {
        description: "Escape the city buzz and head to the shores of Ras Al Khaimah at the Hilton Resort & Spa, perfectly positioned on a pristine stretch of white sand beach with the dramatic Hajar Mountains as a backdrop. This family-friendly resort offers a fantastic blend of beach relaxation and mountain adventure. Kids will love the dedicated children's pool and activity club, while parents unwind at the eforea Spa or lounge by the adults-only pool. The resort also serves as an ideal base for exploring Ras Al Khaimah's natural attractions including Jebel Jais – the UAE's highest peak – and the thrilling Jais Adventure Park zipline experience.",
        amenities: ["1.5 km private white sandy beach", "Multiple swimming pools including kids' pool", "WAM water and adventure sports centre", "eforea Spa by Hilton", "Kids club with supervised activities", "Close to Jebel Jais – UAE's highest mountain"],
    },
    "jumeirah-beach-leisure": {
        description: "Immerse yourself in the legendary hospitality of Jumeirah Beach Hotel, one of Dubai's most iconic properties, shaped like a breaking wave beside the world-famous Burj Al Arab. With direct beachfront access on Jumeirah Beach, indoor and outdoor pools, a private marina, and complimentary unlimited access to Wild Wadi Waterpark, this 5-star resort is a destination in itself. Choose from 19 restaurants and bars offering everything from fine-dining Japanese at Zheng He's to casual beach bites at Beachcombers. The award-winning Talise Spa features 26 treatment rooms with Arabian Gulf views, making it the perfect place to decompress.",
        amenities: ["Complimentary unlimited Wild Wadi Waterpark access", "Private beach alongside the Burj Al Arab", "19 world-class restaurants and bars", "Talise Spa with 26 treatment rooms", "Indoor and outdoor swimming pools", "Private marina and water sports centre"],
    },
    "st-regis-abudhabi": {
        description: "Discover refined luxury at The St. Regis Abu Dhabi, a stunning beachfront resort on the pristine Saadiyat Island – Abu Dhabi's cultural district home to the Louvre Abu Dhabi. With its blend of elegant Arabian-inspired architecture and world-class St. Regis Butler Service, every moment of your stay feels tailored to perfection. The resort features a 200-meter private beach, an opulent Iridium Spa, and multiple temperature-controlled pools including a family pool and an adults-only infinity pool overlooking the turquoise Gulf waters. Dining highlights include The Terrace on the Corniche for Mediterranean cuisine and the sophisticated 55&5th – The Grill for premium steaks.",
        amenities: ["Signature St. Regis Butler Service", "200-meter private beach on Saadiyat Island", "Iridium Spa with 10 treatment suites", "Multiple pools including adults-only infinity pool", "Near Louvre Abu Dhabi and cultural attractions", "Complimentary shuttle to Saadiyat Beach Club"],
    },
    "anantara-mountain-escape": {
        description: "Trade the desert heat for a mountain retreat at Anantara Al Jabal Al Akhdar Resort, dramatically perched on the edge of a canyon at 2,000 meters above sea level in Oman's Green Mountain range (accessible from Al Ain). This remote clifftop resort offers an experience unlike anything in the UAE – cool mountain air, star-filled skies, and breathtaking gorge views that stretch for miles. Explore ancient terraced rose gardens, take guided canyon walks, or simply relax in the stunning infinity pool that appears to float over the abyss below. Diana's Point – named after Princess Diana who visited in 1986 – offers one of the most spectacular viewpoints in the entire Arabian Peninsula.",
        amenities: ["Infinity pool with dramatic canyon views", "Diana's Point viewpoint excursion", "Guided canyon and mountain walks", "Al Maisan restaurant with panoramic dining", "Anantara Spa with hammam treatments", "Stargazing experiences in clear mountain skies"],
    },
};

export async function generateStaticParams() {
    const staycations = await getStaycations();
    return staycations.map((pkg: any) => ({
        slug: pkg.slug,
    }));
}

export default async function StaycationDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const pkg = await getStaycationBySlug(resolvedParams.slug);

    if (!pkg) {
        notFound();
    }

    const content = STAYCATION_CONTENT[pkg.slug] || {
        description: `Enjoy a luxurious escape at ${pkg.name} located in ${pkg.location}. This staycation package guarantees premium hospitality and exclusive access to top-tier amenities.`,
        amenities: ["Luxury Room Accommodation", "Complimentary Breakfast", "Pool & Spa Access", "Late Check-out", "Dining Discounts"],
    };

    return (
        <>
            {/* Banner */}
            <section className="bg-gradient-to-r from-sky-800 to-indigo-900 py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-white blur-3xl" />
                </div>
                <div className="relative z-10">
                    <Breadcrumb items={[{ label: "Staycation", href: "/staycation" }, { label: pkg.name }]} />
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
                                    <span className="absolute top-4 left-4 px-4 py-1.5 bg-secondary text-white text-xs font-bold uppercase rounded shadow-lg tracking-wider z-10">
                                        {pkg.badge}
                                    </span>
                                )}
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-sm">
                                <div className="flex flex-wrap items-center gap-6 mb-6 pb-6 border-b border-gray-100">
                                    <div className="flex items-center gap-2 text-text-primary font-semibold">
                                        <FiMapPin className="text-accent-teal" /> <span>{pkg.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-text-primary font-semibold">
                                        <FiClock className="text-accent-teal" /> <span>{pkg.duration}</span>
                                    </div>
                                </div>

                                <h2 className="text-2xl font-[Poppins] font-bold text-text-primary mb-4">About This Staycation</h2>
                                <p className="text-text-secondary leading-relaxed mb-8">
                                    {content.description}
                                </p>

                                <h3 className="text-xl font-[Poppins] font-bold text-text-primary mb-4">Amenities & Highlights</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                    {content.amenities.map((amenity, i) => (
                                        <div key={i} className="flex gap-3 text-text-secondary">
                                            <FiStar className="text-yellow-500 mt-1 flex-shrink-0" fill="currentColor" />
                                            <span>{amenity}</span>
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
                                        <span className="text-xl text-text-muted">AED</span> {pkg.price.toLocaleString()}
                                    </div>
                                    <span className="text-xs text-text-muted block mt-1">per night</span>
                                </div>

                                <h3 className="text-lg font-[Poppins] font-bold text-text-primary mb-4 text-center">Reserve Your Stay</h3>

                                <form className="space-y-4">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="block text-xs text-text-secondary mb-1">Check-in</label>
                                            <input type="date" className="w-full h-12 px-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm bg-gray-50" />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-text-secondary mb-1">Check-out</label>
                                            <input type="date" className="w-full h-12 px-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm bg-gray-50" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                        <div>
                                            <select className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm bg-gray-50">
                                                <option>Rooms</option>
                                                <option>1</option><option>2</option><option>3</option>
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
                                        href={`/contact?service=staycation&package=${pkg.slug}`}
                                        className="block w-full text-center px-4 py-3 bg-primary text-white font-[Poppins] font-bold rounded-lg hover:bg-primary-hover transition-colors shadow-md mt-6"
                                    >
                                        Request Availability
                                    </Link>
                                    <a
                                        href="https://wa.me/971588759933"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full text-center px-4 py-3 bg-[#25D366] text-white font-[Poppins] font-bold rounded-lg hover:bg-[#128C7E] transition-colors shadow-md"
                                    >
                                        WhatsApp Concierge
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
