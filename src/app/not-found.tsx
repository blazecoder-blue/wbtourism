import Link from "next/link";
import { FiHome, FiSearch } from "react-icons/fi";

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-8 relative">
                    <h1 className="text-9xl font-bold text-primary/10">404</h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl">🏝️</span>
                    </div>
                </div>
                <h2 className="text-3xl font-[Poppins] font-bold text-text-primary mb-4">
                    Page Not Found
                </h2>
                <p className="text-text-secondary mb-8 leading-relaxed">
                    Oops! The page you are looking for has sailed away or doesn&apos;t exist.
                    Let&apos;s get you back on track.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-[Poppins] font-bold rounded-lg hover:bg-primary-hover transition-colors shadow-lg"
                    >
                        <FiHome /> Back to Home
                    </Link>
                    <Link
                        href="/contact"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-primary text-primary font-[Poppins] font-bold rounded-lg hover:bg-primary/5 transition-colors"
                    >
                        <FiSearch /> Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
}
