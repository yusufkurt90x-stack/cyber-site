"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ShieldAlert, Activity, Zap } from 'lucide-react';

interface Log {
  id: number;
  time: string;
  status: string;
  loc: string;
  info: string;
}

interface Attack {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
}

export default function ThreatMonitor() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [attacks, setAttacks] = useState<Attack[]>([]);
  const [threatLevel, setThreatLevel] = useState(42);

  useEffect(() => {
    const protocols = ["KVP-X", "SURA-INT", "TR-SEC", "NODE-01", "RED-LINE", "DECRYPT"];
    const locs = ["ISTANBUL", "ANKARA", "SOFIYA", "MOSCOW", "TEL_AVIV", "NEW_YORK", "LONDON"];
    
    const interval = setInterval(() => {
      const newLog = {
        id: Date.now(),
        time: new Date().toLocaleTimeString('tr-TR'),
        status: protocols[Math.floor(Math.random() * protocols.length)],
        loc: locs[Math.floor(Math.random() * locs.length)],
        info: `DATA_PKT_${Math.floor(Math.random() * 9999)}_ENC`
      };
      setLogs(prev => [newLog, ...prev].slice(0, 8));
      setThreatLevel(prev => Math.min(100, Math.max(10, prev + (Math.random() * 6 - 3))));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newAttack = {
        id: Date.now(),
        x1: Math.random() * 80 + 10,
        y1: Math.random() * 80 + 10,
        x2: Math.random() * 80 + 10,
        y2: Math.random() * 80 + 10,
        color: Math.random() > 0.6 ? "#FF3B3B" : "#00FF88"
      };
      setAttacks(prev => [...prev, newAttack].slice(-3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden relative shadow-2xl">
      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      
      {/* Header */}
      <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center bg-black/20 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-8 bg-[#00FF88] shadow-[0_0_15px_#00FF88]" />
          <div>
            <h2 className="text-[#00FF88] text-sm font-black tracking-[4px] uppercase italic leading-none">Global Threat Monitor</h2>
            <p className="text-gray-600 text-[9px] tracking-[2px] mt-1.5 font-bold uppercase">System Auth: Operation Omega // Node: IST-01</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden lg:block text-right">
            <p className="text-gray-700 text-[8px] font-black tracking-widest uppercase mb-1">Threat Status</p>
            <div className="flex items-center gap-3">
               <span className={`text-xs font-black transition-colors ${threatLevel > 70 ? 'text-red-500' : 'text-[#00FF88]'}`}>
                  LEVEL_{threatLevel.toFixed(0)}
               </span>
               <div className="w-20 h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full ${threatLevel > 70 ? 'bg-red-500' : 'bg-[#00FF88]'}`} 
                    animate={{ width: `${threatLevel}%` }}
                    transition={{ duration: 1 }}
                  />
               </div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-[#00FF88]/5 border border-[#00FF88]/20 px-4 py-2 rounded-xl">
             <Zap size={14} className="text-[#00FF88] animate-pulse" />
             <span className="text-[#00FF88] text-[10px] font-black uppercase tracking-widest">Active</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[450px]">
        {/* Map Visualization */}
        <div className="flex-1 relative bg-[#050505] overflow-hidden border-r border-white/5">
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#00FF88 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <span className="text-[120px] font-black opacity-[0.02] italic tracking-tighter select-none">KVP_OS</span>
          </div>

          <svg className="absolute inset-0 w-full h-full p-8 pointer-events-none z-10">
            <AnimatePresence>
              {attacks.map(attack => (
                <motion.g 
                  key={attack.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.path 
                    d={`M ${attack.x1}% ${attack.y1}% Q ${(attack.x1 + attack.x2) / 2}% ${(attack.y1 + attack.y2) / 2 - 20}% ${attack.x2}% ${attack.y2}%`}
                    stroke={attack.color}
                    strokeWidth="1"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  <motion.circle 
                    cx={`${attack.x2}%`} 
                    cy={`${attack.y2}%`} 
                    r="3" 
                    fill={attack.color}
                    animate={{ scale: [1, 2, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.g>
              ))}
            </AnimatePresence>
          </svg>

          {/* Map UI Decorators */}
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            <div className="bg-black/60 border border-white/5 p-2 rounded backdrop-blur-sm">
              <p className="text-[8px] text-gray-500 font-bold uppercase">Uplink Code</p>
              <p className="text-[10px] text-[#00FF88] font-mono font-bold tracking-tighter">SEC_442_TR</p>
            </div>
          </div>
        </div>

        {/* Intelligence Feed */}
        <div className="w-full lg:w-80 bg-black/10 p-6 flex flex-col">
          <h3 className="text-gray-600 text-[9px] font-black tracking-[3px] uppercase mb-6 flex items-center gap-2">
            <Activity size={12} className="text-red-500 animate-pulse" />
            Live Intel Feed
          </h3>
          
          <div className="flex-1 space-y-4 overflow-hidden mask-fade-bottom">
            <AnimatePresence mode="popLayout">
              {logs.map((log) => (
                <motion.div 
                  key={log.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="pl-4 border-l border-[#00FF88]/20 py-1"
                >
                  <div className="flex justify-between text-[8px] font-bold mb-1 uppercase">
                    <span className="text-gray-600">{log.time}</span>
                    <span className="text-[#00FF88] text-[7px] border border-[#00FF88]/20 px-1 rounded">{log.status}</span>
                  </div>
                  <p className="text-[10px] text-white/80 font-mono truncate tracking-tighter">
                    {log.loc} » {log.info}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
             <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-wider">
                <span className="text-gray-700">Protocol </span>
                <span className="text-[#00FF88]">Encrypted / RSA-4096</span>
             </div>
             <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-[#00FF88]"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
             </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .mask-fade-bottom {
          mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
        }
      `}</style>
    </div>
  );
}
