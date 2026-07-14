"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import {
  Activity,
  ExternalLink,
  Loader2,
  Search,
  ShieldAlert,
} from "lucide-react";

type CVEItem = {
  id: string;
  published: string;
  description: string;
  score: number;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "NONE" | "UNKNOWN";
  vector: string;
  url: string;
};

const filters = ["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"] as const;

export default function ZafiyetIstihbaratiPage() {
  const [cves, setCves] = useState<CVEItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("ALL");

  useEffect(() => {
    async function fetchCVEs() {
      try {
        const response = await fetch("/api/cve");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.details || data.error || "CVE verisi alınamadı.");
        }

        if (!Array.isArray(data)) {
          throw new Error("API beklenen CVE listesini döndürmedi.");
        }

        setCves(data);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Bağlantı hatası oluştu.";

        setErrorMessage(message);
      } finally {
        setLoading(false);
      }
    }

    fetchCVEs();
  }, []);

  const filteredCVEs = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return cves.filter((cve) => {
      const matchesSearch =
        !query ||
        cve.id.toLowerCase().includes(query) ||
        cve.description.toLowerCase().includes(query);

      const matchesSeverity =
        filter === "ALL" || cve.severity === filter;

      return matchesSearch && matchesSeverity;
    });
  }, [cves, filter, searchTerm]);

  function getSeverityClass(severity: CVEItem["severity"]) {
    switch (severity) {
      case "CRITICAL":
        return "border-red-500/30 bg-red-500/10 text-red-400";
      case "HIGH":
        return "border-orange-500/30 bg-orange-500/10 text-orange-400";
      case "MEDIUM":
        return "border-yellow-500/30 bg-yellow-500/10 text-yellow-400";
      case "LOW":
        return "border-blue-500/30 bg-blue-500/10 text-blue-400";
      default:
        return "border-white/10 bg-white/5 text-gray-400";
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505]">
        <div className="flex flex-col items-center gap-4 text-center">
          <Loader2 className="animate-spin text-[#00FF88]" size={40} />
          <p className="text-xs font-black uppercase tracking-[0.25em] text-[#00FF88]">
            Zafiyet veritabanı senkronize ediliyor...
          </p>
        </div>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6">
        <div className="max-w-xl rounded-3xl border border-red-500/30 bg-red-500/5 p-8 text-center">
          <ShieldAlert className="mx-auto mb-4 text-red-400" size={42} />
          <h1 className="mb-3 text-xl font-black uppercase text-white">
            CVE Verisi Alınamadı
          </h1>
          <p className="text-sm leading-relaxed text-gray-400">{errorMessage}</p>
          <p className="mt-5 text-xs text-gray-600">
            Test için tarayıcıda <code>/api/cve</code> adresini aç.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] pb-12 pt-24 text-white">
      <Container>
        <Section>
          <div className="mb-10 border-b border-white/10 pb-8">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#00FF88]">
              NVD • Live Vulnerability Feed
            </p>

            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <h1 className="text-4xl font-black uppercase tracking-tighter md:text-6xl">
                  Zafiyet <span className="text-[#00FF88]">İstihbaratı</span>
                </h1>
                <p className="mt-3 text-sm text-gray-500">
                  Son 7 gün içindeki NVD kaynaklı zafiyet kayıtları.
                </p>
              </div>

              <div className="rounded-full border border-[#00FF88]/20 bg-[#00FF88]/5 px-4 py-2 text-xs font-black uppercase tracking-wider text-[#00FF88]">
                {cves.length} kayıt algılandı
              </div>
            </div>
          </div>

          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative block w-full max-w-xl">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="CVE ID veya açıklama ara..."
                className="w-full rounded-xl border border-white/10 bg-[#111] py-4 pl-12 pr-4 text-sm text-white outline-none transition focus:border-[#00FF88]"
              />
            </label>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {filters.map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-widest transition ${
                    filter === item
                      ? "border-[#00FF88] bg-[#00FF88] text-black"
                      : "border-white/10 bg-[#111] text-gray-400 hover:border-[#00FF88]/50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredCVEs.map((cve) => (
              <article
                key={cve.id}
                className="group flex flex-col gap-6 rounded-3xl border border-white/5 bg-[#0f0f0f] p-6 transition hover:border-[#00FF88]/35 md:flex-row"
              >
                <div className="min-w-[150px]">
                  <h2 className="font-mono text-lg font-black text-white group-hover:text-[#00FF88]">
                    {cve.id}
                  </h2>

                  <div
                    className={`mt-3 inline-flex rounded-md border px-3 py-1 text-[10px] font-black tracking-widest ${getSeverityClass(
                      cve.severity
                    )}`}
                  >
                    {cve.severity} · {cve.score.toFixed(1)}
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-sm leading-7 text-gray-400">{cve.description}</p>

                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Activity size={12} className="text-[#00FF88]" />
                      {cve.vector}
                    </span>
                    <span>
                      Yayın:{" "}
                      {new Date(cve.published).toLocaleDateString("tr-TR")}
                    </span>
                  </div>
                </div>

                <a
                  href={cve.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${cve.id} NVD detayını aç`}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#111] text-white transition hover:border-[#00FF88] hover:bg-[#00FF88] hover:text-black"
                >
                  <ExternalLink size={18} />
                </a>
              </article>
            ))}
          </div>

          {filteredCVEs.length === 0 && (
            <div className="rounded-3xl border border-dashed border-white/10 py-20 text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
                Bu filtreyle eşleşen CVE bulunamadı.
              </p>
            </div>
          )}
        </Section>
      </Container>
    </main>
  );
}
