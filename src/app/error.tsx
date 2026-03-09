'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { FiRefreshCw, FiHome } from 'react-icons/fi';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-8 relative flex justify-center">
                    <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                        <span className="text-5xl">⚠️</span>
                    </div>
                </div>
                <h2 className="text-3xl font-[Poppins] font-bold text-text-primary mb-4">
                    Something went wrong!
                </h2 >
                <p className="text-text-secondary mb-8 leading-relaxed">
                    We apologize for the inconvenience. An unexpected error has occurred while processing your request.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => reset()}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-[Poppins] font-bold rounded-lg hover:bg-primary-hover transition-colors shadow-lg"
                    >
                        <FiRefreshCw /> Try Again
                    </button>
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-primary text-primary font-[Poppins] font-bold rounded-lg hover:bg-primary/5 transition-colors"
                    >
                        <FiHome /> Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
