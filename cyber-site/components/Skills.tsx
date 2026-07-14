"use client";

import { motion } from "framer-motion";
import { Container } from "./ui/Container";

const skills = {
  "Güvenlik": ["Penetrasyon Testi", "OSINT", "Zararlı Yazılım Analizi", "Tehdit Avcılığı", "SOC Operasyonları", "Olay Müdahale"],
  "Geliştirme": ["Next.js", "TypeScript", "React", "Node.js", "PostgreSQL", "Docker"],
  "Araçlar": ["Nmap", "Burp Suite", "Wireshark", "Metasploit", "Nessus", "Kali Linux"],
};

export function Skills() {
  return (
    <section id="skills" className="relative py-24">
      <Container>
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary/70">// YETENEKLER</p>
        <h2 className="mb-10 text-3xl font-bold">Uzmanlık <span className="text-primary">Alanları</span></h2>
        
        <div className="grid gap-6 md:grid-cols-3">
          {Object.entries(skills).map(([cat, items], i) => (
            <motion.div 
              key={cat} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }} 
              viewport={{ once: true }}
              className="glass rounded-xl border border-white/5 p-6 transition-colors hover:border-primary/20"
            >
              <h3 className="mb-4 font-mono text-xs tracking-widest text-primary uppercase">{cat}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map(s => (
                  <span key={s} className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs text-primary/80 transition-all hover:bg-primary/20">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
