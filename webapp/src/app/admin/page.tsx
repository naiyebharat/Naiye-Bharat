'use client';

import React, { useState, useEffect } from 'react';
import StatsCards from './components/StatsCards';
import ExpertForm from './components/ExpertForm';
import ExpertTable from './components/ExpertTable';

export default function AdminDashboard() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Strictly false by default taaki pehle hamesha Light Mode hi load ho!
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync state variables with Tailwind v4 system architecture
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] text-slate-900 dark:bg-[#050b1d] dark:text-white p-6 font-sans transition-colors duration-500 antialiased">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Main Workspace Header Architecture */}
        <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-emerald-700 dark:text-[#00c2a8] uppercase">NAIYE BHARAT</span>
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2 py-0.5 rounded-full dark:bg-emerald-500/10 dark:text-[#00c2a8] dark:border-emerald-500/20 uppercase tracking-widest hidden md:block">Control Room</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wider mt-1 font-bold hidden md:block">COMMUNICATION HUB • MANAGEMENT CONSOLE</p>
          </div>

          {/* 🌙 ☀️ Premium Smooth Sliding Switch Layer */}
          <div className="flex items-center gap-3 bg-slate-200/60 dark:bg-slate-800/60 px-3 py-1.5 rounded-full border border-slate-300/40 dark:border-slate-700/50">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 tracking-wide">
              {isDarkMode ? 'Dark Context' : 'Light Context'}
            </span>
            <button
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-14 h-7 bg-slate-300 dark:bg-[#00c2a8]/20 rounded-full relative p-1 cursor-pointer transition-colors duration-300 focus:outline-none"
            >
              {/* Sliding Ball containing Moon & Sun Vector icons */}
              <div 
                className={`w-5 h-5 bg-white dark:bg-[#050b1d] rounded-full shadow-md flex items-center justify-center transition-transform duration-500 ease-out transform ${
                  isDarkMode ? 'translate-x-7' : 'translate-x-0'
                }`}
              >
                {isDarkMode ? (
                  <span className="text-xs animate-pulse">🌙</span>
                ) : (
                  <span className="text-xs">☀️</span>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Dynamic Component 1 Layer */}
        <StatsCards />

        {/* Form and Database Split View layout mapping */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-4">
            <ExpertForm onSuccess={handleSuccess} />
          </div>
          <div className="lg:col-span-8">
            <ExpertTable refreshTrigger={refreshTrigger} />
          </div>
        </div>

      </div>
    </div>
  );
}