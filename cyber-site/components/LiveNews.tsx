"use client";

import { useEffect, useState } from 'react';
import { getLiveCyberNews, CyberNewsItem } from '@/lib/news';
import { ExternalLink, Radio } from 'lucide-react';

export default function LiveNews() {
  const [news, setNews] = useState<CyberNewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLiveCyberNews().then(data => {
      setNews(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-[#00FF88] text-[10px] animate-pulse">HADİS_BELGESİ_ARANIYOR...</div>;

  return (
    <div className="space-y-4">
      {news.map((item) => (
        <a 
          key={item.id} 
          href={item.url} 
          target="_blank" 
          className="group block bg-[#0a0a0a] border border-white/5 p-4 rounded-2xl hover:border-[#00FF88]/30 transition-all border-l-2 border-l-[#00FF88]/20"
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-[8px] bg-[#00FF88]/10 text-[#00FF88] px-2 py-0.5 rounded border border-[#00FF88]/20 font-black tracking-widest uppercase">
              INTEL_FEED
            </span>
            <span className="text-gray-600 text-[9px] font-mono">
              {new Date(item.time * 1000).toLocaleTimeString()}
            </span>
          </div>
          <h4 className="text-white text-[11px] font-bold leading-relaxed group-hover:text-[#00FF88] transition-colors uppercase italic">
            {item.title}
          </h4>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-gray-700 text-[9px] font-black uppercase tracking-widest">Kaynak: HackerNews</span>
            <ExternalLink size={10} className="text-[#00FF88] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </a>
      ))}
      {news.length === 0 && <p className="text-gray-600 text-[10px] italic">Aktif harekat verisi bulunamadı.</p>}
    </div>
  );
}
