"use client";

import React, { useState } from "react";
import { Scale, LogOut, ChevronDown, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProfileHeaderProps {
  advocateName: string;
  onLogoutTrigger: () => void;
  toggleElement: React.ReactNode; 
}

export default function ProfileHeader({ advocateName = "Advocate", onLogoutTrigger, toggleElement }: ProfileHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const safeName = advocateName || "Advocate";
  const initials = safeName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  // 🖱️ Desktop Handlers (Hover Events)
  const handleMouseEnter = () => {
    if (window.innerWidth >= 768) setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) setIsDropdownOpen(false);
  };

  // 📱 Mobile Handler (Click Toggle)
  const handleAvatarClick = () => {
    if (window.innerWidth < 768) setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header className="w-full h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1329] flex items-center justify-between px-4 lg:px-6 flex-shrink-0 z-50 shadow-sm select-none">
      
      {/* 🏛️ Logo Brand Layout */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-[#00c2a8] flex items-center justify-center shadow-md">
          <Scale className="w-3.5 h-3.5 text-white dark:text-[#050b1d]" />
        </div>
        <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Naiye<span className="text-amber-600 dark:text-[#00c2a8]">Bharat</span>
        </span>
        <span className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[9px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase px-2 py-0.5 rounded-md hidden sm:inline-block">
          Advocate Node
        </span>
      </div>

      {/* ⚙️ Controller Actions Panel */}
      <div className="flex items-center gap-4">
        
        {/* Theme Slider Toggle */}
        {toggleElement}

        {/* 👤 Dropdown Profile Wrapper */}
        <div 
          className="relative border-l border-slate-200 dark:border-slate-800 pl-4 py-2"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Trigger Node Anchor */}
          <button
            onClick={handleAvatarClick}
            className="flex items-center gap-2.5 cursor-pointer group focus:outline-none"
            type="button"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-black shadow-inner ring-2 ring-transparent group-hover:ring-indigo-500/30 dark:group-hover:ring-[#00c2a8]/30 transition-all">
              {initials}
            </div>
            
            <div className="hidden md:block text-left">
              <h4 className="text-xs font-black text-slate-900 dark:text-white leading-tight flex items-center gap-1">
                {safeName}
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </h4>
              <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">Verified Counsel</p>
            </div>
          </button>

          {/* 🪟 Animated Floating Dropdown Menu Menu */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0f1934] shadow-xl p-1.5 z-50 origin-top-right"
              >
                {/* Mobile Info Segment Layer */}
                <div className="px-2.5 py-2 md:hidden border-b border-slate-100 dark:border-slate-800/60 mb-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{safeName}</p>
                  <p className="text-[9px] font-medium text-slate-400 dark:text-slate-500">Legal Counsel</p>
                </div>

                {/* <div className="flex items-center gap-2 px-2.5 py-1.5 text-[11px] font-bold text-emerald-600 dark:text-[#00c2a8] bg-emerald-50/50 dark:bg-emerald-950/10 rounded-lg mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Node Secure Active</span>
                </div> */}

                {/* 🚨 Logout Option Action Anchor */}
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onLogoutTrigger();
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </header>
  );
}