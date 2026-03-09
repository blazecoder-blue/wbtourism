"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slides = [
    {
        title: "Exclusive Holiday Deals",
        subtitle: "Turkey | Georgia | Armenia | Kazakhstan | Kenya",
        cta: "Explore Deals",
        href: "/holidays",
        gradient: "from-emerald-900/80 via-teal-900/60 to-transparent",
        image: "/images/hero/holiday-v2.jpg",
    },
    {
        title: "Global Visa Assistance",
        subtitle: "Fast & reliable visa services for 50+ countries worldwide",
        cta: "Apply Now",
        href: "/visa",
        gradient: "from-blue-900/80 via-indigo-900/60 to-transparent",
        image: "/images/about/wb_promo.jpg",
    },
    {
        title: "Adventures Await in UAE",
        subtitle: "Desert Safaris • City Tours • Theme Parks • Water Sports",
        cta: "View Activities",
        href: "/activities",
        gradient: "from-orange-900/80 via-amber-900/60 to-transparent",
        image: "/images/hero/activities-v2.jpg",
    },
    {
        title: "Corporate Travel Solutions",
        subtitle: "Seamless business travel management for your company",
        cta: "Learn More",
        href: "/corporate-travel",
        gradient: "from-slate-900/80 via-gray-900/60 to-transparent",
        image: "/images/about/wb_office_video_thumb.jpg",
    },
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const goTo = useCallback(
        (index: number) => {
            if (isAnimating) return;
            setIsAnimating(true);
            setCurrent(index);
            setTimeout(() => setIsAnimating(false), 600);
        },
        [isAnimating]
    );

    const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
    const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [next]);

    return (
        <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
            {slides.map((slide, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${i === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
                        }`}
                >
                    {/* Background */}
                    <div className="absolute inset-0 bg-gray-900">
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            sizes="100vw"
                            className="object-cover opacity-80"
                            priority={i === 0}
                        />
                        {/* Decorative elements */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-white/20 blur-3xl" />
                            <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}>
                        <div className="max-w-[1400px] mx-auto px-4 h-full flex items-center">
                            <div className={`max-w-xl transition-all duration-700 delay-200 ${i === current ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-[Poppins] font-bold text-white mb-4 leading-tight">
                                    {slide.title}
                                </h2>
                                <p className="text-lg md:text-xl text-white/90 mb-8 font-light">
                                    {slide.subtitle}
                                </p>
                                <Link
                                    href={slide.href}
                                    className="inline-block px-8 py-3.5 bg-secondary text-white font-[Poppins] font-semibold rounded-lg hover:bg-secondary-hover transition-all hover:scale-105 shadow-lg"
                                >
                                    {slide.cta}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all z-10"
                aria-label="Previous slide"
            >
                <FiChevronLeft size={24} />
            </button>
            <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all z-10"
                aria-label="Next slide"
            >
                <FiChevronRight size={24} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        className={`w-3 h-3 rounded-full transition-all ${i === current ? "bg-white w-8" : "bg-white/40 hover:bg-white/60"
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
