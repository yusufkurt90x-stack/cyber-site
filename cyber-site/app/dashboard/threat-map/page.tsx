"use client";

import React, { useState, useEffect, useRef } from "react";

const CITIES = [
  { id: 1,  name: "New York",    x: 195, y: 175, type: "target", country: "USA" },
  { id: 2,  name: "Los Angeles", x: 130, y: 200, type: "source", country: "USA" },
  { id: 3,  name: "Moskova",     x: 580, y: 130, type: "source", country: "RU"  },
  { id: 4,  name: "Pekin",       x: 740, y: 175, type: "source", country: "CN"  },
  { id: 5,  name: "İstanbul",    x: 555, y: 185, type: "target", country: "TR"  },
  { id: 6,  name: "Londra",      x: 470, y: 145, type: "target", country: "UK"  },
  { id: 7,  name: "Berlin",      x: 510, y: 148, type: "target", country: "DE"  },
  { id: 8,  name: "Tokyo",       x: 800, y: 185, type: "source", country: "JP"  },
  { id: 9,  name: "Tahran",      x: 610, y: 200, type: "source", country: "IR"  },
  { id: 10, name: "Pyongyang",   x: 775, y: 170, type: "source", country: "KP"  },
  { id: 11, name: "São Paulo",   x: 265, y: 340, type: "target", country: "BR"  },
  { id: 12, name: "Mumbai",      x: 660, y: 235, type: "target", country: "IN"  },
  { id: 13, name: "Sydney",      x: 830, y: 370, type: "target", country: "AU"  },
  { id: 14, name: "Lagos",       x: 490, y: 275, type: "target", country: "NG"  },
  { id: 15, name: "Kiev",        x: 560, y: 155, type: "target", country: "UA"  },
];

const ATTACK_PAIRS = [
  { from: 3, to: 5 }, { from: 3, to: 6 }, { from: 3, to: 15 },
  { from: 4, to: 1 }, { from: 4, to: 12 }, { from: 4, to: 13 },
  { from: 9, to: 5 }, { from: 9, to: 12 }, { from: 9, to: 6 },
  { from: 10, to: 1 }, { from: 10, to: 8 },
  { from: 2, to: 11 },
];

const THREAT_TYPES = ["DDoS", "Ransomware", "Phishing", "Zero-Day", "Botnet", "APT"];
const SEVERITIES = ["Critical", "High", "Medium"];
const SEV_COLOR: Record<string, string> = { Critical: "#FF3B3B", High: "#FF8C00", Medium: "#FFD700" };

function randItem<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(a: number, b: number): number { return Math.floor(Math.random() * (b - a + 1)) + a; }

function AttackPacket({ x1, y1, x2, y2, color, duration, delay }: {
  x1: number; y1: number; x2: number; y2: number;
  color: string; duration: number; delay: number;
}) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const totalDuration = duration * 1000;
    const delayMs = delay * 1000;

    const animate = (timestamp: number) => {
      if (cancelled) return;
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const p = Math.min(elapsed / totalDuration, 1);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          startRef.current = null;
          setProgress(0);
          rafRef.current = requestAnimationFrame(animate);
        }, randInt(500, 2000));
      }
    };

    const t = setTimeout(() => {
      rafRef.current = requestAnimationFrame(animate);
    }, delayMs);

    return () => {
      cancelled = true;
      clearTimeout(t);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [duration, delay]);

  const cx = (x1 + x2) / 2;
  const cy = Math.min(y1, y2) - 60;
  const t = progress;
  const px = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2;
  const py = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2;

  if (progress === 0 || progress === 1) return null;

  return (
    <circle cx={px} cy={py} r={3} fill={color}
      style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
  );
}

function AttackLine({ x1, y1, x2, y2, color }: {
  x1: number; y1: number; x2: number; y2: number; color: string;
}) {
  const cx = (x1 + x2) / 2;
  const cy = Math.min(y1, y2) - 60;
  return (
    <path
      d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
      fill="none" stroke={color} strokeWidth={0.8}
      strokeDasharray="4 4" opacity={0.35}
    />
  );
}

