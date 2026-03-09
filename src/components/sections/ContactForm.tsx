"use client";

import { useState, FormEvent } from "react";

interface ContactFormProps {
    variant?: "default" | "corporate";
    className?: string;
}

export default function ContactForm({ variant = "default", className = "" }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        setErrorMsg("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                setErrorMsg(data.error || "Something went wrong");
                setStatus("error");
                return;
            }

            setStatus("success");
            setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        } catch {
            setErrorMsg("Network error. Please check your connection.");
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className={`bg-white rounded-xl p-8 shadow-md text-center ${className}`}>
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">✓</span>
                </div>
                <h3 className="font-[Poppins] font-bold text-text-primary text-xl mb-2">
                    Message Sent!
                </h3>
                <p className="text-text-secondary mb-6">
                    Thank you for contacting us. Our team will get back to you within 24 hours.
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    className="px-6 py-2 bg-primary text-white font-[Poppins] font-semibold rounded-lg hover:bg-primary-hover transition-colors"
                >
                    Send Another Message
                </button>
            </div>
        );
    }

    return (
        <div className={`bg-white rounded-xl p-8 shadow-md ${className}`}>
            <h3 className="font-[Poppins] font-bold text-text-primary text-xl mb-6">
                {variant === "corporate" ? "Contact Our Expert Team" : "Leave A Message"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="contact-name" className="block text-sm text-text-secondary mb-1">
                            {variant === "corporate" ? "Your Name *" : "Full Name *"}
                        </label>
                        <input
                            id="contact-name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-primary bg-gray-50"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="contact-email" className="block text-sm text-text-secondary mb-1">Email *</label>
                        <input
                            id="contact-email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-primary bg-gray-50"
                            required
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="contact-phone" className="block text-sm text-text-secondary mb-1">Phone Number</label>
                        <input
                            id="contact-phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-primary bg-gray-50"
                        />
                    </div>
                    <div>
                        <label htmlFor="contact-subject" className="block text-sm text-text-secondary mb-1">Subject</label>
                        <select
                            id="contact-subject"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-primary bg-gray-50"
                        >
                            <option value="">Select Subject</option>
                            <option>Visa Inquiry</option>
                            <option>Holiday Package</option>
                            <option>Activity Booking</option>
                            <option>Corporate Travel</option>
                            <option>Cruise Inquiry</option>
                            <option>Umrah Packages</option>
                            <option>General Inquiry</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="contact-message" className="block text-sm text-text-secondary mb-1">Message *</label>
                    <textarea
                        id="contact-message"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary bg-gray-50 resize-none"
                        required
                    />
                </div>

                {status === "error" && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                        {errorMsg}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-3 bg-primary text-white font-[Poppins] font-semibold rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {status === "sending" ? "Sending..." : "Send Message"}
                </button>
            </form>
        </div>
    );
}
