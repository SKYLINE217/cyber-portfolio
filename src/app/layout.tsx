import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import Navbar from "@/components/Navbar";

// Self-hosted via next/font — zero external font requests at runtime (GDPR-safe)
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fira",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sumit Kumar Khadanga | Cyber-Forensics Portfolio",
  description:
    "Aspiring cybersecurity engineer specializing in digital forensics, malware analysis, and secure software development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`antialiased ${inter.variable} ${firaCode.variable}`}>
      <body
        style={{
          background: "#030308",
          color: "#e0e0e8",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
        }}
      >
        <div className="scanlines" />
        <SmoothScrollProvider>
          <Navbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
