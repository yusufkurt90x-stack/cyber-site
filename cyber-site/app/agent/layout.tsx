"use client";

import { Activity, Shield, Zap, AlertTriangle, Radio } from "lucide-react";

export default function AgentHomePage() {
    return (
        <section className="space-y-10">
            <header>
                <p className="text-[#00FF88] text-[10px] font-black uppercase tracking-[4px] mb-3">KVPOS İSTİHBARAT SERVİSİ</p>
                <h1 className="text-4xl font-black italic tracking-tighter uppercase">
                    OPERASYON <span className="text-[#00FF88]">MERKEZİ</span>
                </h1>
                <p className="text-gray-500 text-xs mt-4 font-bold uppercase tracking-widest">Aktif tehdit verilerine erişim sağlanıyor...</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#0a0a0a] border border-[#00FF88]/10 rounded-3xl p-8 hover:border-[#00FF88]/30 transition-all group">
                    <Zap className="text-[#00FF88] mb-4 group-hover:scale-110 transition-transform" size={32} />
                    <h3 className="text-lg font-black italic uppercase">TEHDİT AKIŞI</h3>
                    <p className="text-[10px] text-gray-600 mt-2 uppercase tracking-widest font-bold">Canlı siber istihbarat verileri</p>
                </div>
                <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 hover:border-[#00FF88]/20 transition-all group">
                    <AlertTriangle className="text-yellow-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                    <h3 className="text-lg font-black italic uppercase">KRİTİK CVE</h3>
                    <p className="text-[10px] text-gray-600 mt-2 uppercase tracking-widest font-bold">Açık kaynak zafiyet takibi</p>
                </div>
                <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 hover:border-[#00FF88]/20 transition-all group">
                    <Shield className="text-blue-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                    <h3 className="text-lg font-black italic uppercase">SAVUNMA DURUMU</h3>
                    <p className="text-[10px] text-gray-600 mt-2 uppercase tracking-widest font-bold">Sistem güvenlik seviyesi: YÜKSEK</p>
                </div>
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-10">
                <div className="flex items-center gap-3 mb-6">
                    <Activity className="text-[#00FF88]" size={20} />
                    <h2 className="text-sm font-black uppercase tracking-[4px]">LİVE STATUS</h2>
                </div>
                <div className="h-2 bg-black rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-[#00FF88] animate-pulse rounded-full"></div>
                </div>
                <div className="flex justify-between mt-4 text-[9px] text-gray-600 font-bold uppercase tracking-widest">
                    <span>Sinyal Gücü: %98</span>
                    <span>Şifreleme: AES-256</span>
                    <span>Protokol: TLS 1.3</span>
                </div>
            </div>
        </section>
    );
}
