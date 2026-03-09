import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
    name: "siteSettings",
    title: "Site Settings",
    type: "document",
    fields: [
        defineField({ name: "siteName", title: "Site Name", type: "string" }),
        defineField({ name: "tagline", title: "Tagline", type: "string" }),
        defineField({ name: "description", title: "Site Description", type: "text" }),
        defineField({ name: "logo", title: "Logo", type: "image" }),
        defineField({
            name: "contact",
            title: "Contact Info",
            type: "object",
            fields: [
                { name: "phone", title: "Phone", type: "string" },
                { name: "email", title: "Email", type: "string" },
                { name: "address", title: "Address", type: "text" },
                { name: "whatsapp", title: "WhatsApp URL", type: "url" },
            ],
        }),
        defineField({
            name: "social",
            title: "Social Links",
            type: "object",
            fields: [
                { name: "facebook", title: "Facebook", type: "url" },
                { name: "instagram", title: "Instagram", type: "url" },
                { name: "youtube", title: "YouTube", type: "url" },
                { name: "tiktok", title: "TikTok", type: "url" },
            ],
        }),
    ],
    preview: {
        prepare() {
            return { title: "Site Settings" };
        },
    },
});
