"use client";

import { motion } from "framer-motion";
import { Clock, ExternalLink } from "lucide-react";
import { Container } from "./ui/Container";
import { useState } from "react";

const threats = [
  { title: "Türkiye'ye Yönelik DDoS Saldırısı Tespit Edildi", source: "USOM", date: "2025-07-12", risk: "KRİTİK", summary: "Devlet kurumlarını hedef alan koordineli DDoS saldırısı tespit edildi.", category: "DDoS" },
  { title: "Yeni Fidye Yazılımı: BlackMist v3.2", source: "CISA", date: "2025-07-11", risk: "YÜKSEK", summary: "BlackMist fidye yazılımının yeni varyantı Avrupa finans sektörünü hedef alıyor.", category: "Ransomware" },
  { title: "Apache Log4j Kritik Güncelleme", source: "NVD", date: "2025-07-10", risk: "KRİTİK", summary: "Log4j kütüphanesinde yeni RCE zafiyeti keşfedildi. Acil güncelleme öneriliyor.", category: "CVE" },
  { title: "Sosyal Mühendislik Kampanyası Artışı", source: "Interpol", date: "2025-07-09", risk: "ORTA", summary: "Türkçe phishing e-postaları ile banka müşterilerini hedef alan kampanya tespit edildi.", category: "Phishing" },
  { title: "Zero-Day: Windows Kernel LPE", source: "Microsoft", date: "2025-07-08", risk: "KRİTİK", summary: "Windows çekirdeğinde ayrıcalık yükseltme zafiyeti vahşi doğada istismar ediliyor.", category: "Zero-Day" },
  { title: "IoT Botnet Ağı Genişliyor", source: "Shodan", date: "2025-07-07", risk: "YÜKSEK", summary: "Güvensiz IoT cihazlarını ele geçiren botnet ağı 2 milyonu aşkın cihaza ulaştı.", category: "Botnet" },
];

const riskColor: Record<string, string> = {
  KRİTİK: "text-danger border-danger/30 bg-danger/10",
  YÜKSEK: "text-orange-400 border-orange-400/30 bg-orange-400/10",
  ORTA: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
};

const filters = ["TÜMÜ", "KRİTİK", "YÜKSEK", "ORTA"];

export function ThreatFeed() {
  const [active, setActive] = useState("TÜMÜ");
  const filtered = active === "TÜMÜ" ? threats : threats.filter(t => t.risk === active);

  return (
    <section id="threats" className="relative py-24 border-t border-white/5">
      <Container>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <p className="text-[10px] font-mono text-primary/70 mb-3 tracking-widest">// TEHDİT AKIŞI</p>
            <h2 className="text-3xl font-bold">Canlı <span className="text-primary">İstihbarat</span></h2>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-danger border border-danger/20 px-3 py-1 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse" />
            CANLI SİSTEM
          </div>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap">
          {filters.map(f => (
            <button key={f} onClick={() => setActive(f)}
              className={`font-mono text-xs px-3 py-1 rounded transition-all border ${active === f ? "bg-primary text-background border-primary" : "border-white/10 text-gray-400 hover:border-primary/30"}`}>
              {f}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }} viewport={{ once: true }}
              className="glass rounded-xl p-5 border border-white/5 hover:border-primary/20 transition-all group cursor-pointer">
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${riskColor[t.risk]}`}>{t.risk}</span>
                <span className="text-[10px] font-mono text-gray-600 flex items-center gap-1"><Clock size={10} />{t.date}</span>
              </div>
              <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors">{t.title}</h3>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">{t.summary}</p>
              <div className="flex items-center justify-between border-t border-white/5 pt-3">
                <span className="text-[10px] text-gray-600 font-mono">KAYNAK: {t.source}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded text-primary bg-primary/10">{t.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
