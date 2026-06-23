"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import DOMPurify from "dompurify";

const projects = [
  {
    title: "WinVolAuto Memory Forensics",
    short: "AI-Powered Memory Analysis",
    description: "Professional-grade desktop GUI for Volatility 3 automating memory forensics across Windows, Linux & macOS. Features dynamic plugin discovery, AI-driven risk scoring with heuristic analysis (code injection, hidden PIDs, network anomalies), MITRE ATT&CK mapping, and automated PDF/JSON report generation.",
    tech: ["Python", "PyQt6", "Volatility 3", "AI Heuristics", "MITRE ATT&CK"],
    github: "https://github.com/SKYLINE217/WinVolAuto-Memory-Forensics-Suite",
    repoId: "SKYLINE217/WinVolAuto-Memory-Forensics-Suite",
    accent: "#00FF87",
    category: "FORENSICS",
    featured: true,
  },
  {
    title: "CTF Decoder",
    short: "Adaptive Decoding Suite",
    description: "Self-learning, modular decoding engine for CTF competitions supporting 30+ codecs. Implements a Beta-Binomial Bayesian adaptive engine that improves detection accuracy across sessions, multi-stage entropy analysis, and a sandboxed Code Script Solver for Python, C & Java.",
    tech: ["Python", "FastAPI", "Vue 3", "SQLite", "Bayesian ML", "Vercel"],
    github: "https://github.com/SKYLINE217/CTF-Decoder",
    repoId: "SKYLINE217/CTF-Decoder",
    live: "https://ctf-decoder.vercel.app",
    accent: "#00D4FF",
    category: "SECURITY",
    featured: true,
  },
  {
    title: "Real-Time Fraud Detection",
    short: "ML-Powered Security Pipeline",
    description: "End-to-end ML pipeline with a Random Forest classifier optimised for high recall and SHAP explainability to detect fraudulent transactions in real time. Dual interfaces: a Flask REST API (/predict endpoint) and a Streamlit dashboard with live demo, audit logging & metrics.",
    tech: ["Python", "Scikit-learn", "SHAP", "Flask", "Streamlit"],
    github: "https://github.com/SKYLINE217/AI-IN-CYBER-SECURITY",
    repoId: "SKYLINE217/AI-IN-CYBER-SECURITY",
    accent: "#BF5FFF",
    category: "AI / ML",
    featured: true,
  },
  {
    title: "Blockchain Credential System",
    short: "Tamper-Proof BATA Platform",
    description: "Decentralized academic credential issuance & verification platform using cryptographic hashing and immutable ledger principles. JWT-authenticated React frontend with Flask backend, MongoDB storage, and hash-continuity verification across the credential chain.",
    tech: ["Python", "Flask", "React", "MongoDB", "SHA-256"],
    github: "https://github.com/SKYLINE217/blockchain--BATA-",
    repoId: "SKYLINE217/blockchain--BATA-",
    accent: "#FFB800",
    category: "BLOCKCHAIN",
    featured: false,
  },
  {
    title: "F1 Race Replay Simulator",
    short: "Telemetry Visualisation Engine",
    description: "Full-featured Formula 1 race replay simulator powered by FastF1. Reconstructs lap-by-lap telemetry, battle sequences, and overtakes with animated visualizations and driver position charts.",
    tech: ["Python", "FastF1", "Matplotlib", "Pandas", "NumPy"],
    github: "https://github.com/SKYLINE217/f1-race-replay",
    repoId: "SKYLINE217/f1-race-replay",
    accent: "#FF4B4B",
    category: "DATA VIZ",
    featured: false,
  },
];

type Project = typeof projects[0] & { live?: string };

