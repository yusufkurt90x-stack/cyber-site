import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Parser from "rss-parser";

type FeedItem = {
  id: string;
  source: string;
  title: string;
  link: string;
  pubDate: string | null;
  contentSnippet: string;
};

const parser = new Parser({
  headers: { "User-Agent": "kvpos-threat-collector/1.0" },
});

// Kaynak listesi - gerektiğinde burada ekleyip çıkarabilirsin
const FEEDS = [
  { url: "https://thehackernews.com/feeds/posts/default?alt=rss", name: "The Hacker News" },
  { url: "https://krebsonsecurity.com/feed/", name: "KrebsOnSecurity" },
  { url: "https://www.bleepingcomputer.com/feed/", name: "BleepingComputer" },
  { url: "https://www.malwarebytes.com/blog/feed/", name: "MalwareBytes" },
  { url: "https://www.zdnet.com/topic/security/rss.xml", name: "ZDNet Security" },
  { url: "https://www.cert.gov.tr/feed", name: "CERT/TR" },
  { url: "https://threatpost.com/feed/", name: "ThreatPost" },
  { url: "https://www.securityweek.com/feed/", name: "SecurityWeek" },
  { url: "https://www.darkreading.com/rss_simple.asp", name: "DarkReading" },
];

export async function GET(req: NextRequest) {
  try {
    // Simple in-memory cache to reduce external requests when route is hit frequently.
    // Note: This cache is ephemeral and resets on server restart.
    const cacheKey = "kvpos_rss_cache";
    const cacheTTL = 45 * 1000; // 45 seconds
    // @ts-ignore
    if (!globalThis.__kvpos_rss_cache) globalThis.__kvpos_rss_cache = { ts: 0, data: null };
    // @ts-ignore
    const cache = globalThis.__kvpos_rss_cache;

    const now = Date.now();
    if (cache.data && now - cache.ts < cacheTTL) {
      return NextResponse.json({ ok: true, data: cache.data });
    }

    const results: FeedItem[] = [];

    await Promise.all(
      FEEDS.map(async (f) => {
        try {
          const feed = await parser.parseURL(f.url);
          const items = (feed.items || [])
            .slice(0, 8)
            .map((it: any, idx: number) => {
              const id = `${f.name.replace(/\s+/g, "_")}_${idx}_${(it.guid || it.link || it.title || "").slice(0, 60)}`;
              return {
                id,
                source: f.name || feed.title || f.url,
                title: it.title || "",
                link: it.link || "",
                pubDate: it.pubDate || it.isoDate || null,
                contentSnippet: (it.contentSnippet || it.content || "").replace(/(<([^>]+)>)/gi, ""), // strip HTML
              } as FeedItem;
            });
          results.push(...items);
        } catch (e) {
          // dev veya prod logs için hata yakala ama devam et
          // console.error(`Failed to fetch ${f.url}`, e);
        }
      })
    );

    // sort by pubDate desc (nulls last)
    results.sort((a, b) => {
      const ta = a.pubDate ? new Date(a.pubDate).getTime() : 0;
      const tb = b.pubDate ? new Date(b.pubDate).getTime() : 0;
      return tb - ta;
    });

    // update cache
    // @ts-ignore
    globalThis.__kvpos_rss_cache = { ts: now, data: results };

    return NextResponse.json({ ok: true, data: results });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
