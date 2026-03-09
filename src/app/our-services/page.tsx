import Link from "next/link";
import Image from "next/image";
import { SITE_NAME } from "@/lib/constants";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata = {
    title: "Our Services | WB Tourism",
    description: `Explore the comprehensive travel services offered by ${SITE_NAME}, including flights, visas, holidays, and more.`,
};

export default function OurServicesPage() {
    return (
        <>
            <section className="bg-gradient-to-r from-blue-700 to-indigo-900 py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-20 w-80 h-80 rounded-full bg-white blur-3xl" />
                </div>
                <div className="relative z-10">
                    <Breadcrumb items={[{ label: "Our Services" }]} />
                    <h1 className="text-4xl md:text-5xl font-[Poppins] font-bold text-white">Our Services</h1>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-[1400px] mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-[Poppins] font-bold text-text-primary mb-12">
                        What We Offer
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-bg-primary rounded-xl overflow-hidden shadow-sm card-hover text-left">
                            <div className="relative h-48 w-full">
                                <Image src="/images/holidays/armenia.jpg" alt="Visa Assistance" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                            </div>
                            <div className="p-6">
                                <h3 className="font-[Poppins] font-bold text-lg mb-2 text-text-primary">Visa Assistance</h3>
                                <p className="text-text-secondary text-sm leading-relaxed">
                                    Smooth processing for tourist and business visas to over 50+ countries. Let our experts handle the paperwork.
                                </p>
                            </div>
                        </div>

                        <div className="bg-bg-primary rounded-xl overflow-hidden shadow-sm card-hover text-left">
                            <div className="relative h-48 w-full">
                                <Image src="/images/holidays/bali.jpg" alt="Holiday Packages" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                            </div>
                            <div className="p-6">
                                <h3 className="font-[Poppins] font-bold text-lg mb-2 text-text-primary">Holiday Packages</h3>
                                <p className="text-text-secondary text-sm leading-relaxed">
                                    Customized tour packages, flights, and accommodations suited exactly to your travel style and preferences.
                                </p>
                            </div>
                        </div>

                        <div className="bg-bg-primary rounded-xl overflow-hidden shadow-sm card-hover text-left">
                            <div className="relative h-48 w-full">
                                <Image src="/images/activities/dubai-trio.jpg" alt="Corporate Travel" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                            </div>
                            <div className="p-6">
                                <h3 className="font-[Poppins] font-bold text-lg mb-2 text-text-primary">Corporate Travel</h3>
                                <p className="text-text-secondary text-sm leading-relaxed">
                                    Dedicated corporate booking tools, MICE services, VIP Meet & Greet, and private charter flights.
                                </p>
                            </div>
                        </div>

                        <div className="bg-bg-primary rounded-xl overflow-hidden shadow-sm card-hover text-left">
                            <div className="relative h-48 w-full">
                                <Image src="/images/activities/dhow-cruise.jpg" alt="Cruise Packages" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                            </div>
                            <div className="p-6">
                                <h3 className="font-[Poppins] font-bold text-lg mb-2 text-text-primary">Cruise Packages</h3>
                                <p className="text-text-secondary text-sm leading-relaxed">
                                    Sail across the globe on top luxury cruise liners like Royal Caribbean, MSC, and Norwegian.
                                </p>
                            </div>
                        </div>

                        <div className="bg-bg-primary rounded-xl overflow-hidden shadow-sm card-hover text-left">
                            <div className="relative h-48 w-full">
                                <Image src="/images/blogs/blog2.jpg" alt="Travel Insurance" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                            </div>
                            <div className="p-6">
                                <h3 className="font-[Poppins] font-bold text-lg mb-2 text-text-primary">Travel Insurance</h3>
                                <p className="text-text-secondary text-sm leading-relaxed">
                                    Reliable travel insurance policies protecting you against unexpected trip emergencies and medical needs.
                                </p>
                            </div>
                        </div>

                        <div className="bg-bg-primary rounded-xl overflow-hidden shadow-sm card-hover text-left">
                            <div className="relative h-48 w-full">
                                <Image src="/images/activities/desert-safari.jpg" alt="Activities & Tours" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                            </div>
                            <div className="p-6">
                                <h3 className="font-[Poppins] font-bold text-lg mb-2 text-text-primary">Activities & Tours</h3>
                                <p className="text-text-secondary text-sm leading-relaxed">
                                    Access to theme parks, excursions, desert safaris, and museum entries across the UAE and beyond.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
