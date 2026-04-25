"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // BUG-008: close mobile menu on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const navLinks = [
    { name: "About", href: "#about", num: "01" },
    { name: "Projects", href: "#projects", num: "02" },
    { name: "Experience", href: "#experience", num: "03" },
    { name: "Resume", href: "#resume", num: "04" },
    { name: "Contact", href: "#contact", num: "05" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 w-full z-40 transition-all duration-500 ${
          scrolled ? "glass-navbar py-3" : "py-5"
        }`}
        style={{ background: scrolled ? undefined : "transparent" }}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span style={{ fontFamily: "'Fira Code', monospace", fontSize: "18px", fontWeight: 700, color: "#fff" }}>
              SK<span style={{ color: "#00FF41" }} className="animate-pulse">_</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center" style={{ gap: "4px" }}>
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
                style={{
                  fontFamily: "'Fira Code', monospace",
                  fontSize: "13px",
                  color: "#9ca3af",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                className="hover:bg-white/5"
                onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#9ca3af"; }}
              >
                <span style={{ color: "rgba(0,229,255,0.6)", marginRight: "4px" }}>{link.num}.</span>
                {link.name}
              </motion.a>
            ))}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              style={{
                marginLeft: "16px",
                fontFamily: "'Fira Code', monospace",
                fontSize: "13px",
                border: "1px solid rgba(0,255,65,0.4)",
                color: "#00FF41",
                padding: "8px 20px",
                borderRadius: "8px",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,255,65,0.08)";
                e.currentTarget.style.borderColor = "#00FF41";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(0,255,65,0.4)";
              }}
            >
              Resume
            </motion.a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
            style={{ color: "#9ca3af", padding: "8px", background: "none", border: "none", cursor: "pointer" }}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 md:hidden"
          >
            <div
              style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)" }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              style={{
                position: "absolute", right: 0, top: 0, height: "100%", width: "280px",
                background: "#0c0c14", borderLeft: "1px solid rgba(255,255,255,0.05)",
                display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "24px",
              }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    fontFamily: "'Fira Code', monospace", fontSize: "18px", color: "#d1d5db",
                    textDecoration: "none", transition: "color 0.3s",
                  }}
                >
                  <span style={{ color: "#00FF41", marginRight: "8px" }}>{link.num}.</span>
                  {link.name}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