function CityDot({ city, onClick, selected }: {
  city: typeof CITIES[0];
  onClick: (c: typeof CITIES[0]) => void;
  selected: boolean;
}) {
  const isSource = city.type === "source";
  const color = isSource ? "#FF3B3B" : "#00FF88";
  const [hov, setHov] = useState(false);

  return (
    <g style={{ cursor: "pointer" }}
      onClick={() => onClick(city)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {isSource && (
        <circle cx={city.x} cy={city.y} r={8} fill="none" stroke="#FF3B3B" strokeWidth={0.8} opacity={0.3}>
          <animate attributeName="r" values="6;14;6" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
        </circle>
      )}
      <circle cx={city.x} cy={city.y} r={selected ? 5 : hov ? 4.5 : 3.5} fill={color}
        style={{ filter: `drop-shadow(0 0 ${selected ? 8 : 4}px ${color})`, transition: "all .2s" }} />
      {(hov || selected) && (
        <g>
          <rect x={city.x + 6} y={city.y - 10} width={city.name.length * 5.5 + 8} height={14} rx={3}
            fill="rgba(0,0,0,0.85)" stroke={color} strokeWidth={0.5} />
          <text x={city.x + 10} y={city.y} fontSize={7} fill={color} fontFamily="monospace">{city.name}</text>
        </g>
      )}
    </g>
  );
}

export default function ThreatMapPage() {
  const [selected, setSelected] = useState<typeof CITIES[0] | null>(null);
  const [logs, setLogs] = useState([
    { text: "DDoS saldırısı tespit edildi: Moskova → İstanbul", color: "#FF3B3B", time: "14:52" },
    { text: "Ransomware imzası engellendi: Pekin → New York",   color: "#FF8C00", time: "14:49" },
    { text: "Phishing kampanyası: Tahran → Londra",             color: "#FFD700", time: "14:45" },
    { text: "Zero-Day istismarı: K.Kore → Tokyo",               color: "#FF3B3B", time: "14:41" },
    { text: "Güvenli bağlantı kuruldu: İstanbul ↔ Berlin",      color: "#00FF88", time: "14:38" },
  ]);
  const [stats, setStats] = useState({ active: 1284, blocked: 85240, critical: 42 });
  const [liveTime, setLiveTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      const src = randItem(CITIES.filter(c => c.type === "source"));
      const tgt = randItem(CITIES.filter(c => c.type === "target"));
      const type = randItem(THREAT_TYPES);
      const sev = randItem(SEVERITIES);
      const color = SEV_COLOR[sev];
      const now = new Date();
      const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
      setLogs(prev => [{ text: `${type} tespit edildi: ${src.name} → ${tgt.name}`, color, time }, ...prev.slice(0, 9)]);
      setStats(prev => ({
        active: prev.active + randInt(1, 5),
        blocked: prev.blocked + randInt(10, 50),
        critical: prev.critical + (Math.random() > 0.7 ? 1 : 0),
      }));
      setLiveTime(new Date());
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#050505", color: "#fff", fontFamily: "monospace", display: "flex", flexDirection: "column" }}>
      {/* Top Bar */}
      <div style={{ background: "rgba(8,8,8,0.98)", borderBottom: "1px solid rgba(0,255,136,0.12)", padding: "10px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ color: "#00FF88", fontSize: 20 }}>⬡</span>
        <span style={{ fontWeight: 700, fontSize: 13, color: "#00FF88" }}>INTEL_OS</span>
        <span style={{ fontSize: 10, color: "#374151" }}>://global-threat-watch</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 10, color: "#4B5563" }}>{liveTime.toLocaleTimeString("tr-TR")}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00FF88", display: "inline-block" }} />
            <span style={{ fontSize: 10, color: "#00FF88" }}>CANLI</span>
          </div>
        </div>
      </div>

      {/* Stat Bar */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        {[
          { label: "AKTİF SALDIRI", val: stats.active.toLocaleString(), color: "#FF3B3B" },
          { label: "ENGELLENDİ",    val: stats.blocked.toLocaleString(), color: "#00FF88" },
          { label: "KRİTİK UYARI",  val: stats.critical,                 color: "#FF8C00" },
          { label: "İZLENEN NODE",  val: "2,841",                        color: "#00BFFF" },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, padding: "10px 16px", borderRight: "1px solid rgba(255,255,255,0.05)", background: "rgba(13,13,13,0.8)" }}>
            <div style={{ fontSize: 8, color: "#4B5563", letterSpacing: 2, marginBottom: 3 }}>{s.label}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.val}</div>
          </div>
        ))}
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* MAP */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "linear-gradient(#00FF88 1px, transparent 1px), linear-gradient(90deg, #00FF88 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
          <svg viewBox="0 0 1000 500" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="xMidYMid meet">
            <rect width="1000" height="500" fill="#050505" />
            {/* Kıtalar */}
            <path d="M 60 100 L 100 80 L 150 75 L 200 85 L 240 100 L 260 120 L 265 145 L 255 170 L 240 195 L 220 215 L 195 230 L 170 240 L 145 245 L 120 240 L 95 228 L 75 210 L 60 190 L 50 165 L 52 135 Z" fill="#0d1a0d" stroke="#00FF88" strokeWidth="0.5" opacity="0.7" />
            <path d="M 195 230 L 210 240 L 215 260 L 205 275 L 190 270 L 180 255 L 182 240 Z" fill="#0d1a0d" stroke="#00FF88" strokeWidth="0.4" opacity="0.6" />
            <path d="M 210 285 L 250 275 L 290 278 L 320 295 L 335 325 L 330 360 L 310 390 L 275 405 L 240 400 L 210 380 L 195 350 L 192 315 Z" fill="#0d1a0d" stroke="#00FF88" strokeWidth="0.5" opacity="0.7" />
            <path d="M 440 90 L 480 80 L 520 78 L 555 85 L 575 100 L 580 120 L 570 140 L 550 155 L 520 162 L 490 160 L 462 150 L 445 135 L 438 115 Z" fill="#0d1a0d" stroke="#00FF88" strokeWidth="0.5" opacity="0.7" />
            <path d="M 455 195 L 495 185 L 535 188 L 565 205 L 578 235 L 572 270 L 550 305 L 515 330 L 478 335 L 445 318 L 428 285 L 425 250 L 435 220 Z" fill="#0d1a0d" stroke="#00FF88" strokeWidth="0.5" opacity="0.7" />
            <path d="M 575 75 L 640 65 L 720 68 L 790 80 L 840 100 L 860 130 L 855 165 L 830 195 L 790 215 L 740 225 L 690 220 L 645 205 L 610 185 L 585 160 L 572 130 L 572 100 Z" fill="#0d1a0d" stroke="#00FF88" strokeWidth="0.5" opacity="0.7" />
            <path d="M 640 215 L 670 210 L 695 220 L 700 250 L 685 275 L 660 280 L 638 260 L 632 235 Z" fill="#0d1a0d" stroke="#00FF88" strokeWidth="0.4" opacity="0.6" />
            <path d="M 770 310 L 820 300 L 870 308 L 900 330 L 905 360 L 885 390 L 845 405 L 800 400 L 768 378 L 758 348 L 762 320 Z" fill="#0d1a0d" stroke="#00FF88" strokeWidth="0.5" opacity="0.7" />
            {/* Grid çizgileri */}
            {[100, 200, 300, 400].map(y => <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="#00FF88" strokeWidth="0.2" opacity="0.15" />)}
            {[200, 400, 600, 800].map(x => <line key={x} x1={x} y1="0" x2={x} y2="500" stroke="#00FF88" strokeWidth="0.2" opacity="0.15" />)}
            {/* Saldırı çizgileri */}
            {ATTACK_PAIRS.map((pair, i) => {
              const src = CITIES.find(c => c.id === pair.from);
              const tgt = CITIES.find(c => c.id === pair.to);
              if (!src || !tgt) return null;
              const colors = ["#FF3B3B", "#FF8C00", "#FF3B3B", "#FFD700"];
              const color = colors[i % colors.length];
              return (
                <g key={i}>
                  <AttackLine x1={src.x} y1={src.y} x2={tgt.x} y2={tgt.y} color={color} />
                  <AttackPacket x1={src.x} y1={src.y} x2={tgt.x} y2={tgt.y} color={color} duration={2 + (i % 3)} delay={i * 0.7} />
                </g>
              );
            })}
            {/* Şehirler */}
            {CITIES.map(city => (
              <CityDot key={city.id} city={city} selected={selected?.id === city.id} onClick={setSelected} />
            ))}
          </svg>

          {/* Legend */}
          <div style={{ position: "absolute", bottom: 16, left: 16, display: "flex", gap: 12, background: "rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px" }}>
            {[
              { color: "#FF3B3B", label: "Saldırı Kaynağı", dot: true },
              { color: "#00FF88", label: "Hedef / Güvenli", dot: true },
              { color: "#FF3B3B", label: "Aktif Saldırı", dot: false },
            ].map((l, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                {l.dot
                  ? <div style={{ width: 8, height: 8, borderRadius: "50%", background: l.color, boxShadow: `0 0 6px ${l.color}` }} />
                  : <div style={{ width: 16, height: 1, borderTop: `1px dashed ${l.color}` }} />
                }
                <span style={{ fontSize: 9, color: "#6B7280" }}>{l.label}</span>
              </div>
            ))}
          </div>

          {/* Selected popup */}
          {selected && (
            <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(0,0,0,0.9)", border: `1px solid ${selected.type === "source" ? "#FF3B3B" : "#00FF88"}`, borderRadius: 10, padding: "12px 16px", minWidth: 180 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: selected.type === "source" ? "#FF3B3B" : "#00FF88" }}>{selected.name}</span>
                <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: "#4B5563", cursor: "pointer" }}>✕</button>
              </div>
              <div style={{ fontSize: 9, color: "#6B7280" }}>ÜLKE: <span style={{ color: "#9CA3AF" }}>{selected.country}</span></div>
              <div style={{ fontSize: 9, color: "#6B7280", marginTop: 3 }}>ROL: <span style={{ color: selected.type === "source" ? "#FF3B3B" : "#00FF88" }}>{selected.type === "source" ? "SALDIRI KAYNAĞI" : "HEDEF SİSTEM"}</span></div>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div style={{ width: 260, background: "rgba(10,10,10,0.95)", borderLeft: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 3, height: 14, background: "#FF3B3B", borderRadius: 2, display: "inline-block" }} />
            <span style={{ fontSize: 11, fontWeight: 700 }}>Canlı Tehdit Logu</span>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "8px 14px" }}>
            {logs.map((log, i) => (
              <div key={i} style={{ display: "flex", gap: 8, padding: "4px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span style={{ fontSize: 9, color: "#374151", flexShrink: 0 }}>{log.time}</span>
                <span style={{ fontSize: 10, color: log.color, lineHeight: 1.4 }}>{log.text}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "12px 14px" }}>
            <div style={{ fontSize: 9, color: "#4B5563", letterSpacing: 2, marginBottom: 8 }}>// SALDIRI TİPİ</div>
            {[
              { type: "DDoS",       pct: 34, color: "#FF3B3B" },
              { type: "Ransomware", pct: 22, color: "#FF8C00" },
              { type: "Phishing",   pct: 28, color: "#FFD700" },
              { type: "Zero-Day",   pct: 16, color: "#00BFFF" },
            ].map(t => (
              <div key={t.type} style={{ marginBottom: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                  <span style={{ fontSize: 9, color: "#6B7280" }}>{t.type}</span>
                  <span style={{ fontSize: 9, color: t.color }}>{t.pct}%</span>
                </div>
                <div style={{ height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2 }}>
                  <div style={{ height: "100%", width: `${t.pct}%`, background: t.color, borderRadius: 2, boxShadow: `0 0 6px ${t.color}` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
