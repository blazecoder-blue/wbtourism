import { MetadataRoute } from "next";
import {
    VISAS,
    HOLIDAYS,
    ACTIVITIES,
    POPULAR_CRUISES,
    STAYCATIONS,
    BLOGS,
} from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://wbtourism.ae";

    // Static routes
    const staticRoutes = [
        "",
        "/about-us",
        "/activities",
        "/blogs",
        "/contact",
        "/corporate-travel",
        "/cruise",
        "/holidays",
        "/our-services",
        "/payment-partners",
        "/staycation",
        "/travel-insurance",
        "/umrah",
        "/visa",
        "/why-us",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    // Dynamic routes (initially from constants)
    const visaRoutes = VISAS.map((v) => ({
        url: `${baseUrl}/visa/${v.region}/${v.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    const holidayRoutes = HOLIDAYS.map((h) => ({
        url: `${baseUrl}/holidays/${h.destination.toLowerCase()}/${h.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    const activityRoutes = ACTIVITIES.map((a) => ({
        url: `${baseUrl}/activities/${a.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    const cruiseRoutes = POPULAR_CRUISES.map((c) => ({
        url: `${baseUrl}/cruise/${c.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    const staycationRoutes = STAYCATIONS.map((s) => ({
        url: `${baseUrl}/staycation/${s.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    const blogRoutes = BLOGS.map((b) => ({
        url: `${baseUrl}/blogs/${b.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    return [
        ...staticRoutes,
        ...visaRoutes,
        ...holidayRoutes,
        ...activityRoutes,
        ...cruiseRoutes,
        ...staycationRoutes,
        ...blogRoutes,
    ];
}
