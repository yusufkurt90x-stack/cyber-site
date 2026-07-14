"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllUsers, AppUser, deleteUser, adminAddUser, isAdmin } from "@/lib/auth"; 
import { User, Trash2, Search, Eye, EyeOff, UserPlus, X, Terminal, ShieldAlert } from "lucide-react";

export default function UsersPage() {
    const router = useRouter();
    const [users, setUsers] = useState<AppUser[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showPasswords, setShowPasswords] = useState<{ [key: number]: boolean }>({});
    const [isAdding, setIsAdding] = useState(false);
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    
    // Verileri Yükle
    const loadData = () => {
        if (!isAdmin()) {
            router.push("/dashboard");
            return;
        }
        setUsers(getAllUsers());
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (adminAddUser(newUsername, newPassword, "OPERATİF")) {
            setNewUsername(""); setNewPassword(""); setIsAdding(false);
            loadData();
        }
    };

    const handleDelete = (id: number) => {
        if (confirm("AJAN SİSTEMDEN SİLİNSİN Mİ?")) {
            deleteUser(id);
            loadData();
        }
    };

    return (
        <section className="space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black italic tracking-tighter uppercase">AJAN <span className="text-[#00FF88]">YÖNETİMİ</span></h1>
                    <p className="text-gray-500 text-[9px] font-bold uppercase tracking-[3px] mt-2">Aktif Birim Listesi ve Erişim Kontrolü</p>
                </div>
                <button onClick={() => setIsAdding(!isAdding)} className="bg-[#00FF88] text-black px-8 py-4 rounded-2xl font-black text-xs uppercase italic flex items-center gap-3 hover:scale-105 transition-all">
                    {isAdding ? <X size={18} /> : <UserPlus size={18} />} {isAdding ? "İPTAL" : "YENİ AJAN EKLE"}
                </button>
            </header>

            {isAdding && (
                <form onSubmit={handleAdd} className="bg-[#0a0a0a] border border-[#00FF88]/20 p-8 rounded-[2.5rem] grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <input required placeholder="KOD ADI" value={newUsername} onChange={e => setNewUsername(e.target.value)} className="bg-black border border-white/5 p-4 rounded-xl text-xs text-[#00FF88] outline-none" />
                    <input required placeholder="ŞİFRE" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="bg-black border border-white/5 p-4 rounded-xl text-xs text-[#00FF88] outline-none" />
                    <button className="bg-white/5 text-[#00FF88] p-4 rounded-xl font-black text-xs uppercase border border-[#00FF88]/20">KAYDET</button>
                </form>
            )}

            <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-gray-500">
                        <tr>
                            <th className="p-6">AJAN ADI</th>
                            <th className="p-6">ŞİFRE</th>
                            <th className="p-6">TARİH</th>
                            <th className="p-6 text-right">İŞLEM</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="p-6 font-black italic uppercase text-sm">{user.username}</td>
                                <td className="p-6 font-mono text-xs text-gray-500 tracking-[3px]">
                                    {showPasswords[user.id] ? user.password : "••••••••"}
                                    <button onClick={() => setShowPasswords({...showPasswords, [user.id]: !showPasswords[user.id]})} className="ml-3 text-gray-700 hover:text-[#00FF88]"><Eye size={14}/></button>
                                </td>
                                <td className="p-6 text-[10px] font-bold text-gray-600">{user.date}</td>
                                <td className="p-6 text-right">
                                    <button onClick={() => handleDelete(user.id)} className="text-gray-800 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr><td colSpan={4} className="p-20 text-center text-gray-700 font-black uppercase tracking-[5px]">SİSTEMDE KAYITLI AJAN YOK</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
