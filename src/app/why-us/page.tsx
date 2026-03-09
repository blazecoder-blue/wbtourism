import Link from "next/link";
import Image from "next/image";
import { SITE_NAME } from "@/lib/constants";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata = {
    title: "Why Us | WB Tourism",
    description: `Discover why ${SITE_NAME} is the best choice for all your travel needs.`,
};

export default function WhyUsPage() {
    return (
        <>
            <section className="bg-gradient-to-r from-primary to-accent-teal py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-20 w-80 h-80 rounded-full bg-white blur-3xl" />
                </div>
                <div className="relative z-10">
                    <Breadcrumb items={[{ label: "Why Us" }]} />
                    <h1 className="text-4xl md:text-5xl font-[Poppins] font-bold text-white">Why Choose Us</h1>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-[1400px] mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-[Poppins] font-bold text-text-primary mb-6">
                                The {SITE_NAME} Advantage
                            </h2>
                            <p className="text-text-secondary leading-relaxed mb-4">
                                We believe that travel is not just about moving from one place to another; it&apos;s about creating stories, experiences, and memories that last a lifetime.
                            </p>
                            <p className="text-text-secondary leading-relaxed">
                                Our platform offers a 360-degree seamlessly integrated travel experience with dedicated 24/7 support.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                                <Image src="/images/about/wb_office_exterior.jpg" alt="Advantage 1" fill className="object-cover" sizes="50vw" />
                            </div>
                            <div className="relative h-48 rounded-xl overflow-hidden shadow-lg mt-8 border border-gray-100">
                                <Image src="/images/about/wb_promo.jpg" alt="Advantage 2" fill className="object-cover" sizes="50vw" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-bg-primary rounded-xl overflow-hidden card-hover text-center shadow-sm">
                            <div className="relative h-48 w-full">
                                <Image src="/images/holidays/bali.jpg" alt="Global Reach" fill className="object-cover" sizes="33vw" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-[Poppins] font-bold text-text-primary mb-3">Global Reach</h3>
                                <p className="text-text-secondary text-sm">
                                    We provide access to worldwide destinations, offering exclusive deals on flights, hotels, and tours.
                                </p>
                            </div>
                        </div>
                        <div className="bg-bg-primary rounded-xl overflow-hidden card-hover text-center shadow-sm">
                            <div className="relative h-48 w-full">
                                <Image src="/images/activities/burj-khalifa.jpg" alt="Expert Team" fill className="object-cover" sizes="33vw" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-[Poppins] font-bold text-text-primary mb-3">Expert Team</h3>
                                <p className="text-text-secondary text-sm">
                                    Our travel consultants are industry veterans deeply passionate about crafting the perfect itinerary for you.
                                </p>
                            </div>
                        </div>
                        <div className="bg-bg-primary rounded-xl overflow-hidden card-hover text-center shadow-sm">
                            <div className="relative h-48 w-full">
                                <Image src="/images/holidays/turkey.jpg" alt="Customer Centric" fill className="object-cover" sizes="33vw" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-[Poppins] font-bold text-text-primary mb-3">Customer-Centric</h3>
                                <p className="text-text-secondary text-sm">
                                    Your satisfaction is our priority. Our dedicated team is available 24/7 to cater to your specific travel requirements.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
