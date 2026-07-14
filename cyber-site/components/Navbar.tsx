"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield, Activity, Globe, Zap } from "lucide-react";

// Bu arayüz sayesinde layout.tsx'den gelen accessGranted hatası çözülecek
interface NavbarProps {
  accessGranted?: boolean;
}

export default function Navbar({ accessGranted }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Eğer giriş izni yoksa Navbar'ı hiç gösterme (Layout'taki mantığa uyum sağlar)
  if (accessGranted === false) return null;

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: <Activity size={16} /> },
    { name: "Threat Feed", href: "/dashboard/threat-feed", icon: <Zap size={16} /> },
    { name: "Threat Map", href: "/dashboard/threat-map", icon: <Globe size={16} /> },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        scrolled ? "bg-[#050505]/80 backdrop-blur-md border-b border-[#00FF88]/20 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-lg flex items-center justify-center group-hover:border-[#00FF88] transition-colors">
            <Shield className="text-[#00FF88]" size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold tracking-wider leading-none">INTEL_OS</span>
            <span className="text-[#00FF88] text-[10px] font-mono leading-tight">SECURE SESSION</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center gap-2 font-mono text-xs tracking-widest uppercase transition-colors hover:text-[#00FF88] ${
                  isActive ? "text-[#00FF88]" : "text-gray-400"
                }`}
              >
                {link.icon}
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute -bottom-2 left-0 w-full h-0.5 bg-[#00FF88] shadow-[0_0_8px_#00FF88]"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-[#00FF88]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#050505]/95 border-b border-[#00FF88]/20 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 font-mono text-sm uppercase ${
                    pathname === link.href ? "text-[#00FF88]" : "text-gray-400"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
