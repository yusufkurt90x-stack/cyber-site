"use client";

// app/layout.tsx
import "../app/globals.css";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Cyber Portfolio",
  description: "Cyber security portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="bg-[#050505] text-white">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleSystemEntry = async () => {
    const audio = audioRef.current;

    if (audio) {
      try {
        audio.volume = 0.4;
        audio.currentTime = 0;
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Audio play error:", error);
        setIsPlaying(false);
      }
    }

    setLoading(false);
  };

  return (
    <html lang="tr">
      <body className="min-h-screen overflow-x-hidden bg-[#050505] text-white">
        {/* Audio her zaman ekranda mevcut olmalı: butona basıldığı anda çalabilsin. */}
        <audio ref={audioRef} loop preload="auto">
          <source src="/kvp-operasyon.mp3" type="audio/mpeg" />
        </audio>

        {loading ? (
          <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#050505] font-mono">
            <div
              className="pointer-events-none absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "linear-gradient(#00FF88 1px, transparent 1px), linear-gradient(90deg, #00FF88 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            <div className="relative z-10 flex flex-col items-center gap-6 rounded-xl border border-[#00FF88]/20 bg-black/40 p-10 backdrop-blur-md">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#00FF88] text-2xl font-black text-[#00FF88] shadow-[0_0_20px_rgba(0,255,136,0.25)]">
                Ω
              </div>

              <div className="text-center">
                <p className="text-xs tracking-[0.3em] text-[#00FF88]">
                  INITIALIZING SECURE SESSION...
                </p>
                <p className="mt-2 text-[10px] tracking-widest text-gray-500">
                  SECURE ACCESS REQUIRED
                </p>
              </div>

              <button
                type="button"
                onClick={handleSystemEntry}
                className="mt-4 border border-[#00FF88]/50 bg-[#00FF88]/10 px-10 py-3 text-xs font-bold tracking-[0.3em] text-[#00FF88] transition-all hover:bg-[#00FF88] hover:text-black hover:shadow-[0_0_30px_rgba(0,255,136,0.35)]"
              >
                ▶ SİSTEME GİR
              </button>
            </div>
          </div>
        ) : (
          <>
            <main className="relative z-10 min-h-screen">{children}</main>

            <div className="fixed bottom-6 right-6 z-[9999] opacity-50 transition-opacity hover:opacity-100">
              <div
                className={`flex items-center gap-2 rounded-full border bg-black/80 px-3 py-1 font-mono text-[9px] ${
                  isPlaying
                    ? "border-[#00FF88]/30 text-[#00FF88]"
                    : "border-red-500/30 text-red-400"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isPlaying
                      ? "animate-pulse bg-[#00FF88]"
                      : "bg-red-500"
                  }`}
                />
                {isPlaying ? "AUDIO_STREAM: ACTIVE" : "AUDIO_STREAM: ERROR"}
              </div>
            </div>
          </>
        )}
      </body>
    </html>
  );
}
