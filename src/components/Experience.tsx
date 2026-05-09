"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const experiences = [
  {
    role: "Cybersecurity Intern",
    company: "Edureka",
    date: "Recent",
    accent: "#00D4FF",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      </svg>
    ),
    details: [
      "Conducted vulnerability scanning and penetration testing in ethical hacking labs.",
      "Participated in red/blue team simulations to identify and remediate system flaws.",
      "Analyzed network traffic using Wireshark to detect anomalous patterns and intrusions.",
    ],
  },
  {
    role: "B.Tech in Cybersecurity",
    company: "NIIT University",
    date: "2022 – 2026",
    accent: "#BF5FFF",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    details: [
      "Specializing in system security, cryptography, and digital forensics.",
      "Developing automated Python scripts for malware analysis and threat detection.",
      "Core coursework: Operating Systems, Network Security, Ethical Hacking, Cryptography.",
    ],
  },
];

const skillGroups = [
  {
    label: "Languages",
    accent: "#00FF87",
    skills: ["Python", "JavaScript", "Java", "C", "SQL"],
  },
  {
    label: "Security",
    accent: "#00D4FF",
    skills: ["Volatility 3", "Malware Analysis", "MITRE ATT&CK", "Ethical Hacking", "Wireshark", "Burp Suite"],
  },
  {
    label: "Tools & Cloud",
    accent: "#BF5FFF",
    skills: ["Docker", "GCP", "React", "Flask", "Git", "Kali Linux"],
  },
];

