"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, logoutRequest, isAdmin } from "@/lib/auth";
import Link from "next/link";
import { 
    Shield, 
    Activity, 
    Users, 
    Zap, 
    AlertTriangle, 
    Cpu, 
    Menu, 
    LogOut, 
    Map, 
    BookOpen 
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState(true);

    useEffect(() => {
        if (!getSession()) {
            router.push("/login");
            return;
        }
        setLoading(false);
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="text-[#00FF88] text-sm font-black tracking-[4px] animate-pulse italic">
                    BAĞLANTI KURULUYOR...
                </div>
            </div>
        );
    }

    const navItems = [
        { href: "/dashboard", label: "GENEL BAKIŞ", icon: Activity },
        { href: "/dashboard/threat-map", label: "TEHDİT HARİTASI", icon: Map },
        { href: "/dashboard/threat-feed", label: "SİBER HABERLER", icon: Zap },
        { href: "/dashboard/security-tools", label: "GÜVENLİK ARAÇLARI", icon: Cpu },
        { href: "/dashboard/academy", label: "AKADEMİ", icon: BookOpen },
        { href: "/dashboard/cve", label: "CVE ANALİZ", icon: AlertTriangle },
        ...(isAdmin() ? [{ href: "/dashboard/users", label: "AJAN YÖNETİMİ", icon: Users }] : []),
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white flex">
            {/* Sidebar Desktop */}
            <aside className={`fixed top-0 left-0 h-full bg-[#0a0a0a] border-r border-white/5 z-50 transition-all duration-500 ${isExpanded ? "w-72" : "w-20"} hidden md:flex flex-col shadow-2xl`}>
                <div className="p-6 flex items-center gap-3">
                    <div className="min-w-[48px] h-12 bg-[#00FF88]/10 rounded-xl flex items-center justify-center text-[#00FF88] border border-[#00FF88]/20 shadow-[0_0_15px_rgba(0,255,136,0.1)]">
                        <Shield size={26} />
                    </div>
                    {isExpanded && (
                        <div className="flex flex-col overflow-hidden whitespace-nowrap">
                            <span className="text-sm font-black italic tracking-tighter">KVPOS OPS</span>
                            <span className="text-[8px] text-[#00FF88] font-bold tracking-[3px]">TERMİNAL</span>
                        </div>
                    )}
                </div>

                <nav className="flex-1 px-3 mt-8 space-y-1 overflow-y-auto no-scrollbar">
                    {navItems.map((item) => (
                        <Link 
                            key={item.href} 
                            href={item.href} 
                            className="flex items-center gap-4 p-4 rounded-2xl text-[#9CA3AF] hover:text-white hover:bg-white/5 transition-all group"
                        >
                            <item.icon size={22} className="group-hover:text-[#00FF88] transition-colors" />
                            {isExpanded && <span className="text-[11px] font-black tracking-widest uppercase italic">{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5 space-y-2">
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)} 
                        className="w-full flex items-center gap-4 p-4 rounded-2xl text-[#374151] hover:text-[#00FF88] transition-all"
                    >
                        <Menu size={20} />
                        {isExpanded && <span className="text-[10px] font-bold tracking-[3px] uppercase">DARALT</span>}
                    </button>
                    <button 
                        onClick={logoutRequest} 
                        className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500/50 hover:text-red-500 transition-all"
                    >
                        <LogOut size={20} />
                        {isExpanded && <span className="text-[10px] font-bold tracking-[3px] uppercase">GÜVENLİ ÇIKIŞ</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Areas */}
            <main className={`flex-1 transition-all duration-500 ${isExpanded ? "md:pl-72" : "md:pl-20"}`}>
                <div className="max-w-7xl mx-auto px-6 py-8 md:px-12 md:py-16">
                    {children}
                </div>
            </main>
        </div>
    );
}
