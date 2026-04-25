"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Resume() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  return (
    <section
      id="resume"
      ref={sectionRef}
      style={{
        padding: "120px 0",
        width: "100%",
        position: "relative",
        zIndex: 10,
        background: "#030308",
        overflow: "hidden",
      }}
    >
      <div className="section-divider" />
      <div className="dot-pattern" style={{ position: "absolute", inset: 0, opacity: 0.15 }} />
      <div className="gradient-orb" style={{ width: 500, height: 500, background: "#00E5FF", top: -150, right: -100 }} />
      <div className="gradient-orb" style={{ width: 400, height: 400, background: "#9D4EDD", bottom: -150, left: -100 }} />

      <div style={{ position: "relative", maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "56px" }}
        >
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.03em",
            }}
          >
            <span
              style={{
                fontFamily: "'Fira Code', monospace",
                fontSize: "clamp(1.2rem, 2.5vw, 1.75rem)",
                color: "#00E5FF",
                marginRight: "12px",
                fontWeight: 400,
              }}
            >
              04.
            </span>
            Resume
          </h2>
          <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, #1f2937, transparent)" }} />
        </motion.div>

        {/* Terminal label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            fontFamily: "'Fira Code', monospace",
            fontSize: "13px",
            color: "#00FF41",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={{ color: "#6b7280" }}>$</span>
          <span>cat ./resume/Sumit_Kumar_Khadanga.pdf</span>
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "16px",
              background: "#00FF41",
              marginLeft: "2px",
              animation: "pulse 1.2s step-end infinite",
            }}
          />
        </motion.div>

        {/* PDF viewer card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-card"
          style={{
            overflow: "hidden",
            border: "1px solid rgba(0,229,255,0.12)",
            boxShadow: "0 0 60px rgba(0,229,255,0.04), 0 0 120px rgba(157,78,221,0.04)",
          }}
        >
          {/* Window chrome bar */}
          <div
            style={{
              background: "rgba(12,12,20,0.95)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              padding: "12px 20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
            <span
              style={{
                marginLeft: "12px",
                fontFamily: "'Fira Code', monospace",
                fontSize: "12px",
                color: "#6b7280",
              }}
            >
              resume.pdf — viewer
            </span>
          </div>

          {/* PDF embed — using <object> instead of <iframe> so X-Frame-Options never applies */}
          <div style={{ position: "relative", width: "100%", height: "820px", background: "#0a0a12" }}>
            {!loaded && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "16px",
                  color: "#6b7280",
                  fontFamily: "'Fira Code', monospace",
                  fontSize: "13px",
                  zIndex: 5,
                }}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  style={{ animation: "spin 1.2s linear infinite" }}
                  fill="none"
                >
                  <circle cx="20" cy="20" r="16" stroke="rgba(0,229,255,0.15)" strokeWidth="3" />
                  <path
                    d="M20 4a16 16 0 0 1 16 16"
                    stroke="#00E5FF"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                Loading document…
              </div>
            )}
            <object
              data="/resume.pdf"
              type="application/pdf"
              width="100%"
              height="100%"
              style={{
                border: "none",
                display: "block",
                opacity: loaded ? 1 : 0,
                transition: "opacity 0.5s ease",
              }}
              onLoad={() => setLoaded(true)}
            >
              {/* Fallback for browsers that can't render PDF inline */}
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", height: "100%", gap: "16px",
                color: "#6b7280", fontFamily: "'Fira Code', monospace", fontSize: "13px",
              }}>
                <span style={{ fontSize: "32px" }}>📄</span>
                <p>Your browser cannot display PDFs inline.</p>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
                  style={{ color: "#00E5FF", textDecoration: "none" }}>
                  Open Resume →
                </a>
              </div>
            </object>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          style={{
            marginTop: "32px",
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* Download */}
          <a
            href="/resume.pdf"
            download="Sumit_Kumar_Khadanga_Resume.pdf"
            id="resume-download-btn"
            className="glow-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 32px",
              border: "1px solid rgba(0,229,255,0.3)",
              borderRadius: "12px",
              background: "transparent",
              color: "#00E5FF",
              fontFamily: "'Fira Code', monospace",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              cursor: "pointer",
              letterSpacing: "0.04em",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Resume
          </a>

          {/* Open in new tab */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            id="resume-open-btn"
            className="glow-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 32px",
              border: "1px solid rgba(0,255,65,0.25)",
              borderRadius: "12px",
              background: "transparent",
              color: "#00FF41",
              fontFamily: "'Fira Code', monospace",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              cursor: "pointer",
              letterSpacing: "0.04em",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Open Full Screen
          </a>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
