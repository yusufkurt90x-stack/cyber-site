import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // NVD yerine çok daha hızlı olan CISA KEV (Bilinen İstismar Edilen Zafiyetler) API'sini kullanıyoruz
    const res = await fetch('https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json', {
      next: { revalidate: 3600 }
    });

    if (!res.ok) throw new Error("CISA API Response Not OK");

    const data = await res.json();

    // En güncel 40 zafiyeti al ve formatla
    const formattedData = data.vulnerabilities
      .slice(-40)
      .reverse()
      .map((v: any) => ({
        id: v.cveID,
        published: v.dateAdded,
        description: v.shortDescription,
        severity: "CRITICAL", // CISA'dakiler zaten aktif exploit edilen kritik zafiyetlerdir
        score: 9.0,
        url: `https://nvd.nist.gov/vuln/detail/${v.cveID}`,
        vendor: v.vendorProject,
        product: v.product
      }));

    return NextResponse.json(formattedData);
  } catch (error: any) {
    console.error("CVE FETCH ERROR:", error.message);
    return NextResponse.json({ error: "Veri çekilemedi", details: error.message }, { status: 500 });
  }
}
