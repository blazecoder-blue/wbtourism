import { defineField, defineType } from "sanity";

export const blog = defineType({
    name: "blog",
    title: "Blog Post",
    type: "document",
    fields: [
        defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
        defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
        defineField({ name: "date", title: "Publish Date", type: "date", validation: (r) => r.required() }),
        defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
        defineField({ name: "image", title: "Featured Image", type: "image", options: { hotspot: true } }),
        defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }, { type: "image" }] }),
        defineField({ name: "category", title: "Category", type: "string" }),
    ],
    preview: {
        select: { title: "title", subtitle: "date", media: "image" },
    },
});
