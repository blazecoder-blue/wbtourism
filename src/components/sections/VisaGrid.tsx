"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/image";

const regions = [
    { label: "All", value: "all" },
    { label: "Africa", value: "africa" },
    { label: "Asia", value: "asia" },
    { label: "Europe", value: "europe" },
    { label: "Middle East", value: "middle-east" },
    { label: "Latin America", value: "latin-america" },
    { label: "Australia", value: "australia" },
    { label: "Canada", value: "canada" },
    { label: "USA", value: "usa" },
    { label: "CIS", value: "cis" },
];

export default function VisaGrid({ visas }: { visas: any[] }) {
    const [activeRegion, setActiveRegion] = useState("all");

    const filtered = activeRegion === "all" ? visas : visas.filter((v: any) => v.region === activeRegion);

    return (
        <section className="py-14 bg-bg-primary">
            <div className="max-w-[1400px] mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-[Poppins] font-bold text-text-primary mb-8">
                    Visa Services from Dubai, UAE
                </h2>

                {/* Filter tabs */}
                <div className="flex flex-wrap gap-2 mb-10">
                    {regions.map((region) => (
                        <button
                            key={region.value}
                            onClick={() => setActiveRegion(region.value)}
                            className={`px-5 py-2.5 rounded-lg text-sm font-[Poppins] font-semibold transition-all ${activeRegion === region.value
                                ? "bg-primary text-white shadow-md"
                                : "bg-white text-text-secondary hover:bg-gray-50 border border-gray-200"
                                }`}
                        >
                            {region.label}
                        </button>
                    ))}
                </div>

                {/* Visa grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filtered.map((visa: any) => (
                        <div key={visa.slug} className="bg-white rounded-xl shadow-md card-hover overflow-hidden flex flex-col">
                            <div className="relative h-48 w-full bg-gray-100">
                                <Image
                                    src={visa.image?.asset ? urlFor(visa.image).width(600).url() : visa.image}
                                    alt={visa.name}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                                <h3 className="font-[Poppins] font-semibold text-text-primary mb-3 text-base">
                                    {visa.name}
                                </h3>
                                <div className="flex gap-2 mt-auto">
                                    <Link
                                        href={`/contact?service=visa&country=${visa.slug}`}
                                        className="px-4 py-2 bg-secondary text-white text-sm font-semibold rounded-lg hover:bg-secondary-hover transition-colors"
                                    >
                                        Get Quote
                                    </Link>
                                    <Link
                                        href={`/visa/${visa.region}/${visa.slug}`}
                                        className="px-4 py-2 bg-accent-red text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-colors"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="col-span-full py-10 text-center text-text-secondary">
                            No visas found for the selected region.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
