import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiCalendar, FiArrowLeft } from "react-icons/fi";
import { getBlogs, getBlogBySlug } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";

const BLOG_CONTENT: Record<string, { body: string; subheading: string; subBody: string; quote: string; takeaways: string[] }> = {
    "build-strong-travel-history-visa-approvals": {
        body: "In 2026, getting a visa approved is no longer just about having the right documents – it is about demonstrating a strong, consistent travel history that tells immigration officers you are a genuine traveler who respects border laws. A solid travel history shows that you have visited countries before and returned home on time, making you a lower-risk applicant for any future destination.\n\nStart by visiting visa-free or visa-on-arrival countries first. If you hold a UAE residence visa, destinations like Georgia, Armenia, Serbia, and Maldives allow you entry without a traditional visa. Each stamp in your passport builds credibility. Next, apply for e-visas to countries like Turkey, Oman, or Bahrain – these are easy to obtain and add weight to your travel profile.\n\nConsistency matters just as much as quantity. Take at least 2-3 international trips per year, even if they are short weekend getaways. Embassies look favorably upon applicants who show regular travel patterns over years rather than sporadic, last-minute trips. Keep your hotel confirmations, boarding passes, and itineraries organized – these can serve as supporting documents in future applications.",
        subheading: "Financial Documentation is Key",
        subBody: "Beyond stamps, banks statements are the backbone of any visa application. Maintain a minimum balance that is proportional to the country you are applying to. For Schengen visas, a balance of AED 15,000–20,000 is generally recommended. For the US or UK, higher balances and consistent salary credits strengthen your case significantly. Avoid large, unexplained deposits – consulates are trained to spot last-minute balance padding.",
        quote: "A passport full of stamps is worth more than a wallet full of money when it comes to visa approvals. Build your travel history strategically, and the world opens its doors to you.",
        takeaways: ["Start with visa-free and visa-on-arrival destinations to build your passport stamps", "Maintain consistent travel patterns – 2-3 trips per year is ideal", "Keep bank balances healthy and avoid last-minute large deposits", "Organize all previous travel documents as supporting evidence"],
    },
    "top-destinations-caucasus-region": {
        body: "Straddling the historic border between Europe and Asia, the Caucasus Region is one of the world's most fascinating crossroads of culture, cuisine, and breathtaking natural landscapes. The three South Caucasus countries – Georgia, Armenia, and Azerbaijan – offer an incredible diversity of experiences, from ancient monasteries and futuristic architecture to volcanic landscapes and Black Sea beaches.\n\nGeorgia, often called the 'Balcony of Europe,' captivates visitors with its wine culture dating back 8,000 years, the cobblestone charm of Tbilisi's Old Town, and the dramatic Kazbegi mountains where the Gergeti Trinity Church stands sentinel at 2,170 meters above sea level. The country's legendary hospitality, expressed through elaborate supra feasts, makes every visitor feel like family.\n\nArmenia, the world's first Christian nation (301 AD), offers a deeply spiritual journey. The ancient monasteries of Tatev, Noravank, and Geghard are architectural marvels carved into cliff faces and volcanic rock. Lake Sevan, one of the largest freshwater high-altitude lakes in the world, shimmers like a turquoise jewel surrounded by mountains.",
        subheading: "Azerbaijan: The Land of Fire",
        subBody: "Azerbaijan bridges the old and new world like no other country. Baku, its capital, is a city where medieval walls surround a UNESCO-listed Old City (Icherisheher) while the flame-shaped Flame Towers illuminate the modern skyline. Venture beyond Baku to discover the mud volcanoes of Gobustan, the ancient petroglyphs dating back 40,000 years, and the fire temple of Ateshgah where natural gas flames have burned for centuries. The country's Caspian Sea coastline offers resort-quality beaches, and its northern mountain villages serve as gateways to some of the most dramatic hiking in the region.",
        quote: "The Caucasus isn't just a region — it's a revelation. Where else can you taste 8,000-year-old winemaking traditions, explore the world's first Christian churches, and see flames that have burned since ancient times, all in a single week's journey?",
        takeaways: ["Georgia, Armenia, and Azerbaijan offer incredibly diverse experiences within a compact region", "Best visited in spring (April-June) or autumn (September-November) for ideal weather", "All three countries are accessible from Dubai with direct flights under 3.5 hours", "The Caucasus offers exceptional value, with daily budgets 60-70% lower than European destinations"],
    },
    "bali-travel-guide-2026": {
        body: "Bali continues to reign as one of the world's most captivating island destinations, and 2026 is shaping up to be an extraordinary year to visit. With new sustainable tourism initiatives, expanded international flight routes, and a growing wellness ecosystem, the Island of the Gods is evolving while maintaining the spiritual authenticity that makes it magical.\n\nThe best time to visit Bali is during the dry season from April to October, when sunny skies and low humidity create perfect conditions for beach days, temple visits, and outdoor adventures. However, even the wet season (November-March) has its charm — lush green landscapes, fewer crowds, and dramatic afternoon thunderstorms that clear quickly.\n\nUbud remains the cultural heartbeat of Bali. In 2026, the village has expanded its art scene with new galleries showcasing contemporary Balinese and Southeast Asian artists. The Sacred Monkey Forest, Tegalalang Rice Terraces, and the Campuhan Ridge Walk remain must-visits. For food lovers, Ubud's evolving culinary scene now includes Michelin-recognized restaurants alongside traditional warungs serving legendary nasi goreng and babi guling.",
        subheading: "Beyond the Beach: Bali's Hidden Gems in 2026",
        subBody: "While Seminyak, Canggu, and Kuta attract the sun-seeking crowd, Bali's hidden gems reward the curious traveler. The villages of Sidemen and Munduk in East and North Bali offer quieter rice terrace views and waterfall treks without the Instagram crowds. Nusa Penida, accessible by a 30-minute fast boat, has become a world-class snorkelling destination where manta rays glide through crystal-clear waters and the dramatic Kelingking Beach cliff looks like a T-Rex reaching into the ocean. For the spiritually inclined, Tirta Empul's purification rituals and Besakih – Bali's Mother Temple on Mount Agung's slopes – offer profoundly moving experiences.",
        quote: "Bali is not a destination, it's a feeling. It's the scent of frangipani in the morning air, the sound of gamelan echoing through rice paddies, and the warmth of a Balinese smile that makes you feel you've found a second home.",
        takeaways: ["Visit during April-October for the best weather, or November-March for fewer crowds", "Explore beyond the popular south — Sidemen, Munduk, and Amed offer authentic experiences", "Budget AED 300-500 per day for mid-range travel including accommodation and activities", "Rent a scooter for maximum flexibility, but hire a driver for day trips to distant temples"],
    },
};

