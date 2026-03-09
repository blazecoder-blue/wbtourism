import Breadcrumb from "@/components/ui/Breadcrumb";
import VisaGrid from "@/components/sections/VisaGrid";
import { getVisas } from "@/sanity/fetch";

export const metadata = {
    title: "Visa Services from Dubai | WB Tourism",
    description: "Expert visa processing services from Dubai, UAE. We assist with tourist, business, and transit visas for over 100 countries.",
};

export default async function VisaPage() {
    const visas = await getVisas();

    return (
        <>
            {/* Banner */}
            <section className="bg-gradient-to-r from-blue-800 to-indigo-900 py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 right-20 w-80 h-80 rounded-full bg-white blur-3xl" />
                </div>
                <div className="relative z-10">
                    <Breadcrumb items={[{ label: "Visa" }]} />
                    <h1 className="text-4xl md:text-5xl font-[Poppins] font-bold text-white">
                        Visa
                    </h1>
                </div>
            </section>

            {/* Content using Client Component for filtering */}
            <VisaGrid visas={visas} />
        </>
    );
}
