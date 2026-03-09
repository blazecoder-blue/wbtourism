import Link from "next/link";
import Image from "next/image";
import { getStaycations } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata = {
    title: "Staycation Packages in UAE | WB Tourism",
    description: "Discover amazing staycation deals in Dubai, Abu Dhabi, and across the UAE. Book luxury hotel stays at exclusive rates.",
};

export default async function StaycationPage() {
    const staycations = await getStaycations();

    return (
        <>
            {/* Banner */}
            <section className="bg-gradient-to-r from-pink-700 to-rose-900 py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute bottom-0 left-20 w-80 h-80 rounded-full bg-white blur-3xl" />
                </div>
                <div className="relative z-10">
                    <Breadcrumb items={[{ label: "Staycation" }]} />
                    <h1 className="text-4xl md:text-5xl font-[Poppins] font-bold text-white">Staycation</h1>
                </div>
            </section>

            {/* Content */}
            <section className="py-14 bg-bg-primary">
                <div className="max-w-[1400px] mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-[Poppins] font-bold text-text-primary mb-3">
                        Staycation Packages in UAE
                    </h2>
                    <p className="text-text-secondary max-w-3xl mb-10">
                        Take a break without going far! Enjoy premium staycation deals at the best hotels across the UAE.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {staycations.map((hotel) => (
                            <div key={hotel.slug} className="bg-white rounded-xl shadow-md card-hover overflow-hidden flex flex-col">
                                <div className="relative h-52 w-full bg-gray-100">
                                    <Image
                                        src={(hotel.image as any)?.asset ? urlFor(hotel.image).width(600).url() : hotel.image}
                                        alt={hotel.name}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover"
                                    />
                                    {hotel.badge && (
                                        <span className="absolute top-3 left-3 px-3 py-1 bg-accent-red text-white text-[10px] font-bold uppercase rounded tracking-wider z-10">
                                            {hotel.badge}
                                        </span>
                                    )}
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex items-center gap-1 mb-2">
                                        {[...Array(hotel.rating || 5)].map((_, i) => (
                                            <span key={i} className="text-accent-yellow text-sm">⭐</span>
                                        ))}
                                    </div>
                                    <h3 className="font-[Poppins] font-semibold text-text-primary text-base mb-1">
                                        {hotel.name}
                                    </h3>
                                    <p className="text-sm text-text-muted mb-3">📍 {hotel.location}</p>
                                    <div className="flex items-center justify-between mt-auto pt-4">
                                        <span className="font-[Poppins] font-bold text-text-primary text-lg">
                                            <span className="text-sm text-text-muted">AED</span> {hotel.price?.toLocaleString()}
                                            <span className="text-xs text-text-muted font-normal"> /night</span>
                                        </span>
                                        <Link href={`/contact?service=staycation&hotel=${hotel.slug}`} className="px-4 py-2 bg-secondary text-white text-sm font-semibold rounded-lg hover:bg-secondary-hover transition-colors">
                                            Book Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
