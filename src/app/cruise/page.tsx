import { getCruises } from "@/sanity/fetch";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CruiseSection from "@/components/sections/CruiseSection";

export const metadata = {
    title: "Cruise Holiday Packages from Dubai, UAE | WB Tourism",
    description: "Explore luxury cruise packages from Dubai. Book 2026 Arabian Gulf & global voyages. Best prices, top liners & all-inclusive deals.",
};

export default async function CruisePage() {
    const cruises = await getCruises();

    return (
        <>
            {/* Banner */}
            <section className="bg-gradient-to-r from-sky-700 to-blue-900 py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl" />
                </div>
                <div className="relative z-10">
                    <Breadcrumb items={[{ label: "Cruise" }]} />
                    <h1 className="text-4xl md:text-5xl font-[Poppins] font-bold text-white">Cruise</h1>
                </div>
            </section>

            {/* Cruise Listings & Search */}
            <CruiseSection cruises={cruises} />
        </>
    );
}
