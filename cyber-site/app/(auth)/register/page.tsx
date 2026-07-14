"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/auth";
import { Activity, User, Lock, Terminal, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        const success = registerUser(username, password);
        if (success) {
            router.push("/login"); // Kayıt başarılıysa girişe gönder
        } else {
            alert("Bu kod adı zaten kullanımda.");
        }
    };

    return (
        <main className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative">
            <div className="w-full max-w-[400px] bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-10 z-10">
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 bg-[#00FF88]/10 rounded-2xl flex items-center justify-center text-[#00FF88] border border-[#00FF88]/20 mb-4 shadow-glow">
                        <Activity size={32} />
                    </div>
                    <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white">YENİ <span className="text-[#00FF88]">AJAN</span></h1>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[4px] mt-2 italic">VERİ TABANI KAYDI</p>
                </div>

                <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-1 text-left">
                        <label className="text-[9px] font-black text-gray-600 tracking-[2px] uppercase ml-2">KOD ADI</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700" size={18} />
                            <input
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="USERNAME"
                                className="w-full bg-black border border-white/5 rounded-2xl py-4 pl-12 text-[#00FF88] outline-none focus:border-[#00FF88]/40 text-xs font-bold"
                            />
                        </div>
                    </div>

                    <div className="space-y-1 text-left">
                        <label className="text-[9px] font-black text-gray-600 tracking-[2px] uppercase ml-2">ŞİFRE</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700" size={18} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-black border border-white/5 rounded-2xl py-4 pl-12 text-[#00FF88] outline-none focus:border-[#00FF88]/40 text-xs font-bold"
                            />
                        </div>
                    </div>

                    <button className="w-full bg-[#00FF88] text-black font-black italic uppercase tracking-[5px] py-5 rounded-2xl hover:bg-[#00D170] transition-all flex items-center justify-center gap-3">
                        KAYDI TAMAMLA <Terminal size={18} />
                    </button>
                </form>

                <div className="mt-8 flex justify-center">
                    <Link href="/login" className="text-[10px] text-gray-500 hover:text-[#00FF88] font-bold tracking-[2px] uppercase transition-colors flex items-center gap-2">
                        GİRİŞE DÖN <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </main>
    );
}
