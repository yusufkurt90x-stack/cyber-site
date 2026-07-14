"use client";

import { useEffect, useState, ReactNode } from "react";
import { getSession } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { ShieldAlert, Lock } from "lucide-react";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const session = getSession();
    if (!session) {
      setIsAuthorized(false);
      // İstersen 2 saniye sonra otomatik logine atabiliriz:
      // setTimeout(() => router.push("/login"), 2000);
    } else {
      setIsAuthorized(true);
    }
  }, []);

  if (isAuthorized === null) return null; // Yükleniyor...

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-8 border border-red-500/20 animate-pulse">
          <ShieldAlert size={40} />
        </div>
        <h1 className="text-4xl font-black italic text-white uppercase tracking-tighter mb-4">
          YETKİSİZ <span className="text-red-500 text-6xl block">ERİŞİM</span>
        </h1>
        <div className="max-w-xs bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center gap-4 text-left">
           <Lock className="text-gray-500" size={24} />
           <p className="text-[10px] text-gray-500 font-bold leading-relaxed uppercase">
              Bu dizin yalnızca yetkili operatörler içindir. Lütfen kimlik doğrulama yapın.
           </p>
        </div>
        <button 
           onClick={() => router.push("/login")}
           className="mt-10 text-[10px] font-black uppercase text-[#00FF88] border-b border-[#00FF88] pb-1 hover:opacity-50 transition-opacity"
        >
           LOGIN_SCREEN_GO_BACK
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
