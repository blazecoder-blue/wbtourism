import { defineField, defineType } from "sanity";

export const holiday = defineType({
    name: "holiday",
    title: "Holiday Package",
    type: "document",
    fields: [
        defineField({ name: "name", title: "Package Name", type: "string", validation: (r) => r.required() }),
        defineField({ name: "destination", title: "Destination", type: "string", validation: (r) => r.required() }),
        defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
        defineField({ name: "duration", title: "Duration", type: "string" }),
        defineField({ name: "price", title: "Price (AED)", type: "number", validation: (r) => r.required() }),
        defineField({ name: "badge", title: "Badge", type: "string", description: "e.g. EID SPECIAL, POPULAR" }),
        defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
        defineField({ name: "description", title: "Description", type: "array", of: [{ type: "block" }] }),
        defineField({
            name: "inclusions",
            title: "Inclusions",
            type: "array",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "itinerary",
            title: "Itinerary",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "day", title: "Day", type: "string" },
                        { name: "title", title: "Title", type: "string" },
                        { name: "details", title: "Details", type: "text" },
                    ],
                },
            ],
        }),
    ],
    preview: {
        select: { title: "name", subtitle: "destination", media: "image" },
    },
});
