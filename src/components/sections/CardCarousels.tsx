"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiClock } from "react-icons/fi";
import { urlFor } from "@/sanity/image";

/* ──── VISA CAROUSEL ──── */
export function VisaCarousel({ visas = [] }: { visas: any[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const scroll = (dir: "left" | "right") => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
        }
    };

    if (!visas || visas.length === 0) return null;

    return (
        <section className="py-14 bg-white">
            <div className="max-w-[1400px] mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-[Poppins] font-bold text-text-primary">
                        Global Visa Assistance
                    </h2>
                    <div className="flex gap-2">
                        <button onClick={() => scroll("left")} className="w-10 h-10 border-2 border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors" aria-label="Previous">
                            <FiChevronLeft size={18} />
                        </button>
                        <button onClick={() => scroll("right")} className="w-10 h-10 border-2 border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors" aria-label="Next">
                            <FiChevronRight size={18} />
                        </button>
                    </div>
                </div>
                <div ref={scrollRef} className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 snap-x" style={{ scrollbarWidth: "none" }}>
                    {visas.map((visa) => (
                        <div key={visa.slug} className="flex-shrink-0 w-[280px] bg-white rounded-xl shadow-md card-hover overflow-hidden snap-start flex flex-col">
                            <div className="relative h-48 w-full bg-gray-100">
                                <Image
                                    src={visa.image?.asset ? urlFor(visa.image).width(600).url() : visa.image}
                                    alt={visa.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <h3 className="font-[Poppins] font-semibold text-text-primary mb-3 text-base">
                                    {visa.name}
                                </h3>
                                <div className="flex gap-2">
                                    <Link href={`/contact?service=visa&country=${visa.slug}`} className="px-4 py-2 bg-secondary text-white text-sm font-semibold rounded-lg hover:bg-secondary-hover transition-colors">
                                        Get Quote
                                    </Link>
                                    <Link href={`/visa/${visa.region}/${visa.slug}`} className="px-4 py-2 bg-accent-red text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-colors">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ──── HOLIDAY CAROUSEL ──── */
export function HolidayCarousel({ holidays = [] }: { holidays: any[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const scroll = (dir: "left" | "right") => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
        }
    };

    if (!holidays || holidays.length === 0) return null;

    return (
        <section className="py-14 bg-bg-primary">
            <div className="max-w-[1400px] mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-[Poppins] font-bold text-text-primary">
                        Exclusive Holiday Deals
                    </h2>
                    <div className="flex gap-2">
                        <button onClick={() => scroll("left")} className="w-10 h-10 border-2 border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors bg-white" aria-label="Previous">
                            <FiChevronLeft size={18} />
                        </button>
                        <button onClick={() => scroll("right")} className="w-10 h-10 border-2 border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors bg-white" aria-label="Next">
                            <FiChevronRight size={18} />
                        </button>
                    </div>
                </div>
                <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 snap-x" style={{ scrollbarWidth: "none" }}>
                    {holidays.map((pkg) => (
                        <div key={pkg.slug} className="flex-shrink-0 w-[280px] bg-white rounded-xl shadow-md card-hover overflow-hidden snap-start flex flex-col">
                            <div className="relative h-52 w-full bg-gray-100">
                                <Image
                                    src={pkg.image?.asset ? urlFor(pkg.image).width(600).url() : pkg.image}
                                    alt={pkg.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover"
                                />
                                {pkg.badge && (
                                    <span className="absolute top-3 left-3 px-3 py-1 bg-accent-red text-white text-[10px] font-bold uppercase rounded tracking-wider z-10 shadow-sm">
                                        {pkg.badge}
                                    </span>
                                )}
                            </div>
                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <div>
                                        <div className="flex items-center gap-1 text-secondary text-sm mb-1">
                                            <FiClock size={13} />
                                            <span>{pkg.duration}</span>
                                        </div>
                                        <h3 className="font-[Poppins] font-semibold text-text-primary mb-2 text-base">
                                            {pkg.name}
                                        </h3>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-[Poppins] font-bold text-text-primary text-lg">
                                            <span className="text-sm text-text-muted">AED</span> {pkg.price.toLocaleString()}
                                        </span>
                                        <Link href={`/holidays/${pkg.destination?.toLowerCase() || 'unknown'}/${pkg.slug}`} className="px-4 py-2 bg-accent-red text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-colors">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ──── ACTIVITY CAROUSEL ──── */
export function ActivityCarousel({ activities = [] }: { activities: any[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const scroll = (dir: "left" | "right") => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
        }
    };

    if (!activities || activities.length === 0) return null;

    return (
        <section className="py-14 bg-white">
            <div className="max-w-[1400px] mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-[Poppins] font-bold text-text-primary">
                        Top Trending Activities
                    </h2>
                    <div className="flex gap-2">
                        <button onClick={() => scroll("left")} className="w-10 h-10 border-2 border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors" aria-label="Previous">
                            <FiChevronLeft size={18} />
                        </button>
                        <button onClick={() => scroll("right")} className="w-10 h-10 border-2 border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors" aria-label="Next">
                            <FiChevronRight size={18} />
                        </button>
                    </div>
                </div>
                <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 snap-x" style={{ scrollbarWidth: "none" }}>
                    {activities.map((activity) => (
                        <div key={activity.slug} className="flex-shrink-0 w-[280px] bg-white rounded-xl shadow-md card-hover overflow-hidden snap-start flex flex-col">
                            <div className="relative h-48 w-full bg-gray-100">
                                <Image
                                    src={activity.image?.asset ? urlFor(activity.image).width(600).url() : activity.image}
                                    alt={activity.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover"
                                />
                                {/* Wishlist heart */}
                                <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-accent-red hover:bg-accent-red hover:text-white transition-colors z-10 shadow-sm" aria-label="Add to wishlist">
                                    ♡
                                </button>
                            </div>
                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-1 text-secondary text-sm mb-1">
                                        <FiClock size={13} />
                                        <span>{activity.duration}</span>
                                    </div>
                                    <h3 className="font-[Poppins] font-semibold text-text-primary mb-2 text-base">
                                        {activity.name}
                                    </h3>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-[Poppins] font-bold text-text-primary text-lg">
                                        <span className="text-sm text-text-muted">AED</span> {activity.price}
                                    </span>
                                    <Link href={`/activities/${activity.slug}`} className="px-4 py-2 bg-accent-red text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-colors">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
