# cyber-portfolio — Audit Log
**Generated:** 2026-04-26  
**Auditor:** Antigravity (AI Code Assistant)  
**Scope:** Full source audit of `src/` — bugs, UX issues, performance, and security risks  

---

## 1. BUG LOG

### BUG-001 · `Experience.tsx` — Timeline dot height mismatch (regression risk)
| Field | Detail |
|---|---|
| **File** | `src/components/Experience.tsx` |
| **Severity** | Medium |
| **Status** | Partially fixed |

**Description:** The dot column now uses `paddingTop: "28px"` to align dots with card headers. This works while card content stays the same, but if card text reflows on narrow screens or content changes, the dot drifts off the card header again. The padding value is hardcoded and not tied to the card's actual rendered top.

**Fix:** Use a `ref` on each card's header `<div>` and read its `offsetTop` dynamically, or use a CSS Grid approach where each row is a single `<tr>`-like unit.

---

### BUG-002 · `Projects.tsx` — `dangerouslySetInnerHTML` XSS without sanitization
| Field | Detail |
|---|---|
| **File** | `src/components/Projects.tsx` |
| **Severity** | High (Security) |
| **Status** | Open |

**Description:** The README HTML fetched from the GitHub API is injected with `dangerouslySetInnerHTML` without any sanitization. If a GitHub repo README contains malicious HTML (`<script>`, `onclick`, `javascript:` hrefs etc.), it executes in the visitor's browser.

**Fix:** Sanitize with `DOMPurify` before setting HTML:
```ts
import DOMPurify from "dompurify";
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
```

---

### BUG-003 · `Experience.tsx` — GSAP import present but unused
| Field | Detail |
|---|---|
| **File** | `src/components/Experience.tsx` |
| **Severity** | Low |
| **Status** | Open |

**Description:** The old version imported `gsap` and `ScrollTrigger`. While the current file was rewritten using Framer Motion only, if any remnants of the `gsap` import remain they add dead code weight (~35 KB gzipped) to the bundle.

**Fix:** Verify final file has no `import gsap` — if present, remove it.

---

### BUG-004 · `Contact.tsx` — Phone number exposed in plain HTML
| Field | Detail |
|---|---|
| **File** | `src/components/Contact.tsx` line 83 |
| **Severity** | Medium (Privacy) |
| **Status** | Open |

**Description:** `+91 8904198131` is hardcoded directly in JSX and in the `href="tel:..."` attribute. It will be indexed by search engines and scraped by bots since this is a public GitHub Pages / Vercel site.

**Fix:** Either remove the phone number from the public site, or obfuscate via a server-side environment variable rendered at build time (not ideal for static export). At minimum, add a `<meta name="robots" content="noindex" />` on the contact section text, or simply replace with a contact form.

---

### BUG-005 · `Hero.tsx` — `ref.current!` non-null assertion without guard
| Field | Detail |
|---|---|
| **File** | `src/components/Hero.tsx` line 12, 22–25 |
| **Severity** | Low |
| **Status** | Open |

**Description:** `useRef<THREE.Points>(null!)` uses a non-null assertion. Inside `useFrame`, `ref.current.rotation.x` is accessed without checking if `ref.current` exists. If the Three.js canvas unmounts mid-frame (e.g., on a fast route change), this throws `Cannot read properties of null`.

**Fix:**
```ts
useFrame((_state, delta) => {
  if (!ref.current) return;
  ref.current.rotation.x -= delta / 12;
  ref.current.rotation.y -= delta / 18;
});
```

---

### BUG-006 · `layout.tsx` — Google Fonts loaded via `<link>` in `<head>` (render blocking)
| Field | Detail |
|---|---|
| **File** | `src/app/layout.tsx` lines 19–22 |
| **Severity** | Medium (Performance) |
| **Status** | Open |

**Description:** Google Fonts are fetched via a `<link rel="stylesheet">` tag in `<head>`, which is render-blocking and adds a network round-trip to `fonts.googleapis.com` on every page load. Next.js has a built-in `next/font` system that self-hosts fonts, avoids the extra DNS lookup, and scores better on Lighthouse.

**Fix:**
```ts
import { Inter, Fira_Code } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
const firaCode = Fira_Code({ subsets: ["latin"], weight: ["400","500","600","700"] });
```

---

### BUG-007 · `Contact.tsx` — Three.js Canvas has no `Suspense` boundary
| Field | Detail |
|---|---|
| **File** | `src/components/Contact.tsx` line 178 |
| **Severity** | Low |
| **Status** | Open |

**Description:** `@react-three/fiber` Canvas and `@react-three/drei` components are async loaders. Without a `<Suspense>` boundary, a loading failure will bubble up and crash the entire contact section with no fallback.

**Fix:**
```tsx
import { Suspense } from "react";
<Canvas>
  <Suspense fallback={null}>
    <AnimatedSphere />
    <OrbitControls ... />
  </Suspense>
</Canvas>
```

---

