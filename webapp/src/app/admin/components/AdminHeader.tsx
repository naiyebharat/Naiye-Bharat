"use client";

import React, { useState } from "react";
import { Scale, LogOut, ChevronDown, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AdminHeaderProps {
  adminName?: string;
  toggleElement: React.ReactNode; // 🔥 Isme direct hum apna fancy ThemeToggle pass karenge
}

export default function AdminHeader({ adminName = "System Admin", toggleElement }: AdminHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const initials = adminName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  // 🖱️ Desktop Handlers (Hover View)
  const handleMouseEnter = () => {
    if (window.innerWidth >= 768) setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) setIsDropdownOpen(false);
  };

  // 📱 Mobile Handler (Click/Tap Toggle)
  const handleAvatarClick = () => {
    if (window.innerWidth < 768) setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header className="w-full flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-5 select-none">
      
      {/* 🏛️ Branding & Sub-bar Context Block */}
      <div>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-700 dark:bg-[#00c2a8] flex items-center justify-center shadow-md sm:hidden">
            <Scale className="w-3.5 h-3.5 text-white dark:text-[#050b1d]" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white uppercase">
            NAIYE <span className="text-emerald-700 dark:text-[#00c2a8]">BHARAT</span>
          </span>
          <span className="text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2 py-0.5 rounded-md dark:bg-emerald-500/10 dark:text-[#00c2a8] dark:border-emerald-500/20 uppercase tracking-widest hidden sm:inline-block">
            Control Room
          </span>
        </div>
        <p className="text-[10px] text-slate-400 dark:text-gray-500 uppercase tracking-wider mt-1 font-black hidden md:block">
          COMMUNICATION HUB • MANAGEMENT CONSOLE
        </p>
      </div>

      {/* ⚙️ Control Actions Layer */}
      <div className="flex items-center gap-4">
        
        {/* Dynamic Theme Toggle Slider Hook */}
        {toggleElement}

        {/* 👤 Admin Context Multi-Drop Grid */}
        <div 
          className="relative border-l border-slate-200 dark:border-slate-800 pl-4 py-1"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            onClick={handleAvatarClick}
            className="flex items-center gap-2.5 cursor-pointer group focus:outline-none bg-transparent border-none"
            type="button"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white text-xs font-black shadow-md ring-2 ring-transparent group-hover:ring-emerald-500/30 dark:group-hover:ring-[#00c2a8]/30 transition-all">
              {initials}
            </div>
            
            <div className="hidden md:block text-left">
              <h4 className="text-xs font-black text-slate-900 dark:text-white leading-tight flex items-center gap-1">
                {adminName}
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </h4>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500">Root Overlord</p>
            </div>
          </button>

          {/* Floating Dropdown Panel */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0f1934] shadow-xl p-1.5 z-50 origin-top-right"
              >
                {/* Mobile Identity Context */}
                <div className="px-2.5 py-2 md:hidden border-b border-slate-100 dark:border-slate-800/60 mb-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{adminName}</p>
                  <p className="text-[9px] font-medium text-slate-400 dark:text-slate-500">System Root</p>
                </div>

                <div className="flex items-center gap-2 px-2.5 py-1.5 text-[10px] font-black text-amber-600 dark:text-[#00c2a8] bg-amber-50/50 dark:bg-emerald-950/10 rounded-lg mb-1 uppercase tracking-wider">
                  <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Secure Mainframe</span>
                </div>

                {/* Simulated Logout System Hook */}
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    alert("Admin Server Session Closed.");
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Exit Console</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </header>
  );
}