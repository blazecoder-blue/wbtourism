import { defineField, defineType } from "sanity";

export const pressRelease = defineType({
    name: "pressRelease",
    title: "Press Release",
    type: "document",
    fields: [
        defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
        defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
        defineField({ name: "date", title: "Date", type: "date", validation: (r) => r.required() }),
        defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
        defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }] }),
    ],
    preview: {
        select: { title: "title", subtitle: "date", media: "image" },
    },
});
