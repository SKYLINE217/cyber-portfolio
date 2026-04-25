"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import * as THREE from "three";

function StarBackground() {
  const ref = useRef<THREE.Points>(null!);
  const sphere = useMemo(() => {
    const positions = random.inSphere(new Float32Array(5001), { radius: 1.5 });
    // Sanitize NaN values that maath can produce
    for (let i = 0; i < positions.length; i++) {
      if (isNaN(positions[i])) positions[i] = 0;
    }
    return positions;
  }, []);

  useFrame((_state, delta) => {
    if (!ref.current) return;   // BUG-005: guard against unmounted ref
    ref.current.rotation.x -= delta / 12;
    ref.current.rotation.y -= delta / 18;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00E5FF"
          size={0.003}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#030308",
      }}
    >
      {/* Gradient orbs */}
      <div className="gradient-orb" style={{ width: 600, height: 600, background: "#00FF41", top: -200, left: -200 }} />
      <div className="gradient-orb" style={{ width: 500, height: 500, background: "#00E5FF", bottom: -100, right: -100 }} />
      <div className="gradient-orb" style={{ width: 300, height: 300, background: "#9D4EDD", top: "30%", right: "25%" }} />

      {/* 3D Stars */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
          <StarBackground />
        </Canvas>
      </div>

      {/* Dot pattern */}
      <div className="dot-pattern" style={{ position: "absolute", inset: 0, zIndex: 1, opacity: 0.3 }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <motion.div variants={container} initial="hidden" animate="visible" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <motion.p
            variants={item}
            style={{
              fontFamily: "'Fira Code', monospace",
              fontSize: "14px",
              color: "#00FF41",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            &gt; SYSTEM.INIT(&quot;Hello_World&quot;)
          </motion.p>

          <motion.h1
            variants={item}
            style={{
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "#fff",
              marginBottom: "24px",
            }}
          >
            Sumit Kumar
            <br />
            <span className="text-gradient">Khadanga.</span>
          </motion.h1>

          <motion.div variants={item} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "20px" }}>
            <span style={{ fontFamily: "'Fira Code', monospace", color: "#00E5FF", fontSize: "20px" }}>&gt;</span>
            <span style={{ fontFamily: "'Fira Code', monospace", color: "rgba(255,255,255,0.9)", fontSize: "clamp(1rem, 2.5vw, 1.25rem)", fontWeight: 500 }}>
              Aspiring Cybersecurity Engineer
            </span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
              style={{ display: "inline-block", width: "10px", height: "20px", background: "#00FF41", borderRadius: "1px" }}
            />
          </motion.div>

          <motion.p
            variants={item}
            style={{
              maxWidth: "520px",
              color: "rgba(156,163,175,0.85)",
              fontSize: "16px",
              lineHeight: 1.7,
              marginBottom: "32px",
            }}
          >
            Specializing in digital forensics, malware analysis, and secure software
            development. Building systems that are unbreachable.
          </motion.p>

          <motion.div variants={item} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "16px" }}>
            <a
              href="#projects"
              className="glow-btn"
              style={{
                padding: "14px 32px",
                fontFamily: "'Fira Code', monospace",
                fontSize: "14px",
                color: "#00FF41",
                border: "1px solid rgba(0,255,65,0.4)",
                borderRadius: "12px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>View Projects →</span>
            </a>

            <a
              href="https://github.com/SKYLINE217"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "12px",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                color: "#9ca3af",
                textDecoration: "none",
                transition: "all 0.3s",
                display: "flex",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "transparent"; }}
            >
              <FaGithub size={20} />
            </a>

            <a
              href="https://www.linkedin.com/in/sumit-kumar-khadanga-87797b2b6"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "12px",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                color: "#9ca3af",
                textDecoration: "none",
                transition: "all 0.3s",
                display: "flex",
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
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
