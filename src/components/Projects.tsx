"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import DOMPurify from "dompurify";

const projects = [
  {
    title: "WinVolAuto Memory Forensics",
    description: "Professional GUI for Volatility 3 with AI-powered risk scoring and MITRE ATT&CK mapping. Analyzes memory dumps to detect hidden rootkits and malicious processes.",
    tech: ["Python", "PyQt6", "Volatility 3", "AI Heuristics"],
    github: "https://github.com/SKYLINE217/WinVolAuto-Memory-Forensics-Suite",
    repoId: "SKYLINE217/WinVolAuto-Memory-Forensics-Suite",
    accent: "#00FF41",
  },
  {
    title: "Real-Time Fraud Detection",
    description: "Machine learning system utilizing Random Forest classifier and SHAP explainability. Features a Flask REST API and a real-time Streamlit monitoring dashboard.",
    tech: ["Python", "Scikit-learn", "Flask", "Streamlit", "SHAP"],
    github: "https://github.com/SKYLINE217/AI-IN-CYBER-SECURITY",
    repoId: "SKYLINE217/AI-IN-CYBER-SECURITY",
    accent: "#00E5FF",
  },
  {
    title: "Blockchain Credential System",
    description: "Tamper-proof academic credential issuance platform leveraging immutable ledgers. Ensures verification using SHA-256 cryptographic hashing.",
    tech: ["React", "MongoDB", "Blockchain", "JWT", "SHA-256"],
    github: "https://github.com/SKYLINE217/blockchain--BATA-",
    repoId: "SKYLINE217/blockchain--BATA-",
    accent: "#9D4EDD",
  },
  {
    title: "F1 Race Replay",
    description: "Full-featured Formula 1 race replay simulator powered by FastF1. Reconstructs real lap-by-lap telemetry, battle sequences, and overtakes with animated race visualizations and driver position charts.",
    tech: ["Python", "FastF1", "Matplotlib", "Pandas", "NumPy"],
    github: "https://github.com/SKYLINE217/f1-race-replay",
    repoId: "SKYLINE217/f1-race-replay",
    accent: "#FF3131",
  },
];

type Project = typeof projects[0];

