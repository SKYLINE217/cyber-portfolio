import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Sumit Kumar Khadanga | Cyber-Forensics Portfolio",
  description: "Aspiring cybersecurity engineer specializing in digital forensics, malware analysis, and secure software development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ background: "#030308", color: "#e0e0e8", fontFamily: "'Inter', system-ui, sans-serif" }}>
        <div className="scanlines" />
        <SmoothScrollProvider>
          <Navbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
