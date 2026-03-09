import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiCheckCircle, FiClock, FiFileText, FiGlobe } from "react-icons/fi";
import { getVisas, getVisaBySlug } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import Breadcrumb from "@/components/ui/Breadcrumb";

const VISA_CONTENT: Record<string, { description: string; processing: string; validity: string; entryType: string; documents: string[] }> = {
    "bahrain-visa": {
        description: "Apply for your Bahrain visa with WB Tourism and enjoy hassle-free entry to the Kingdom of Bahrain. Whether you are traveling for business meetings, leisure, or a quick getaway from the UAE, Bahrain offers a seamless visa process for UAE residents. The Bahrain e-Visa allows you to explore the island nation's rich heritage – from the ancient Bahrain Fort and the UNESCO-listed Qal'at al-Bahrain to the stunning Al Fateh Grand Mosque and the vibrant Manama Souk. With our expert processing, your visa is typically approved within 1-3 working days.",
        processing: "1-3 Working Days", validity: "Up to 30 Days", entryType: "Single / Multiple Entry",
        documents: ["Valid Passport (6 months validity)", "UAE Residence Visa copy", "Passport-size photograph", "Hotel booking confirmation", "Return flight ticket"],
    },
    "oman-e-visa": {
        description: "Oman is one of the Arabian Peninsula's most captivating destinations, offering dramatic mountain landscapes, pristine wadis, ancient forts, and miles of unspoiled coastline. The Oman e-Visa makes it easy for UAE residents to explore this neighbouring gem. Visit the historic Nizwa Fort and its traditional souq, swim in the crystal-clear pools of Wadi Shab, marvel at the Sultan Qaboos Grand Mosque in Muscat, or enjoy a desert safari in the Wahiba Sands. Our team handles the entire e-visa application, ensuring fast approval so you can focus on planning your adventure.",
        processing: "1-2 Working Days", validity: "Up to 30 Days", entryType: "Single Entry",
        documents: ["Valid Passport (6 months validity)", "UAE Residence Visa copy", "Passport-size photograph", "Confirmed hotel reservation", "Return travel tickets"],
    },
    "saudi-arabia-e-visa": {
        description: "Saudi Arabia has opened its doors to tourism like never before, and the Saudi Arabia e-Visa is your gateway to one of the world's most exciting emerging travel destinations. Explore the ancient Nabatean tombs of AlUla – Saudi's first UNESCO World Heritage Site – wander through the historic Diriyah district on the outskirts of Riyadh, marvel at the futuristic NEOM development, or make a pilgrimage to the holy cities of Makkah and Madinah. The tourist e-visa covers leisure, events, and Umrah visits, making Saudi Arabia more accessible than ever before.",
        processing: "Instant – 24 Hours", validity: "Up to 90 Days", entryType: "Multiple Entry (1 Year)",
        documents: ["Valid Passport (6 months validity)", "Digital passport photograph", "Credit/debit card for fee payment", "Health insurance (auto-included with visa)", "Confirmed accommodation details"],
    },
    "india-e-visa": {
        description: "India is a land of extraordinary diversity – from the snow-peaked Himalayas to Kerala's tropical backwaters, from the Taj Mahal's timeless beauty to the vibrant chaos of Mumbai's street markets. The India e-Visa simplifies the once-complex application process, allowing UAE residents to obtain their visa online within 3-5 working days. Whether you are visiting family, exploring the Golden Triangle (Delhi-Agra-Jaipur), or embarking on a spiritual journey through Varanasi and Rishikesh, our team ensures your application is perfectly prepared for smooth approval.",
        processing: "3-5 Working Days", validity: "30/90/180 Days", entryType: "Single / Double / Multiple Entry",
        documents: ["Valid Passport (6 months validity)", "UAE Residence Visa copy", "2 Passport-size photographs (white background)", "Confirmed return flight booking", "Hotel booking or invitation letter", "Last 3 months bank statements"],
    },
    "nigeria-visa": {
        description: "Nigeria, Africa's most populous nation, is a vibrant tapestry of cultures, music, art, and commerce. Whether you are visiting Lagos for business, exploring the ancient Nok terracotta sculptures, or experiencing the bustling markets of Abuja, a Nigeria visa from WB Tourism ensures a smooth entry. Nigeria requires UAE-based travelers to submit their applications through the embassy, and our expert team handles the entire process – from document preparation to appointment scheduling – maximizing your chances of swift approval.",
        processing: "7-10 Working Days", validity: "Up to 90 Days", entryType: "Single / Multiple Entry",
        documents: ["Valid Passport (6 months validity)", "UAE Residence Visa copy", "2 Passport-size photographs", "Invitation letter or hotel booking", "Return flight reservation", "Bank statement (3 months)", "NOC from employer"],
    },
    "turkey-visa": {
        description: "Turkey straddles two continents, offering a mesmerizing blend of European sophistication and Asian mystique. From Istanbul's iconic Hagia Sophia and Blue Mosque to the fairy chimneys of Cappadocia and the turquoise Mediterranean coast, Turkey is one of the world's most diverse travel destinations. The Turkey e-Visa is available online and processed almost instantly for most nationalities, making it one of the easiest visas to obtain. Our team ensures your application is accurate and complete, so you can focus on planning your Turkish adventure.",
        processing: "Instant Online", validity: "Up to 90 Days", entryType: "Multiple Entry",
        documents: ["Valid Passport (6 months validity)", "Valid email address", "Credit/debit card for visa fee payment", "Return flight confirmation (recommended)"],
    },
    "egypt-visa": {
        description: "Egypt is the cradle of civilization, home to the Great Pyramids of Giza, the Sphinx, the Valley of the Kings, and the stunning temples of Luxor and Abu Simbel. A cruise down the Nile River offers one of the world's most iconic travel experiences. The Egypt visa for UAE residents is straightforward, and with WB Tourism's assistance, your application is processed efficiently. Whether you are exploring Cairo's Khan El Khalili bazaar, diving in the Red Sea at Sharm El Sheikh, or tracing the footsteps of pharaohs, Egypt promises an unforgettable journey.",
        processing: "3-5 Working Days", validity: "Up to 30 Days", entryType: "Single Entry",
        documents: ["Valid Passport (6 months validity)", "UAE Residence Visa copy", "2 Passport-size photographs", "Hotel booking confirmation", "Return flight ticket", "Bank statement (last 3 months)"],
    },
    "uk-visa": {
        description: "The United Kingdom offers centuries of history, world-class museums, and some of the most iconic landmarks on Earth – from Big Ben and Buckingham Palace to the Scottish Highlands and the Cotswolds. The UK Standard Visitor Visa allows stays of up to 6 months for tourism, business, or visiting family. As UK visas require a detailed application with extensive supporting documents, WB Tourism's expert consultants guide you through every step – from filling out the online form to preparing your financial documents and booking your biometrics appointment.",
        processing: "15-20 Working Days", validity: "Up to 6 Months", entryType: "Multiple Entry",
        documents: ["Valid Passport (6 months validity)", "UAE Residence Visa copy", "2 Passport-size photographs (white background)", "Bank statement (6 months)", "Salary certificate and employment letter", "NOC from employer/sponsor", "Hotel booking and flight itinerary", "Travel insurance covering the UK"],
    },
    "schengen-visa": {
        description: "The Schengen visa opens the door to 27 European countries with a single visa – from the canals of Amsterdam to the Eiffel Tower in Paris, the Colosseum in Rome, the tapas bars of Barcelona, and the fairy-tale castles of Prague. It is one of the most sought-after visas worldwide, and the application process requires careful preparation. WB Tourism's dedicated Schengen visa team has years of experience handling applications for all 27 member states. We help you prepare an impeccable file that meets the exact requirements of your chosen embassy.",
        processing: "10-15 Working Days", validity: "Up to 90 Days", entryType: "Single / Multiple Entry",
        documents: ["Valid Passport (6 months validity, 2 blank pages)", "UAE Residence Visa copy (valid for 3+ months)", "2 Passport-size photographs (Schengen standard)", "Bank statement (6 months)", "Salary certificate and employment contract", "NOC from employer", "Flight itinerary and hotel reservations", "Travel insurance (minimum €30,000 coverage)", "Cover letter stating purpose of visit"],
    },
    "singapore-visa": {
        description: "Singapore, the Lion City, is a futuristic metropolis blending cutting-edge architecture with lush tropical gardens and a world-renowned food scene. From the iconic Marina Bay Sands and Gardens by the Bay's Supertree Grove to the vibrant hawker centres serving Michelin-starred chicken rice, Singapore packs extraordinary experiences into a compact island. The Singapore visa for UAE residents requires application through an authorized visa agent, and WB Tourism handles the entire process – from form completion to document submission – ensuring a smooth approval.",
        processing: "3-5 Working Days", validity: "Up to 30 Days", entryType: "Single / Multiple Entry",
        documents: ["Valid Passport (6 months validity)", "UAE Residence Visa copy", "2 Passport-size photographs", "Completed Form 14A", "Hotel booking and return flight ticket", "Bank statement (3 months)", "NOC from employer"],
    },
    "philippines-visa": {
        description: "The Philippines is an archipelago of 7,641 islands offering some of the most spectacular beaches, diving spots, and natural wonders in Southeast Asia. From the legendary white sand beaches of Boracay to the Chocolate Hills of Bohol, the underground river of Palawan, and the surfer's paradise of Siargao, the Philippines is a tropical dream. UAE residents need a visa to visit the Philippines, and WB Tourism streamlines the process so you can focus on planning your island-hopping adventure.",
        processing: "5-7 Working Days", validity: "Up to 59 Days", entryType: "Single Entry",
        documents: ["Valid Passport (6 months validity)", "UAE Residence Visa copy", "2 Passport-size photographs", "Confirmed hotel booking", "Return flight ticket", "Bank statement (3 months)", "NOC from employer"],
    },
    "ghana-visa": {
        description: "Ghana, known as the Gateway to West Africa, offers a rich cultural experience with its vibrant markets, historic slave castles, lush national parks, and the warmth of its famously friendly people. Visit Cape Coast Castle, explore the Kakum National Park canopy walkway, witness the colourful Ashanti culture in Kumasi, and experience the buzzing nightlife and art scene of Accra. WB Tourism handles the Ghana visa application process for UAE residents, ensuring all documents are correctly prepared for embassy submission.",
        processing: "7-10 Working Days", validity: "Up to 90 Days", entryType: "Single Entry",
        documents: ["Valid Passport (6 months validity)", "UAE Residence Visa copy", "2 Passport-size photographs", "Yellow fever vaccination certificate", "Hotel booking and flight itinerary", "Bank statement (3 months)", "NOC from employer"],
    },
    "australia-visa": {
        description: "Australia is a continent of extraordinary contrasts – from the Great Barrier Reef and the red sands of Uluru to the cosmopolitan cities of Sydney and Melbourne and the ancient Daintree Rainforest. The Australian visitor visa (subclass 600) requires a thorough online application with detailed supporting documents. WB Tourism's experienced Australia visa team guides you through the process, helping prepare an application that demonstrates genuine tourism intent and strong financial standing. Processing times can vary, so we recommend applying at least 4-6 weeks before your intended travel date.",
        processing: "15-30 Working Days", validity: "Up to 12 Months", entryType: "Multiple Entry",
        documents: ["Valid Passport (6 months validity)", "UAE Residence Visa copy", "Passport-size photographs", "Bank statement (6 months)", "Salary certificate and employment letter", "NOC from employer/sponsor", "Detailed travel itinerary", "Travel insurance", "Purpose of visit letter"],
    },
    "canada-visa": {
        description: "Canada offers vast natural beauty – from the Rocky Mountains and Niagara Falls to the cosmopolitan streets of Toronto and Vancouver. The Canadian visitor visa requires a comprehensive online application through the IRCC portal. WB Tourism's dedicated Canada visa consultants help prepare a compelling application package, including detailed travel plans, financial documents, and cover letters that address common reasons for refusal. With our guidance, your application will showcase your strong ties to the UAE and genuine intent to visit and return.",
        processing: "20-30 Working Days", validity: "Up to 10 Years", entryType: "Multiple Entry",
        documents: ["Valid Passport (6 months validity)", "UAE Residence Visa copy", "Digital photograph (IRCC specifications)", "Bank statements (6 months)", "Employment letter and salary certificate", "NOC from employer", "Travel history evidence", "Purpose of travel letter", "Family information form (IMM 5645)"],
    },
    "usa-visa": {
        description: "The United States visa is one of the most sought-after travel documents in the world. From New York's skyline and the Grand Canyon to the beaches of Miami and theme parks of Orlando, the US offers limitless experiences. The B1/B2 visitor visa requires an in-person interview at the US Consulate, and WB Tourism's expert consultants prepare you with mock interview coaching, document review, and DS-160 form assistance. We have an exceptional track record of helping UAE residents secure their US visas, even for first-time applicants.",
        processing: "Interview wait time varies", validity: "Up to 10 Years", entryType: "Multiple Entry",
        documents: ["Valid Passport (6 months validity)", "DS-160 confirmation page", "Interview appointment letter", "2 Passport-size photographs (US specifications)", "Bank statements (6 months)", "Employment letter and salary certificate", "Tax returns or business documents", "Travel history evidence", "Purpose of visit letter with itinerary"],
    },
    "russia-visa": {
        description: "Russia, the world's largest country, spans 11 time zones and offers experiences from the opulent palaces of St. Petersburg and Moscow's Red Square to the Trans-Siberian Railway and the frozen beauty of Lake Baikal. The Russian visa requires an invitation letter (tourist voucher) and a consular application, which WB Tourism arranges end-to-end. We handle the entire process including obtaining your tourist voucher, filling out the consular application, and scheduling your appointment, ensuring a smooth path to exploring this fascinating country.",
        processing: "7-14 Working Days", validity: "Up to 30 Days", entryType: "Single / Double Entry",
        documents: ["Valid Passport (6 months validity, 2 blank pages)", "UAE Residence Visa copy", "2 Passport-size photographs", "Tourist invitation letter (voucher)", "Bank statement (3 months)", "Return flight ticket", "Hotel booking confirmation", "Travel insurance valid for Russia"],
    },
    "kenya-visa": {
        description: "Kenya is synonymous with world-class safari experiences, from the Great Migration in the Masai Mara to the flamingo-covered shores of Lake Nakuru and the snow-capped peak of Mount Kilimanjaro visible from Amboseli. The Kenya e-Visa has simplified the application process, allowing travelers to apply online and receive approval electronically. WB Tourism handles your Kenya e-Visa application, ensuring all fields are correctly completed and supporting documents are in order for quick processing.",
        processing: "2-3 Working Days", validity: "Up to 90 Days", entryType: "Single Entry",
        documents: ["Valid Passport (6 months validity)", "Passport-size photograph", "Yellow fever vaccination certificate", "Hotel booking confirmation", "Return flight ticket", "Travel itinerary"],
    },
    "south-africa-visa": {
        description: "South Africa, the Rainbow Nation, offers incredible diversity – from Table Mountain and the Cape Winelands to the wildlife-rich Kruger National Park and the vibrant culture of Johannesburg. The South African visa requires an in-person application at the embassy with comprehensive supporting documents. WB Tourism's experts prepare your complete application package and guide you through the process. Whether you are visiting for a Big Five safari, the stunning Garden Route road trip, or a Cape Town culinary experience, we ensure your visa journey is smooth.",
        processing: "10-15 Working Days", validity: "Up to 90 Days", entryType: "Single / Multiple Entry",
        documents: ["Valid Passport (6 months validity, 2 blank pages)", "UAE Residence Visa copy", "2 Passport-size photographs", "Bank statement (3 months)", "Employment letter", "NOC from employer", "Hotel booking and return flight", "Yellow fever certificate (if applicable)", "Travel insurance"],
    },
    "china-visa": {
        description: "China is a land of ancient wonders and ultra-modern marvels – from the Great Wall and the Terracotta Warriors to Shanghai's futuristic skyline and the karst landscapes of Guilin. The Chinese visa application requires submission through the Chinese Visa Application Service Center (CVASC) and involves biometric collection. WB Tourism's experienced China visa team prepares your application meticulously, ensuring all forms, photographs, and supporting documents meet the precise requirements of the CVASC. We also offer expedited processing for urgent travel needs.",
        processing: "5-7 Working Days", validity: "Up to 10 Years", entryType: "Single / Multiple Entry",
        documents: ["Valid Passport (6 months validity, 2 blank pages)", "UAE Residence Visa copy", "Passport-size photograph (Chinese specifications)", "Completed visa application form", "Hotel booking and flight itinerary", "Bank statement (3 months)", "Employment letter", "Invitation letter (for business visa)"],
    },
    "ethiopia-visa": {
        description: "Ethiopia, the land of origins, is one of Africa's most fascinating and historically rich countries. Home to the rock-hewn churches of Lalibela (often called the 'New Jerusalem'), the ancient obelisks of Axum, the Danakil Depression – one of the hottest places on Earth – and the stunning Simien Mountains, Ethiopia offers experiences found nowhere else. The Ethiopia e-Visa is available online and processed quickly. WB Tourism handles your application to ensure everything is in order for a smooth entry into this remarkable country.",
        processing: "1-3 Working Days", validity: "Up to 90 Days", entryType: "Single Entry",
        documents: ["Valid Passport (6 months validity)", "Passport-size photograph", "Hotel booking or invitation letter", "Return flight ticket", "Yellow fever vaccination certificate"],
    },
};

