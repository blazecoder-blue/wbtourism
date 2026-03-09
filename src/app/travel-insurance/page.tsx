import Link from "next/link";
import Image from "next/image";
import { FiShield, FiCheck, FiInfo } from "react-icons/fi";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata = {
    title: "Travel Insurance | WB Tourism",
    description: "Secure your trip with comprehensive travel insurance policies, tailored for your peace of mind.",
};

export default function TravelInsurancePage() {
    return (
        <>
            <section className="bg-gradient-to-r from-red-700 to-rose-900 py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute bottom-0 left-20 w-80 h-80 rounded-full bg-white blur-3xl" />
                </div>
                <div className="relative z-10">
                    <Breadcrumb items={[{ label: "Travel Insurance" }]} />
                    <h1 className="text-4xl md:text-5xl font-[Poppins] font-bold text-white">Travel Insurance</h1>
                </div>
            </section>

            <section className="py-16 bg-bg-primary">
                <div className="max-w-[1000px] mx-auto px-4">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden text-center">
                        <div className="relative h-72 w-full">
                            <Image
                                src="/images/blogs/blog2.jpg"
                                alt="Travel Insurance Coverage"
                                fill
                                sizes="(max-width: 1024px) 100vw, 1000px"
                                className="object-cover"
                            />
                        </div>
                        <div className="p-10">
                            <h2 className="text-2xl font-[Poppins] font-bold text-text-primary mb-6">
                                Protect Your Journey
                            </h2>
                            <p className="text-text-secondary text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                                Travel safely knowing you are protected against unexpected medical expenses, flight cancellations, lost baggage, and other emergencies. We offer extensive coverage tailored to both individuals and corporate travelers globally.
                            </p>
                            <Link href="/contact" className="inline-block px-10 py-4 bg-accent-red text-white font-[Poppins] font-bold rounded-lg hover:opacity-90 transition-all shadow-lg text-lg">
                                Get an Insurance Quote
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