function TimelineDot({ accent, index }: { accent: string; index: number }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 280, damping: 18, delay: index * 0.15 }}
      style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", zIndex: 10 }}
    >
      {[0, 1].map(r => (
        <motion.div key={r}
          style={{ position: "absolute", width: 28, height: 28, borderRadius: "50%", border: `1px solid ${accent}`, opacity: 0 }}
          animate={{ scale: [1, 2.6], opacity: [0.6, 0] }}
          transition={{ duration: 2.4, delay: r * 1.1 + index * 0.3, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
      <div style={{
        width: 14, height: 14, borderRadius: "50%",
        background: "var(--color-bg-void)",
        border: `3px solid ${accent}`,
        boxShadow: `0 0 18px 4px ${accent}80`,
      }} />
    </motion.div>
  );
}

function ExperienceCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 48, rotateY: -8 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bento-card"
      style={{ padding: "28px", position: "relative", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, ${exp.accent}, ${exp.accent}40, transparent)`, opacity: 0.75 }} />

      {/* Scan shimmer on hover */}
      <motion.div
        initial={{ x: "-110%" }}
        whileHover={{ x: "110%" }}
        transition={{ duration: 0.65, ease: "easeInOut" }}
        style={{ position: "absolute", inset: 0, background: `linear-gradient(105deg, transparent 40%, ${exp.accent}0d 50%, transparent 60%)`,
          pointerEvents: "none", zIndex: 1 }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
          <div>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "19px", fontWeight: 800, color: "#fff", marginBottom: "6px", letterSpacing: "-0.02em" }}>
              {exp.role}
            </h3>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: exp.accent, fontWeight: 500 }}>{exp.company}</span>
              <span style={{ color: "rgba(180,185,210,0.2)" }}>//</span>
              <span style={{ color: "rgba(180,185,210,0.4)" }}>{exp.date}</span>
            </div>
          </div>
          <div style={{
            width: 44, height: 44, borderRadius: "12px",
            background: `${exp.accent}10`, border: `1px solid ${exp.accent}22`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: exp.accent, flexShrink: 0,
          }}>
            {exp.icon}
          </div>
        </div>

        <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {exp.details.map((d, i) => (
            <motion.li key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 + index * 0.1 + 0.25 }}
              style={{ display: "flex", gap: "12px", color: "rgba(180,185,210,0.72)", fontSize: "14px", lineHeight: 1.65, listStyle: "none" }}
            >
              <span style={{ color: `${exp.accent}80`, flexShrink: 0, marginTop: "3px" }}>▹</span>
              {d}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const railRef    = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });

  const lineScaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 22, restDelta: 0.001 });
  const beadPct   = useTransform(lineScaleY, [0, 1], ["0%", "100%"]);
  const beadGlow  = useTransform(lineScaleY, [0, 0.5, 1], ["#00FF87", "#00D4FF", "#BF5FFF"]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{ padding: "130px 0", width: "100%", position: "relative", zIndex: 10, background: "var(--color-bg-void)", overflow: "hidden" }}
    >
      <div className="section-divider" />
      <div className="dot-pattern" style={{ position: "absolute", inset: 0, opacity: 0.18 }} />
      <div className="gradient-orb" style={{ width: 600, height: 600, background: "#BF5FFF", bottom: -220, left: -200, opacity: 0.08 }} />
      <div className="gradient-orb" style={{ width: 400, height: 400, background: "#00FF87", top: -120, right: -120, opacity: 0.07 }} />

      <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", flexWrap: "wrap", gap: "80px" }}>

        {/* ── LEFT: Timeline ─── */}
        <div style={{ flex: "1 1 560px", minWidth: "300px" }}>
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65, ease: [0.22,1,0.36,1] }}
            style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "72px" }}
          >
            <h2 className="display-md">
              <span className="section-number">03.</span>
              Experience
            </h2>
            <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, rgba(0,212,255,0.18), transparent)" }} />
          </motion.div>

          <div ref={railRef} style={{ position: "relative" }}>
            {/* Track */}
            <div style={{ position: "absolute", top: 0, bottom: 0, left: "19px", width: "2px", background: "rgba(255,255,255,0.04)", borderRadius: "1px" }} />
            {/* Animated fill */}
            <motion.div style={{
              position: "absolute", top: 0, left: "19px", width: "2px", borderRadius: "1px",
              scaleY: lineScaleY, transformOrigin: "top center", height: "100%",
              background: "linear-gradient(180deg, #00FF87 0%, #00D4FF 50%, #BF5FFF 100%)",
            }} />
            {/* Glowing bead */}
            <motion.div style={{
              position: "absolute", left: "19px", translateX: "-50%",
              top: beadPct, translateY: "-50%",
              width: 10, height: 10, borderRadius: "50%",
              background: beadGlow,
              boxShadow: "0 0 18px 6px rgba(0,212,255,0.7), 0 0 36px 14px rgba(0,212,255,0.2)",
              zIndex: 20,
            }} />
            {/* Rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
              {experiences.map((exp, i) => (
                <div key={i} style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
                  <div style={{ width: 40, flexShrink: 0, paddingTop: "28px", display: "flex", justifyContent: "center", position: "relative", zIndex: 10 }}>
                    <TimelineDot accent={exp.accent} index={i} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <ExperienceCard exp={exp} index={i} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Skills ─── */}
        <div style={{ flex: "1 1 340px", minWidth: "280px" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65 }}
          >
            <div style={{
              fontFamily: "'Fira Code', monospace", fontSize: "11px",
              color: "rgba(0,212,255,0.4)", letterSpacing: "0.22em", textTransform: "uppercase",
              marginBottom: "32px", display: "flex", alignItems: "center", gap: "12px",
            }}>
              <span style={{ color: "#00FF87" }}>▸</span> Active_Modules
              <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, rgba(0,212,255,0.15), transparent)" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {skillGroups.map((cat, ci) => (
                <motion.div key={cat.label}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: ci * 0.12 + 0.2 }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: cat.accent, boxShadow: `0 0 8px ${cat.accent}80` }} />
                    <span style={{
                      fontFamily: "'Fira Code', monospace", fontSize: "10px",
                      textTransform: "uppercase", letterSpacing: "0.2em",
                      color: "rgba(180,185,210,0.4)",
                    }}>{cat.label}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {cat.skills.map((skill, si) => (
                      <motion.span key={skill}
                        initial={{ opacity: 0, scale: 0.75, y: 10 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: si * 0.06 + ci * 0.08 + 0.1, type: "spring", stiffness: 260, damping: 18 }}
                        whileHover={{ scale: 1.08, y: -2 }}
                        className="skill-badge"
                        style={{ borderColor: `${cat.accent}15` }}
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
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.55 }}
              className="bento-card"
              style={{ marginTop: "40px", padding: "22px" }}
            >
              <div className="accent-line accent-line-cyan" />
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <motion.div
                  animate={{ opacity: [1, 0.2, 1], scale: [1, 1.35, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  style={{ width: 8, height: 8, borderRadius: "50%", background: "#00FF87", boxShadow: "0 0 10px 2px rgba(0,255,135,0.7)" }}
                />
                <span style={{ fontFamily: "'Fira Code', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(180,185,210,0.4)" }}>
                  System Status
                </span>
              </div>
              <div style={{ fontFamily: "'Fira Code', monospace", fontSize: "12px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { label: "Available for hire", color: "#00FF87" },
                  { label: "Open to collaboration", color: "#00D4FF" },
                  { label: "Ready for challenges", color: "#BF5FFF" },
                ].map((item, i) => (
                  <motion.p key={i}
                    initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 + 0.6 }}
                    style={{ color: "rgba(180,185,210,0.6)", display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <span style={{ color: item.color }}>✓</span> {item.label}
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
