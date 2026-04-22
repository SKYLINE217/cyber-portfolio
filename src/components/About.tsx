"use client";

import { motion } from "framer-motion";

const highlights = [
  {
    icon: "🛡️",
    title: "Cyber Defense",
    description: "Vulnerability assessment, penetration testing, and hardening systems against evolving threats.",
  },
  {
    icon: "🔍",
    title: "Digital Forensics",
    description: "Memory forensics with Volatility, disk imaging, and evidence chain analysis.",
  },
  {
    icon: "🐛",
    title: "Malware Analysis",
    description: "Static and dynamic analysis of malware samples, reverse engineering, and threat intelligence.",
  },
  {
    icon: "💻",
    title: "Secure Development",
    description: "Building applications with security-first principles, secure coding practices, and CI/CD pipelines.",
  },
];

export default function About() {
  return (
    <section id="about" style={{ padding: "120px 0", width: "100%", position: "relative", zIndex: 10, background: "#030308" }}>
      <div className="section-divider" />
      <div className="dot-pattern" style={{ position: "absolute", inset: 0, opacity: 0.15 }} />
      <div className="gradient-orb" style={{ width: 500, height: 500, background: "#00FF41", top: 0, right: -200 }} />

      <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "64px" }}
        >
          <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em" }}>
            <span style={{ fontFamily: "'Fira Code', monospace", fontSize: "clamp(1.2rem, 2.5vw, 1.75rem)", color: "#00E5FF", marginRight: "12px", fontWeight: 400 }}>01.</span>
            About Me
          </h2>
          <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, #1f2937, transparent)" }} />
        </motion.div>

        <div style={{ display: "flex", flexDirection: "row", gap: "48px", flexWrap: "wrap" }}>
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ flex: "1 1 480px", minWidth: "300px" }}
          >
            <div className="glass-card" style={{ padding: "32px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, #00FF41, #00E5FF)", opacity: 0.5 }} />

              <div style={{ fontFamily: "'Fira Code', monospace", fontSize: "12px", color: "rgba(0,255,65,0.5)", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00FF41", display: "inline-block", animation: "pulse 2s infinite" }} />
                about.txt
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px", color: "rgba(156,163,175,0.9)", fontSize: "15px", lineHeight: 1.75 }}>
                <p>
                  Hello! I&apos;m <span style={{ color: "#fff", fontWeight: 500 }}>Sumit Kumar Khadanga</span>, a final-year
                  <span style={{ color: "#00E5FF" }}> B.Tech Cybersecurity</span> student at NIIT University with a deep passion for
                  understanding how systems break — and how to make them unbreakable.
                </p>
                <p>
                  My journey into cybersecurity began with a fascination for how digital threats evolve. Today, I specialize in
                  <span style={{ color: "#00FF41" }}> memory forensics</span>, <span style={{ color: "#00FF41" }}>malware analysis</span>, and
                  building automated security tools that make defenders&apos; lives easier.
                </p>
                <p>
                  When I&apos;m not analyzing memory dumps or writing detection rules, you&apos;ll find me participating in CTFs,
                  contributing to open-source security tools, and staying up-to-date with the latest threat landscape.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Highlights Grid */}
          <div style={{ flex: "1 1 480px", minWidth: "300px", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass-card"
                style={{ padding: "24px", cursor: "default", transition: "border-color 0.3s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,229,255,0.2)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
              >
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>{h.icon}</div>
                <h3 style={{ color: "#fff", fontWeight: 600, fontSize: "14px", marginBottom: "8px" }}>{h.title}</h3>
                <p style={{ color: "#6b7280", fontSize: "12px", lineHeight: 1.6 }}>{h.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