### BUG-008 · `Navbar.tsx` — Mobile menu lacks keyboard trap (accessibility)
| Field | Detail |
|---|---|
| **File** | `src/components/Navbar.tsx` |
| **Severity** | Low |
| **Status** | Open |

**Description:** When the mobile menu is open, keyboard focus is not trapped inside it. A user tabbing with a keyboard will navigate behind the backdrop overlay, interacting with hidden elements. This also fails WCAG 2.1 SC 2.1.2.

**Fix:** Add a focus trap using `useEffect` that sets `tabIndex="-1"` on all elements outside the menu when it's open, and restores them on close. Or use `focus-trap-react` package.

---

### BUG-009 · `Projects.tsx` — README modal has no max-height on loading/error state
| Field | Detail |
|---|---|
| **File** | `src/components/Projects.tsx` |
| **Severity** | Low |
| **Status** | Open |

**Description:** The loading spinner and error message divs use `height: "100%"` to center their content, but the parent div has `flex: 1` which depends on the modal having a fixed height. On very small viewports the modal content area can collapse to zero.

**Fix:** Add `minHeight: "200px"` to the loading/error state containers.

---

### BUG-010 · `globals.css` — `@keyframes pulse` referenced but not defined
| Field | Detail |
|---|---|
| **File** | `src/app/globals.css` + `src/components/Contact.tsx` line 63 |
| **Severity** | Low |
| **Status** | Open |

**Description:** `Contact.tsx` applies `animation: "pulse 2s infinite"` inline on the "listening…" span. The CSS file defines `pulse-glow` but no `pulse` keyframe. Tailwind's `animate-pulse` utility is a Tailwind class and may not map to a raw CSS `animation: pulse` string in inline styles.

