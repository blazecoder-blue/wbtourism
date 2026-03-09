import Link from "next/link";
import Image from "next/image";
import { FiClock } from "react-icons/fi";
import { getActivities } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata = {
    title: "Activities & Tours in Dubai, UAE | WB Tourism",
    description: "Book exciting activities in Dubai & Abu Dhabi – desert safaris, city tours, theme parks, water sports, and more. Best prices guaranteed.",
};

export default async function ActivitiesPage() {
    const activities = await getActivities();

    return (
        <>
            {/* Banner */}
            <section className="bg-gradient-to-r from-orange-700 to-amber-900 py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-20 w-80 h-80 rounded-full bg-white blur-3xl" />
                </div>
                <div className="relative z-10">
                    <Breadcrumb items={[{ label: "Activities" }]} />
                    <h1 className="text-4xl md:text-5xl font-[Poppins] font-bold text-white">Activities</h1>
                </div>
            </section>

            {/* Content */}
            <section className="py-14 bg-bg-primary">
                <div className="max-w-[1400px] mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-[Poppins] font-bold text-text-primary mb-8">
                        Dubai Tour Activities
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {activities.map((activity) => (
                            <div key={activity.slug} className="bg-white rounded-xl shadow-md card-hover overflow-hidden flex flex-col">
                                <div className="relative h-48 w-full bg-gray-100">
                                    <Image
                                        src={(activity.image as any)?.asset ? urlFor(activity.image).width(600).url() : activity.image}
                                        alt={activity.name}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        className="object-cover"
                                    />
                                    <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-accent-red hover:bg-accent-red hover:text-white transition-colors z-10" aria-label="Add to wishlist">
                                        ♡
                                    </button>
                                </div>
                                <div className="p-4 flex flex-col flex-1">
                                    <div className="flex items-center gap-1 text-secondary text-sm mb-1">
                                        <FiClock size={13} />
                                        <span>{activity.duration}</span>
                                    </div>
                                    <h3 className="font-[Poppins] font-semibold text-text-primary mb-2 text-base">
                                        {activity.name}
                                    </h3>
                                    <div className="flex items-center justify-between mt-auto pt-4">
                                        <span className="font-[Poppins] font-bold text-text-primary text-lg">
                                            <span className="text-sm text-text-muted">AED</span> {activity.price}
                                        </span>
                                        <Link href={`/activities/${activity.slug}`} className="px-4 py-2 bg-accent-red text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-colors">
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