/* ─── README Modal ──────────────────────────────────────────── */
function ReadmeModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [html, setHtml]       = useState<string | null>(null);
  const [error, setError]     = useState(false);
  const [loading, setLoading] = useState(true);
  const cache = useRef<Map<string, string>>(new Map());

  useEffect(() => {
    setHtml(null); setError(false); setLoading(true);
    if (cache.current.has(project.repoId)) {
      setHtml(cache.current.get(project.repoId)!); setLoading(false); return;
    }
    fetch(`/api/readme?repo=${encodeURIComponent(project.repoId)}`)
      .then(r => { if (!r.ok) throw new Error(); return r.text(); })
      .then(raw => {
        const clean = DOMPurify.sanitize(raw, { USE_PROFILES: { html: true }, ADD_TAGS: ["details","summary"] });
        cache.current.set(project.repoId, clean);
        setHtml(clean); setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, [project.repoId]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", h); };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(2,2,7,0.92)",
        backdropFilter: "blur(18px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: "900px", height: "85vh",
          background: "rgba(8,8,20,0.98)",
          border: `1px solid ${project.accent}28`,
          borderRadius: "24px",
          overflow: "hidden",
          display: "flex", flexDirection: "column",
          boxShadow: `0 0 100px ${project.accent}18, 0 60px 120px rgba(0,0,0,0.8)`,
        }}
      >
        {/* Window chrome */}
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "14px 20px",
          background: "rgba(255,255,255,0.02)",
          borderBottom: `1px solid ${project.accent}18`,
          flexShrink: 0,
        }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57", cursor: "pointer" }} onClick={onClose} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FEBC2E" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28C840" }} />
          <span style={{ marginLeft: "12px", flex: 1, fontFamily: "'Fira Code', monospace", fontSize: "12px", color: "#4b5563" }}>
            <span style={{ color: project.accent }}>~/projects/</span>
            {project.title.toLowerCase().replace(/ /g, "-")}/README.md
          </span>
          <a
            href={`${project.github}#readme`} target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: "'Fira Code', monospace", fontSize: "11px",
              color: "#6b7280", textDecoration: "none",
              display: "flex", alignItems: "center", gap: "6px",
              padding: "4px 12px", borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.07)",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = project.accent; e.currentTarget.style.borderColor = `${project.accent}50`; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#6b7280"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
          >
            <FaGithub size={12} /> GitHub
          </a>
          <button onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: "20px", lineHeight: 1, padding: "0 4px", transition: "color 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "#6b7280"; }}
          >×</button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "scroll", background: "rgba(8,8,20,0.98)", WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"] }}
          onWheel={e => e.stopPropagation()}>
          {loading && (
            <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", color: "#6b7280", fontFamily: "'Fira Code', monospace", fontSize: "13px" }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.06)", borderTopColor: project.accent }}
              />
              Fetching README…
            </div>
          )}
          {error && !loading && (
            <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", color: "#6b7280", fontFamily: "'Fira Code', monospace", fontSize: "13px" }}>
              <svg width="32" height="32" fill="none" stroke={project.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/>
              </svg>
              <p>README not found or repo is private.</p>
              <a href={`${project.github}#readme`} target="_blank" rel="noopener noreferrer" style={{ color: project.accent, textDecoration: "none", borderBottom: `1px solid ${project.accent}50` }}>
                Open on GitHub →
              </a>
            </div>
          )}
          {html && !loading && (
            <>
              <style>{`
                .gh-md { padding: 32px 40px; color: #c9d1d9; font-family: 'Outfit', system-ui, sans-serif; font-size: 15px; line-height: 1.75; }
                .gh-md h1,.gh-md h2,.gh-md h3,.gh-md h4 { color: #e6edf3; border-bottom: 1px solid #1e2330; padding-bottom: .3em; margin: 28px 0 14px; font-family: 'Outfit', sans-serif; }
                .gh-md a { color: ${project.accent}; text-decoration: none; }
                .gh-md a:hover { text-decoration: underline; }
                .gh-md code { background: rgba(110,118,129,0.15); border-radius: 4px; padding: .15em .4em; font-family: 'Fira Code', monospace; font-size: 85%; color: #e6edf3; }
                .gh-md pre { background: #0d1020; border: 1px solid #1e2330; border-radius: 10px; padding: 18px; overflow-x: auto; margin: 16px 0; }
                .gh-md pre code { background: none; padding: 0; font-size: 13px; }
                .gh-md blockquote { border-left: 3px solid ${project.accent}50; padding-left: 18px; color: #8b949e; margin: 0 0 16px; }
                .gh-md ul,.gh-md ol { padding-left: 24px; margin: 12px 0; }
                .gh-md li { margin: 5px 0; }
                .gh-md img { max-width: 100%; border-radius: 10px; }
                .gh-md table { border-collapse: collapse; width: 100%; margin: 16px 0; }
                .gh-md th,.gh-md td { border: 1px solid #1e2330; padding: 9px 14px; }
                .gh-md th { background: #0d1020; color: #e6edf3; }
                .gh-md hr { border: none; border-top: 1px solid #1e2330; margin: 24px 0; }
              `}</style>
              <div className="gh-md" dangerouslySetInnerHTML={{ __html: html }} />
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Project Card ──────────────────────────────────────────── */
function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22,1,0.36,1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bento-card"
      style={{
        padding: "30px",
        display: "flex", flexDirection: "column", height: "100%",
        cursor: "pointer",
        borderColor: hovered ? `${project.accent}28` : "var(--color-border-dim)",
        boxShadow: hovered ? `0 0 60px ${project.accent}0d, 0 30px 70px rgba(0,0,0,0.5)` : "none",
      }}
    >
      {/* Accent top line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", borderRadius: "2px",
        background: `linear-gradient(90deg, ${project.accent}, ${project.accent}40, transparent)`, opacity: hovered ? 1 : 0.55,
        transition: "opacity 0.3s",
      }} />

      {/* View README badge */}
      <motion.div
        initial={{ opacity: 0, y: 4 }} animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute", bottom: "14px", right: "14px",
          fontFamily: "'Fira Code', monospace", fontSize: "9px",
          letterSpacing: "0.1em",
          color: project.accent, background: `${project.accent}12`,
          border: `1px solid ${project.accent}28`,
          padding: "4px 12px", borderRadius: "20px",
          pointerEvents: "none",
        }}
      >OPEN README</motion.div>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "22px" }}>

        {/* Category tag */}
        <div style={{
          padding: "5px 12px", borderRadius: "6px",
          background: `${project.accent}10`,
          border: `1px solid ${project.accent}22`,
          fontFamily: "'Fira Code', monospace", fontSize: "9px",
          letterSpacing: "0.2em", color: project.accent,
        }}>{project.category}</div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "6px" }} onClick={e => e.stopPropagation()}>
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            style={{ padding: "7px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.07)", color: "#6B7290", textDecoration: "none", display: "flex", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#6B7290"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "transparent"; }}
          >
            <FaGithub size={16} />
          </a>
          {(project as Project).live && (
            <a href={(project as Project).live} target="_blank" rel="noopener noreferrer"
              style={{ padding: "5px 10px", borderRadius: "8px", border: `1px solid ${project.accent}30`, color: project.accent, textDecoration: "none", display: "flex", alignItems: "center", gap: "5px", fontSize: "10px", fontFamily: "'Fira Code', monospace", letterSpacing: "0.08em", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = `${project.accent}15`; e.currentTarget.style.borderColor = `${project.accent}60`; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = `${project.accent}30`; }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              LIVE
            </a>
          )}
          <button onClick={e => { e.stopPropagation(); onOpen(); }}
            style={{ padding: "7px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.07)", color: "#6B7290", background: "none", cursor: "pointer", display: "flex", alignItems: "center", transition: "all 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = project.accent; (e.currentTarget as HTMLButtonElement).style.borderColor = `${project.accent}40`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "#6B7290"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.07)"; }}
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7,7 17,7 17,17"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Title & subtitle */}
      <div style={{ marginBottom: "12px" }}>
        <div style={{ fontFamily: "'Fira Code', monospace", fontSize: "10px", color: `${project.accent}60`, letterSpacing: "0.15em", marginBottom: "6px" }}>
          {project.short.toUpperCase()}
        </div>
        <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "20px", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
          {project.title}
        </h3>
      </div>

      <p style={{ color: "rgba(180,185,210,0.65)", fontSize: "14px", lineHeight: 1.75, marginBottom: "24px", flex: 1 }}>
        {project.description}
      </p>

      {/* Tech stack */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
        {project.tech.map(t => (
          <span key={t} className="skill-badge" style={{
            fontSize: "10px", padding: "4px 10px",
            color: `${project.accent}80`,
            background: `${project.accent}0a`,
            borderColor: `${project.accent}1a`,
          }}>{t}</span>
        ))}
      </div>
    </motion.article>
  );
}

/* ─── Section ─────────────────────────────────────────────── */
export default function Projects() {
  const [openProject, setOpenProject] = useState<Project | null>(null);

  return (
    <section id="projects" style={{ padding: "130px 0", width: "100%", position: "relative", zIndex: 10, background: "var(--color-bg-void)" }}>
      <div className="section-divider" />
      <div className="grid-pattern" style={{ position: "absolute", inset: 0, opacity: 0.3 }} />
      <div className="gradient-orb" style={{ width: 600, height: 600, background: "#00D4FF", top: -220, left: "50%", transform: "translateX(-50%)", opacity: 0.07 }} />

      <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.65, ease: [0.22,1,0.36,1] }}
          style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "72px" }}
        >
          <h2 className="display-md">
            <span className="section-number">02.</span>
            Featured Projects
          </h2>
          <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, rgba(0,212,255,0.18), transparent)" }} />
        </motion.div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))", gap: "22px" }}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              onOpen={() => setOpenProject(project)}
            />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.5 }}
          style={{ textAlign: "center", marginTop: "56px" }}
        >
          <a
            href="https://github.com/SKYLINE217"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              fontFamily: "'Outfit', sans-serif", fontSize: "14px", fontWeight: 600,
              color: "rgba(180,185,210,0.5)", textDecoration: "none",
              padding: "12px 24px", borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.07)",
              transition: "all 0.3s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "#00D4FF"; e.currentTarget.style.borderColor = "rgba(0,212,255,0.25)"; e.currentTarget.style.background = "rgba(0,212,255,0.04)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(180,185,210,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "transparent"; }}
          >
            <FaGithub size={16} />
            View all repositories on GitHub
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
            </svg>
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {openProject && <ReadmeModal project={openProject} onClose={() => setOpenProject(null)} />}
      </AnimatePresence>
    </section>
  );
}
