"use client";

import React from "react";
import { Activity, Zap, AlertTriangle, Cpu } from "lucide-react";

export default function DashboardPage() {
  return (
    <section className="space-y-10">
      <header>
        <p className="text-[#00FF88] text-[10px] font-black uppercase tracking-[4px] mb-3">YETKİLİ OPERASYON ALANI</p>
        <h1 className="text-5xl font-black italic tracking-tighter">
          SİSTEM <span className="text-[#00FF88]">DASHBOARD</span>
        </h1>
        <p className="text-gray-500 text-xs mt-4 font-bold uppercase tracking-widest">KVPOS güvenlik operasyon merkezi sistem özeti</p>
      </header>

      {/* Statistics grid - "Kayıtlı Ajan" kartı KALDIRILDI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="rounded-xl p-3 bg-white/5 text-[#00FF88]">
              <Activity size={22} />
            </div>
            <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest">GÜNLÜK ÖZET</div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-4xl font-black italic">24</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">Bugünkü Haber</div>
            </div>
            <div className="text-[10px] text-gray-400">Güncelleme: 5 dk</div>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="rounded-xl p-3 bg-white/5 text-yellow-300">
              <AlertTriangle size={22} />
            </div>
            <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest">KRİTİK UYARILAR</div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-4xl font-black italic">3</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">Acil Müdahale</div>
            </div>
            <div className="text-[10px] text-gray-400">Son: 12 dk</div>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="rounded-xl p-3 bg-white/5 text-[#00FF88]">
              <Zap size={22} />
            </div>
            <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest">TEHDİT SEVİYESİ</div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-4xl font-black italic">MEDIUM</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">Genel Durum</div>
            </div>
            <div className="text-[10px] text-gray-400">Canlı</div>
          </div>
        </div>
      </div>

      {/* Devam eden dashboard içerikleri */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-6">
          <h2 className="text-lg font-black uppercase tracking-widest mb-4">CANLI TEHDİT AKIŞI</h2>
          <div className="space-y-3">
            {/* Threat feed placeholder */}
            <div className="bg-black/10 p-4 rounded-xl border border-white/3">Yeni zero-day raporu — detaylar burada...</div>
            <div className="bg-black/10 p-4 rounded-xl border border-white/3">Oltalama kampanyası tespit edildi — bölge: TR</div>
          </div>
        </div>

        <aside className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-6">
          <h3 className="text-sm font-black uppercase tracking-widest mb-4">HIZLI ARAÇLAR</h3>
          <ul className="space-y-3 text-[13px] text-gray-300">
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-3"><Cpu size={16} /> Nmap</span>
              <button className="text-[10px] text-[#00FF88] font-black uppercase">Aç</button>
            </li>
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-3"><Cpu size={16} /> Burp Suite</span>
              <button className="text-[10px] text-[#00FF88] font-black uppercase">Aç</button>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
