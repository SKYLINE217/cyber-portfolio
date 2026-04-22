"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      role: "Cybersecurity Intern",
      company: "Edureka",
      date: "Recent",
      icon: "💼",
      details: [
        "Conducted vulnerability scanning and penetration testing in ethical hacking labs.",
        "Participated in red/blue team simulations to identify and patch system flaws.",
        "Analyzed network traffic using Wireshark to detect anomalous patterns.",
      ],
    },
    {
      role: "B.Tech in Cybersecurity",
      company: "NIIT University",
      date: "2022 – 2026",
      icon: "🎓",
      details: [
        "Specializing in system security, cryptography, and digital forensics.",
        "Developing automated scripts in Python for malware analysis.",
        "Core coursework: Operating Systems, Network Security, Ethical Hacking.",
      ],
    },
  ];

  const skillCategories = [
    { title: "Languages", icon: "⌨️", skills: ["Python", "JavaScript", "Java", "C", "SQL"] },
    { title: "Security", icon: "🔒", skills: ["Volatility 3", "Malware Analysis", "MITRE ATT&CK", "Ethical Hacking", "Wireshark"] },
    { title: "Tools & Cloud", icon: "☁️", skills: ["Docker", "GCP", "React", "Flask", "Git"] },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!lineRef.current || !containerRef.current) return;

    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        transformOrigin: "top center",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <section id="experience" style={{ padding: "120px 0", width: "100%", position: "relative", zIndex: 10, background: "#030308", overflow: "hidden" }}>
      <div className="section-divider" />
      <div className="dot-pattern" style={{ position: "absolute", inset: 0, opacity: 0.15 }} />
      <div className="gradient-orb" style={{ width: 600, height: 600, background: "#9D4EDD", bottom: -200, left: -200 }} />
      <div className="gradient-orb" style={{ width: 400, height: 400, background: "#00FF41", top: -100, right: -100 }} />

      <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", flexWrap: "wrap", gap: "80px" }}>
        {/* Timeline */}
        <div style={{ flex: "1 1 580px", minWidth: "300px" }} ref={containerRef}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "64px" }}
          >
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em" }}>
              <span style={{ fontFamily: "'Fira Code', monospace", fontSize: "clamp(1.2rem, 2.5vw, 1.75rem)", color: "#00E5FF", marginRight: "12px", fontWeight: 400 }}>03.</span>
              Experience
            </h2>
            <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, #1f2937, transparent)" }} />
          </motion.div>

          <div style={{ position: "relative", paddingLeft: "48px" }}>
            {/* Animated line */}
            <div style={{ position: "absolute", left: "15px", top: 0, bottom: 0, width: "2px", background: "rgba(255,255,255,0.04)", borderRadius: "1px" }}>
              <div ref={lineRef} className="timeline-gradient" style={{ width: "100%", height: "100%", borderRadius: "1px" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  style={{ position: "relative" }}
                >
                  {/* Timeline dot */}
                  <div
                    className="animate-pulse-glow"
                    style={{
                      position: "absolute",
                      left: "-42px",
                      top: "24px",
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      background: "#030308",
                      border: "3px solid #00E5FF",
                      zIndex: 10,
                    }}
                  />

                  <div
                    className="glass-card"
                    style={{ padding: "28px", transition: "border-color 0.4s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,229,255,0.2)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                      <div>
                        <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>{exp.role}</h3>
                        <div style={{ fontFamily: "'Fira Code', monospace", fontSize: "13px" }}>
                          <span style={{ color: "rgba(0,255,65,0.8)" }}>{exp.company}</span>
                          <span style={{ color: "#374151", margin: "0 8px" }}>//</span>
                          <span style={{ color: "#6b7280" }}>{exp.date}</span>
                        </div>
                      </div>
                      <div style={{ fontSize: "24px" }}>{exp.icon}</div>
                    </div>
                    <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {exp.details.map((d, i) => (
                        <li key={i} style={{ display: "flex", gap: "12px", color: "rgba(156,163,175,0.8)", fontSize: "14px", lineHeight: 1.6 }}>
                          <span style={{ color: "rgba(0,229,255,0.5)", flexShrink: 0, marginTop: "2px" }}>▹</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div style={{ flex: "1 1 360px", minWidth: "280px" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h3 style={{ fontFamily: "'Fira Code', monospace", fontSize: "18px", color: "#fff", marginBottom: "32px", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ color: "#00FF41" }}>&gt;</span>
              Active_Modules
              <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, #1f2937, transparent)" }} />
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {skillCategories.map((cat, ci) => (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: ci * 0.1 + 0.2 }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <span style={{ fontSize: "16px" }}>{cat.icon}</span>
                    <span style={{ fontFamily: "'Fira Code', monospace", fontSize: "11px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.15em" }}>{cat.title}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {cat.skills.map((skill, si) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: si * 0.04 + ci * 0.1 }}
                        className="skill-badge"
                        style={{
                          fontFamily: "'Fira Code', monospace",
                          fontSize: "12px",
                          padding: "8px 14px",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: "8px",
                          color: "#9ca3af",
                          cursor: "default",
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Status card */}
            <div className="glass-card" style={{ marginTop: "40px", padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00FF41", animation: "pulse 2s infinite" }} />
                <span style={{ fontFamily: "'Fira Code', monospace", fontSize: "11px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em" }}>System Status</span>
              </div>
              <div style={{ fontFamily: "'Fira Code', monospace", fontSize: "12px", display: "flex", flexDirection: "column", gap: "8px", color: "#6b7280" }}>
                <p><span style={{ color: "#00FF41" }}>✓</span> Available for hire</p>
                <p><span style={{ color: "#00E5FF" }}>✓</span> Open to collaboration</p>
                <p><span style={{ color: "#00E5FF" }}>✓</span> Ready for challenges</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
