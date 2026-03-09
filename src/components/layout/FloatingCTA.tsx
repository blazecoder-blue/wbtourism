"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiArrowUp, FiPhone, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { CONTACT } from "@/lib/constants";

export default function FloatingCTA() {
    const [showScroll, setShowScroll] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setShowScroll(window.scrollY > 400);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const whatsappMessage = encodeURIComponent(`Hi WB Tourism, I'm looking at the ${pathname} page and would like more information.`);
    const whatsappLink = `https://wa.me/${CONTACT.whatsapp.split("wa.me/")[1]}?text=${whatsappMessage}`;

    return (
        <>
            {/* WhatsApp Button — bottom left */}
            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 left-6 z-40 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-all pulse-glow"
                aria-label="Chat on WhatsApp"
            >
                <FaWhatsapp size={28} />
            </a>

            {/* Right side actions */}
            <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
                {/* Phone */}
                <a
                    href={CONTACT.dubai.phoneHref}
                    className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg hover:bg-primary-hover transition-all hover:scale-110"
                    aria-label="Call us"
                >
                    <FiPhone size={20} />
                </a>

                {/* Email */}
                <a
                    href={CONTACT.emailHref}
                    className="w-12 h-12 bg-accent-teal rounded-full flex items-center justify-center text-white shadow-lg hover:opacity-90 transition-all hover:scale-110"
                    aria-label="Email us"
                >
                    <FiMail size={20} />
                </a>

                {/* Scroll to top */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className={`w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg hover:bg-primary-hover transition-all ${showScroll ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                        }`}
                    aria-label="Scroll to top"
                >
                    <FiArrowUp size={20} />
                </button>
            </div>
        </>
    );
}
