"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineTrackRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  // Scroll progress for the timeline line draw
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Animate line height value for the bead position
  const beadY = useTransform(smoothProgress, [0, 1], [0, lineHeight]);

  useEffect(() => {
    const updateHeight = () => {
      if (lineTrackRef.current) {
        setLineHeight(lineTrackRef.current.getBoundingClientRect().height);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const experiences = [
    {
      role: "Cybersecurity Intern",
      company: "Edureka",
      date: "Recent",
      icon: "💼",
      accent: "#00E5FF",
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
      accent: "#9D4EDD",
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

  return (
    <section
      id="experience"
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
      <div className="gradient-orb" style={{ width: 600, height: 600, background: "#9D4EDD", bottom: -200, left: -200 }} />
      <div className="gradient-orb" style={{ width: 400, height: 400, background: "#00FF41", top: -100, right: -100 }} />

      <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", flexWrap: "wrap", gap: "80px" }}>

        {/* ── Timeline column ── */}
        <div style={{ flex: "1 1 580px", minWidth: "300px" }}>
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

            {/* ── Scrollable line track ── */}
            <div
              ref={lineTrackRef}
              style={{ position: "absolute", left: "15px", top: 0, bottom: 0, width: "2px" }}
            >
              {/* Ghost rail */}
              <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.04)", borderRadius: "1px" }} />

              {/* Animated fill line */}
              <motion.div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  scaleY: smoothProgress,
                  transformOrigin: "top center",
                  borderRadius: "1px",
                  background: "linear-gradient(180deg, #00FF41, #00E5FF 50%, #9D4EDD)",
                  height: "100%",
                }}
              />

              {/* Traveling light bead */}
              <motion.div
                style={{
                  position: "absolute",
                  left: "50%",
                  translateX: "-50%",
                  y: beadY,
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#00E5FF",
                  boxShadow: "0 0 12px 4px rgba(0,229,255,0.8), 0 0 24px 8px rgba(0,229,255,0.3)",
                  zIndex: 20,
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  style={{ position: "relative" }}
                >
                  {/* Dot with ripple rings */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 18, delay: index * 0.15 + 0.1 }}
                    style={{
                      position: "absolute",
                      left: "-42px",
                      top: "24px",
                      width: "14px",
                      height: "14px",
                      zIndex: 10,
                    }}
                  >
                    {/* Ripple rings */}
                    {[0, 1].map((r) => (
                      <motion.div
                        key={r}
                        style={{
                          position: "absolute",
                          inset: "-6px",
                          borderRadius: "50%",
                          border: `1px solid ${exp.accent}`,
                          opacity: 0,
                        }}
                        animate={{
                          scale: [1, 2.2],
                          opacity: [0.6, 0],
                        }}
                        transition={{
                          duration: 2,
                          delay: r * 1 + index * 0.3,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                    {/* Core dot */}
                    <div
                      style={{
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        background: "#030308",
                        border: `3px solid ${exp.accent}`,
                        boxShadow: `0 0 10px ${exp.accent}80`,
                      }}
                    />
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    className="glass-card"
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    style={{ padding: "28px", transition: "border-color 0.4s, box-shadow 0.4s", overflow: "hidden", position: "relative" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${exp.accent}30`;
                      e.currentTarget.style.boxShadow = `0 0 40px ${exp.accent}12`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {/* Top accent bar */}
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                      background: `linear-gradient(90deg, ${exp.accent}, transparent)`,
                      opacity: 0.6,
                    }} />

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
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.08 + index * 0.1 + 0.25 }}
                          style={{ display: "flex", gap: "12px", color: "rgba(156,163,175,0.8)", fontSize: "14px", lineHeight: 1.6 }}
                        >
                          <span style={{ color: `${exp.accent}90`, flexShrink: 0, marginTop: "2px" }}>▹</span>
                          {d}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Skills column ── */}
        <div style={{ flex: "1 1 360px", minWidth: "280px" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
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
                  transition={{ delay: ci * 0.12 + 0.2 }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <span style={{ fontSize: "16px" }}>{cat.icon}</span>
                    <span style={{ fontFamily: "'Fira Code', monospace", fontSize: "11px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.15em" }}>{cat.title}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {cat.skills.map((skill, si) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8, y: 8 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: si * 0.06 + ci * 0.1 + 0.1,
                          type: "spring",
                          stiffness: 260,
                          damping: 18,
                        }}
                        whileHover={{ scale: 1.08 }}
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
            <motion.div
              className="glass-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              style={{ marginTop: "40px", padding: "20px" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ width: 8, height: 8, borderRadius: "50%", background: "#00FF41" }}
                />
                <span style={{ fontFamily: "'Fira Code', monospace", fontSize: "11px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em" }}>System Status</span>
              </div>
              <div style={{ fontFamily: "'Fira Code', monospace", fontSize: "12px", display: "flex", flexDirection: "column", gap: "8px", color: "#6b7280" }}>
                {[
                  { label: "Available for hire", color: "#00FF41" },
                  { label: "Open to collaboration", color: "#00E5FF" },
                  { label: "Ready for challenges", color: "#00E5FF" },
                ].map((item, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.55 }}
                  >
                    <span style={{ color: item.color }}>✓ </span>{item.label}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
