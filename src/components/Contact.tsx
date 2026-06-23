"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html, Box, Cylinder } from "@react-three/drei";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import * as THREE from "three";

function Motherboard3D() {
  const group = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (group.current) {
      // Gentle breathing rotation
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.15;
      group.current.rotation.x = 0.5 + Math.sin(state.clock.getElapsedTime() * 0.3) * 0.05;
      group.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
      <group ref={group}>
        {/* Main PCB Board */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[4.5, 0.1, 4.5]} />
          <meshStandardMaterial color="#0f2b3c" metalness={0.7} roughness={0.4} />
        </mesh>

        {/* Traces Grid (Simulating complex PCB lines) */}
        <gridHelper args={[4.2, 40, "#00D4FF", "#00FF87"]} position={[0, 0.051, 0]} />

        {/* Outer CPU Socket Mount (Silver/Metal) */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[1.8, 0.1, 1.4]} />
          <meshStandardMaterial color="#e0e0e0" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Inner CPU Socket Base (Dark) */}
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[1.4, 0.05, 1.0]} />
          <meshStandardMaterial color="#111" metalness={0.5} roughness={0.8} />
        </mesh>

        {/* Glowing CPU Die (Gradient effect via two colored lights below) */}
        <mesh position={[0, 0.18, 0]}>
          <planeGeometry args={[1.3, 0.9]} />
          <meshStandardMaterial color="#ffffff" emissive="#BF5FFF" emissiveIntensity={0.5} />
        </mesh>

        {/* Holographic Logo over the CPU */}
        <Html 
          position={[0, 0.25, 0]} 
          transform
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            userSelect: "none"
          }}>
            <svg width="100" height="85" viewBox="30 30 100 90" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0px 0px 8px rgba(242,113,33,0.6))", marginBottom: "8px" }}>
              <defs>
                <linearGradient id="topGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFB75E" />
                  <stop offset="100%" stopColor="#F27121" />
                </linearGradient>
                <linearGradient id="leftGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F5515F" />
                  <stop offset="100%" stopColor="#A60021" />
                </linearGradient>
                <linearGradient id="rightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F27121" />
                  <stop offset="100%" stopColor="#E94057" />
                </linearGradient>
              </defs>
              <polygon points="30,60 80,35 130,60 80,85" fill="url(#topGrad)" />
              <polygon points="30,60 80,85 80,115 30,90" fill="url(#leftGrad)" />
              <polygon points="80,85 130,60 130,90 80,115" fill="url(#rightGrad)" />
            </svg>
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "18px",
              fontWeight: 500,
              color: "#F9A83E",
              letterSpacing: "0.22em",
              transform: "scaleX(1.35)",
              textShadow: "0 0 10px rgba(249,168,62,0.4)"
            }}>
              SUMIT
            </div>
          </div>
        </Html>

        {/* Peripheral Microchips */}
        <Box args={[0.8, 0.12, 0.8]} position={[-1.2, 0.06, -1.2]}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.4} roughness={0.7} />
        </Box>
        <Box args={[0.5, 0.12, 0.5]} position={[-1.2, 0.06, -0.2]}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.4} roughness={0.7} />
        </Box>
        <Box args={[0.6, 0.12, 0.4]} position={[1.4, 0.06, -1.2]}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.4} roughness={0.7} />
        </Box>
        <Box args={[1.0, 0.12, 0.5]} position={[0, 0.06, 1.5]}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.4} roughness={0.7} />
        </Box>

        {/* Capacitors (Cylinders) */}
        {[[-1.8, 1.8], [-1.8, 1.5], [-1.8, 1.2]].map((pos, i) => (
          <Cylinder key={i} args={[0.12, 0.12, 0.2, 16]} position={[pos[0], 0.1, pos[1]]}>
            <meshStandardMaterial color="#a0a0a0" metalness={0.9} roughness={0.3} />
          </Cylinder>
        ))}
      </group>
    </Float>
  );
}

const contactLinks = [
  {
    id: "email-link",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: "sumitkumarkhadanga@gmail.com",
    href: "mailto:sumitkumarkhadanga@gmail.com",
    accent: "#00FF87",
  },
];

