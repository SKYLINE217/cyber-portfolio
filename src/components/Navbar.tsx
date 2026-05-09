"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "#about",      label: "About",      num: "01" },
  { href: "#projects",   label: "Projects",   num: "02" },
  { href: "#experience", label: "Experience", num: "03" },
  { href: "#contact",    label: "Contact",    num: "05" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [active,    setActive]    = useState<string>("");
  const [menuOpen,  setMenuOpen]  = useState(false);
  const lastY = useRef(0);
  const [hidden, setHidden] = useState(false);

  /* Scroll → glass + section tracking + auto-hide */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > lastY.current && y > 300);
      lastY.current = y;

      // Active section detection
      const ids = NAV_LINKS.map(l => l.href.slice(1));
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(ids[i]); return;
        }
      }
      setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !menuOpen ? -90 : 0 }}
        transition={{ duration: 0.35, ease: [0.4,0,0.2,1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0,
          zIndex: 900,
          height: "70px",
          display: "flex", alignItems: "center",
          transition: "background 0.4s, box-shadow 0.4s",
          ...(scrolled ? {
            background: "rgba(2,2,7,0.88)",
            backdropFilter: "blur(32px) saturate(1.6)",
            WebkitBackdropFilter: "blur(32px) saturate(1.6)",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
            boxShadow: "0 4px 32px rgba(0,0,0,0.5)",
          } : {
            background: "transparent",
          }),
        }}
      >
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          padding: "0 24px", width: "100%",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <Link href="#hero" style={{ textDecoration: "none" }} onClick={() => setMenuOpen(false)}>
            <motion.div
              whileHover={{ scale: 1.04 }}
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              {/* Logo mark */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <svg width="30" height="26" viewBox="30 30 100 90" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0px 0px 4px rgba(242,113,33,0.5))" }}>
                  <defs>
                    <linearGradient id="navTopGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FFB75E" />
                      <stop offset="100%" stopColor="#F27121" />
                    </linearGradient>
                    <linearGradient id="navLeftGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#F5515F" />
                      <stop offset="100%" stopColor="#A60021" />
                    </linearGradient>
                    <linearGradient id="navRightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#F27121" />
                      <stop offset="100%" stopColor="#E94057" />
                    </linearGradient>
                  </defs>
                  <polygon points="30,60 80,35 130,60 80,85" fill="url(#navTopGrad)" />
                  <polygon points="30,60 80,85 80,115 30,90" fill="url(#navLeftGrad)" />
                  <polygon points="80,85 130,60 130,90 80,115" fill="url(#navRightGrad)" />
                </svg>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#F9A83E",
                  letterSpacing: "0.22em",
                  transform: "scaleX(1.35)",
                  transformOrigin: "left center"
                }}>
                  SUMIT
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {NAV_LINKS.map(link => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    position: "relative",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "14px",
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "#fff" : "rgba(180,185,210,0.55)",
                    textDecoration: "none",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    transition: "all 0.25s",
                    background: isActive ? "rgba(255,255,255,0.05)" : "transparent",
                    display: "flex", alignItems: "center", gap: "5px",
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = "rgba(180,185,210,0.55)";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  <span style={{ fontFamily: "'Fira Code', monospace", fontSize: "10px", color: isActive ? "rgba(0,212,255,0.7)" : "rgba(0,212,255,0.3)" }}>
                    {link.num}.
                  </span>
                  {link.label}
                  {isActive && (
                    <motion.div layoutId="nav-indicator" style={{
                      position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)",
                      width: 4, height: 4, borderRadius: "50%",
                      background: "#00D4FF",
                      boxShadow: "0 0 8px rgba(0,212,255,0.8)",
                    }} />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA + Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a
              href="mailto:sumitkumarkhadanga@gmail.com"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                color: "#00FF87",
                textDecoration: "none",
                padding: "8px 18px",
                borderRadius: "8px",
                border: "1.5px solid rgba(0,255,135,0.3)",
                transition: "all 0.3s",
                display: "flex", alignItems: "center", gap: "6px",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(0,255,135,0.08)";
                e.currentTarget.style.borderColor = "rgba(0,255,135,0.6)";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(0,255,135,0.12)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(0,255,135,0.3)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
              Hire Me
            </a>

            {/* Hamburger */}
            <button
              id="menu-toggle"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              style={{
                background: "none", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "8px", padding: "8px", cursor: "pointer",
                color: menuOpen ? "#00D4FF" : "rgba(180,185,210,0.6)",
                display: "flex", flexDirection: "column", gap: "4px",
                transition: "all 0.25s",
              }}
            >
              <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }} transition={{ duration: 0.25 }}
                style={{ display: "block", width: 18, height: 2, background: "currentColor", borderRadius: "1px" }} />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} transition={{ duration: 0.2 }}
                style={{ display: "block", width: 18, height: 2, background: "currentColor", borderRadius: "1px" }} />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} transition={{ duration: 0.25 }}
                style={{ display: "block", width: 18, height: 2, background: "currentColor", borderRadius: "1px" }} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.4,0,0.2,1] }}
            style={{
              position: "fixed", top: 70, left: 0, right: 0, zIndex: 899,
              background: "rgba(2,2,7,0.97)",
              backdropFilter: "blur(32px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              padding: "24px",
            }}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "18px", fontWeight: 600,
                    color: active === link.href.slice(1) ? "#fff" : "rgba(180,185,210,0.6)",
                    textDecoration: "none",
                    padding: "16px 20px", borderRadius: "12px",
                    display: "flex", alignItems: "center", gap: "12px",
                    background: active === link.href.slice(1) ? "rgba(255,255,255,0.05)" : "transparent",
                    transition: "background 0.2s",
                  }}
                >
                  <span style={{ fontFamily: "'Fira Code', monospace", fontSize: "12px", color: "rgba(0,212,255,0.4)" }}>{link.num}.</span>
                  {link.label}
                </motion.a>
              ))}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "8px", paddingTop: "16px" }}>
                <a
                  href="mailto:sumitkumarkhadanga@gmail.com"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    padding: "14px", borderRadius: "12px",
                    background: "rgba(0,255,135,0.06)", border: "1.5px solid rgba(0,255,135,0.25)",
                    color: "#00FF87", textDecoration: "none",
                    fontFamily: "'Outfit', sans-serif", fontSize: "15px", fontWeight: 700,
                  }}
                >
                  ✉ Hire Me
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
