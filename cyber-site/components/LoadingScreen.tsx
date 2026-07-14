"use client";

import { useEffect, useState } from "react";

const steps = [
  { text: "Sistem başlatılıyor...", color: "#FF3B3B" },
  { text: "Tehdit istihbaratı yükleniyor...", color: "#FF6B00" },
  { text: "Güvenli bağlantı kuruluyor...", color: "#FFD700" },
  { text: "ERİŞİM SAĞLANDI.", color: "#00FF88" },
];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const step = Math.min(Math.floor(progress / 25), 3);
  const currentColor = steps[step]?.color || "#00FF88";

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(timer); setTimeout(onComplete, 600); return 100; }
        return p + 1.2;
      });
    }, 40);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="w-80 text-center">
        <div className="font-mono text-4xl font-bold mb-2 transition-colors duration-700"
          style={{ color: currentColor, textShadow: `0 0 20px ${currentColor}` }}>
          INTEL_OS
        </div>
        <div className="font-mono text-xs mb-8 text-gray-600">://v2.4 — SİBER GÜVENLİK PLATFORMU</div>
        <div className="w-full h-px mb-6 transition-all duration-700"
          style={{ background: `linear-gradient(to right, transparent, ${currentColor}, transparent)` }} />
        <div className="space-y-2 mb-6 text-left">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2 font-mono text-xs transition-all duration-300"
              style={{ color: i <= step ? s.color : "#333", opacity: i <= step ? 1 : 0.3 }}>
              <span>{i < step ? "✓" : i === step ? "▶" : "○"}</span>
              <span>{s.text}</span>
            </div>
          ))}
        </div>
        <div className="w-full h-1 rounded-full mb-2 bg-surface">
          <div className="h-full rounded-full transition-all duration-100"
            style={{ width: `${progress}%`, background: currentColor, boxShadow: `0 0 10px ${currentColor}` }} />
        </div>
        <div className="font-mono text-xs transition-colors duration-700" style={{ color: currentColor }}>
          {Math.floor(progress)}%
        </div>
      </div>
    </div>
  );
}
