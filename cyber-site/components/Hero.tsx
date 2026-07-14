"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "./ui/Container"; // BU SATIRI EKLE

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="grid-lines absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-primary">
            Sistem Aktif // Tehdit Seviyesi: Düşük
          </p>

          <h1 className="mb-6 text-5xl font-bold leading-none tracking-tight sm:text-6xl lg:text-7xl">
            Cyber <span className="text-primary">Security</span>
            <br />
            Threat <span className="text-gray-500">Intelligence</span>
          </h1>

          <p className="mb-8 max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg">
            Modern web teknolojileri ve siber güvenlik üzerine çalışan profesyonel
            operasyon merkezi.
          </p>

          <div className="flex flex-wrap gap-3 font-mono text-xs font-bold">
          
<Link href="/dashboard">
  <button className="px-8 py-4 font-mono text-sm font-bold transition-all bg-primary text-background hover:shadow-[0_0_25px_rgba(0,255,136,0.5)]">
    PLATFORMA GİR
  </button>
</Link>

            <a
              href="#Hakkımda"
              className="border border-primary/30 px-6 py-3 text-primary transition-colors hover:bg-primary/10"
            >
              DAHA FAZLA
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
