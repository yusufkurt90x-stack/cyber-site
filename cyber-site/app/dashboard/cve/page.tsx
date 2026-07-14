"use client";

import { useEffect, useState } from "react";
import { Search, ShieldAlert, ExternalLink, Loader2, Activity } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export default function CVEPanelPage() {
  const [cves, setCves] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('/api/cve')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCves(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = cves.filter(c => 
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#00FF88] mb-4" size={32} />
        <p className="text-[#00FF88] font-black text-[10px] tracking-widest uppercase animate-pulse">
           İstihbarat Senkronize Ediliyor...
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Başlık */}
      <div className="mb-12">
        <h1 className="text-6xl font-black italic uppercase tracking-tighter text-white">
          VULNERABILITY <span className="text-[#00FF88]">INTEL</span>
        </h1>
      </div>

      {/* Arama Barı */}
      <div className="relative max-w-2xl mb-12">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
        <input 
          type="text"
          placeholder="CVE ID veya Anahtar Kelime Ara..."
          className="w-full bg-[#111]/50 border border-[#00FF88]/20 rounded-2xl py-5 pl-14 pr-4 text-white outline-none focus:border-[#00FF88] transition-all italic font-medium"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* CVE Liste */}
      <div className="grid gap-4">
        {filtered.map((cve) => (
          <div key={cve.id} className="group flex flex-col md:flex-row gap-6 bg-[#0a0a0a] border border-white/5 p-6 rounded-3xl hover:border-[#00FF88]/40 transition-all duration-300">
            <div className="min-w-[150px]">
              <h3 className="text-xl font-black italic text-white group-hover:text-[#00FF88] transition-colors">
                {cve.id}
              </h3>
              <div className="mt-2 inline-block px-3 py-1 bg-red-500/10 border border-red-500/30 rounded text-red-500 text-[10px] font-black uppercase tracking-widest">
                {cve.severity}
              </div>
            </div>

            <div className="flex-1 border-l border-white/5 pl-6">
              <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                {cve.description}
              </p>
              <div className="flex gap-4 text-[9px] font-black text-gray-600 uppercase italic">
                 <span className="flex items-center gap-1.5"><Activity size={12}/> {cve.vendor} / {cve.product}</span>
                 <span>Yayın: {cve.published}</span>
              </div>
            </div>

            <a 
              href={cve.url} 
              target="_blank" 
              className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#111] border border-white/10 group-hover:bg-[#00FF88] group-hover:text-black transition-all"
            >
              <ExternalLink size={18} />
            </a>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 font-bold py-20 uppercase tracking-[0.3em]">
             İstihbarat kaydı bulunamadı.
          </p>
        )}
      </div>
    </div>
  );
}