export default function Contact() {
  return (
    <section id="contact" style={{ padding: "130px 0 0", width: "100%", position: "relative", zIndex: 10, overflow: "hidden", background: "var(--color-bg-void)" }}>
      <div className="section-divider" />
      <div className="grid-pattern" style={{ position: "absolute", inset: 0, opacity: 0.18 }} />
      <div className="gradient-orb" style={{ width: 700, height: 700, background: "#00D4FF", bottom: -200, left: "50%", transform: "translateX(-50%)", opacity: 0.07 }} />
      <div className="gradient-orb" style={{ width: 450, height: 450, background: "#00FF87", top: 0, left: -150, opacity: 0.07 }} />

      <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "48px" }}>

        {/* ── Contact Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
          style={{ flex: "1 1 480px", minWidth: "300px", zIndex: 10 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
            <h2 className="display-md">
              <span className="section-number">05.</span>
              <span style={{ display: "block", marginTop: "4px" }}>Let&apos;s Connect</span>
            </h2>
            <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, rgba(0,212,255,0.18), transparent)" }} />
          </div>

          <p style={{
            color: "rgba(180,185,210,0.65)", fontSize: "16px", lineHeight: 1.75,
            marginBottom: "40px", maxWidth: "460px",
          }}>
            Currently open for new opportunities. Whether you have a question or just want to say hi —
            I&apos;ll try my best to get back to you!
          </p>

          {/* Info card */}
          <div className="bento-card" style={{ padding: "32px", position: "relative", overflow: "hidden" }}>
            <div className="accent-line" style={{
              background: "linear-gradient(90deg, #00FF87, #00D4FF, #BF5FFF)", opacity: 0.65,
            }} />

            {/* Live indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
              <div style={{ padding: "9px", borderRadius: "10px", background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.12)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4,17 10,11 4,5"/><line x1="12" y1="19" x2="20" y2="19"/>
                </svg>
              </div>
              <span style={{ fontFamily: "'Fira Code', monospace", fontSize: "14px", color: "rgba(255,255,255,0.75)" }}>
                status: <span style={{ color: "#00FF87", animation: "pulse 2s infinite" }}>listening...</span>
              </span>
            </div>

            {/* Email */}
            {contactLinks.map(link => (
              <a
                key={link.id}
                id={link.id}
                href={link.href}
                style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  fontFamily: "'Outfit', sans-serif", fontSize: "14px", fontWeight: 500,
                  color: "rgba(180,185,210,0.6)", textDecoration: "none",
                  marginBottom: "28px", transition: "color 0.25s",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = link.accent; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(180,185,210,0.6)"; }}
              >
                <span style={{ color: link.accent, flexShrink: 0 }}>{link.icon}</span>
                {link.label}
              </a>
            ))}

            {/* Primary CTA */}
            <a
              href="mailto:sumitkumarkhadanga@gmail.com"
              className="btn-primary"
              style={{ marginBottom: "28px" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span>Send a Message</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
              </svg>
            </a>

            {/* Social links */}
            <div style={{ display: "flex", gap: "10px", paddingTop: "22px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <a
                id="contact-github"
                href="https://github.com/SKYLINE217"
                target="_blank" rel="noopener noreferrer"
                style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  padding: "10px 14px", borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "rgba(180,185,210,0.55)",
                  fontFamily: "'Outfit', sans-serif", fontSize: "13px", fontWeight: 500,
                  textDecoration: "none", transition: "all 0.25s",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(180,185,210,0.55)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "transparent"; }}
              >
                <FaGithub size={16} /> GitHub
              </a>
              <a
                id="contact-linkedin"
                href="https://www.linkedin.com/in/sumit-kumar-khadanga-87797b2b6/"
                target="_blank" rel="noopener noreferrer"
                style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  padding: "10px 14px", borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "rgba(180,185,210,0.55)",
                  fontFamily: "'Outfit', sans-serif", fontSize: "13px", fontWeight: 500,
                  textDecoration: "none", transition: "all 0.25s",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "#0A66C2"; e.currentTarget.style.borderColor = "rgba(10,102,194,0.3)"; e.currentTarget.style.background = "rgba(10,102,194,0.04)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(180,185,210,0.55)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "transparent"; }}
              >
                <FaLinkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── 3D Sphere ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }}
          style={{ flex: "1 1 400px", minWidth: "300px", height: "520px", cursor: "grab" }}
        >
          <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 1.5]}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.25} />
              <directionalLight position={[10, 10, 5]} intensity={0.9} />
              <pointLight position={[-10, -10, -5]} intensity={0.4} color="#00FF87" />
              <pointLight position={[10, -10, 5]} intensity={0.2} color="#BF5FFF" />
              <Motherboard3D />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Suspense>
          </Canvas>
        </motion.div>
      </div>

      {/* ── Footer ── */}
      <motion.footer
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ position: "relative", textAlign: "center", marginTop: "120px", paddingBottom: "36px", padding: "0 24px 36px" }}
      >
        <div style={{ margin: "0 auto 32px", maxWidth: "480px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.12), transparent)" }} />

        {/* Nav links */}
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "24px", flexWrap: "wrap" }}>
          {["#about","#projects","#experience","#contact"].map(href => (
            <a key={href} href={href}
              style={{ fontFamily: "'Fira Code', monospace", fontSize: "11px", letterSpacing: "0.12em", color: "rgba(180,185,210,0.25)", textDecoration: "none", transition: "color 0.2s", textTransform: "uppercase" }}
              onMouseEnter={e => { e.currentTarget.style.color = "rgba(0,212,255,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(180,185,210,0.25)"; }}
            >
              {href.slice(1)}
            </a>
          ))}
        </div>

        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "13px", color: "rgba(180,185,210,0.3)", fontWeight: 500 }}>
          Designed &amp; Built by <span style={{ color: "rgba(0,212,255,0.5)" }}>Sumit Kumar Khadanga</span>
        </p>
        <p style={{ fontFamily: "'Fira Code', monospace", fontSize: "10px", color: "rgba(180,185,210,0.15)", marginTop: "6px", letterSpacing: "0.1em" }}>
          Next.js · Three.js · Framer Motion
        </p>
        <p style={{ marginTop: "10px", fontFamily: "'Fira Code', monospace", fontSize: "11px", color: "rgba(0,255,135,0.18)" }}>
          © {new Date().getFullYear()}
        </p>
      </motion.footer>
    </section>
  );
}
