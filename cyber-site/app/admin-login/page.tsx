"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginRequest } from "@/lib/auth"; // Tek giriş fonksiyonumuz
import { ShieldAlert, Terminal, Lock, User } from "lucide-react";

export default function AdminLoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    // Hata buradaydı: Fonksiyon ismini form ile eşitledik
    const handleAdminSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Admin girişi de artık auth içindeki loginRequest üzerinden yapılıyor
        if (loginRequest(username, password)) {
            router.push("/dashboard");
        } else {
            alert("YETKİSİZ ERİŞİM: GEÇERSİZ ADMİN KODU!");
        }
    };

    return (
        <main className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
            <div className="w-full max-w-[400px] bg-[#0a0a0a] border border-red-500/20 rounded-[2.5rem] p-10 shadow-[0_0_50px_rgba(239,68,68,0.05)]">
                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center border border-red-500/20 text-red-500 bg-red-500/5">
                        <ShieldAlert size={32} />
                    </div>
                    <h1 className="mt-6 text-2xl font-black italic uppercase tracking-tighter text-white">
                        ADMİN <span className="text-red-500">TERMİNAL</span>
                    </h1>
                    <p className="text-[8px] text-gray-700 font-bold uppercase tracking-[3px] mt-2">ÜST DÜZEY YETKİLENDİRME</p>
                </div>

                <form onSubmit={handleAdminSubmit} className="space-y-4">
                    <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-800 group-focus-within:text-red-500 transition-colors" size={18} />
                        <input 
                            required
                            type="text" 
                            placeholder="ADMİN KODU" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            className="w-full bg-black border border-white/5 focus:border-red-500/40 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold tracking-[3px] outline-none transition-all text-red-500" 
                        />
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-800 group-focus-within:text-red-500 transition-colors" size={18} />
                        <input 
                            required
                            type="password" 
                            placeholder="ŞİFRE" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full bg-black border border-white/5 focus:border-red-500/40 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold tracking-[3px] outline-none transition-all text-red-500" 
                        />
                    </div>
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-5 rounded-2xl uppercase italic tracking-[5px] flex items-center justify-center gap-3 transition-all active:scale-95 shadow-[0_10px_20px_rgba(220,38,38,0.2)]">
                        ERİŞİM SAĞLA <Terminal size={18} />
                    </button>
                </form>
            </div>
        </main>
    );
}
