import Link from "next/link";
import Image from "next/image";
import { FiCalendar, FiArrowRight } from "react-icons/fi";
import { urlFor } from "@/sanity/image";

/* ──── BLOG SECTION ──── */
export function BlogSection({ blogs = [] }: { blogs: any[] }) {
    if (!blogs || blogs.length === 0) return null;

    return (
        <section className="py-14 bg-bg-primary">
            <div className="max-w-[1400px] mx-auto px-4">
                <p className="text-center font-[Dancing_Script] text-primary text-2xl mb-2">
                    Our Blog
                </p>
                <h2 className="text-3xl md:text-4xl font-[Poppins] font-bold text-text-primary text-center mb-4">
                    Travel Tips And Advice
                </h2>
                <p className="text-center text-text-secondary max-w-2xl mx-auto mb-10">
                    Stay updated with the latest travel tips, destination guides, and insider advice from our experienced travel consultants.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((post) => (
                        <article key={post.slug} className="bg-white rounded-xl shadow-md card-hover overflow-hidden flex flex-col">
                            <div className="relative h-52 w-full bg-gray-100">
                                <Image
                                    src={post.image?.asset ? urlFor(post.image).width(600).url() : post.image}
                                    alt={post.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 text-text-muted text-sm mb-3">
                                    <FiCalendar size={14} />
                                    <span>{post.date}</span>
                                </div>
                                <h3 className="font-[Poppins] font-semibold text-text-primary text-base mb-2 line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-text-secondary line-clamp-2 mb-4 flex-1">
                                    {post.excerpt}
                                </p>
                                <Link
                                    href={`/blogs/${post.slug}`}
                                    className="inline-flex items-center gap-1 text-sm font-semibold text-accent-red hover:text-primary transition-colors mt-auto"
                                >
                                    Read More <FiArrowRight size={14} />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ──── PRESS RELEASES SECTION ──── */
export function PressReleasesSection({ pressReleases = [] }: { pressReleases: any[] }) {
    if (!pressReleases || pressReleases.length === 0) return null;

    return (
        <section className="py-14 bg-white">
            <div className="max-w-[1400px] mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-[Poppins] font-bold text-text-primary text-center mb-10">
                    Press Release
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pressReleases.map((pr) => (
                        <article key={pr.slug} className="bg-white rounded-xl border border-gray-100 shadow-sm card-hover overflow-hidden flex flex-col">
                            <div className="relative h-48 w-full bg-gray-100">
                                <Image
                                    src={pr.image?.asset ? urlFor(pr.image).width(600).url() : pr.image}
                                    alt={pr.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 text-text-muted text-sm mb-3">
                                    <FiCalendar size={14} />
                                    <span>{pr.date}</span>
                                </div>
                                <h3 className="font-[Poppins] font-semibold text-text-primary text-base line-clamp-2">
                                    {pr.title}
                                </h3>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
