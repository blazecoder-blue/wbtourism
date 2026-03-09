import { defineField, defineType } from "sanity";

export const visa = defineType({
    name: "visa",
    title: "Visa",
    type: "document",
    fields: [
        defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
        defineField({ name: "country", title: "Country", type: "string", validation: (r) => r.required() }),
        defineField({
            name: "region",
            title: "Region",
            type: "string",
            options: {
                list: [
                    { title: "Africa", value: "africa" },
                    { title: "Asia", value: "asia" },
                    { title: "Europe", value: "europe" },
                    { title: "Middle East", value: "middle-east" },
                    { title: "Latin America", value: "latin-america" },
                    { title: "Australia", value: "australia" },
                    { title: "Canada", value: "canada" },
                    { title: "USA", value: "usa" },
                    { title: "CIS", value: "cis" },
                ],
            },
            validation: (r) => r.required(),
        }),
        defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
        defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
        defineField({ name: "description", title: "Description", type: "array", of: [{ type: "block" }] }),
        defineField({ name: "price", title: "Starting Price (AED)", type: "number" }),
        defineField({ name: "processingTime", title: "Processing Time", type: "string" }),
        defineField({ name: "validity", title: "Validity", type: "string" }),
        defineField({
            name: "requirements",
            title: "Requirements",
            type: "array",
            of: [{ type: "string" }],
        }),
    ],
    preview: {
        select: { title: "name", subtitle: "region", media: "image" },
    },
});
