import { defineField, defineType } from "sanity";

export const contactSubmission = defineType({
    name: "contactSubmission",
    title: "Contact Submission",
    type: "document",
    fields: [
        defineField({ name: "name", title: "Full Name", type: "string", readOnly: true }),
        defineField({ name: "email", title: "Email", type: "string", readOnly: true }),
        defineField({ name: "phone", title: "Phone", type: "string", readOnly: true }),
        defineField({ name: "subject", title: "Subject", type: "string", readOnly: true }),
        defineField({ name: "message", title: "Message", type: "text", readOnly: true }),
        defineField({ name: "submittedAt", title: "Submitted At", type: "datetime", readOnly: true }),
        defineField({
            name: "status",
            title: "Status",
            type: "string",
            initialValue: "new",
            options: {
                list: [
                    { title: "New", value: "new" },
                    { title: "Read", value: "read" },
                    { title: "Replied", value: "replied" },
                ],
            },
        }),
    ],
    preview: {
        select: { title: "name", subtitle: "submittedAt" },
    },
    orderings: [
        { title: "Newest First", name: "submittedAtDesc", by: [{ field: "submittedAt", direction: "desc" }] },
    ],
});
