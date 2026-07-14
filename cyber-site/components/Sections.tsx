"use client";
import { motion } from "framer-motion";
import { Shield, ExternalLink, Terminal, Mail, Lock } from "lucide-react";
import { Container } from "./ui/Container";

const SectionHeader = ({ tag, title }: { tag: string, title: string }) => (
  <div className="mb-10">
    <p className="text-[10px] font-mono text-primary/70 tracking-[0.3em] uppercase underline decoration-primary/20 underline-offset-8 mb-4">// {tag}</p>
    <h2 className="text-3xl font-bold uppercase tracking-tighter">{title}</h2>
  </div>
);

export const CVEDashboard = () => (
  <section id="cve" className="py-20 border-t border-white/5">
    <Container>
      <SectionHeader tag="CVE_TRACKER" title="Sistem Zafiyetleri" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[{ id: "CVE-2025-001", v: "Kritik", s: "Apache RCE" }, { id: "CVE-2025-042", v: "Yüksek", s: "Kernel LPE" }].map(c => (
          <div key={c.id} className="glass p-5 border-l-2 border-l-primary hover:bg-primary/5 transition-all">
            <div className="flex justify-between text-[10px] font-mono text-primary mb-2"><span>{c.id}</span><span>{c.v}</span></div>
            <p className="text-sm font-bold text-gray-300">{c.s}</p>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

export const Projects = () => (
  <section id="projects" className="py-20 border-t border-white/5">
    <Container>
      <SectionHeader tag="PROJECTS" title="Geliştirilen Projeler" />
      <div className="grid md:grid-cols-2 gap-6">
        {["ThreatMap Pro", "ReconKit CLI"].map(p => (
          <div key={p} className="glass p-6 group cursor-pointer border border-white/5 hover:border-primary/30 transition-all">
            <div className="flex items-center justify-between mb-4"><Shield className="text-primary" size={24} /><ExternalLink size={16} className="text-gray-600 group-hover:text-white" /></div>
            <h3 className="font-bold text-lg mb-2">{p}</h3>
            <p className="text-xs text-gray-500">Güvenlik odaklı açık kaynak kodlu istihbarat aracı.</p>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

export const Contact = () => (
  <section id="contact" className="py-20 bg-primary/[0.02]">
    <Container>
      <div className="glass p-10 flex flex-col items-center text-center border-primary/10">
        <Lock size={40} className="text-primary mb-6 animate-pulse" />
        <h2 className="text-3xl font-bold mb-4">GÜVENLİ KANAL AÇILDI</h2>
        <p className="text-gray-500 mb-8 max-w-md font-mono text-xs">İş birlikleri ve siber güvenlik araştırmaları için şifreli iletişim hattını kullanın.</p>
        <a href="mailto:contact@intel-os.dev" className="bg-primary text-black px-10 py-4 font-mono font-bold text-xs tracking-widest hover:shadow-[0_0_30px_rgba(0,255,136,0.3)] transition-all">MESAJ GÖNDER // SEND_MAIL</a>
      </div>
    </Container>
  </section>
);
