"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import * as THREE from "three";

/* ─── Star background ─────────────────────────────────────── */
function StarBackground() {
  const ref = useRef<THREE.Points>(null!);
  const sphere = useMemo(() => {
    const positions = random.inSphere(new Float32Array(5001), { radius: 1.5 });
    for (let i = 0; i < positions.length; i++) {
      if (isNaN(positions[i])) positions[i] = 0;
    }
    return positions;
  }, []);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 12;
    ref.current.rotation.y -= delta / 18;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent color="#00E5FF" size={0.003}
          sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

/* ─── Wave name ───────────────────────────────────────────── */
const NAME = "Sumit Kumar Khadanga.";

function WaveName() {
  return (
    <span style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center" }}>
      {NAME.split("").map((char, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -14, 0] }}
          transition={{
            duration: 1.8,
            delay: i * 0.06,
            repeat: Infinity,
            repeatType: "loop",
            ease: [0.45, 0, 0.55, 1],
          }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Cycling subtitle ────────────────────────────────────── */
const ROLES = [
  "Cybersecurity Engineer",
  "Digital Forensics Analyst",
  "Malware Researcher",
  "Ethical Hacker",
  "Secure Software Developer",
];

function CyclingRole() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % ROLES.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", minWidth: "300px", justifyContent: "center" }}>
      <span style={{ color: "#00E5FF", fontFamily: "'Fira Code', monospace", fontSize: "20px" }}>&gt;</span>
      <span style={{ position: "relative", display: "inline-block", minWidth: "260px" }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={idx}
            initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
            exit={{  opacity: 0, y: -18, filter: "blur(4px)" }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "inline-block",
              fontFamily: "'Fira Code', monospace",
              color: "rgba(255,255,255,0.92)",
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
              fontWeight: 500,
            }}
          >
            {ROLES[idx]}
          </motion.span>
        </AnimatePresence>
      </span>
      {/* Blinking cursor */}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.75, ease: "easeInOut" }}
        style={{ display: "inline-block", width: "10px", height: "22px", background: "#00FF41", borderRadius: "1px", flexShrink: 0 }}
      />
    </span>
  );
}

/* ─── Framer-motion variants ──────────────────────────────── */
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

/* ─── Hero ────────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative", width: "100%", height: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden", background: "#030308",
      }}
    >
      {/* Gradient orbs */}
      <div className="gradient-orb" style={{ width: 600, height: 600, background: "#00FF41", top: -200, left: -200 }} />
      <div className="gradient-orb" style={{ width: 500, height: 500, background: "#00E5FF", bottom: -100, right: -100 }} />
      <div className="gradient-orb" style={{ width: 300, height: 300, background: "#9D4EDD", top: "30%", right: "25%" }} />

      {/* Cursor spotlight */}
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          background: `radial-gradient(380px circle at ${mouse.x}px ${mouse.y}px, rgba(0,229,255,0.07) 0%, transparent 65%)`,
          transition: "background 0.08s linear",
        }}
      />

      {/* 3D Stars */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
          <StarBackground />
        </Canvas>
      </div>

      {/* Dot pattern */}
      <div className="dot-pattern" style={{ position: "absolute", inset: 0, zIndex: 1, opacity: 0.3 }} />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 10, width: "100%", maxWidth: "1200px",
        margin: "0 auto", padding: "0 24px",
        display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
      }}>
        <motion.div variants={container} initial="hidden" animate="visible"
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* Waving emoji + greeting */}
          <motion.div variants={item} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <motion.span
              animate={{ rotate: [0, 20, -10, 20, -5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2.5 }}
              style={{ display: "inline-block", transformOrigin: "70% 70%", fontSize: "2rem" }}
            >
              👋
            </motion.span>
            <span style={{
              fontFamily: "'Fira Code', monospace", fontSize: "14px",
              color: "#00FF41", letterSpacing: "0.3em", textTransform: "uppercase",
            }}>
              &gt; SYSTEM.INIT(&quot;Hello_World&quot;)
            </span>
          </motion.div>

          {/* Wave name */}
          <motion.h1
            variants={item}
            style={{
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              marginBottom: "28px",
            }}
          >
            <span style={{ color: "#fff", display: "block", marginBottom: "4px" }}>Sumit Kumar</span>
            <span className="text-gradient">
              <WaveName />
            </span>
          </motion.h1>

          {/* Cycling subtitle */}
          <motion.div variants={item} style={{ marginBottom: "20px" }}>
            <CyclingRole />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={item}
            style={{
              maxWidth: "520px", color: "rgba(156,163,175,0.85)",
              fontSize: "16px", lineHeight: 1.7, marginBottom: "36px",
            }}
          >
            Specializing in digital forensics, malware analysis, and secure software
            development. Building systems that are{" "}
            <span style={{ color: "#00FF41", fontFamily: "'Fira Code', monospace" }}>unbreachable</span>.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={item} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "16px" }}>
            <a
              href="#projects"
              className="glow-btn"
              style={{
                padding: "14px 32px", fontFamily: "'Fira Code', monospace",
                fontSize: "14px", color: "#00FF41",
                border: "1px solid rgba(0,255,65,0.4)", borderRadius: "12px",
                textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px",
              }}
            >
              <span>View Projects →</span>
            </a>

            <a
              href="https://github.com/SKYLINE217"
              target="_blank" rel="noopener noreferrer"
              style={{
                padding: "12px", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px", color: "#9ca3af", textDecoration: "none",
                transition: "all 0.3s", display: "flex",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "transparent"; }}
            >
              <FaGithub size={20} />
            </a>

            <a
              href="https://www.linkedin.com/in/sumit-kumar-khadanga-87797b2b6"
              target="_blank" rel="noopener noreferrer"
              style={{
                padding: "12px", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px", color: "#9ca3af", textDecoration: "none",
                transition: "all 0.3s", display: "flex",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#0A66C2"; e.currentTarget.style.borderColor = "rgba(10,102,194,0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
            >
              <FaLinkedin size={20} />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
        style={{
          position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)",
          zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
        }}
      >
        <span style={{ fontFamily: "'Fira Code', monospace", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#4b5563" }}>
          Scroll
        </span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <svg width="20" height="20" fill="none" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6,9 10,13 14,9" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
