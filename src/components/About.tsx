"use client";

import { motion } from "framer-motion";

/* ─── SVG Icons (no emoji) ──────────────────────────────── */
const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const BugIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2l1.88 1.88M14.12 3.88L16 2M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6z"/><path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M22 13h-4"/><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/>
  </svg>
);
const CodeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/>
  </svg>
);

const highlights = [
  {
    Icon: ShieldIcon,
    title: "Cyber Defense",
    description: "Vulnerability assessment, penetration testing, and hardening systems against evolving threats.",
    accent: "#00FF87",
    tag: "DEFENSE",
  },
  {
    Icon: SearchIcon,
    title: "Digital Forensics",
    description: "Memory forensics with Volatility 3, disk imaging, and evidence chain-of-custody analysis.",
    accent: "#00D4FF",
    tag: "FORENSICS",
  },
  {
    Icon: BugIcon,
    title: "Malware Analysis",
    description: "Static and dynamic analysis of malware samples, reverse engineering, and threat intelligence mapping.",
    accent: "#BF5FFF",
    tag: "THREAT INT",
  },
  {
    Icon: CodeIcon,
    title: "Secure Dev",
    description: "Building security-first applications with hardened APIs, automated scanning, and CI/CD pipelines.",
    accent: "#FFB800",
    tag: "DEV",
  },
];

const proficiencies = [
  { label: "Malware Analysis",       pct: 88, color: "#00FF87" },
  { label: "Memory Forensics",       pct: 92, color: "#00D4FF" },
  { label: "Penetration Testing",    pct: 80, color: "#BF5FFF" },
  { label: "Python / Secure Dev",    pct: 85, color: "#FFB800" },
];

export default function About() {
  return (
    <section
      id="about"
      style={{ padding: "130px 0", width: "100%", position: "relative", zIndex: 10, background: "var(--color-bg-void)" }}
    >
      <div className="section-divider" />
      <div className="dot-pattern" style={{ position: "absolute", inset: 0, opacity: 0.18 }} />

      {/* Orbs */}
      <div className="gradient-orb" style={{ width: 550, height: 550, background: "#00FF87", top: -100, right: -200, opacity: 0.07 }} />
      <div className="gradient-orb" style={{ width: 350, height: 350, background: "#BF5FFF", bottom: -100, left: -100, opacity: 0.08 }} />

      <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

        {/* ── Section heading ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.65, ease: [0.22,1,0.36,1] }}
          style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "72px" }}
        >
          <h2 className="display-md">
            <span className="section-number">01.</span>
            About Me
          </h2>
          <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, rgba(0,212,255,0.18), transparent)" }} />
        </motion.div>

        {/* ── Content grid ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "40px", marginBottom: "56px" }}>

          {/* Bio card */}
          <motion.div
            initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
          >
            <div className="bento-card" style={{ padding: "36px", height: "100%" }}>
              <div className="accent-line accent-line-green" />

              {/* Terminal header */}
              <div style={{
                fontFamily: "'Fira Code', monospace", fontSize: "11px",
                color: "rgba(0,255,135,0.4)", marginBottom: "28px",
                display: "flex", alignItems: "center", gap: "10px",
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: "#00FF87", display: "inline-block",
                  boxShadow: "0 0 8px rgba(0,255,135,0.8)",
                  animation: "pulse 2s infinite",
                }} />
                ~/about_me.txt
                <span style={{ marginLeft: "auto", color: "rgba(180,185,210,0.25)" }}>UTF-8</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "18px", color: "rgba(180,185,210,0.8)", fontSize: "15px", lineHeight: 1.8 }}>
                <p>
                  I&apos;m <span style={{ color: "#fff", fontWeight: 700 }}>Sumit Kumar Khadanga</span> — a final-year
                  <span style={{ color: "#00D4FF", fontWeight: 600 }}> B.Tech Cybersecurity</span> student at
                  NIIT University with a deep passion for understanding how systems break — and making them
                  <span style={{ color: "#00FF87", fontWeight: 600 }}> unbreakable</span>.
                </p>
                <p>
                  My journey began with a fascination for how digital threats evolve. Today I specialize in
                  <span style={{ color: "#00FF87", fontWeight: 600 }}> memory forensics</span>,
                  <span style={{ color: "#BF5FFF", fontWeight: 600 }}> malware analysis</span>, and
                  building automated tools that empower defenders.
                </p>
                <p>
                  When I&apos;m not dissecting memory dumps, you&apos;ll find me competing in CTFs,
                  contributing to open-source security tooling, and staying ahead of the threat landscape.
                </p>
              </div>

              {/* Proficiency bars */}
              <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{
                  fontFamily: "'Fira Code', monospace", fontSize: "10px",
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "rgba(180,185,210,0.35)", marginBottom: "6px",
                }}>Core Proficiencies</div>
                {proficiencies.map((p, i) => (
                  <div key={p.label}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "13px", color: "rgba(180,185,210,0.7)", fontWeight: 500 }}>{p.label}</span>
                      <span style={{ fontFamily: "'Fira Code', monospace", fontSize: "11px", color: p.color }}>{p.pct}%</span>
                    </div>
                    <div style={{ height: "3px", background: "rgba(255,255,255,0.05)", borderRadius: "2px", overflow: "hidden" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${p.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: i * 0.1 + 0.3, ease: [0.22,1,0.36,1] }}
                        style={{ height: "100%", background: `linear-gradient(90deg, ${p.color}, ${p.color}80)`, borderRadius: "2px" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Highlights bento grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22,1,0.36,1] }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bento-card"
                style={{ padding: "24px 22px", cursor: "default" }}
              >
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                  background: `linear-gradient(90deg, ${h.accent}, transparent)`,
                  opacity: 0.75,
                }} />

                {/* Tag */}
                <div style={{
                  fontFamily: "'Fira Code', monospace", fontSize: "8px",
                  letterSpacing: "0.22em", color: `${h.accent}70`,
                  marginBottom: "14px",
                }}>{h.tag}</div>

                {/* Icon */}
                <div style={{
                  width: 44, height: 44, borderRadius: "12px",
                  background: `${h.accent}10`,
                  border: `1px solid ${h.accent}25`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: h.accent, marginBottom: "14px",
                }}>
                  <h.Icon />
                </div>

                <h3 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "15px", fontWeight: 700, color: "#fff",
                  marginBottom: "8px",
                }}>{h.title}</h3>
                <p style={{
                  color: "rgba(180,185,210,0.55)",
                  fontSize: "12.5px", lineHeight: 1.65,
                }}>{h.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
