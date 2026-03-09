import Link from "next/link";
import Image from "next/image";
import {
    FiPhone,
    FiMail,
    FiMapPin,
} from "react-icons/fi";
import {
    FaFacebookF,
    FaInstagram,
    FaTiktok,
    FaWhatsapp,
} from "react-icons/fa";
import {
    SITE_NAME,
    SITE_TAGLINE,
    CONTACT,
    SOCIAL,
    FOOTER_INFO_LINKS,
    QUICK_LINKS,
    POPULAR_CRUISES,
} from "@/lib/constants";

const socialIcons = [
    { icon: FaFacebookF, href: SOCIAL.facebook, color: "bg-blue-600" },
    { icon: FaInstagram, href: SOCIAL.instagram, color: "bg-gradient-to-br from-purple-500 to-pink-500" },
    { icon: FaWhatsapp, href: SOCIAL.whatsapp, color: "bg-green-500" },
    { icon: FaTiktok, href: SOCIAL.tiktok, color: "bg-black" },
];

export default function Footer() {
    return (
        <footer className="bg-white">
            {/* ──── NEWSLETTER SECTION ──── */}
            <section className="bg-bg-primary py-16">
                <div className="max-w-[1400px] mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-10">
                        {/* Illustration */}
                        <div className="w-full lg:w-1/2 flex justify-center">
                            <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-2xl border-8 border-white">
                                <Image
                                    src="/images/activities/dubai-trio.jpg"
                                    alt="Dubai Travel"
                                    fill
                                    sizes="(max-width: 768px) 320px, 320px"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        {/* Form */}
                        <div className="w-full lg:w-1/2">
                            <h2 className="text-3xl font-[Poppins] font-bold text-text-primary mb-2">Subscribe</h2>
                            <p className="text-text-secondary mb-6">
                                Get travel tips & offers straight into your inbox
                            </p>
                            <form className="space-y-4 max-w-md">
                                <div>
                                    <label className="block text-sm text-text-secondary mb-1">First name</label>
                                    <input
                                        type="text"
                                        aria-label="First name"
                                        className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-primary bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-text-secondary mb-1">Email</label>
                                    <input
                                        type="email"
                                        aria-label="Email address"
                                        className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-primary bg-gray-50"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-text-primary text-white font-[Poppins] font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* ──── MAIN FOOTER ──── */}
            <div className="max-w-[1400px] mx-auto px-4 py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Column 1 — Company Info */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Image
                                src="/images/logo.png"
                                alt={SITE_NAME}
                                width={220}
                                height={75}
                                className="h-14 md:h-16 lg:h-20 w-auto"
                            />
                        </div>
                        <p className="text-sm text-text-secondary leading-relaxed mb-5">
                            {SITE_NAME} understands the importance of travel journeys, and that is why we have a 360 degree solution to travel.
                        </p>
                        {/* Certification badges */}
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 border border-gray-200 rounded-lg flex items-center justify-center bg-gray-50">
                                <span className="text-xs font-bold text-blue-700">ISO</span>
                            </div>
                            <div className="w-14 h-14 border border-gray-200 rounded-lg flex items-center justify-center bg-gray-50">
                                <span className="text-xs font-bold text-blue-700">IATA</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 2 — Information Links */}
                    <div>
                        <h3 className="text-lg font-[Poppins] font-bold text-text-primary mb-5">Information</h3>
                        <ul className="space-y-3">
                            {FOOTER_INFO_LINKS.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-text-secondary hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3 — Offices */}
                    <div>
                        <h3 className="text-lg font-[Poppins] font-bold text-text-primary mb-5">{SITE_NAME}</h3>

                        <div>
                            <h4 className="font-[Poppins] font-semibold text-sm text-text-primary mb-2">
                                {CONTACT.dubai.label}
                            </h4>
                            <p className="text-sm text-text-secondary leading-relaxed mb-2">
                                {CONTACT.dubai.address}
                            </p>
                            <a href={CONTACT.dubai.phoneHref} className="flex items-center gap-2 text-sm text-accent-teal hover:text-primary transition-colors mb-2">
                                <FiPhone className="text-xs" /> {CONTACT.dubai.phone}
                            </a>
                            {CONTACT.additionalPhones.map((phone, i) => (
                                <a key={i} href={`tel:${phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 text-sm text-accent-teal hover:text-primary transition-colors">
                                    <FiPhone className="text-xs" /> {phone}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 4 — Contact + Social */}
                    <div>
                        <h3 className="text-lg font-[Poppins] font-bold text-text-primary mb-5">Contact Info</h3>
                        <a href={CONTACT.emailHref} className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors mb-6">
                            <FiMail className="text-accent-teal" /> {CONTACT.email}
                        </a>

                        <h3 className="text-lg font-[Poppins] font-bold text-text-primary mb-4">Social Media</h3>
                        <div className="flex flex-wrap gap-2">
                            {socialIcons.map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Follow us on ${social.href.includes('facebook') ? 'Facebook' : social.href.includes('instagram') ? 'Instagram' : social.href.includes('whatsapp') ? 'WhatsApp' : 'TikTok'}`}
                                    className={`w-10 h-10 rounded-full ${social.color} flex items-center justify-center text-white hover:scale-110 transition-transform`}
                                >
                                    <social.icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ──── QUICK LINKS ──── */}
            <div className="border-t border-gray-100">
                <div className="max-w-[1400px] mx-auto px-4 py-5">
                    <h4 className="font-[Poppins] font-bold text-sm text-text-primary mb-2">Quick Links</h4>
                    <p className="text-xs text-text-secondary">
                        {QUICK_LINKS.join(" | ")}
                    </p>
                    <p className="text-xs text-text-secondary mt-1">
                        <span className="font-semibold">Popular Cruise Lines:</span>{" "}
                        {POPULAR_CRUISES.join(" | ")}
                    </p>
                </div>
            </div>

            {/* ──── COPYRIGHT ──── */}
            <div className="bg-text-primary">
                <div className="max-w-[1400px] mx-auto px-4 py-4 text-center">
                    <p className="text-xs text-gray-400">
                        Copyright © 2026 {SITE_NAME} | All Rights Reserved
                    </p>
                </div>
            </div>
        </footer>
    );
}
