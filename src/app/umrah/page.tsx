import Link from "next/link";
import Image from "next/image";
import { FiClock, FiMapPin, FiCheckCircle } from "react-icons/fi";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata = {
    title: "Umrah Packages | WB Tourism",
    description: "Book affordable and luxurious Umrah packages from UAE. Complete visa, flight, and hotel arrangements in Makkah and Madinah.",
};

const umrahPackages = [
    { name: "5 Days Economy Umrah Package", type: "Economy", duration: "5 Days", price: 1499, slug: "5-days-economy", image: "/images/umrah/makkah.png" },
    { name: "7 Days Gold Umrah Package (5 Star)", type: "Luxury", duration: "7 Days", price: 2899, slug: "7-days-gold", image: "/images/umrah/madinah.png" },
    { name: "10 Days Premium Umrah Package", type: "Premium", duration: "10 Days", price: 3499, slug: "10-days-premium", image: "/images/visas/saudi.jpg" },
    { name: "14 Days Family Umrah Package", type: "Family", duration: "14 Days", price: 4299, slug: "14-days-family", image: "/images/umrah/makkah.png" },
];

export default function UmrahPage() {
    return (
        <>
            {/* Banner */}
            <section className="bg-gradient-to-r from-emerald-800 to-green-950 py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-white blur-3xl" />
                </div>
                <div className="relative z-10">
                    <Breadcrumb items={[{ label: "Umrah" }]} />
                    <h1 className="text-4xl md:text-5xl font-[Poppins] font-bold text-white">Umrah Packages</h1>
                </div>
            </section>

            {/* Content */}
            <section className="py-14 bg-bg-primary">
                <div className="max-w-[1400px] mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-[Poppins] font-bold text-text-primary mb-3 text-center">
                        Spiritual Journeys from the UAE
                    </h2>
                    <p className="text-text-secondary max-w-3xl mx-auto text-center mb-12">
                        Experience a seamless spiritual journey with our expertly crafted Umrah packages. We handle everything from visa processing and flight bookings to premium accommodation close to the Haram in Makkah and Madinah.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {umrahPackages.map((pkg) => (
                            <div key={pkg.slug} className="bg-white rounded-xl shadow-md card-hover overflow-hidden">
                                <div className="relative h-52 w-full">
                                    <Image
                                        src={pkg.image}
                                        alt={pkg.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                                        className="object-cover"
                                    />
                                    <span className="absolute top-3 left-3 px-3 py-1 bg-green-600 text-white text-[10px] font-bold uppercase rounded tracking-wider z-10">
                                        {pkg.type}
                                    </span>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center gap-1 text-secondary text-sm mb-2">
                                        <FiClock size={13} />
                                        <span>{pkg.duration}</span>
                                    </div>
                                    <h3 className="font-[Poppins] font-semibold text-text-primary mb-3 text-base">
                                        {pkg.name}
                                    </h3>
                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="font-[Poppins] font-bold text-text-primary text-xl">
                                            <span className="text-sm text-text-muted">AED</span> {pkg.price.toLocaleString()}
                                        </span>
                                        <Link href={`/contact?service=umrah&package=${pkg.slug}`} className="px-5 py-2 bg-emerald-700 text-white text-sm font-semibold rounded-lg hover:bg-emerald-800 transition-colors">
                                            Book
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 bg-white rounded-xl shadow-md p-8 md:p-12 text-center max-w-4xl mx-auto border-t-4 border-emerald-700">
                        <h3 className="text-2xl font-[Poppins] font-bold text-text-primary mb-4">Need a Custom Umrah Package?</h3>
                        <p className="text-text-secondary mb-8">
                            We can tailor your Umrah itinerary based on your preferred dates, hotel categories, and airline choices. Connect with our Umrah experts today.
                        </p>
                        <a href="https://wa.me/971588759933" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 bg-[#25D366] text-white font-[Poppins] font-bold rounded-lg hover:bg-[#128C7E] transition-all shadow-lg text-lg">
                            WhatsApp Our Experts
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
