import Image from "next/image";
import { SITE_NAME, CONTACT, STATS } from "@/lib/constants";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata = {
    title: "About Us | WB Tourism - Travel Management Company Since 2012",
    description: "Learn about WB Tourism, a premier travel management company with 13+ years of experience, serving 18+ countries with 474+ employees.",
};

const timeline = [
    { year: "2012", text: `${SITE_NAME} was established in Dubai, UAE, with a vision to provide world-class travel management services.` },
    { year: "2014", text: "Received first IATA accreditation and expanded operations across the Middle East." },
    { year: "2016", text: "Opened branches in Abu Dhabi and expanded visa services to 30+ countries." },
    { year: "2018", text: "Awarded as one of the leading travel management companies in the region." },
    { year: "2020", text: "Digital transformation — launched online booking platform and virtual consultation services." },
    { year: "2022", text: "Expanded to 18+ countries with ISO certification and 400+ employees." },
    { year: "2024", text: "Won Best Corporate Travel Management Company at the Arabian Travel Awards." },
];

export default function AboutPage() {
    return (
        <>
            {/* Banner */}
            <section className="bg-gradient-to-r from-primary to-primary-hover py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute bottom-0 left-20 w-96 h-96 rounded-full bg-white blur-3xl" />
                </div>
                <div className="relative z-10">
                    <Breadcrumb items={[{ label: "About Us" }]} />
                    <h1 className="text-4xl md:text-5xl font-[Poppins] font-bold text-white">About Us</h1>
                </div>
            </section>

            {/* About Content */}
            <section className="py-16 bg-white">
                <div className="max-w-[1400px] mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-[Poppins] font-bold text-text-primary mb-6">
                                About {SITE_NAME}
                            </h2>
                            <div className="prose prose-lg text-text-secondary leading-relaxed space-y-4">
                                <p>
                                    {SITE_NAME} is one of the region&apos;s leading travel management companies, headquartered in Dubai, UAE. With over 13 years of experience in the travel industry, we have established a strong presence across 18+ countries with dedicated employees serving a growing base of satisfied customers.
                                </p>
                                <p>
                                    We specialize in corporate travel management; Meetings, Incentives, Conferences, and Events (MICE); International & Domestic Holiday Packages; Worldwide Visa Assistance, Activities & Excursions, Worldwide Hotel Bookings, Airline Representation, Cruise Packages, Travel Insurance and Airport Transfers & Transportation.
                                </p>
                                <p>
                                    We ensure that our customers have access to the finest booking technology, analytics, global partnerships, and customer service in the industry. We offer end-to-end services that enable travelers to explore the world without hassle.
                                </p>
                            </div>
                        </div>
                        <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/images/about/wb_office_exterior.jpg"
                                alt="Waseem Baig Tourism LLC Office"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership */}
            <section className="py-16 bg-bg-primary">
                <div className="max-w-[1400px] mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                        <div className="bg-white rounded-xl p-8 shadow-md card-hover text-center">
                            <div className="relative w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-2 border-primary/20">
                                <Image src="/images/testimonials/avatar1.jpg" alt="Mr. Waleed Butt" fill sizes="100px" className="object-cover" />
                            </div>
                            <h3 className="font-[Poppins] font-bold text-text-primary text-xl mb-1">
                                Mr. Waleed Butt
                            </h3>
                            <p className="text-primary font-[Poppins] font-semibold text-sm mb-4">
                                Chairman and CEO
                            </p>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                Mr. Waleed Butt is the founder of {SITE_NAME}. His passion for service excellence has enabled us to work towards a customer-centered business model. His vision is to expand globally by providing the best available travel management service.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-8 shadow-md card-hover text-center">
                            <div className="relative w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-2 border-primary/20">
                                <Image src="/images/testimonials/avatar3.jpg" alt="Mr. Ahmad Hassan" fill sizes="100px" className="object-cover" />
                            </div>
                            <h3 className="font-[Poppins] font-bold text-text-primary text-xl mb-1">
                                Mr. Ahmad Hassan
                            </h3>
                            <p className="text-primary font-[Poppins] font-semibold text-sm mb-4">
                                Vice President
                            </p>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                Mr. Ahmad Hassan is the Vice President of {SITE_NAME}. Under his guidance, the company aims for new heights of growth and expansion. His focus is on operational excellence and turning every travel experience into a memorable journey.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-16 bg-white">
                <div className="max-w-[800px] mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-[Poppins] font-bold text-text-primary text-center mb-12">
                        Our History
                    </h2>
                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2" />
                        {timeline.map((item, i) => (
                            <div key={item.year} className={`relative flex items-start gap-6 mb-10 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-[Poppins] font-bold text-sm z-10 relative">
                                    {item.year}
                                </div>
                                <div className="flex-1 bg-bg-primary rounded-xl p-5">
                                    <p className="text-sm text-text-secondary">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Achievements Counter */}
            <section className="py-16 bg-gradient-to-r from-bg-green via-emerald-600 to-bg-green">
                <div className="max-w-[1400px] mx-auto px-4">
                    <h2 className="text-3xl font-[Poppins] font-bold text-white text-center mb-12">
                        Our Achievements
                    </h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { value: "2012", label: "Year Of The Company" },
                            { value: "474+", label: "Employees" },
                            { value: "7500+", label: "Direct Contracts with Hotels" },
                            { value: "18+", label: "Countries" },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-4xl md:text-5xl font-[Poppins] font-bold text-accent-yellow mb-2">
                                    {stat.value}
                                </div>
                                <p className="text-sm font-[Poppins] font-semibold text-white uppercase tracking-wider">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
