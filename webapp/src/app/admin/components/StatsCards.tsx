'use client';

import React from 'react';

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Card 1 */}
      <div className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-all">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[11px] font-extrabold tracking-wider text-slate-600 dark:text-slate-400 uppercase">Verified Professional Directory</p>
            <h3 className="text-4xl font-extrabold text-slate-800 dark:text-white mt-2">3</h3>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-[#00c2a8] rounded-xl border border-emerald-100/40 dark:border-transparent">
            <span className="text-xl">🛡️</span>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-all">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[11px] font-extrabold tracking-wider text-slate-600 dark:text-slate-400 uppercase">Auto-Confirmed Bookings</p>
            <h3 className="text-4xl font-extrabold text-slate-800 dark:text-white mt-2">1</h3>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl border border-blue-100/40 dark:border-transparent">
            <span className="text-xl">📄</span>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-all">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[11px] font-extrabold tracking-wider text-slate-600 dark:text-slate-400 uppercase">Simulated Platform Revenue</p>
            <h3 className="text-4xl font-extrabold text-emerald-600 dark:text-[#00c2a8] mt-2">₹600</h3>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl border border-amber-100/40 dark:border-transparent">
            <span className="text-xl">💳</span>
          </div>
        </div>
      </div>
    </div>
  );
}