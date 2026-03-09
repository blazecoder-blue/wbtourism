import type { Metadata } from "next";
import { Poppins, Dancing_Script, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const dancingScript = Dancing_Script({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
});

const inter = Inter({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WB Tourism | Travel Management Company in Dubai, UAE",
  description:
    "WB Tourism is a leading travel management company in Dubai, UAE offering visa services, holiday packages, activities, corporate travel, and cruise deals worldwide.",
  keywords:
    "visa services dubai, holiday packages uae, activities dubai, corporate travel, cruise packages, travel agency dubai",
  openGraph: {
    title: "WB Tourism | Travel Management Company in Dubai",
    description:
      "Discover the world with WB Tourism. Expert visa services, curated holiday packages, exciting activities, and seamless corporate travel solutions.",
    type: "website",
    locale: "en_AE",
    siteName: "WB Tourism",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${dancingScript.variable} ${inter.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-bg-primary font-sans text-text-primary">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[9999] px-4 py-2 bg-primary text-white font-bold rounded-md">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="pt-[104px] flex-grow select-auto">{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
