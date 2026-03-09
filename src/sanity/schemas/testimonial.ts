import { defineField, defineType } from "sanity";

export const testimonial = defineType({
    name: "testimonial",
    title: "Testimonial",
    type: "document",
    fields: [
        defineField({ name: "name", title: "Customer Name", type: "string", validation: (r) => r.required() }),
        defineField({ name: "avatar", title: "Avatar", type: "image", options: { hotspot: true } }),
        defineField({ name: "text", title: "Testimonial Text", type: "text", rows: 4, validation: (r) => r.required() }),
        defineField({ name: "rating", title: "Rating", type: "number", validation: (r) => r.min(1).max(5) }),
        defineField({ name: "service", title: "Service Used", type: "string", description: "e.g. Visa, Holiday, Corporate" }),
    ],
    preview: {
        select: { title: "name", subtitle: "service", media: "avatar" },
    },
});
