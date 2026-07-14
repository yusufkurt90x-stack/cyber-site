// constants/tools.ts

export interface SecurityTool {
  id: string;
  name: string;
  category: "NETWORK" | "WEB" | "FORENSIC" | "EXPLOIT" | "OSINT";
  description: string;
  cmd: string; // Hızlı hatırlatma komutu
  docs: string; // Dokümantasyon linki
  status: "STABLE" | "LAB" | "CRITICAL";
}

export const SECURITY_TOOLS: SecurityTool[] = [
  {
    id: "tool-1",
    name: "NMAP",
    category: "NETWORK",
    description: "Ağ keşfi ve zafiyet taraması için endüstri standardı araç. Port tarama ve servis analizi yapar.",
    cmd: "nmap -sV -sC -O target.com",
    docs: "https://nmap.org/book/man.html",
    status: "STABLE"
  },
  {
    id: "tool-2",
    name: "BURP SUITE",
    category: "WEB",
    description: "Web uygulama saldırıları için proxy tabanlı platform. İstekleri yakalar, değiştirir ve tekrar yollar.",
    cmd: "Interception: [ON]",
    docs: "https://portswigger.net/burp/documentation/desktop",
    status: "CRITICAL"
  },
  {
    id: "tool-3",
    name: "METASPLOIT",
    category: "EXPLOIT",
    description: "Modüler exploit framework'ü. Zafiyetleri sömürmek ve post-exploitation için kullanılır.",
    cmd: "msfconsole -q",
    docs: "https://www.offsec.com/metasploit-unleashed/",
    status: "STABLE"
  },
  {
    id: "tool-4",
    name: "WIRESHARK",
    category: "NETWORK",
    description: "Paket analizi ve ağ trafiği izleme aracı. Protokol seviyesinde derinlemesine inceleme sağlar.",
    cmd: "tshark -i eth0",
    docs: "https://www.wireshark.org/docs/wsug_html_chunked/",
    status: "STABLE"
  },
  {
    id: "tool-5",
    name: "SQLMAP",
    category: "WEB",
    description: "Otomatik SQL Injection ve veritabanı ele geçirme aracı. Güçlü bir tespit motoruna sahiptir.",
    cmd: "sqlmap -u target.com --dbs",
    docs: "https://github.com/sqlmapproject/sqlmap/wiki/Usage",
    status: "CRITICAL"
  }
];
