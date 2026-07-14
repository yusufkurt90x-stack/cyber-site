"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginRequest } from "@/lib/auth"; // auth dosyasındaki tek fonksiyonumuz
import { Shield, Lock, User, Terminal, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Artık lib/auth içinde sadece loginRequest() var
        if (loginRequest(username, password)) {
            router.push("/dashboard");
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <main className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            
            <div className="w-full max-w-[400px] relative z-10">
                <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl backdrop-blur-xl">
                    <div className="flex flex-col items-center mb-10 text-center">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-500 ${error ? 'border-red-500 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'border-[#00FF88]/20 text-[#00FF88]'}`}>
                            <Shield size={32} />
                        </div>
                        <h1 className="mt-6 text-2xl font-black italic uppercase tracking-tighter text-white">
                            KVPOS <span className={error ? "text-red-500" : "text-[#00FF88]"}>GİRİŞ</span>
                        </h1>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[4px] mt-2 italic">OPERASYON MERKEZİ</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[9px] font-black tracking-[2px] text-gray-600 uppercase ml-2">KOD ADI</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-[#00FF88] transition-colors" size={18} />
                                <input 
                                    type="text" 
                                    placeholder="AGENT_NAME veya admin" 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)} 
                                    className={`w-full bg-black border rounded-2xl py-4 pl-12 pr-4 text-xs font-bold tracking-[3px] outline-none transition-all placeholder:text-gray-900 ${error ? 'border-red-500/50' : 'border-white/5 focus:border-[#00FF88]/40 text-[#00FF88]'}`} 
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[9px] font-black tracking-[2px] text-gray-600 uppercase ml-2">ŞİFRE</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-[#00FF88] transition-colors" size={18} />
                                <input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    className={`w-full bg-black border rounded-2xl py-4 pl-12 pr-4 text-xs font-bold tracking-[3px] outline-none transition-all placeholder:text-gray-900 ${error ? 'border-red-500/50' : 'border-white/5 focus:border-[#00FF88]/40 text-[#00FF88]'}`} 
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-red-500 text-[10px] font-black uppercase tracking-widest justify-center py-2 animate-pulse">
                                <AlertCircle size={14} /> KİMLİK DOĞRULAMA HATASI
                            </div>
                        )}

                        <button className="w-full py-5 rounded-2xl font-black italic uppercase tracking-[5px] bg-[#00FF88] text-black hover:bg-[#00D170] transition-all flex items-center justify-center gap-3 active:scale-95 mt-4 shadow-[0_0_20px_rgba(0,255,136,0.1)]">
                            BAĞLANTI KUR <Terminal size={18} />
                        </button>
                    </form>

                    <div className="mt-8 flex justify-center border-t border-white/5 pt-6">
                        <Link href="/register" className="text-[9px] text-gray-500 hover:text-[#00FF88] uppercase tracking-[2px] font-bold transition-colors">
                            YENİ BİRİM (KAYIT) OLUŞTUR
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
