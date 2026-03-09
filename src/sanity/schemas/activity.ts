import { defineField, defineType } from "sanity";

export const activity = defineType({
    name: "activity",
    title: "Activity",
    type: "document",
    fields: [
        defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
        defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
        defineField({ name: "duration", title: "Duration", type: "string" }),
        defineField({ name: "price", title: "Price (AED)", type: "number", validation: (r) => r.required() }),
        defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
        defineField({ name: "description", title: "Description", type: "array", of: [{ type: "block" }] }),
        defineField({
            name: "highlights",
            title: "Highlights",
            type: "array",
            of: [{ type: "string" }],
        }),
        defineField({ name: "location", title: "Location", type: "string" }),
    ],
    preview: {
        select: { title: "name", subtitle: "duration", media: "image" },
    },
});
