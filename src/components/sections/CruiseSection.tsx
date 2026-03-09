"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/image";

export default function CruiseSection({ cruises }: { cruises: any[] }) {
    const [searchParams, setSearchParams] = useState({
        line: "",
        dest: "",
        month: "",
        duration: ""
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const text = `Hi, I'm looking for a cruise!\nLine: ${searchParams.line || 'Any'}\nDestination: ${searchParams.dest || 'Any'}\nMonth: ${searchParams.month || 'Any'}\nDuration: ${searchParams.duration || 'Any'}`;
        const url = `https://wa.me/971588759933?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");
    };

    return (
        <section className="py-14 bg-bg-primary">
            <div className="max-w-[1400px] mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
                    {cruises.map((cruise) => (
                        <div key={cruise.slug} className="bg-white rounded-xl shadow-md card-hover overflow-hidden">
                            <div className="relative h-52 w-full bg-gray-100">
                                <Image
                                    src={cruise.image?.asset ? urlFor(cruise.image).width(600).url() : cruise.image}
                                    alt={cruise.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover"
                                />
                                {cruise.badge && (
                                    <span className="absolute top-4 left-4 inline-block px-3 py-1 bg-accent-red text-white text-xs font-bold uppercase rounded shadow-md z-10">
                                        {cruise.badge}
                                    </span>
                                )}
                            </div>
                            <div className="p-5">
                                <span className="inline-block px-3 py-1 bg-sky-100 text-sky-800 text-xs font-semibold rounded mb-2">
                                    {cruise.name}
                                </span>
                                <h3 className="font-[Poppins] font-semibold text-text-primary text-base mb-2 line-clamp-2">
                                    {cruise.ship}
                                </h3>
                                <p className="text-sm text-text-secondary mb-3">Duration: {cruise.duration} Nights</p>
                                <Link href={`/cruise/${cruise.slug}`} className="inline-block px-5 py-2 bg-accent-red text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-colors">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Search Widget */}
                <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl mx-auto">
                    <h2 className="text-2xl font-[Poppins] font-bold text-text-primary text-center mb-6">
                        Find Your Dream Cruise
                    </h2>
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select
                            value={searchParams.line}
                            onChange={(e) => setSearchParams({ ...searchParams, line: e.target.value })}
                            className="h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-primary bg-gray-50"
                        >
                            <option value="">Select Cruise Line</option>
                            <option value="Royal Caribbean">Royal Caribbean</option>
                            <option value="Celebrity Cruises">Celebrity Cruises</option>
                            <option value="MSC Cruises">MSC Cruises</option>
                            <option value="Disney Cruise Line">Disney Cruise Line</option>
                            <option value="Norwegian Cruise Line">Norwegian Cruise Line</option>
                        </select>
                        <select
                            value={searchParams.dest}
                            onChange={(e) => setSearchParams({ ...searchParams, dest: e.target.value })}
                            className="h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-primary bg-gray-50"
                        >
                            <option value="">Select Destination</option>
                            <option value="Arabian Gulf">Arabian Gulf</option>
                            <option value="Mediterranean">Mediterranean</option>
                            <option value="Caribbean">Caribbean</option>
                            <option value="Northern Europe">Northern Europe</option>
                        </select>
                        <select
                            value={searchParams.month}
                            onChange={(e) => setSearchParams({ ...searchParams, month: e.target.value })}
                            className="h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-primary bg-gray-50"
                        >
                            <option value="">Departure Month</option>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                        </select>
                        <select
                            value={searchParams.duration}
                            onChange={(e) => setSearchParams({ ...searchParams, duration: e.target.value })}
                            className="h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-primary bg-gray-50"
                        >
                            <option value="">Duration</option>
                            <option value="3-5 Nights">3-5 Nights</option>
                            <option value="7 Nights">7 Nights</option>
                            <option value="10+ Nights">10+ Nights</option>
                        </select>
                        <div className="md:col-span-2 text-center">
                            <button type="submit" className="px-10 py-3 bg-primary text-white font-[Poppins] font-semibold rounded-lg hover:bg-primary-hover transition-colors">
                                Search & Book via WhatsApp
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
