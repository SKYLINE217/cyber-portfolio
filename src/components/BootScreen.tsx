// src/components/BootScreen.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LINUX_LOGS = [
  "[    0.000000] Linux version 6.5.0-kali3-amd64 (devel@kali.org) (gcc-13)",
  "[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-6.5.0 root=UUID=...",
  "[    0.000000] BIOS-e820: [mem 0x0000000000000000-0x000000000009fbff] usable",
  "[    0.000000] NX (Execute Disable) protection: active",
  "[    0.000000] SMBIOS 2.8 present.",
  "[    0.004000] efi: EFI v2.70 by American Megatrends",
  "[    0.004000] secureboot: Secure boot disabled",
  "[    0.015000] random: crng init done",
  "[    0.023000] PCI: Using configuration type 1 for base access",
  "[    0.051000] HugeTLB registered 1.00 GiB page size, pre-allocated 0 pages",
  "[    0.062000] ACPI: Added _OSI(Module Device)",
  "[    0.062000] ACPI: Added _OSI(Processor Device)",
  "[    0.062000] ACPI: Added _OSI(3.0 _SCP Extensions)",
  "[    0.103000] vgaarb: setting as boot device",
  "[    0.150000] pps_core: Software ver. 5.3.6 - Copyright 2005-2007",
  "[    0.180000] Netfilter messages via NETLINK v0.30.",
  "[    0.210000] PCI: Using ACPI for IRQ routing",
  "[    0.280000] Initializing Cyber-OS core components...",
  "[    0.350000] Loading visual drivers: SUCCESS",
  "[    0.410000] Mounting encrypted file systems: SUCCESS",
  "[    0.500000] Establishing secure orbital link...",
  "[    0.600000] Link established.",
  "[    0.720000] Accessing root directory...",
  "[    0.850000] Root access granted.",
  "System boot complete.",
  "Executing profile: SUMIT_KUMAR_KHADANGA..."
];

export default function BootScreen({ onFinish }: { onFinish: () => void }) {
  const [logIndex, setLogIndex] = useState(0);
  const [phase, setPhase] = useState<'boot' | 'name' | 'exit'>('boot');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Play a short synth boot sound
  useEffect(() => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.warn("Audio context failed", e);
    }
  }, []);

  // Rapidly show logs
  useEffect(() => {
    if (phase !== 'boot') return;
    
    if (logIndex < LINUX_LOGS.length) {
      const delay = Math.random() * 40 + 10; // 10ms to 50ms per line
      const timer = setTimeout(() => {
        setLogIndex(i => i + 1);
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, delay);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setPhase('name');
      }, 400); // short pause before name
      return () => clearTimeout(timer);
    }
  }, [logIndex, phase]);

  // Name phase and transition
  useEffect(() => {
    if (phase === 'name') {
      const timer = setTimeout(() => {
        setPhase('exit');
        setTimeout(onFinish, 1200); // time for the exit blur/fade out
      }, 2500); // how long to show the big name
      return () => clearTimeout(timer);
    }
  }, [phase, onFinish]);

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(12px)', scale: 1.1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#030303] flex flex-col items-center justify-center overflow-hidden"
        >
          {phase === 'boot' && (
            <div 
              ref={scrollRef}
              className="w-full max-w-4xl h-[60vh] overflow-y-auto text-xs md:text-sm lg:text-base leading-relaxed p-8 text-[#00FF87] font-mono opacity-80"
              style={{ textShadow: "0 0 6px rgba(0,255,135,0.4)" }}
            >
              {LINUX_LOGS.slice(0, logIndex).map((log, i) => (
                <div key={i}>{log}</div>
              ))}
              <span className="animate-pulse block mt-2 w-2 h-4 bg-[#00FF87]"></span>
            </div>
          )}

          {phase === 'name' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="text-center"
            >
              <h1 
                className="font-black text-white tracking-tighter" 
                style={{ 
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(4rem, 12vw, 9rem)",
                  lineHeight: 0.9,
                  textShadow: "0 0 40px rgba(0,255,135,0.4)"
                }}
              >
                Welcome.
              </h1>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