/* ─── README Modal ─────────────────────────────────────────── */
function ReadmeModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [html, setHtml]       = useState<string | null>(null);
  const [error, setError]     = useState(false);
  const [loading, setLoading] = useState(true);

  // README fetch cache (avoids re-fetching on repeated modal opens)
  const readmeCache = useRef<Map<string, string>>(new Map());

  useEffect(() => {
    setHtml(null);
    setError(false);
    setLoading(true);

    // Return cached result instantly
    if (readmeCache.current.has(project.repoId)) {
      setHtml(readmeCache.current.get(project.repoId)!);
      setLoading(false);
      return;
    }

    fetch(`/api/readme?repo=${encodeURIComponent(project.repoId)}`)
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.text();
      })
      .then((raw) => {
        // SEC-001: sanitize before injecting HTML
        const clean = DOMPurify.sanitize(raw, {
          USE_PROFILES: { html: true },
          ADD_TAGS: ["details", "summary"],
        });
        readmeCache.current.set(project.repoId, clean);
        setHtml(clean);
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, [project.repoId]);

  // Lock body scroll + close on Escape
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(3,3,8,0.88)",
        backdropFilter: "blur(14px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        transition={{ type: "spring", stiffness: 230, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: "860px",
          height: "82vh",
          background: "#0d0d16",
          border: `1px solid ${project.accent}30`,
          borderRadius: "20px",
          overflow: "hidden",
          display: "flex", flexDirection: "column",
          boxShadow: `0 0 80px ${project.accent}20, 0 40px 100px rgba(0,0,0,0.7)`,
        }}
      >
        {/* Window chrome */}
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "13px 18px",
          background: "rgba(255,255,255,0.025)",
          borderBottom: `1px solid ${project.accent}20`,
          flexShrink: 0,
        }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57", cursor: "pointer" }} onClick={onClose} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
          <span style={{
            marginLeft: "10px", flex: 1,
            fontFamily: "'Fira Code', monospace", fontSize: "12px", color: "#6b7280",
          }}>
            <span style={{ color: project.accent }}>~/projects/</span>
            {project.title.toLowerCase().replace(/ /g, "-")}/README.md
          </span>
          <a
            href={`${project.github}#readme`}
            target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: "'Fira Code', monospace", fontSize: "11px",
              color: "#6b7280", textDecoration: "none",
              display: "flex", alignItems: "center", gap: "6px",
              padding: "4px 10px", borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.08)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = project.accent;
              e.currentTarget.style.borderColor = `${project.accent}50`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#6b7280";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            }}
          >
            <FaGithub size={12} /> Open on GitHub
          </a>
          <button onClick={onClose} style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#6b7280", fontSize: "20px", lineHeight: 1,
            padding: "0 2px", transition: "color 0.2s",
          }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#6b7280"; }}
          >×</button>
        </div>

        {/* Content area – captures its own scroll, prevents page scroll bleed */}
        <div
          style={{ flex: 1, overflowY: "scroll", background: "#0d0d16",
                   WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"] }}
          onWheel={(e) => e.stopPropagation()}
        >
          {loading && (
            <div style={{
              minHeight: "240px",
              height: "100%", display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: "16px",
              color: "#6b7280", fontFamily: "'Fira Code', monospace", fontSize: "13px",
            }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{
                  width: 36, height: 36, borderRadius: "50%",
                  border: "3px solid rgba(255,255,255,0.06)",
                  borderTopColor: project.accent,
                }}
              />
              Fetching README…
            </div>
          )}

          {error && !loading && (
            <div style={{
              minHeight: "240px",
              height: "100%", display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: "16px",
              color: "#6b7280", fontFamily: "'Fira Code', monospace", fontSize: "13px",
            }}>
              <span style={{ fontSize: "32px" }}>📄</span>
              <p>README not found or repo is private.</p>
              <a href={`${project.github}#readme`} target="_blank" rel="noopener noreferrer"
                style={{ color: project.accent, textDecoration: "none", borderBottom: `1px solid ${project.accent}50` }}>
                Open on GitHub →
              </a>
            </div>
          )}

          {html && !loading && (
            <>
              {/* Inject GitHub markdown dark styles once */}
              <style>{`
                .gh-readme-body {
                  padding: 32px 40px;
                  color: #c9d1d9;
                  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
                  font-size: 15px;
                  line-height: 1.7;
                }
                .gh-readme-body h1,.gh-readme-body h2,.gh-readme-body h3,
                .gh-readme-body h4,.gh-readme-body h5,.gh-readme-body h6 {
                  color: #e6edf3;
                  border-bottom: 1px solid #30363d;
                  padding-bottom: .3em;
                  margin: 24px 0 12px;
                }
                .gh-readme-body a { color: ${project.accent}; text-decoration: none; }
                .gh-readme-body a:hover { text-decoration: underline; }
                .gh-readme-body code {
                  background: rgba(110,118,129,0.2);
                  border-radius: 4px;
                  padding: .2em .4em;
                  font-family: "Fira Code", monospace;
                  font-size: 85%;
                  color: #e6edf3;
                }
                .gh-readme-body pre {
                  background: #161b22;
                  border: 1px solid #30363d;
                  border-radius: 8px;
                  padding: 16px;
                  overflow-x: auto;
                  margin: 16px 0;
                }
                .gh-readme-body pre code {
                  background: none;
                  padding: 0;
                  font-size: 13px;
                }
                .gh-readme-body blockquote {
                  border-left: 3px solid #30363d;
                  padding-left: 16px;
                  color: #8b949e;
                  margin: 0 0 16px;
                }
                .gh-readme-body ul,.gh-readme-body ol { padding-left: 24px; margin: 12px 0; }
                .gh-readme-body li { margin: 4px 0; }
                .gh-readme-body img { max-width: 100%; border-radius: 8px; }
                .gh-readme-body table { border-collapse: collapse; width: 100%; margin: 16px 0; }
                .gh-readme-body th,.gh-readme-body td {
                  border: 1px solid #30363d;
                  padding: 8px 12px;
                  text-align: left;
                }
                .gh-readme-body th { background: #161b22; color: #e6edf3; }
                .gh-readme-body hr { border: none; border-top: 1px solid #30363d; margin: 24px 0; }
                .gh-readme-body ::-webkit-scrollbar { width: 6px; height: 6px; }
                .gh-readme-body ::-webkit-scrollbar-track { background: transparent; }
                .gh-readme-body ::-webkit-scrollbar-thumb { background: #30363d; border-radius: 3px; }
              `}</style>
              <div
                className="gh-readme-body"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Project Card ─────────────────────────────────────────── */
function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className="glass-card"
      onClick={onOpen}
      style={{
        padding: "28px",
        display: "flex", flexDirection: "column", height: "100%",
        position: "relative", overflow: "hidden",
        cursor: "pointer",
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
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                    background: `linear-gradient(90deg, ${project.accent}, transparent)`, opacity: 0.5 }} />

      {/* "view README" hover badge */}
      <div className="readme-badge" style={{
        position: "absolute", bottom: "12px", right: "12px",
        fontFamily: "'Fira Code', monospace", fontSize: "10px",
        color: project.accent, background: `${project.accent}14`,
        border: `1px solid ${project.accent}30`,
        padding: "3px 10px", borderRadius: "20px",
        opacity: 0, transition: "opacity 0.25s",
        pointerEvents: "none",
      }}>📄 view README</div>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div style={{ padding: "10px", borderRadius: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <svg width="24" height="24" fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <div style={{ display: "flex", gap: "8px" }} onClick={(e) => e.stopPropagation()}>
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            style={{ color: "#6b7280", transition: "color 0.3s", padding: "4px" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#6b7280"; }}>
            <FaGithub size={18} />
          </a>
          <button onClick={(e) => { e.stopPropagation(); onOpen(); }} title="View README"
            style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280",
                     transition: "color 0.3s", padding: "4px", display: "flex", alignItems: "center" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#00E5FF"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#6b7280"; }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7,7 17,7 17,17" />
            </svg>
          </button>
        </div>
      </div>

      <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>{project.title}</h3>
      <p style={{ color: "rgba(156,163,175,0.8)", fontSize: "14px", lineHeight: 1.7, marginBottom: "24px", flex: 1 }}>{project.description}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {project.tech.map((t) => (
          <span key={t} style={{
            fontFamily: "'Fira Code', monospace", fontSize: "11px",
            color: "rgba(0,229,255,0.6)", background: "rgba(0,229,255,0.05)",
            border: "1px solid rgba(0,229,255,0.1)", padding: "4px 10px", borderRadius: "6px",
          }}>{t}</span>
        ))}
      </div>

      {/* CSS for badge on hover */}
      <style>{`
        .glass-card:hover .readme-badge { opacity: 1 !important; }
      `}</style>
    </motion.div>
  );
}

/* ─── Section ──────────────────────────────────────────────── */
export default function Projects() {
  const [openProject, setOpenProject] = useState<Project | null>(null);

  return (
    <section id="projects" style={{ padding: "120px 0", width: "100%", position: "relative", zIndex: 10, background: "#030308" }}>
      <div className="section-divider" />
      <div className="grid-pattern" style={{ position: "absolute", inset: 0, opacity: 0.25 }} />
      <div className="gradient-orb" style={{ width: 500, height: 500, background: "#00E5FF", top: -200, left: "50%", transform: "translateX(-50%)" }} />

      <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
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
            <ProjectCard key={project.title} project={project} index={index} onOpen={() => setOpenProject(project)} />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {openProject && <ReadmeModal project={openProject} onClose={() => setOpenProject(null)} />}
      </AnimatePresence>
    </section>
  );
}
