"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";

export default function Testimonials({ testimonials = [] }: { testimonials: any[] }) {
    const [current, setCurrent] = useState(0);

    const next = useCallback(() => {
        if (testimonials.length > 0) {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }
    }, [testimonials.length]);

    useEffect(() => {
        if (testimonials.length > 1) {
            const timer = setInterval(next, 5000);
            return () => clearInterval(timer);
        }
    }, [next, testimonials.length]);

    if (!testimonials || testimonials.length === 0) return null;

    const testimonial = testimonials[current];

    // Get surrounding avatars
    const getAvatar = (offset: number) => {
        const idx = (current + offset + testimonials.length) % testimonials.length;
        return testimonials[idx];
    };

    const getImageUrl = (image: any) => {
        return image?.asset ? urlFor(image).width(200).url() : image;
    };

    return (
        <section className="py-20 bg-bg-light-blue relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-4">
                {/* Section label */}
                <p className="text-center font-[Dancing_Script] text-primary text-2xl mb-2">
                    Testimonials
                </p>
                <h2 className="text-3xl md:text-4xl font-[Poppins] font-bold text-text-primary text-center mb-14">
                    What Our Happy Clients Say
                </h2>

                {/* Testimonial layout */}
                <div className="relative max-w-3xl mx-auto">
                    {/* Floating avatars */}
                    {testimonials.length >= 4 && (
                        <div className="hidden md:block">
                            {/* Top-left */}
                            <div className="absolute -left-20 top-0 w-14 h-14 rounded-full border-[3px] border-white shadow-md overflow-hidden relative opacity-80">
                                <Image src={getImageUrl(getAvatar(1).avatar)} alt="Client" fill sizes="60px" className="object-cover" />
                            </div>
                            {/* Top-right */}
                            <div className="absolute -right-20 top-4 w-12 h-12 rounded-full border-[3px] border-white shadow-md overflow-hidden relative opacity-80">
                                <Image src={getImageUrl(getAvatar(2).avatar)} alt="Client" fill sizes="50px" className="object-cover" />
                            </div>
                            {/* Bottom-left */}
                            <div className="absolute -left-10 bottom-10 w-16 h-16 rounded-full border-[3px] border-white shadow-md overflow-hidden relative opacity-80">
                                <Image src={getImageUrl(getAvatar(3).avatar)} alt="Client" fill sizes="70px" className="object-cover" />
                            </div>
                            {/* Bottom-right */}
                            <div className="absolute -right-14 bottom-20 w-14 h-14 rounded-full border-[3px] border-white shadow-md overflow-hidden relative opacity-80">
                                <Image src={getImageUrl(getAvatar(4).avatar)} alt="Client" fill sizes="60px" className="object-cover" />
                            </div>
                        </div>
                    )}

                    {/* Main testimonial card */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 relative">
                        {/* Quote mark */}
                        <div className="absolute top-6 right-8 text-7xl text-primary-light/30 font-serif leading-none">
                            &ldquo;&rdquo;
                        </div>

                        <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-8 relative z-10">
                            {testimonial.text}
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-4">
                            <div className="relative w-14 h-14 rounded-full border-2 border-primary/20 overflow-hidden">
                                <Image src={getImageUrl(testimonial.avatar)} alt={testimonial.name} fill sizes="60px" className="object-cover" />
                            </div>
                            <div>
                                <h4 className="font-[Poppins] font-semibold text-text-primary">
                                    {testimonial.name}
                                </h4>
                                <p className="text-sm text-text-muted">Verified Traveler</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-10">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`w-3 h-3 rounded-full transition-all ${i === current ? "bg-accent-red w-6" : "bg-primary-light/40 hover:bg-primary-light"
                                }`}
                            aria-label={`View testimonial ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
