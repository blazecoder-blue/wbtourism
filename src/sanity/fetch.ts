import { client } from "./client";
import {
    allVisasQuery,
    visaBySlugQuery,
    allHolidaysQuery,
    holidayBySlugQuery,
    allActivitiesQuery,
    activityBySlugQuery,
    allCruisesQuery,
    cruiseBySlugQuery,
    allStaycationsQuery,
    staycationBySlugQuery,
    allBlogsQuery,
    blogBySlugQuery,
    allPressReleasesQuery,
    allTestimonialsQuery,
} from "./queries";
import {
    VISAS,
    HOLIDAYS,
    ACTIVITIES,
    POPULAR_CRUISES,
    STAYCATIONS,
    BLOGS,
    PRESS_RELEASES,
    TESTIMONIALS,
} from "@/lib/constants";

// Generic fetch with fallback
async function fetchWithFallback<T>(query: string, fallback: T, params?: Record<string, unknown>): Promise<T> {
    try {
        const data = await client.fetch(query, params ?? {});
        if (!data || (Array.isArray(data) && data.length === 0)) {
            return fallback;
        }
        return data as T;
    } catch {
        console.warn("[Sanity] Fetch failed, using fallback data");
        return fallback;
    }
}

// ──── Visa ────
export async function getVisas() {
    return fetchWithFallback(allVisasQuery, VISAS);
}

export async function getVisaBySlug(slug: string) {
    const fallback = VISAS.find((v) => v.slug === slug) || null;
    return fetchWithFallback(visaBySlugQuery, fallback, { slug });
}

// ──── Holiday ────
export async function getHolidays() {
    return fetchWithFallback(allHolidaysQuery, HOLIDAYS);
}

export async function getHolidayBySlug(slug: string) {
    const fallback = HOLIDAYS.find((h) => h.slug === slug) || null;
    return fetchWithFallback(holidayBySlugQuery, fallback, { slug });
}

// ──── Activity ────
export async function getActivities() {
    return fetchWithFallback(allActivitiesQuery, ACTIVITIES);
}

export async function getActivityBySlug(slug: string) {
    const fallback = ACTIVITIES.find((a) => a.slug === slug) || null;
    return fetchWithFallback(activityBySlugQuery, fallback, { slug });
}

// ──── Cruise ────
export async function getCruises() {
    return fetchWithFallback(allCruisesQuery, POPULAR_CRUISES);
}

export async function getCruiseBySlug(slug: string) {
    const fallback = POPULAR_CRUISES.find((c) => c.slug === slug) || null;
    return fetchWithFallback(cruiseBySlugQuery, fallback, { slug });
}

// ──── Staycation ────
export async function getStaycations() {
    return fetchWithFallback(allStaycationsQuery, STAYCATIONS);
}

export async function getStaycationBySlug(slug: string) {
    const fallback = STAYCATIONS.find((s) => s.slug === slug) || null;
    return fetchWithFallback(staycationBySlugQuery, fallback, { slug });
}

// ──── Blog ────
export async function getBlogs() {
    return fetchWithFallback(allBlogsQuery, BLOGS);
}

export async function getBlogBySlug(slug: string) {
    const fallback = BLOGS.find((b) => b.slug === slug) || null;
    return fetchWithFallback(blogBySlugQuery, fallback, { slug });
}

// ──── Press Release ────
export async function getPressReleases() {
    return fetchWithFallback(allPressReleasesQuery, PRESS_RELEASES);
}

// ──── Testimonial ────
export async function getTestimonials() {
    return fetchWithFallback(allTestimonialsQuery, TESTIMONIALS);
}
