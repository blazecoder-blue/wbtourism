import Link from "next/link";
import Image from "next/image";
import { FiClock } from "react-icons/fi";
import { getHolidays } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata = {
    title: "Holiday Packages from Dubai, UAE | WB Tourism",
    description: "Explore exciting holiday packages from Dubai, UAE. Book affordable vacation packages to Turkey, Georgia, Armenia, Kenya, Bali, and more.",
};

export default async function HolidaysPage() {
    const holidays = await getHolidays();

    return (
        <>
            {/* Banner */}
            <section className="bg-gradient-to-r from-emerald-700 to-teal-900 py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-white blur-3xl" />
                </div>
                <div className="relative z-10">
                    <Breadcrumb items={[{ label: "Holidays" }]} />
                    <h1 className="text-4xl md:text-5xl font-[Poppins] font-bold text-white">Holidays</h1>
                </div>
            </section>

            {/* Content */}
            <section className="py-14 bg-bg-primary">
                <div className="max-w-[1400px] mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-[Poppins] font-bold text-text-primary mb-3">
                        Holiday Packages from Dubai, UAE
                    </h2>
                    <h3 className="text-lg font-[Poppins] font-semibold text-primary mb-3">
                        Unforgettable Holiday Packages from Dubai: Explore, Relax, Discover
                    </h3>
                    <p className="text-text-secondary max-w-3xl mb-10">
                        Discover a world of wonder with WB Tourism&apos;s incredible holiday packages from Dubai. Explore breathtaking destinations, experience rich cultures, and unwind in paradise. Find your perfect vacation package – unforgettable memories await!
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {holidays.map((pkg) => (
                            <div key={pkg.slug} className="bg-white rounded-xl shadow-md card-hover overflow-hidden flex flex-col">
                                <div className="relative h-52 w-full bg-gray-100">
                                    <Image
                                        src={(pkg.image as any)?.asset ? urlFor(pkg.image).width(600).url() : pkg.image}
                                        alt={pkg.name}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        className="object-cover"
                                    />
                                    {pkg.badge && (
                                        <span className="absolute top-3 left-3 px-3 py-1 bg-accent-red text-white text-[10px] font-bold uppercase rounded tracking-wider z-10">
                                            {pkg.badge}
                                        </span>
                                    )}
                                </div>
                                <div className="p-4 flex flex-col flex-1">
                                    <div className="flex items-center gap-1 text-secondary text-sm mb-1">
                                        <FiClock size={13} />
                                        <span>{pkg.duration}</span>
                                    </div>
                                    <h3 className="font-[Poppins] font-semibold text-text-primary mb-2 text-base">
                                        {pkg.name}
                                    </h3>
                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="font-[Poppins] font-bold text-text-primary text-lg">
                                            <span className="text-sm text-text-muted">AED</span> {pkg.price.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <Link href={`/contact?service=holiday&package=${pkg.slug}`} className="px-4 py-2 bg-secondary text-white text-sm font-semibold rounded-lg hover:bg-secondary-hover transition-colors">
                                            Get Quote
                                        </Link>
                                        <Link href={`/holidays/${pkg.destination?.toLowerCase() || 'unknown'}/${pkg.slug}`} className="px-4 py-2 bg-accent-red text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-colors">
                                            View Details
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