**Fix:** Add to `globals.css`:
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
```

---

## 2. PERFORMANCE ISSUES

### PERF-001 · No `loading="lazy"` on heavy Three.js canvases
Both `Hero.tsx` and `Contact.tsx` initialize Three.js WebGL canvases eagerly on mount, even if the contact section is far off-screen. On low-end devices this tanks the initial render.

**Fix:** Wrap the Contact canvas in a `dynamic()` import with `ssr: false` and only mount on intersection:
```ts
const ContactCanvas = dynamic(() => import("./ContactCanvas"), { ssr: false });
```

### PERF-002 · `dpr={[1, 2]}` on both canvases — no mobile cap
On Retina phones `devicePixelRatio` can be 3×, and `dpr={[1, 2]}` correctly caps it at 2. This is fine, but worth noting both canvases draw at full resolution simultaneously when the user is on the Hero. Consider setting `dpr={[1, 1.5]}` for the contact sphere as it is decorative.

### PERF-003 · GitHub API called with no caching or rate-limit handling
`Projects.tsx` fetches from `api.github.com` every time a modal is opened. GitHub's unauthenticated rate limit is **60 req/hour per IP**. Heavy traffic or repeat opens will 403.

**Fix:** Cache the response in a `useRef` map keyed by `repoId`, or use `localStorage` with a 10-minute TTL.

---

## 3. SECURITY AUDIT

### SEC-001 🔴 HIGH — XSS via unsanitized `dangerouslySetInnerHTML`
**File:** `Projects.tsx`  
**Vector:** GitHub API returns HTML for README. If any of the four repos are compromised (supply-chain attack) or contain user-controlled content, arbitrary JavaScript executes in every visitor's browser.  
**Impact:** Session hijacking, credential theft, malicious redirects, drive-by downloads.  
**Fix:** Install and use `dompurify`:
```bash
npm install dompurify @types/dompurify
```
```ts
import DOMPurify from "dompurify";
const clean = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
<div dangerouslySetInnerHTML={{ __html: clean }} />
```

---

### SEC-002 🟠 MEDIUM — PII Exposed: Phone number publicly indexed
**File:** `Contact.tsx` line 83–94  
**Vector:** `+91 8904198131` is rendered in plain HTML, committed to a public GitHub repo, and served on a Vercel domain. Search engines, spam bots, and scrapers will index and harvest it.  
**Impact:** SMS spam, phishing calls, SIM-swapping attempts.  
**Fix:** Remove phone from public HTML. Use a contact form with a backend (e.g., Formspree, Resend) or replace with a masked display.

---

### SEC-003 🟠 MEDIUM — No Content Security Policy (CSP) headers
**File:** Missing `next.config` / `vercel.json`  
**Vector:** No CSP is configured. This means inline scripts, third-party scripts, and eval() can run unchallenged. Combined with SEC-001, a successful XSS has no fallback mitigation.  
**Impact:** XSS escalation, clickjacking, data exfiltration.  
**Fix:** Add `next.config.js` headers:
```js
const securityHeaders = [
  { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src * data:; connect-src 'self' https://api.github.com;" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];
```

---

### SEC-004 🟡 LOW — GitHub API requests made without authentication token
**File:** `Projects.tsx`  
**Vector:** API calls to `api.github.com` are unauthenticated. Rate limit is 60/hr per IP. At a public portfolio, a single bot or heavy user can exhaust the quota, breaking the README viewer for everyone.  
**Impact:** Denial-of-service (soft) — README modal fails silently for all visitors after rate limit hit.  
**Fix:** Use a GitHub Personal Access Token (read-only, public repos) via a Next.js API route so the token is never exposed client-side:
```ts
// src/app/api/readme/route.ts
export async function GET(req: Request) {
  const repo = new URL(req.url).searchParams.get("repo");
  const res = await fetch(`https://api.github.com/repos/${repo}/readme`, {
    headers: {
      Accept: "application/vnd.github.html+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });
  return new Response(await res.text(), { headers: { "Content-Type": "text/html" } });
}
```

---

### SEC-005 🟡 LOW — Google Fonts loaded over external CDN (data exfiltration risk)
**File:** `layout.tsx`  
**Vector:** Every page load makes a request to `fonts.googleapis.com` and then `fonts.gstatic.com`. Google receives the visitor's IP, User-Agent, and Referer for every page view. Under GDPR this is considered PII transfer to a third country without consent.  
**Impact:** Privacy/compliance issue, especially if any EU visitors use the portfolio.  
**Fix:** Use `next/font/google` which self-hosts the font files at build time — zero external font requests at runtime.

---

### SEC-006 🟡 LOW — No `X-Frame-Options` or CSP `frame-ancestors`
**File:** Missing headers config  
**Vector:** The portfolio can be embedded in a foreign `<iframe>` and used for clickjacking — tricking a visitor into clicking portfolio elements while an attacker's UI is overlaid.  
**Impact:** Social engineering, fake "apply now" overlays on your resume/contact section.  
**Fix:** Add `X-Frame-Options: DENY` header (covered in SEC-003 fix above).

---

### SEC-007 🟡 LOW — Resume PDF served with no cache-busting or access control
**File:** `public/resume.pdf`  
**Vector:** The PDF is served from Vercel's CDN with a long cache lifetime. An old version can persist in CDN caches and browsers after an update. Additionally, the raw PDF URL is predictable (`/resume.pdf`) and can be directly scraped.  
**Impact:** Stale resume served to recruiters; PII in the PDF (email, phone) directly accessible.  
**Fix:** Add a version suffix (e.g., `/resume-v2.pdf`) on each update to bust CDN caches. No access control is feasible on a public portfolio, but awareness is important.

---

## 4. SUMMARY TABLE

| ID | Area | Severity | Status |
|---|---|---|---|
| BUG-001 | Timeline dot alignment | Medium | Partially fixed |
| BUG-002 | XSS via dangerouslySetInnerHTML | **High** | Open |
| BUG-003 | Dead GSAP import | Low | Open |
| BUG-004 | Phone number PII exposed | Medium | Open |
| BUG-005 | null ref dereference in Three.js | Low | Open |
| BUG-006 | Render-blocking Google Fonts | Medium | Open |
| BUG-007 | Missing Suspense boundary on Canvas | Low | Open |
| BUG-008 | Mobile menu keyboard trap missing | Low | Open |
| BUG-009 | Modal loading state height collapse | Low | Open |
| BUG-010 | Missing `pulse` keyframe CSS | Low | Open |
| PERF-001 | Eager Three.js canvas init | Medium | Open |
| PERF-002 | DPR cap on decorative canvas | Low | Open |
| PERF-003 | No caching on GitHub API calls | Medium | Open |
| SEC-001 | **XSS — unsanitized HTML injection** | 🔴 HIGH | Open |
| SEC-002 | **PII — phone number indexed** | 🟠 MEDIUM | Open |
| SEC-003 | No CSP headers | 🟠 MEDIUM | Open |
| SEC-004 | Unauthenticated GitHub API (rate limit) | 🟡 LOW | Open |
| SEC-005 | Google Fonts CDN (GDPR) | 🟡 LOW | Open |
| SEC-006 | No clickjacking protection | 🟡 LOW | Open |
| SEC-007 | Resume PDF cache / PII exposure | 🟡 LOW | Open |

---

## 5. PRIORITY ACTION PLAN

```
IMMEDIATE (do now):
  1. [SEC-001 / BUG-002]  Install DOMPurify and sanitize README HTML
  2. [SEC-002 / BUG-004]  Remove phone number from public HTML

SHORT TERM (this week):
  3. [SEC-003]  Add security headers in next.config.js
  4. [SEC-004]  Proxy GitHub API through a Next.js route with a secret token
  5. [BUG-006]  Migrate fonts to next/font/google
  6. [BUG-005]  Add null guard in Hero useFrame

NICE TO HAVE:
  7. [PERF-001] Lazy-load Contact Three.js canvas
  8. [PERF-003] Cache GitHub API responses in memory
  9. [BUG-010] Define pulse keyframe in globals.css
 10. [BUG-007] Add Suspense boundary to Contact canvas
```
