"use client";

import { motion } from "framer-motion";
import { Shield, Code, Database } from "lucide-react";
import { Container } from "./ui/Container";

const stats = [
  ["5+", "Yıl Deneyim"],
  ["50+", "Proje"],
  ["30+", "CVE Araştırması"],
  ["10+", "Araç Geliştirdi"],
];

const cards = [
  {
    icon: Shield,
    title: "Siber Güvenlik",
    desc: "Penetrasyon testi, tehdit avı, zafiyet değerlendirmesi",
  },
  {
    icon: Code,
    title: "Full Stack Geliştirici",
    desc: "Next.js, React, TypeScript, Node.js, PostgreSQL",
  },
  {
    icon: Database,
    title: "Tehdit İstihbaratı",
    desc: "OSINT, dark web izleme, CVE analizi, IOC takibi",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      <Container>
        <div className="grid items-center gap-16 md:grid-cols-2">

          {/* Sol */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary/70">
              // HAKKIMDA
            </p>
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
              Dijital Savunma{" "}
              <span className="text-primary">Uzmanı</span>
            </h2>
            <p className="mb-4 leading-relaxed text-gray-400">
              Siber güvenlik araştırmacısı ve full-stack geliştirici. Tehdit
              istihbaratı, penetrasyon testi ve güvenli yazılım geliştirme
              alanlarında çalışıyorum.
            </p>
            <p className="leading-relaxed text-gray-400">
              Modern web teknolojileri ile güvenlik odaklı platformlar inşa
              ediyorum. Her satır kod, bir savunma katmanıdır.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {stats.map(([val, label]) => (
                <div
                  key={label}
                  className="glass rounded-lg border border-primary/10 p-4"
                >
                  <p className="text-2xl font-bold text-primary">{val}</p>
                  <p className="mt-1 font-mono text-xs text-gray-500">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sağ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            {cards.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="glass group rounded-xl border border-white/5 p-5 transition-colors hover:border-primary/20"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary/20">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">{title}</h3>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
