import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";
import { CONTACT, SITE_NAME } from "@/lib/constants";
import ContactForm from "@/components/sections/ContactForm";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata = {
    title: "Contact Us | WB Tourism Dubai & Abu Dhabi",
    description: "Get in touch with WB Tourism. We are at your disposal 7 days a week! Head offices in Dubai and Abu Dhabi.",
};

export default function ContactPage() {
    return (
        <>
            {/* Banner */}
            <section className="bg-gradient-to-r from-cyan-700 to-teal-900 py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 right-20 w-80 h-80 rounded-full bg-white blur-3xl" />
                </div>
                <div className="relative z-10">
                    <Breadcrumb items={[{ label: "Contact Us" }]} />
                    <h1 className="text-4xl md:text-5xl font-[Poppins] font-bold text-white">Contact Us</h1>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 bg-bg-primary">
                <div className="max-w-[1400px] mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-[Poppins] font-bold text-text-primary mb-2">
                            Get In Touch
                        </h2>
                        <p className="text-text-secondary flex items-center justify-center gap-2">
                            <FiClock size={16} className="text-primary" />
                            We are at your disposal 7 days a week!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Contact Details */}
                        <div className="space-y-6">
                            {/* Dubai Office */}
                            <div className="bg-white rounded-xl p-6 shadow-md">
                                <h3 className="font-[Poppins] font-bold text-text-primary text-lg mb-4 flex items-center gap-2">
                                    <FiMapPin className="text-primary" /> {CONTACT.dubai.label}
                                </h3>
                                <p className="text-text-secondary text-sm mb-3 leading-relaxed">
                                    {CONTACT.dubai.address}
                                </p>
                                <a href={CONTACT.dubai.phoneHref} className="flex items-center gap-2 text-accent-teal hover:text-primary transition-colors text-sm mb-2 font-bold">
                                    <FiPhone /> {CONTACT.dubai.phone}
                                </a>
                                <div className="space-y-1">
                                    {CONTACT.additionalPhones.map((phone) => (
                                        <a key={phone} href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-sm">
                                            <FiPhone className="opacity-50" /> {phone}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Email */}
                            <div className="bg-white rounded-xl p-6 shadow-md">
                                <h3 className="font-[Poppins] font-bold text-text-primary text-lg mb-4 flex items-center gap-2">
                                    <FiMail className="text-primary" /> Email
                                </h3>
                                <a href={CONTACT.emailHref} className="text-accent-teal hover:text-primary transition-colors text-sm">
                                    {CONTACT.email}
                                </a>
                            </div>

                            {/* Map placeholder */}
                            <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center overflow-hidden">
                                <iframe
                                    src="https://maps.google.com/maps?q=Waseem%20Baig%20Tourism%20LLC%20Dubai&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>

                        {/* Contact Form */}
                        <ContactForm />
                    </div>
                </div>
            </section>
        </>
    );
}
