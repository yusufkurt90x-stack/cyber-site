<?php
// CORS Ayarı (Hataları önlemek için)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Çekilecek haber kaynakları
$sources = [
    "The Hacker News" => "https://thehackernews.com/feeds/posts/default?alt=rss",
    "Bleeping Computer" => "https://www.bleepingcomputer.com/feed/",
    "Malwarebytes" => "https://www.malwarebytes.com/blog/feed/"
];

$allNews = [];

foreach ($sources as $name => $url) {
    try {
        $rss = simplexml_load_file($url);
        if ($rss) {
            $items = $rss->channel->item;
            $count = 0;
            foreach ($items as $item) {
                if ($count >= 5) break; 
                $allNews[] = [
                    "title" => (string)$item->title,
                    "link" => (string)$item->link,
                    "date" => (string)$item->pubDate,
                    "source" => $name
                ];
                $count++;
            }
        }
    } catch (Exception $e) { continue; }
}

// Tarihe göre sırala
usort($allNews, function($a, $b) {
    return strtotime($b['date']) - strtotime($a['date']);
});

echo json_encode($allNews);
?>
