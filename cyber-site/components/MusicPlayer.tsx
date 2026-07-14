"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.15;

    const tryPlay = () => {
      audio.play().catch(() => {});
      document.removeEventListener("click", tryPlay);
    };

    // Sayfa açılınca dene, olmazsa ilk tıklamada başlat
    audio.play().catch(() => {
      document.addEventListener("click", tryPlay);
    });
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (muted) { audio.play(); setMuted(false); }
    else { audio.pause(); setMuted(true); }
  };

  return (
    <>
      <audio ref={audioRef} src="/Herkes kendi isine.mp3" loop />
      <button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 glass border border-primary/20 p-3 rounded-full text-primary hover:bg-primary/10 transition-all"
      >
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </>
  );
}
