import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/client";
import { sendMail } from "@/lib/mail";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, subject, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required." },
                { status: 400 }
            );
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Please enter a valid email address." },
                { status: 400 }
            );
        }

        // Create document in Sanity
        const doc = {
            _type: "contactSubmission",
            name,
            email,
            phone: phone || "",
            subject: subject || "General Inquiry",
            message,
            submittedAt: new Date().toISOString(),
            status: "new",
        };

        await writeClient.create(doc);

        // Send Notification Email to Admin
        try {
            await sendMail({
                to: process.env.CONTACT_EMAIL_RECEIVER || "info@wbtourism.ae",
                subject: `New Contact Submission: ${subject || "General Inquiry"}`,
                text: `You have a new contact form submission:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nSubject: ${subject || "General Inquiry"}\n\nMessage:\n${message}`,
            });

            // Send Confirmation Email to User
            await sendMail({
                to: email,
                subject: "We received your message - WB Tourism",
                text: `Hi ${name},\n\nThank you for contacting WB Tourism. We have received your message regarding "${subject || "General Inquiry"}" and our team will get back to you shortly.\n\nBest regards,\nWB Tourism Team`,
            });
        } catch (mailError) {
            console.error("[Contact API] Mail Error:", mailError);
            // Still return success since the submission was saved to Sanity
        }

        return NextResponse.json(
            { success: true, message: "Your message has been sent successfully!" },
            { status: 201 }
        );
    } catch (error) {
        console.error("[Contact API] Error:", error);
        return NextResponse.json(
            { error: "Something went wrong. Please try again later." },
            { status: 500 }
        );
    }
}
