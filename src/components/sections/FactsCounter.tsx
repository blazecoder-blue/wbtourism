"use client";

import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/constants";

function Counter({ target, suffix }: { target: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started) {
                    setStarted(true);
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started) return;
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);
        return () => clearInterval(timer);
    }, [started, target]);

    return (
        <div ref={ref} className="text-center">
            <div className="text-5xl md:text-6xl lg:text-7xl font-[Poppins] font-bold text-accent-yellow mb-2">
                {count.toLocaleString()}<span className="text-white">{suffix}</span>
            </div>
        </div>
    );
}

export default function FactsCounter() {
    return (
        <section className="py-20 bg-gradient-to-r from-bg-green via-emerald-600 to-bg-green relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="max-w-[1400px] mx-auto px-4 relative z-10">
                <h2 className="text-3xl md:text-4xl font-[Poppins] font-bold text-white text-center mb-14 uppercase tracking-wide">
                    WB Tourism Facts & Figures
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {STATS.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <Counter target={stat.value} suffix={stat.suffix} />
                            <p className="text-sm md:text-base font-[Poppins] font-semibold text-white uppercase tracking-wider mt-2">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
