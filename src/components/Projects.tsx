"use client";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

const projects = [
  {
    title: "WinVolAuto Memory Forensics",
    description: "Professional GUI for Volatility 3 with AI-powered risk scoring and MITRE ATT&CK mapping. Analyzes memory dumps to detect hidden rootkits and malicious processes.",
    tech: ["Python", "PyQt6", "Volatility 3", "AI Heuristics"],
    github: "https://github.com/SKYLINE217/WinVolAuto-Memory-Forensics-Suite",
    accent: "#00FF41",
  },
  {
    title: "Real-Time Fraud Detection",
    description: "Machine learning system utilizing Random Forest classifier and SHAP explainability. Features a Flask REST API and a real-time Streamlit monitoring dashboard.",
    tech: ["Python", "Scikit-learn", "Flask", "Streamlit", "SHAP"],
    github: "https://github.com/SKYLINE217/AI-IN-CYBER-SECURITY",
    accent: "#00E5FF",
  },
  {
    title: "Blockchain Credential System",
    description: "Tamper-proof academic credential issuance platform leveraging immutable ledgers. Ensures verification using SHA-256 cryptographic hashing.",
    tech: ["React", "MongoDB", "Blockchain", "JWT", "SHA-256"],
    github: "https://github.com/SKYLINE217/blockchain--BATA-",
    accent: "#9D4EDD",
  },
  {
    title: "F1 Race Replay",
    description: "Full-featured Formula 1 race replay simulator powered by FastF1. Reconstructs real lap-by-lap telemetry, battle sequences, and overtakes with animated race visualizations and driver position charts.",
    tech: ["Python", "FastF1", "Matplotlib", "Pandas", "NumPy"],
    github: "https://github.com/SKYLINE217/f1-race-replay",
    accent: "#FF3131",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className="glass-card"
      style={{
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "border-color 0.4s, box-shadow 0.4s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${project.accent}33`;
        e.currentTarget.style.boxShadow = `0 0 40px ${project.accent}10, inset 0 0 40px ${project.accent}05`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Top accent line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${project.accent}, transparent)`, opacity: 0.5 }} />

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div style={{ padding: "10px", borderRadius: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <svg width="24" height="24" fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#6b7280", transition: "color 0.3s", padding: "4px" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#6b7280"; }}
          >
            <FaGithub size={18} />
          </a>
          <a
            href="#"
            style={{ color: "#6b7280", transition: "color 0.3s", padding: "4px" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#00E5FF"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#6b7280"; }}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7,7 17,7 17,17" />
            </svg>
          </a>
        </div>
      </div>

      {/* Title */}
      <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#fff", marginBottom: "12px", transition: "color 0.3s" }}>
        {project.title}
      </h3>

      {/* Description */}
      <p style={{ color: "rgba(156,163,175,0.8)", fontSize: "14px", lineHeight: 1.7, marginBottom: "24px", flex: 1 }}>
        {project.description}
      </p>

      {/* Tech tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {project.tech.map((t) => (
          <span
            key={t}
            style={{
              fontFamily: "'Fira Code', monospace",
              fontSize: "11px",
              color: "rgba(0,229,255,0.6)",
              background: "rgba(0,229,255,0.05)",
              border: "1px solid rgba(0,229,255,0.1)",
              padding: "4px 10px",
              borderRadius: "6px",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" style={{ padding: "120px 0", width: "100%", position: "relative", zIndex: 10, background: "#030308" }}>
      <div className="section-divider" />
      <div className="grid-pattern" style={{ position: "absolute", inset: 0, opacity: 0.25 }} />
      <div className="gradient-orb" style={{ width: 500, height: 500, background: "#00E5FF", top: -200, left: "50%", transform: "translateX(-50%)" }} />

      <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "64px" }}
        >
          <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em" }}>
            <span style={{ fontFamily: "'Fira Code', monospace", fontSize: "clamp(1.2rem, 2.5vw, 1.75rem)", color: "#00FF41", marginRight: "12px", fontWeight: 400 }}>02.</span>
            Featured Projects
          </h2>
          <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, #1f2937, transparent)" }} />
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