export async function generateStaticParams() {
    const visas = await getVisas();
    return visas.map((visa: any) => ({
        region: visa.region,
        slug: visa.slug,
    }));
}

export default async function VisaDetailsPage({ params }: { params: Promise<{ region: string, slug: string }> }) {
    const resolvedParams = await params;
    const visa = await getVisaBySlug(resolvedParams.slug);

    if (!visa) {
        notFound();
    }

    const content = VISA_CONTENT[visa.slug] || {
        description: `Planning a trip to ${visa.country}? Let our expert visa consultants handle the application process for you. We provide end-to-end assistance for your ${visa.name}.`,
        processing: "5-7 Working Days", validity: "Varies", entryType: "Single / Multiple Entry",
        documents: ["Valid Passport (6 months validity)", "UAE Residence Visa copy", "Passport-size photographs", "Hotel booking", "Return flight ticket"],
    };

    return (
        <>
            {/* Banner */}
            <section className="bg-gradient-to-r from-teal-800 to-emerald-900 py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 right-20 w-80 h-80 rounded-full bg-white blur-3xl" />
                </div>
                <div className="relative z-10">
                    <Breadcrumb
                        items={[
                            { label: "Visa", href: "/visa" },
                            { label: visa.region.replace("-", " "), href: `/visa?region=${visa.region}` },
                            { label: visa.country }
                        ]}
                    />
                    <h1 className="text-4xl md:text-5xl font-[Poppins] font-bold text-white max-w-4xl mx-auto leading-tight">
                        {visa.name}
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
                                    src={(visa.image as any)?.asset ? urlFor(visa.image).url() : visa.image}
                                    alt={visa.name}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 800px"
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-sm">
                                <h2 className="text-2xl font-[Poppins] font-bold text-text-primary mb-6 border-b border-gray-100 pb-4">
                                    {visa.country} Visa Information
                                </h2>

                                <p className="text-text-secondary leading-relaxed mb-8">
                                    {content.description}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                                            <FiClock className="text-teal-600 text-xl" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-text-primary">Processing Time</h4>
                                            <p className="text-sm text-text-secondary">{content.processing}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                                            <FiFileText className="text-teal-600 text-xl" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-text-primary">Visa Validity</h4>
                                            <p className="text-sm text-text-secondary">{content.validity}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                                            <FiGlobe className="text-teal-600 text-xl" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-text-primary">Entry Type</h4>
                                            <p className="text-sm text-text-secondary">{content.entryType}</p>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-xl font-[Poppins] font-bold text-text-primary mt-10 mb-6">Required Documents</h3>
                                <ul className="space-y-3">
                                    {content.documents.map((doc, i) => (
                                        <li key={i} className="flex items-start gap-3 text-text-secondary">
                                            <FiCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                                            <span>{doc}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-xs text-text-muted mt-4 italic">
                                    * Requirements may vary based on nationality and exact visa type. Contact our experts for a personalized checklist.
                                </p>
                            </div>
                        </div>

                        {/* Right Sidebar (Contact Widget) */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-[100px] border border-gray-100">
                                <div className="text-center pb-6 border-b border-gray-100 mb-6">
                                    <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FiGlobe className="text-3xl text-teal-600" />
                                    </div>
                                    <h3 className="text-xl font-[Poppins] font-bold text-text-primary">Apply for {visa.country} Visa</h3>
                                    <p className="text-sm text-text-secondary mt-2">Get fast, reliable visa assistance from our travel experts.</p>
                                </div>

                                <form className="space-y-4">
                                    <div>
                                        <input type="text" placeholder="Full Name" className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 text-sm bg-white" />
                                    </div>
                                    <div>
                                        <input type="email" placeholder="Email Address" className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 text-sm bg-white" />
                                    </div>
                                    <div>
                                        <input type="tel" placeholder="Phone Number" className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 text-sm bg-white" />
                                    </div>
                                    <div>
                                        <select className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 text-sm bg-white text-text-secondary">
                                            <option>Visa Type</option>
                                            <option>Tourist Visa</option>
                                            <option>Business Visa</option>
                                            <option>Transit Visa</option>
                                        </select>
                                    </div>

                                    <Link
                                        href={`/contact?service=visa&country=${visa.slug}`}
                                        className="block w-full text-center px-4 py-3 bg-teal-600 text-white font-[Poppins] font-bold rounded-lg hover:bg-teal-700 transition-colors shadow-md mt-6"
                                    >
                                        Submit Request
                                    </Link>

                                    <a
                                        href="https://wa.me/971588759933"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full text-center px-4 py-3 bg-white border-2 border-teal-600 text-teal-700 font-[Poppins] font-bold rounded-lg hover:bg-teal-50 transition-colors"
                                    >
                                        Chat on WhatsApp
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
