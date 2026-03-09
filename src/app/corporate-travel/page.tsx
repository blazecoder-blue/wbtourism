import Link from "next/link";
import Image from "next/image";
import { SITE_NAME } from "@/lib/constants";
import ContactForm from "@/components/sections/ContactForm";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata = {
    title: "Corporate Travel Management Services | WB Tourism Dubai",
    description: "Efficient corporate travel management company services in Dubai, UAE. Air tickets, hotel booking, MICE, VIP services, and more.",
};

const services = [
    { image: "/images/corporate/meeting.png", title: "Air & Corporate Travel", desc: "Comprehensive corporate flight booking and management solutions." },
    { image: "/images/activities/dubai-trio.jpg", title: "Hotel Booking", desc: "Global hotel reservations at negotiated corporate rates." },
    { image: "/images/blogs/blog1.jpg", title: "Corporate Booking Tool", desc: "Self-service online booking platform for your team." },
    { image: "/images/hero/holiday-v2.jpg", title: "Holidays & Activities", desc: "Employee reward trips and team-building activities." },
    { image: "/images/corporate/airport_lounge.png", title: "VIP Services", desc: "Premium airport meet & greet, lounge access, and chauffeur services." },
    { image: "/images/activities/dhow-cruise.jpg", title: "MICE", desc: "Meetings, Incentives, Conferences, and Events management." },
    { image: "/images/visas/saudi.jpg", title: "Worldwide Visa Services", desc: "Expert visa processing for 100+ countries." },
    { image: "/images/activities/desert-safari.jpg", title: "Car Rental", desc: "Vehicle hire solutions for business travel needs." },
    { image: "/images/blogs/blog2.jpg", title: "Travel Insurance", desc: "Comprehensive travel protection plans for your team." },
    { image: "/images/activities/dubai-frame.jpg", title: "Medical Tourism", desc: "Healthcare travel packages with top medical facilities." },
    { image: "/images/hero/activities-v2.jpg", title: "Cargo", desc: "Air and sea cargo logistics services." },
    { image: "/images/activities/museum-future.jpg", title: "Charter", desc: "Private charter flights for corporate groups." },
];

export default function CorporateTravelPage() {
    return (
        <>
            {/* Banner */}
            <section className="bg-gradient-to-r from-slate-800 to-gray-900 py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 right-20 w-80 h-80 rounded-full bg-white blur-3xl" />
                </div>
                <div className="relative z-10">
                    <Breadcrumb items={[{ label: "Corporate Travel" }]} />
                    <h1 className="text-4xl md:text-5xl font-[Poppins] font-bold text-white">Corporate Travel</h1>
                </div>
            </section>

            {/* Hero CTA */}
            <section className="py-16 bg-gradient-to-br from-blue-900 to-indigo-900 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-[Poppins] font-bold text-white uppercase mb-6">
                        Corporate Travel
                    </h2>
                    <p className="text-white/80 text-lg mb-8">
                        Your trusted partner for complete corporate travel management. Let us handle every detail so you can focus on what matters most.
                    </p>
                    <Link href="#contact-form" className="inline-block px-8 py-4 bg-secondary text-white font-[Poppins] font-bold rounded-lg hover:bg-secondary-hover transition-all hover:scale-105 shadow-lg text-lg">
                        Enquire Now
                    </Link>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16 bg-white">
                <div className="max-w-[1400px] mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-[Poppins] font-bold text-text-primary text-center mb-12">
                        Corporate Travel Services
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {services.map((service) => (
                            <div key={service.title} className="bg-bg-primary rounded-xl overflow-hidden shadow-sm card-hover text-center">
                                <div className="relative h-40 w-full mb-4">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-4 pt-0">
                                    <h3 className="font-[Poppins] font-bold text-text-primary uppercase text-sm mb-2">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm text-text-secondary">{service.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-16 bg-bg-primary">
                <div className="max-w-[1400px] mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-[Poppins] font-bold text-text-primary mb-4">
                        Trusted by Over 1000+ Companies
                    </h2>
                    <p className="text-text-secondary max-w-2xl mx-auto mb-10">
                        From startups to Fortune 500 companies, businesses trust {SITE_NAME} for their corporate travel needs.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {[
                            "Global Corp", "Tech Solutions", "Finance Hub",
                            "Innovate Ltd", "Prime Logistics", "Elite Services"
                        ].map((client, i) => (
                            <div key={i} className="h-20 bg-white rounded-lg shadow-sm flex items-center justify-center border border-gray-100 p-4">
                                <span className="text-text-muted font-bold text-sm uppercase tracking-widest text-center">{client}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section id="contact-form" className="py-16 bg-white">
                <div className="max-w-3xl mx-auto px-4">
                    <p className="text-text-secondary text-center mb-10">
                        To Discuss Your Corporate Travel Program Today
                    </p>
                    <ContactForm variant="corporate" />
                </div>
            </section>
        </>
    );
}
