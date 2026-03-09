import Link from "next/link";
import { FiChevronRight, FiHome } from "react-icons/fi";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
    return (
        <nav aria-label="Breadcrumb" className={`text-white/80 text-sm font-[Poppins] mb-4 flex items-center justify-center gap-2 ${className}`}>
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1" aria-label="Home">
                <FiHome size={14} />
                <span className="sr-only sm:not-sr-only">Home</span>
            </Link>

            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <div key={`${item.label}-${index}`} className="flex items-center gap-2">
                        <FiChevronRight size={14} className="opacity-60" />
                        {isLast || !item.href ? (
                            <span className="text-white font-medium" aria-current="page">
                                {item.label}
                            </span>
                        ) : (
                            <Link href={item.href} className="hover:text-white transition-colors">
                                {item.label}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
