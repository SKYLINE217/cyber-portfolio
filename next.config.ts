import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",   // DENY blocked our own resume iframe
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",   // unsafe-eval needed by Three.js / Framer Motion
      "style-src 'self' 'unsafe-inline'",                  // unsafe-inline needed by inline styles
      "font-src 'self'",                                   // self-hosted via next/font
      "img-src * data: blob:",                             // GitHub readme images
      "connect-src 'self' https://api.github.com",         // README API
      "worker-src blob:",                                  // Three.js workers
      "frame-ancestors 'self'",                            // allow same-origin iframe (resume PDF)
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
