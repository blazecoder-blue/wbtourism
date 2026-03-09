import Link from "next/link";
import Image from "next/image";
import { FiCalendar, FiArrowRight } from "react-icons/fi";
import { getBlogs } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata = {
    title: "Travel Blog 2026: Guides, Tips & Destinations | WB Tourism",
    description: "Explore the best 2026 travel guides, expert visa tips, and global holiday inspiration. Start your next adventure with WB Tourism today.",
};

export default async function BlogsPage() {
    const blogs = await getBlogs();

    return (
        <>
            {/* Banner */}
            <section className="bg-gradient-to-r from-purple-800 to-violet-900 py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-20 w-80 h-80 rounded-full bg-white blur-3xl" />
                </div>
                <div className="relative z-10">
                    <Breadcrumb items={[{ label: "Blog" }]} />
                    <h1 className="text-4xl md:text-5xl font-[Poppins] font-bold text-white">Blog</h1>
                </div>
            </section>

            {/* Content */}
            <section className="py-14 bg-bg-primary">
                <div className="max-w-[1400px] mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((post) => (
                            <article key={post.slug} className="bg-white rounded-xl shadow-md card-hover overflow-hidden flex flex-col">
                                <div className="relative h-52 w-full bg-gray-100">
                                    <Image
                                        src={(post.image as any)?.asset ? urlFor(post.image).width(600).url() : post.image}
                                        alt={post.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 text-text-muted text-sm mb-3">
                                        <FiCalendar size={14} />
                                        <span>{post.date}</span>
                                    </div>
                                    <h3 className="font-[Poppins] font-semibold text-text-primary text-base mb-2 line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-text-secondary line-clamp-3 mb-4 flex-1">
                                        {post.excerpt}
                                    </p>
                                    <Link href={`/blogs/${post.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-accent-red hover:text-primary transition-colors mt-auto">
                                        Read More <FiArrowRight size={14} />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
