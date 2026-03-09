"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiPhone, FiMail, FiSearch, FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { SITE_NAME, NAV_ITEMS, MORE_ITEMS, CONTACT } from "@/lib/constants";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}>
            {/* ──── TOP BAR ──── */}
            <div className="hidden lg:block bg-white border-b border-gray-100">
                <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-end h-10">
                    {/* Search + Contact Info */}
                    <div className="hidden lg:flex items-center gap-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                aria-label="Search site"
                                className="w-48 h-9 pl-3 pr-9 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors bg-gray-50"
                            />
                            <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                        </div>

                        <a href={CONTACT.dubai.phoneHref} className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors">
                            <FiPhone className="text-accent-teal" />
                            <span>{CONTACT.dubai.phone}</span>
                        </a>

                        {CONTACT.additionalPhones.length > 0 && (
                            <a href={`tel:${CONTACT.additionalPhones[0].replace(/\s+/g, '')}`} className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors">
                                <FiPhone className="text-accent-teal" />
                                <span>{CONTACT.additionalPhones[0]}</span>
                            </a>
                        )}

                        <a href={CONTACT.emailHref} className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors">
                            <FiMail className="text-accent-teal" />
                            <span>{CONTACT.email}</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* ──── MAIN NAVIGATION ──── */}
            <nav className={`bg-white border-b border-gray-100 transition-all ${scrolled ? "shadow-md" : ""}`}>
                <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between h-16">
                    {/* Logo in nav */}
                    <Link href="/" className="flex-shrink-0">
                        <Image
                            src="/images/logo.png"
                            alt={SITE_NAME}
                            width={200}
                            height={70}
                            className="h-10 md:h-12 lg:h-14 w-auto"
                            priority
                        />
                    </Link>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden p-2 text-text-primary"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>

                    {/* Nav items */}
                    <div className="hidden lg:flex items-center gap-0">
                        {NAV_ITEMS.map((item) => (
                            <div key={item.label} className="relative mega-menu-trigger group">
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-1 px-4 h-14 text-sm font-[Poppins] font-semibold text-text-primary uppercase tracking-wide hover:text-primary transition-colors"
                                >
                                    {item.label}
                                    {item.hasMegaMenu && <FiChevronDown className="text-xs mt-0.5 group-hover:rotate-180 transition-transform" />}
                                </Link>

                                {/* Mega Menu */}
                                {item.hasMegaMenu && item.children && (
                                    <div className="mega-menu absolute top-full left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-xl border border-gray-100 p-6 min-w-[500px]">
                                        <div className="grid grid-cols-3 gap-2">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.label}
                                                    href={child.href}
                                                    className={`block px-4 py-2.5 rounded-lg text-sm transition-colors ${child.highlight
                                                        ? "bg-primary text-white font-semibold hover:bg-primary-hover"
                                                        : "text-text-secondary hover:bg-bg-primary hover:text-primary"
                                                        }`}
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* More dropdown */}
                        <div className="relative mega-menu-trigger group">
                            <button
                                aria-label="Show more categories"
                                className="flex items-center gap-1 px-4 h-14 text-sm font-[Poppins] font-semibold text-text-primary uppercase tracking-wide hover:text-primary transition-colors"
                            >
                                More
                                <FiChevronDown className="text-xs mt-0.5 group-hover:rotate-180 transition-transform" />
                            </button>
                            <div className="mega-menu absolute top-full right-0 bg-white rounded-xl shadow-xl border border-gray-100 p-3 min-w-[200px]">
                                {MORE_ITEMS.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="block px-4 py-2.5 rounded-lg text-sm text-text-secondary hover:bg-bg-primary hover:text-primary transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* ──── MOBILE MENU ──── */}
            <div className={`lg:hidden fixed inset-0 top-[64px] bg-white z-50 overflow-y-auto transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="p-4 space-y-1">
                    {/* Mobile search */}
                    <div className="relative mb-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full h-10 pl-4 pr-10 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary bg-gray-50"
                        />
                        <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>

                    {NAV_ITEMS.map((item) => (
                        <div key={item.label}>
                            <button
                                className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-[Poppins] font-semibold text-text-primary uppercase hover:bg-bg-primary rounded-lg"
                                onClick={() => {
                                    if (item.hasMegaMenu) {
                                        setMobileSubmenu(mobileSubmenu === item.label ? null : item.label);
                                    } else {
                                        setMobileOpen(false);
                                        window.location.href = item.href;
                                    }
                                }}
                            >
                                {item.label}
                                {item.hasMegaMenu && (
                                    <FiChevronDown className={`transition-transform ${mobileSubmenu === item.label ? "rotate-180" : ""}`} />
                                )}
                            </button>
                            {item.hasMegaMenu && mobileSubmenu === item.label && item.children && (
                                <div className="ml-4 space-y-1 pb-2">
                                    {item.children.map((child) => (
                                        <Link
                                            key={child.label}
                                            href={child.href}
                                            className={`block px-4 py-2 text-sm rounded-lg ${child.highlight
                                                ? "bg-primary text-white"
                                                : "text-text-secondary hover:bg-bg-primary"
                                                }`}
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="border-t border-gray-100 pt-3 mt-3 space-y-1">
                        {MORE_ITEMS.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="block px-4 py-3 text-sm font-[Poppins] font-semibold text-text-primary uppercase hover:bg-bg-primary rounded-lg"
                                onClick={() => setMobileOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile contact info */}
                    <div className="border-t border-gray-100 pt-4 mt-4 space-y-3">
                        <a href={CONTACT.dubai.phoneHref} className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary">
                            <FiPhone className="text-accent-teal" /> Contact: {CONTACT.dubai.phone}
                        </a>
                        {CONTACT.additionalPhones.map((phone, i) => (
                            <a key={i} href={`tel:${phone.replace(/\s+/g, '')}`} className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary">
                                <FiPhone className="text-accent-teal" /> Contact: {phone}
                            </a>
                        ))}
                        <a href={CONTACT.emailHref} className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary">
                            <FiMail className="text-accent-teal" /> {CONTACT.email}
                        </a>
                    </div>
                </div>
            </div>
        </header >
    );
}
