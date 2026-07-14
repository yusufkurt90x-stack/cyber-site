"use client";

import { use } from "react"; // React'in yeni 'use' hook'unu ekliyoruz
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { ChevronLeft, Lock, Terminal, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Next.js 15'te params artık bir Promise'dir. 'use' ile onu unwrap ediyoruz.
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  return (
    <main className="min-h-screen bg-[#050505] pt-24 pb-20 text-white">
      <Container>
        <Section>
          {/* Geri Dön */}
          <Link 
            href="/akademi" 
            className="flex items-center gap-2 text-[10px] font-black uppercase text-[#00FF88] mb-12 hover:opacity-70 transition-opacity"
          >
            <ChevronLeft size={16} /> Geri Dön / Akademi
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Sol Taraf: Eğitim İçeriği */}
            <div className="lg:col-span-2 space-y-8">
              <div className="p-1 border-b border-[#00FF88]/20 pb-6">
                <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">
                  {/* Güvenli erişim ve formatlama */}
                  {slug ? slug.replace(/-/g, ' ') : 'Eğitim Modülü'}
                </h1>
                <div className="flex items-center gap-4 text-[10px] font-black uppercase text-gray-500">
                  <span className="text-[#00FF88]">Modül: 01</span>
                  <span>•</span>
                  <span>Erişim: Yetkili</span>
                </div>
              </div>

              {/* Sahte İçerik Alanı */}
              <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <Lock size={120} />
                </div>
                
                <h2 className="text-xl font-black italic uppercase text-[#00FF88] mb-6">Operasyonel Talimatlar</h2>
                <div className="space-y-6 text-gray-400 font-medium leading-relaxed italic border-l-2 border-[#00FF88]/10 pl-6">
                  <p>
                    Bu eğitim modülü şu an hazırlık aşamasındadır. Yüksek öncelikli veri paketleri sisteme yükleniyor. 
                    İçerik hazır olduğunda bu alanda teknik detaylar, laboratuvar ortamları ve saldırı vektörleri yer alacaktır.
                  </p>
                  
                  <div className="bg-black/40 border border-[#00FF88]/10 p-6 rounded-2xl font-mono">
                    <div className="flex items-center gap-2 mb-4 text-[#00FF88] text-[10px] font-black">
                      <Terminal size={14} /> SYSTEM_MSG
                    </div>
                    <div className="text-[12px] space-y-2">
                       <p className="text-gray-500">{">"} Initializing {slug} materials...</p>
                       <p className="text-gray-500">{">"} Status: Access_Denied (Encryption Key Required)</p>
                       <p className="text-[#00FF88] animate-pulse">{">"} Awaiting Administrator Approval...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ Taraf: İstatistikler ve Durum */}
            <div className="space-y-6">
               <div className="bg-[#111] border border-white/5 rounded-3xl p-6">
                  <h3 className="text-xs font-black uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Eğitim Durumu</h3>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center text-[10px] font-black uppercase">
                        <span className="text-gray-500">İlerleme</span>
                        <span className="text-[#00FF88]">%0</span>
                     </div>
                     <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                        <div className="w-0 h-full bg-[#00FF88]" />
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </Section>
      </Container>
    </main>
  );
}
