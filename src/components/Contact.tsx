"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function AnimatedSphere() {
  return (
    <Sphere visible args={[1, 100, 200]} scale={2.2}>
      <MeshDistortMaterial
        color="#00E5FF"
        attach="material"
        distort={0.35}
        speed={1.5}
        roughness={0.15}
        metalness={0.9}
        wireframe
      />
    </Sphere>
  );
}

export default function Contact() {
  return (
    <section id="contact" style={{ padding: "120px 0 0", width: "100%", position: "relative", zIndex: 10, overflow: "hidden", background: "#030308" }}>
      <div className="section-divider" />
      <div className="grid-pattern" style={{ position: "absolute", inset: 0, opacity: 0.15 }} />
      <div className="gradient-orb" style={{ width: 600, height: 600, background: "#00E5FF", bottom: -100, left: "50%", transform: "translateX(-50%)" }} />
      <div className="gradient-orb" style={{ width: 400, height: 400, background: "#00FF41", top: 100, left: -100 }} />

      <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "48px" }}>
        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ flex: "1 1 480px", minWidth: "300px", zIndex: 10 }}
        >
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", marginBottom: "24px" }}>
            <span style={{ fontFamily: "'Fira Code', monospace", fontSize: "clamp(1.2rem, 2.5vw, 1.75rem)", color: "#00FF41", marginRight: "12px", fontWeight: 400 }}>04.</span>
            <span style={{ display: "block", marginTop: "8px" }}>Let&apos;s Connect</span>
          </h2>
          <p style={{ color: "rgba(156,163,175,0.8)", fontSize: "16px", lineHeight: 1.7, marginBottom: "40px", maxWidth: "450px" }}>
            Currently open for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </p>

          <div className="glass-card" style={{ padding: "32px", position: "relative", overflow: "hidden" }}>
            {/* Top gradient accent */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, #00FF41, #00E5FF, #9D4EDD)", opacity: 0.5 }} />

            {/* Status */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
              <div style={{ padding: "8px", borderRadius: "10px", background: "rgba(0,229,255,0.06)", border: "1px solid rgba(0,229,255,0.1)" }}>
                <svg width="16" height="16" fill="none" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4,17 10,11 4,5" />
                  <line x1="12" y1="19" x2="20" y2="19" />
                </svg>
              </div>
              <span style={{ fontFamily: "'Fira Code', monospace", fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>
                status: <span style={{ color: "#00FF41", animation: "pulse 2s infinite" }}>listening...</span>
              </span>
            </div>

            {/* Contact details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
              <a
                href="mailto:sumitkumarkhadanga@gmail.com"
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  fontFamily: "'Fira Code', monospace", fontSize: "13px",
                  color: "#9ca3af", textDecoration: "none", transition: "color 0.3s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#00E5FF"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#9ca3af"; }}
              >
                <span style={{ fontSize: "16px" }}>✉</span>
                sumitkumarkhadanga@gmail.com
              </a>
              <a
                href="tel:+918904198131"
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  fontFamily: "'Fira Code', monospace", fontSize: "13px",
                  color: "#9ca3af", textDecoration: "none", transition: "color 0.3s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#00E5FF"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#9ca3af"; }}
              >
                <span style={{ fontSize: "16px" }}>📞</span>
                +91 8904198131
              </a>
            </div>

            {/* CTA button */}
            <a
              href="mailto:sumitkumarkhadanga@gmail.com"
              className="glow-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 32px",
                fontFamily: "'Fira Code', monospace",
                fontSize: "14px",
                color: "#00FF41",
                border: "1px solid rgba(0,255,65,0.4)",
                borderRadius: "12px",
                textDecoration: "none",
                transition: "all 0.4s",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                ✉ Send_Packet →
              </span>
            </a>

            {/* Social links */}
            <div style={{ display: "flex", gap: "12px", marginTop: "28px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <a
                href="https://github.com/SKYLINE217"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 16px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  color: "#9ca3af",
                  fontFamily: "'Fira Code', monospace",
                  fontSize: "13px",
                  textDecoration: "none",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "transparent"; }}
              >
                <FaGithub size={16} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/sumit-kumar-khadanga-87797b2b6"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 16px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  color: "#9ca3af",
                  fontFamily: "'Fira Code', monospace",
                  fontSize: "13px",
                  textDecoration: "none",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#0A66C2"; e.currentTarget.style.borderColor = "rgba(10,102,194,0.2)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
              >
                <FaLinkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>
        </motion.div>

        {/* 3D sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ flex: "1 1 400px", minWidth: "300px", height: "500px", cursor: "grab" }}
        >
          <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 2]}>
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} />
            <pointLight position={[-10, -10, -5]} intensity={0.3} color="#00FF41" />
            <AnimatedSphere />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
          </Canvas>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ position: "relative", textAlign: "center", marginTop: "120px", paddingBottom: "32px" }}
      >
        <div style={{ margin: "0 auto", maxWidth: "400px", height: "1px", background: "linear-gradient(90deg, transparent, #1f2937, transparent)", marginBottom: "32px" }} />
        <p style={{ fontFamily: "'Fira Code', monospace", fontSize: "12px", color: "#4b5563", letterSpacing: "0.05em" }}>
          Designed & Built by Sumit Kumar Khadanga
        </p>
        <p style={{ fontFamily: "'Fira Code', monospace", fontSize: "10px", color: "#374151", marginTop: "8px", letterSpacing: "0.1em" }}>
          Next.js · Three.js · Framer Motion · GSAP
        </p>
        <p style={{ marginTop: "12px", fontFamily: "'Fira Code', monospace", fontSize: "11px", color: "rgba(0,255,65,0.25)" }}>
          © {new Date().getFullYear()}
        </p>
      </motion.footer>
    </section>
  );
}
