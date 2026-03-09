import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST;
const smtpPort = parseInt(process.env.SMTP_PORT || "465");
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for other ports
    auth: {
        user: smtpUser,
        pass: smtpPass,
    },
});

interface MailOptions {
    to: string;
    subject: string;
    text: string;
    html?: string;
}

export async function sendMail({ to, subject, text, html }: MailOptions) {
    try {
        const info = await transporter.sendMail({
            from: `"${process.env.NEXT_PUBLIC_SITE_NAME || 'WB Tourism'}" <${smtpUser}>`,
            to,
            subject,
            text,
            html: html || text.replace(/\n/g, "<br>"),
        });
        console.log("Message sent: %s", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}
