"use client";

import { useEffect, useState } from "react";
import { getAllUsers, type User } from "@/lib/auth";

export default function AdminControlPanel() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setUsers(getAllUsers());
  }, []);

  const activeUsers = users.filter((user) => user.status === "active").length;

  const stats = [
    { label: "Toplam Kullanıcı", value: users.length, icon: "👥" },
    { label: "Aktif Kullanıcı", value: activeUsers, icon: "🟢" },
    {
      label: "Yöneticiler",
      value: users.filter((user) => user.role === "admin").length,
      icon: "⚡",
    },
    {
      label: "Analistler",
      value: users.filter((user) => user.role === "analyst").length,
      icon: "🛡️",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-white text-3xl font-black tracking-tighter mb-2 italic uppercase">
          Yönetim <span className="text-[#00FF88]">Merkezi</span>
        </h1>
        <p className="text-gray-600 text-[10px] tracking-[4px] font-bold uppercase">
          Sistem Yetkilendirme ve Kullanıcı Kontrol Paneli
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl hover:border-[#00FF88]/30 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-[#00FF88] text-[9px] font-bold px-2 py-0.5 bg-[#00FF88]/10 rounded border border-[#00FF88]/20">
                LIVE
              </span>
            </div>
            <p className="text-gray-500 text-[10px] font-black tracking-widest uppercase mb-1">
              {stat.label}
            </p>
            <p className="text-2xl font-black text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <section className="bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-white text-sm font-black tracking-widest uppercase italic">
            Kullanıcı Veritabanı
          </h2>
          <p className="text-gray-600 text-[10px] mt-2 tracking-wider">
            Kayıt olan kullanıcılar otomatik olarak burada listelenir.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="text-gray-600 text-[9px] tracking-[2px] uppercase border-b border-white/5">
                <th className="px-6 py-4 font-black">AD SOYAD</th>
                <th className="px-6 py-4 font-black">KULLANICI ADI</th>
                <th className="px-6 py-4 font-black">ROL</th>
                <th className="px-6 py-4 font-black">DURUM</th>
                <th className="px-6 py-4 font-black">KAYIT TARİHİ</th>
                <th className="px-6 py-4 font-black">SON GİRİŞ</th>
              </tr>
            </thead>

            <tbody className="text-xs">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-4 font-bold text-white">{user.name}</td>
                  <td className="px-6 py-4 text-[#00FF88] font-mono">
                    @{user.username}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-white">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-2 text-gray-300">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          user.status === "active"
                            ? "bg-[#00FF88] shadow-[0_0_8px_#00FF88]"
                            : "bg-gray-600"
                        }`}
                      />
                      {user.status === "active" ? "AKTİF" : "PASİF"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{user.joined}</td>
                  <td className="px-6 py-4 text-gray-500">{user.lastLogin}</td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-600 text-xs"
                  >
                    Henüz kayıtlı kullanıcı bulunmuyor.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
