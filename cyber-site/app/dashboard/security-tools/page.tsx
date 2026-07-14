"use client";

import { SECURITY_TOOLS } from "@/constants/tools";
import { Terminal, ExternalLink, ShieldCheck, Cpu } from "lucide-react";

export default function SecurityTools() {
  return (
    <section className="py-20 bg-transparent">
      <div className="mb-12">
        <h2 className="text-4xl font-black italic uppercase text-white tracking-tighter">
          Security <span className="text-[#00FF88]">Arsenal</span>
        </h2>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mt-2 italic">
          Kullanılan ve Önerilen Siber Güvenlik Araç Takımı
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SECURITY_TOOLS.map((tool) => (
          <div 
            key={tool.id} 
            className="group relative bg-[#0f0f0f] border border-white/5 p-6 rounded-[2rem] hover:border-[#00FF88]/40 transition-all duration-500 overflow-hidden"
          >
            {/* Arka Plan Glow Efekti */}
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#00FF88]/5 blur-[50px] group-hover:bg-[#00FF88]/10 transition-all" />

            <div className="flex justify-between items-start mb-6">
              <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-gray-500 uppercase tracking-widest">
                {tool.category}
              </div>
              <div className={`text-[9px] font-black px-2 py-1 rounded ${
                tool.status === 'CRITICAL' ? 'text-red-500 bg-red-500/10' : 'text-[#00FF88] bg-[#00FF88]/10'
              }`}>
                {tool.status}
              </div>
            </div>

            <h3 className="text-2xl font-black text-white italic mb-3 group-hover:text-[#00FF88] transition-colors uppercase">
              {tool.name}
            </h3>
            
            <p className="text-gray-500 text-sm font-medium mb-6 leading-relaxed line-clamp-3 italic">
              {tool.description}
            </p>

            {/* Simüle Edilmiş Terminal Komutu */}
            <div className="bg-black/50 rounded-xl p-3 border border-white/5 mb-6 group-hover:border-[#00FF88]/20 transition-all">
              <div className="flex items-center gap-2 mb-1.5 opacity-50 text-[9px] font-bold uppercase">
                <Terminal size={10} /> Quick Command
              </div>
              <code className="text-[#00FF88] text-[11px] font-mono block overflow-x-auto whitespace-nowrap">
                $ {tool.cmd}
              </code>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-600">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-bold uppercase">Verified</span>
              </div>
              
              <a 
                href={tool.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white hover:text-[#00FF88] transition-colors"
              >
                BELGELERİ_OKU
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
