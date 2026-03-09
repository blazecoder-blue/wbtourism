import { defineField, defineType } from "sanity";

export const cruise = defineType({
    name: "cruise",
    title: "Cruise",
    type: "document",
    fields: [
        defineField({ name: "name", title: "Cruise Line", type: "string", validation: (r) => r.required() }),
        defineField({ name: "ship", title: "Ship Name", type: "string", validation: (r) => r.required() }),
        defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "ship" }, validation: (r) => r.required() }),
        defineField({ name: "ports", title: "Number of Ports", type: "number" }),
        defineField({ name: "duration", title: "Duration (Nights)", type: "number" }),
        defineField({ name: "price", title: "Price (AED)", type: "number", validation: (r) => r.required() }),
        defineField({ name: "badge", title: "Badge", type: "string", description: "e.g. Most Popular, Luxury" }),
        defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
        defineField({ name: "description", title: "Description", type: "array", of: [{ type: "block" }] }),
        defineField({
            name: "destination",
            title: "Destination",
            type: "string",
            options: {
                list: [
                    { title: "Arabian Gulf", value: "arabian-gulf" },
                    { title: "Mediterranean", value: "mediterranean" },
                    { title: "Caribbean", value: "caribbean" },
                    { title: "Northern Europe", value: "northern-europe" },
                ],
            },
        }),
        defineField({
            name: "departureMonth",
            title: "Departure Month",
            type: "string",
        }),
    ],
    preview: {
        select: { title: "ship", subtitle: "name", media: "image" },
    },
});
