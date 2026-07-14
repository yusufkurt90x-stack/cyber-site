// app/page.tsx
import React from "react";
import Hero from "../components/Hero";
import ThreatFeed from "../components/ThreatFeed";
import CVEDashboard from "../components/CVEDashboard";
import Projects from "../components/Projects";
import Blog from "../components/Blog";
import Contact from "../components/Contact";

export default function Page() {
  // örnek fake data ile hızlı test
  const sampleNews = [{ title: "Test haber 1", source: "THN", date: new Date().toISOString() }];
  const sampleCve = [{ id: "CVE-2026-0000", cvss: 9.8, summary: "Test CVE", severity: "High" }];
  const sampleProjects = [{ title: "Proj 1", excerpt: "Açıklama", link: "#" }];

  return (
    <>
      <Hero />
      <ThreatFeed items={sampleNews} />
      <CVEDashboard items={sampleCve} />
      <Projects list={sampleProjects} />
      <Blog posts={[]} />
      <Contact />
    </>
  );
}

export default function Home() {
  redirect("/login");
}