export async function generateStaticParams() {
    const blogs = await getBlogs();
    return blogs.map((post: any) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const post = await getBlogBySlug(resolvedParams.slug);

    if (!post) {
        notFound();
    }

    const content = BLOG_CONTENT[post.slug] || {
        body: post.excerpt + " This article explores the topic in depth, offering practical insights and tips for modern travelers. Whether you are planning your first international trip or your fiftieth, understanding the nuances of travel preparation can make the difference between a good trip and an exceptional one.",
        subheading: "Planning Makes Perfect",
        subBody: "The most successful trips are those planned with care and attention to detail. Research your destination thoroughly, understand local customs, and prepare your documents well in advance. Travel insurance is not optional — it is essential. And always have a backup plan for flights, accommodation, and activities.",
        quote: "Travel is the only thing you buy that makes you richer. Invest in experiences, not things.",
        takeaways: ["Research and plan ahead for the best experience", "Keep all travel documents organized and accessible", "Invest in comprehensive travel insurance", "Stay flexible and open to unexpected adventures"],
    };

    return (
        <>
            {/* Banner */}
            <section className="bg-gradient-to-r from-slate-800 to-gray-900 py-24 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-white blur-3xl" />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <div className="flex justify-center gap-4 text-white/80 text-sm font-[Poppins] mb-4">
                        <span className="flex items-center gap-1"><FiCalendar /> {post.date}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-[Poppins] font-bold text-white leading-tight">
                        {post.title}
                    </h1>
                </div>
            </section>

            {/* Content */}
            <section className="py-14 bg-white">
                <div className="max-w-[800px] mx-auto px-4">
                    <Link href="/blogs" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-hover mb-8 transition-colors">
                        <FiArrowLeft /> Back to Blogs
                    </Link>

                    <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg mb-10 bg-gray-100">
                        <Image
                            src={(post.image as any)?.asset ? urlFor(post.image).url() : post.image}
                            alt={post.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 800px"
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="prose prose-lg max-w-none text-text-secondary leading-loose">
                        <p className="text-xl leading-relaxed text-text-primary mb-8 font-medium">
                            {post.excerpt}
                        </p>

                        {content.body.split("\n\n").map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))}

                        <h3 className="text-2xl font-[Poppins] font-bold text-text-primary mt-10 mb-4">{content.subheading}</h3>
                        <p>{content.subBody}</p>

                        <div className="my-10 p-8 bg-bg-primary rounded-xl border-l-4 border-primary italic text-lg shadow-sm text-text-primary flex">
                            <span className="text-6xl text-primary/20 leading-none mr-4 font-serif">&ldquo;</span>
                            <div>{content.quote}</div>
                        </div>

                        <h3 className="text-2xl font-[Poppins] font-bold text-text-primary mt-10 mb-4">Key Takeaways</h3>
                        <ul className="list-disc pl-5 space-y-2 marker:text-primary">
                            {content.takeaways.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}
