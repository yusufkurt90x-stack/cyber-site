"use client";

import React from "react";
import useSWR from "swr";
import { Zap, Globe } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function ThreatFeedPage() {
  const { data, error } = useSWR("/api/threats/rss", fetcher, { refreshInterval: 60_000 });

  const feeds = data?.ok ? data.data : [];

  return (
    <div className="space-y-6">
      <header>
        <div className="flex items-center gap-3">
          <Zap className="text-[#00FF88]" />
          <h1 className="text-3xl font-black">Canlı <span className="text-[#00FF88]">Siber Haberler</span></h1>
        </div>
        <p className="text-gray-500 text-sm">Birçok kaynaktan derlenen en son haber başlıkları</p>
      </header>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {error && <div className="text-red-500">Haber yüklenemedi</div>}
          {!error && feeds.length === 0 && <div className="text-gray-500">Haber bulunamadı</div>}

          <div className="space-y-3">
            {feeds.map((it: any) => (
              <a key={it.id} href={it.link} target="_blank" rel="noreferrer" className="block bg-[#0a0a0a] p-4 rounded-xl hover:border-[#00FF88]/30 border border-white/5">
                <div className="flex justify-between items-start gap-4">
                  <div className="max-w-[70%]">
                    <h3 className="font-bold line-clamp-2">{it.title}</h3>
                    <p className="text-xs text-gray-400 mt-2 line-clamp-3">{it.contentSnippet}</p>
                    <div className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest">{it.source}</div>
                  </div>
                  <div className="text-[10px] text-gray-400">{it.pubDate ? new Date(it.pubDate).toLocaleString() : ""}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white/5">
            <h3 className="text-sm font-black text-[#00FF88]">Kaynaklar</h3>
            <ul className="mt-3 text-[12px] text-gray-400 space-y-2">
              <li><a className="hover:text-[#00FF88]" href="https://thehackernews.com" target="_blank" rel="noreferrer">The Hacker News</a></li>
              <li><a className="hover:text-[#00FF88]" href="https://krebsonsecurity.com" target="_blank" rel="noreferrer">KrebsOnSecurity</a></li>
              <li><a className="hover:text-[#00FF88]" href="https://www.bleepingcomputer.com" target="_blank" rel="noreferrer">Bleeping Computer</a></li>
              <li><a className="hover:text-[#00FF88]" href="https://www.malwarebytes.com" target="_blank" rel="noreferrer">MalwareBytes</a></li>
              <li><a className="hover:text-[#00FF88]" href="https://www.zdnet.com/topic/security/" target="_blank" rel="noreferrer">ZDNet Security</a></li>
              <li><a className="hover:text-[#00FF88]" href="https://www.cert.gov.tr" target="_blank" rel="noreferrer">CERT/TR</a></li>
            </ul>
          </div>

          <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white/5">
            <h3 className="text-sm font-black text-[#00FF88]">Hızlı Filtre</h3>
            <p className="text-xs text-gray-400">Henüz basit filtreleme var; istersen tag, source veya severity filtreleri ekleyeyim.</p>
          </div>
        </aside>
      </section>
    </div>
  );
}
