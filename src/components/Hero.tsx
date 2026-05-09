"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import * as THREE from "three";

/* ─── Particle Field ────────────────────────────────────────── */
function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  const sphere = useMemo(() => {
    const pos = random.inSphere(new Float32Array(7000), { radius: 1.6 });
    for (let i = 0; i < pos.length; i++) {
      if (isNaN(pos[i])) pos[i] = 0;
    }
    // Ensure the positions array length is a multiple of 3 (x, y, z per point)
    const remainder = pos.length % 3;
    if (remainder !== 0) {
      return pos.subarray(0, pos.length - remainder);
    }
    return pos;
  }, []);

  useFrame((_s, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x -= dt / 16;
    ref.current.rotation.y -= dt / 22;
  });

  return (
    <group rotation={[0, 0, Math.PI / 5]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent color="#00D4FF" size={0.0025}
          sizeAttenuation depthWrite={false}
          blending={THREE.AdditiveBlending} opacity={0.7}
        />
      </Points>
    </group>
  );
}

/* ─── Typewriter Hook ──────────────────────────────────────── */
function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wIdx, setWIdx]       = useState(0);
  const [cIdx, setCIdx]       = useState(0);
  const [deleting, setDel]    = useState(false);

  useEffect(() => {
    const word = words[wIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(word.slice(0, cIdx + 1));
        if (cIdx + 1 === word.length) {
          setTimeout(() => setDel(true), pause);
        } else {
          setCIdx(c => c + 1);
        }
      } else {
        setDisplay(word.slice(0, cIdx - 1));
        if (cIdx - 1 === 0) {
          setDel(false);
          setWIdx(w => (w + 1) % words.length);
          setCIdx(0);
        } else {
          setCIdx(c => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [words, wIdx, cIdx, deleting, speed, pause]);

  return display;
}

/* ─── Data Stream Column ──────────────────────────────────── */
function DataStream({ x, delay }: { x: string; delay: number }) {
  const chars = "01アイウエオカキクケコABCDEFGH∑∏√≈≠";
  const col = useMemo(() =>
    Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <div style={{
      position: "absolute", top: 0, left: x,
      fontFamily: "'Fira Code', monospace", fontSize: "10px",
      color: "rgba(0,255,135,0.12)",
      display: "flex", flexDirection: "column", gap: "4px",
      animation: `data-stream ${6 + delay}s linear ${delay}s infinite`,
      pointerEvents: "none",
    }}>
      {col.map((c, i) => <span key={i}>{c}</span>)}
    </div>
  );
}

/* ─── Glitch Text ─────────────────────────────────────────── */
function GlitchText({ text }: { text: string }) {
  const [glitch, setGlitch] = useState(false);
  
  useEffect(() => {
    // Fire a quick glitch every few seconds
    const id = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <span style={{ 
      position: "relative", 
      display: "inline-block",
      color: "inherit",
      textShadow: glitch 
        ? "4px 0 #00FF87, -4px 0 #00D4FF" 
        : "inherit",
      transform: glitch ? "skewX(-8deg)" : "none",
      transition: glitch ? "none" : "all 0.2s ease-out",
    }}>
      {text}
    </span>
  );
}

/* ─── Hero Stats ─────────────────────────────────────────── */
const stats = [
  { value: "3+", label: "Projects Built" },
  { value: "CTF", label: "Competitions" },
  { value: "2026", label: "Graduating" },
];

/* ─── Main Hero ──────────────────────────────────────────── */
const ROLES = [
  "Cybersecurity Engineer",
  "Digital Forensics Analyst",
  "Malware Researcher",
  "Secure Software Developer",
];

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } },
};
const rise = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero() {
  const role = useTypewriter(ROLES, 75, 2000);

  /* Magnetic cursor effect on CTA */
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 18 });
  const sy = useSpring(my, { stiffness: 180, damping: 18 });

  const ctaRef = useRef<HTMLAnchorElement>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    my.set((e.clientY - rect.top - rect.height / 2) * 0.25);
  };
  const handleMouseLeave = () => { mx.set(0); my.set(0); };

  /* Scan line shimmer across hero */
  const [scanPos, setScanPos] = useState(-10);
  useEffect(() => {
    const id = setInterval(() => {
      setScanPos(p => { if (p > 110) return -10; return p + 0.15; });
    }, 16);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative", width: "100%", minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden", background: "var(--color-bg-void)",
      }}
    >
      {/* ── Ambient Orbs ── */}
      <div className="gradient-orb" style={{ width: 700, height: 700, background: "#00FF87", top: -260, left: -220, opacity: 0.08 }} />
      <div className="gradient-orb" style={{ width: 600, height: 600, background: "#00D4FF", bottom: -160, right: -160, opacity: 0.09 }} />
      <div className="gradient-orb" style={{ width: 400, height: 400, background: "#BF5FFF", top: "35%", right: "20%", opacity: 0.07 }} />

      {/* ── 3D Particle Canvas ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
          <ParticleField />
        </Canvas>
      </div>

      {/* ── Hex pattern ── */}
      <div className="hex-pattern" style={{ position: "absolute", inset: 0, zIndex: 1, opacity: 0.4 }} />

      {/* ── Horizontal scan shimmer ── */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: "2px",
        top: `${scanPos}%`, zIndex: 2,
        background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.06), rgba(0,212,255,0.12), rgba(0,212,255,0.06), transparent)",
        pointerEvents: "none",
      }} />

      {/* ── Data stream columns (subtle) ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, overflow: "hidden", pointerEvents: "none" }}>
        {["5%","12%","20%","78%","86%","94%"].map((x, i) => (
          <DataStream key={i} x={x} delay={i * 1.4} />
        ))}
      </div>

      {/* ── Corner brackets ── */}
      {[
        { top: 32, left: 32, borderTop: "2px solid", borderLeft: "2px solid", borderRadius: "2px 0 0 0" },
        { top: 32, right: 32, borderTop: "2px solid", borderRight: "2px solid", borderRadius: "0 2px 0 0" },
        { bottom: 60, left: 32, borderBottom: "2px solid", borderLeft: "2px solid", borderRadius: "0 0 0 2px" },
        { bottom: 60, right: 32, borderBottom: "2px solid", borderRight: "2px solid", borderRadius: "0 0 2px 0" },
      ].map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2 + i * 0.12 }}
          style={{
            position: "absolute", width: 24, height: 24,
            borderColor: "rgba(0,212,255,0.25)",
            pointerEvents: "none", zIndex: 3, ...s,
          }}
        />
      ))}

      {/* ── Hero content ── */}
      <div style={{
        position: "relative", zIndex: 10,
        width: "100%", maxWidth: "1140px",
        margin: "0 auto", padding: "0 24px",
        display: "flex", flexDirection: "column",
        alignItems: "center", textAlign: "center",
      }}>
        <motion.div variants={stagger} initial="hidden" animate="visible"
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* Boot label */}
          <motion.div variants={rise} style={{ marginBottom: "28px" }}>
            <div className="terminal-prompt" style={{ justifyContent: "center" }}>
              <span style={{
                fontFamily: "'Fira Code', monospace", fontSize: "12px",
                color: "rgba(0,212,255,0.5)", letterSpacing: "0.28em",
                textTransform: "uppercase",
              }}>
                BOOT.SEQUENCE :: PORTFOLIO_v3.0
              </span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={rise}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(3.6rem, 9.5vw, 7.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.045em",
              lineHeight: 0.9,
              color: "#fff",
              marginBottom: "20px",
            }}
          >
            Sumit Kumar
            <br />
            <span style={{ color: "#00D4FF", textShadow: "0 0 30px rgba(0,212,255,0.4)", display: "inline-block", marginTop: "6px" }}>
              <GlitchText text="Khadanga." />
            </span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            variants={rise}
            style={{
              display: "flex", alignItems: "center",
              justifyContent: "center", gap: "10px",
              marginBottom: "24px", minHeight: "34px",
            }}
          >
            <span style={{ color: "rgba(0,212,255,0.5)", fontFamily: "'Fira Code', monospace", fontSize: "18px" }}>▸</span>
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              color: "rgba(255,255,255,0.88)",
              fontSize: "clamp(1rem, 2.8vw, 1.35rem)",
              fontWeight: 500,
              letterSpacing: "-0.01em",
            }}>
              {role}
            </span>
            <span className="animate-blink" style={{
              display: "inline-block", width: "2px", height: "24px",
              background: "#00FF87", borderRadius: "1px",
            }} />
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={rise}
            style={{
              maxWidth: "540px",
              color: "rgba(180,185,210,0.75)",
              fontSize: "clamp(0.95rem, 1.8vw, 1.05rem)",
              lineHeight: 1.75,
              marginBottom: "40px",
              fontWeight: 400,
            }}
          >
            Specializing in digital forensics, malware analysis & secure software.
            Building systems that are <span style={{ color: "#00FF87", fontWeight: 600 }}>unbreachable</span> — and tools that make defenders unstoppable.
          </motion.p>

          {/* CTA row */}
          <motion.div variants={rise} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "56px" }}>
            <motion.a
              ref={ctaRef}
              href="#projects"
              className="btn-primary"
              style={{ x: sx, y: sy } as React.CSSProperties}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                </svg>
                View Projects
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
              </svg>
            </motion.a>

            <a
              href="https://github.com/SKYLINE217"
              target="_blank" rel="noopener noreferrer"
              className="btn-ghost"
              style={{ gap: "8px" }}
              title="GitHub"
            >
              <FaGithub size={18} />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "14px", fontWeight: 500 }}>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/sumit-kumar-khadanga-87797b2b6"
              target="_blank" rel="noopener noreferrer"
              className="btn-ghost"
              style={{ gap: "8px" }}
              title="LinkedIn"
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(10,102,194,0.4)"; e.currentTarget.style.color = "#0A66C2"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border-dim)"; e.currentTarget.style.color = "#6B7290"; }}
            >
              <FaLinkedin size={18} />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "14px", fontWeight: 500 }}>LinkedIn</span>
            </a>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            variants={rise}
            style={{
              display: "flex", gap: "2px",
              background: "rgba(255,255,255,0.025)",
              border: "1px solid var(--color-border-dim)",
              borderRadius: "14px",
              overflow: "hidden",
            }}
          >
            {stats.map((s, i) => (
              <div key={s.label} style={{
                padding: "16px 32px",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
                borderRight: i < stats.length - 1 ? "1px solid var(--color-border-dim)" : "none",
              }}>
                <span style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  background: "linear-gradient(135deg, #00FF87, #00D4FF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>{s.value}</span>
                <span style={{
                  fontFamily: "'Fira Code', monospace",
                  fontSize: "10px", letterSpacing: "0.15em",
                  textTransform: "uppercase", color: "rgba(180,185,210,0.45)",
                }}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll hint ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        style={{
          position: "absolute", bottom: "36px", left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10, display: "flex", flexDirection: "column",
          alignItems: "center", gap: "6px",
        }}
      >
        <span style={{
          fontFamily: "'Fira Code', monospace",
          fontSize: "9px", letterSpacing: "0.35em",
          textTransform: "uppercase", color: "rgba(180,185,210,0.25)",
        }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <svg width="18" height="18" fill="none" stroke="rgba(0,212,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="5,8 9,12 13,8" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
