import { SITE_NAME } from "@/lib/constants";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaApplePay, FaGooglePay, FaUniversity } from "react-icons/fa";

export const metadata = {
    title: "Payment Partners | WB Tourism",
    description: "Secure and swift payment options available at WB Tourism.",
};

const partners = [
    { name: "Visa", icon: FaCcVisa, color: "text-blue-800" },
    { name: "Mastercard", icon: FaCcMastercard, color: "text-red-600" },
    { name: "Amex", icon: FaCcAmex, color: "text-sky-500" },
    { name: "Apple Pay", icon: FaApplePay, color: "text-black" },
    { name: "Google Pay", icon: FaGooglePay, color: "text-gray-800" },
    { name: "Bank Transfer", icon: FaUniversity, color: "text-indigo-700" },
];

export default function PaymentPartnersPage() {
    return (
        <>
            <section className="bg-gradient-to-r from-gray-700 to-slate-900 py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl" />
                </div>
                <div className="relative z-10">
                    <Breadcrumb items={[{ label: "Payment Partners" }]} />
                    <h1 className="text-4xl md:text-5xl font-[Poppins] font-bold text-white">Payment Partners</h1>
                </div>
            </section>

            <section className="py-16 bg-bg-primary">
                <div className="max-w-[1000px] mx-auto px-4 text-center">
                    <h2 className="text-2xl font-[Poppins] font-bold text-text-primary mb-6">
                        Secure Payments Supported
                    </h2>
                    <p className="text-text-secondary leading-relaxed max-w-2xl mx-auto mb-12">
                        At {SITE_NAME}, we aim to provide you with secure, convenient, and flexible payment methods to ease your booking experience. We partner with leading financial institutions to ensure smooth transactions locally and globally.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {partners.map((partner) => (
                            <div key={partner.name} className="bg-white p-8 rounded-2xl flex flex-col items-center justify-center shadow-sm card-hover border border-gray-100 h-40">
                                <partner.icon className={`text-5xl ${partner.color} mb-3`} />
                                <span className="font-[Poppins] text-sm font-semibold text-text-secondary">{partner.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
