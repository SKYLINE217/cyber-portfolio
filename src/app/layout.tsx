import type { Metadata } from "next";
import { Inter, Fira_Code, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import Navbar from "@/components/Navbar";
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fira",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sumit Kumar Khadanga | Cybersecurity Engineer & Digital Forensics Specialist",
  description:
    "Aspiring cybersecurity engineer specializing in digital forensics, malware analysis, memory forensics with Volatility 3, and secure software development.",
  keywords: ["cybersecurity", "digital forensics", "malware analysis", "penetration testing", "Volatility 3", "MITRE ATT&CK"],
  openGraph: {
    title: "Sumit Kumar Khadanga | Cybersecurity Engineer",
    description: "Building unbreachable systems and automated security tools.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`antialiased ${inter.variable} ${firaCode.variable} ${outfit.variable}`}>
      <body
        style={{
          background: "#020207",
          color: "#EAEAF2",
          fontFamily: "Outfit, var(--font-inter), system-ui, sans-serif",
        }}
      >
        {/* Ambient overlays */}
        <div className="scanlines" />
        <div className="noise-overlay" />

        <SmoothScrollProvider>
          <Navbar />
          {children}
        </SmoothScrollProvider>
        <Analytics />
      </body>
    </html>
  );
}
