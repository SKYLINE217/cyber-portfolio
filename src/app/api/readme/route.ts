import { NextRequest, NextResponse } from "next/server";

// ── In-memory cache: repo → { html, expiresAt } ────────────────
const cache = new Map<string, { html: string; expiresAt: number }>();
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

export async function GET(req: NextRequest) {
  const repo = req.nextUrl.searchParams.get("repo");

  if (!repo || !/^[\w.-]+\/[\w.-]+$/.test(repo)) {
    return NextResponse.json({ error: "Invalid repo" }, { status: 400 });
  }

  // Serve from cache if still fresh
  const cached = cache.get(repo);
  if (cached && Date.now() < cached.expiresAt) {
    return new NextResponse(cached.html, {
      headers: { "Content-Type": "text/html", "X-Cache": "HIT" },
    });
  }

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.html+json",
    "User-Agent": "cyber-portfolio",
  };

  // Use a GitHub PAT if provided (increases rate limit from 60 to 5000/hr)
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/readme`, {
      headers,
      next: { revalidate: 600 }, // Next.js edge cache: 10 min
    });

    if (!res.ok) {
      const status = res.status === 404 ? 404 : 502;
      return NextResponse.json({ error: "README not found" }, { status });
    }

    const html = await res.text();
    cache.set(repo, { html, expiresAt: Date.now() + CACHE_TTL_MS });

    return new NextResponse(html, {
      headers: { "Content-Type": "text/html", "X-Cache": "MISS" },
    });
  } catch {
    return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  }
}
