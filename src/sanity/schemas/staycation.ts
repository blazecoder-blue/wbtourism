import { defineField, defineType } from "sanity";

export const staycation = defineType({
    name: "staycation",
    title: "Staycation",
    type: "document",
    fields: [
        defineField({ name: "name", title: "Hotel / Package Name", type: "string", validation: (r) => r.required() }),
        defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
        defineField({ name: "location", title: "Location", type: "string" }),
        defineField({ name: "duration", title: "Duration", type: "string" }),
        defineField({ name: "rating", title: "Star Rating", type: "number", validation: (r) => r.min(1).max(5) }),
        defineField({ name: "price", title: "Price per Night (AED)", type: "number", validation: (r) => r.required() }),
        defineField({ name: "badge", title: "Badge", type: "string", description: "e.g. Best Seller, Luxury Deals" }),
        defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
        defineField({ name: "description", title: "Description", type: "array", of: [{ type: "block" }] }),
    ],
    preview: {
        select: { title: "name", subtitle: "location", media: "image" },
    },
});
