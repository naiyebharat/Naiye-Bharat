"use client";

import React, { useState } from "react";
import { Scale, LogOut, ChevronDown, ShieldCheck } from "lucide-react";
import ThemeToggle from "../../advocate/components/ThemeToggle"; 

interface ProfileHeaderProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onLogoutClick: () => void;
  clientName: string;
}

export default function ProfileHeader({ theme, onToggleTheme, onLogoutClick, clientName }: ProfileHeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="w-full h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1329] px-6 flex items-center justify-between transition-colors duration-300 relative z-20">
      {/* Brand Logo & Node Indicator */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-[#121b36] flex items-center justify-center border border-slate-200 dark:border-slate-800 shadow-sm">
          <Scale className="w-5 h-5 text-amber-500 dark:text-[#00c2a8]" />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-black hidden md:block text-xl tracking-tight text-slate-900 dark:text-white">
            Naiye<span className="text-amber-500 dark:text-[#00c2a8]">Bharat</span>
          </span>
          <span className="text-[9px] font-extrabold bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-[#00c2a8] border border-slate-200 dark:border-slate-800/80 tracking-widest px-2 py-0.5 rounded-md uppercase">
            Client Panel
          </span>
        </div>
      </div>

      {/* Action Hub */}
      <div className="flex items-center gap-4">
        {/* Theme Engine */}
        <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />

        <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800" />

        {/* Profile Cluster Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 cursor-pointer group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center tracking-wider uppercase ring-2 ring-indigo-600/10 dark:ring-0">
              {clientName.substring(0, 2)}
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-black text-slate-800 dark:text-white flex items-center gap-1 group-hover:text-amber-500 dark:group-hover:text-[#00c2a8] transition-colors">
                {clientName}
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
              <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-0.5">
                <ShieldCheck className="w-3 h-3 text-emerald-500" /> Verified User
              </div>
            </div>
          </button>

          {/* Quick Menu Overlay */}
          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
              <div className="absolute right-0 mt-2.5 w-44 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1329] p-1.5 shadow-2xl z-20">
                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    onLogoutClick();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-left rounded-lg text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" /> Log Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}