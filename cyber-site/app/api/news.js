const Parser = require('rss-parser');
const parser = new Parser();

export default async function handler(req, res) {
  // CORS ayarı (Poyraz'daki sitenin buraya erişebilmesi için)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const FEEDS = [
    { url: "https://thehackernews.com/feeds/posts/default?alt=rss", name: "The Hacker News" },
    { url: "https://www.bleepingcomputer.com/feed/", name: "BleepingComputer" },
    { url: "https://www.cert.gov.tr/feed", name: "CERT/TR" }
  ];

  try {
    let allNews = [];
    for (const feed of FEEDS) {
      const data = await parser.parseURL(feed.url);
      const items = data.items.slice(0, 5).map(item => ({
        title: item.title,
        link: item.link,
        date: item.pubDate,
        source: feed.name
      }));
      allNews.push(...items);
    }
    
    // Tarihe göre sırala (En yeni üstte)
    allNews.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    res.status(200).json(allNews);
  } catch (error) {
    res.status(500).json({ error: "Haberler alınamadı" });
  }
}
