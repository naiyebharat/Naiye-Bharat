'use client';

import React, { useEffect, useState } from 'react';
import { RotateCw, Trash2, Users, CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function ExpertTable({ refreshTrigger }: { refreshTrigger: number }) {
  const [advocates, setAdvocates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Confirmation Popup State Control
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetExpert, setTargetExpert] = useState<{ id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Bottom-Left Toast Notification State Hub
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, message: '', type: 'success' });

  // Custom 4.5 Seconds toast
  const triggerToast = (message: string, type: 'success' | 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4500);
  };

  // API Fetch Logic
  const fetchExperts = async (isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    else setLoading(true);

    try {
      const res = await fetch('/api/admin/add-advocate');
      if (res.ok) {
        const data = await res.json();
        setAdvocates(data);
      } else {
        console.error("404 ya Fetch routing issue mila backend route par.");
      }
    } catch (err) {
      console.error("Network boundary connectivity logic failed:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false); // Stop rotating animation
    }
  };

  useEffect(() => {
    fetchExperts();
  }, [refreshTrigger]);

  // Refresh Button handler
  const handleManualRefresh = () => {
    fetchExperts(true);
  };

  const handleDeleteClick = (id: string, name: string) => {
    setTargetExpert({ id, name });
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!targetExpert) return;
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/delete-advocate/${targetExpert.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDeleteModalOpen(false);
        // 🌟 Toast Trigger instead of native alert box
        triggerToast(`"${targetExpert.name}" successfully wiped out from system layers! 🗑️`, 'success');
        setTargetExpert(null);
        fetchExperts();
      } else {
        const err = await response.json();
        triggerToast(err.error || 'Deletion tracking engine failed', 'error');
      }
    } catch (error) {
      triggerToast('Network transaction processing timeout.', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#0b1329] border border-slate-400 dark:border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between h-full min-h-[520px] max-h-[620px] transition-all relative">

      {/* Table Headings Section */}
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-600 dark:text-[#00c2a8]" />
          <div>
            <h2 className="text-md font-bold text-slate-800 dark:text-white">Master Expert Database Directory</h2>
            <p className="text-[11px] text-slate-500 dark:text-gray-400 mt-0.5">Manage active listings, access secure profiles and logs.</p>
          </div>
        </div>

        {/* 🔄 Dynamic Refresh Button Right Aligned */}
        <button
          type="button"
          onClick={handleManualRefresh}
          disabled={loading || isRefreshing}
          className="p-2 bg-slate-50 hover:bg-slate-100 hover:text-emerald-600 hover:border-emerald-200 dark:bg-[#050b1d] dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 dark:text-slate-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          title="Force Sync Directory"
        >
          <RotateCw
            className={`w-4 h-4 transition-transform duration-700 ease-in-out ${isRefreshing ? 'animate-spin text-emerald-600 dark:text-[#00c2a8]' : ''
              }`}
          />
        </button>
      </div>

      {/* Main Grid View Box Container */}
      <div className="flex-1 overflow-y-auto pr-1 scrollbar-premium">
        {loading && !isRefreshing ? (
          <div className="flex items-center justify-center py-20 text-xs text-slate-500 dark:text-gray-400 font-semibold uppercase tracking-wider">
            Loading Live Directories Cluster...
          </div>
        ) : advocates.length === 0 ? (
          <div className="flex items-center justify-center py-20 text-xs text-slate-500 dark:text-gray-400 font-semibold uppercase tracking-wider">
            No Experts found in directory pipeline.
          </div>
        ) : (
          <div className="w-full overflow-x-auto scrollbar-premium">
            <table className="w-full min-w-[850px] text-left border-collapse">
              <thead className="sticky top-0 bg-white dark:bg-[#0b1329] z-10 shadow-[0_1px_0_0_rgba(0,0,0,0.05)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.05)]">
                <tr className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <th className="pb-3 pt-1">Expert Profile</th>
                  <th className="pb-3 pt-1">Email</th>
                  <th className="pb-3 pt-1">Phone</th>
                  <th className="pb-3 pt-1">Core Specialty</th>
                  <th className="pb-3 pt-1">Languages</th>
                  <th className="pb-3 pt-1">Session Cost</th>
                  <th className="pb-3 pt-1 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                {advocates.map((adv) => (
                  <tr key={adv._id || adv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                    {/* Avatar Profile */}
                    <td className="py-3 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 flex items-center justify-center font-bold text-[11px] text-emerald-600 dark:text-[#00c2a8] flex-shrink-0">
                        {adv.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-extrabold text-slate-800 dark:text-white leading-tight truncate">{adv.name}</h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate max-w-[140px] font-semibold">{`Age: ${adv.age} Yrs`}</p>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-3">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 truncate max-w-[160px] block" title={adv.email || 'N/A'}>
                        {adv.email || 'N/A'}
                      </span>
                    </td>

                    {/* Phone */}
                    <td className="py-3">
                      <span className="text-slate-600 dark:text-slate-400 font-semibold">{adv.phoneNumber || 'N/A'}</span>
                    </td>

                    {/* Specialty */}
                    <td className="py-3">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wide ${adv.specialty === 'Mental Health'
                          ? 'bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-500/10 dark:text-purple-400 dark:border-transparent'
                          : adv.specialty === 'Legal Support'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-transparent'
                            : 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-transparent'
                        }`}>
                        {adv.specialty}
                      </span>
                    </td>

                    {/* Languages */}
                    <td className="py-3 text-[11px] text-slate-700 dark:text-slate-300 font-semibold truncate max-w-[120px]" title={Array.isArray(adv.language) ? adv.language.join(', ') : adv.language}>
                      {Array.isArray(adv.language) ? adv.language.join(', ') : adv.language}
                    </td>

                    {/* Cost */}
                    <td className="py-3 font-extrabold text-slate-800 dark:text-[#00c2a8]">
                      ₹{adv.pricing}
                    </td>

                    {/* 🗑️ Trash Button */}
                    <td className="py-3 text-right">
                      <button
                        onClick={() => handleDeleteClick(adv._id || adv.id, adv.name)}
                        className="text-slate-400 hover:text-rose-500 transition-all cursor-pointer p-1.5 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg inline-block"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* End of List Marker */}
        <div className="mt-6 mb-2 flex items-center justify-center gap-3 opacity-80 dark:opacity-50">
          <div className="h-[1px] bg-gradient-to-r from-transparent to-slate-200 dark:to-slate-700 flex-1"></div>
          <div className="flex items-center gap-1.5 text-[10px] font-extrabold tracking-widest text-slate-600 dark:text-slate-400 uppercase bg-emerald-50/20 border border-emerald-100/50 dark:bg-slate-900 dark:border-slate-800 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-500 dark:bg-[#00c2a8] rounded-full"></span>
            Expert List Ends Here
          </div>
          <div className="h-[1px] bg-gradient-to-l from-transparent to-slate-200 dark:to-slate-700 flex-1"></div>
        </div>
      </div>

      {/* CONFIRMATION POPUP MODAL OVERLAY */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all">
          <div className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl max-w-sm w-full space-y-4">

            <div className="flex items-center gap-3 text-rose-500">
              <span className="text-2xl">⚠️</span>
              <h3 className="text-md font-bold text-slate-800 dark:text-white">Confirm Data Deletion</h3>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Are you sure you want to remove{" "}
              <span className="font-bold text-slate-800 dark:text-white">
                "{targetExpert?.name}"
              </span>{" "}
              from the database? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete Record'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* PREMIUM BOTTOM-LEFT SLIDE-UP TOAST COMPONENT */}
      {toast.show && (
        <div className="fixed bottom-6 left-6 z-50 max-w-sm min-w-[320px] animate-slideUp flex items-start gap-3 p-3.5 rounded-2xl border shadow-2xl backdrop-blur-md transition-all duration-300 bg-white/95 text-slate-900 border-slate-200/80 dark:bg-[#0b1329]/95 dark:text-slate-100 dark:border-slate-800">
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-600 dark:text-[#00c2a8] flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 mt-0.5 text-rose-600 dark:text-rose-400 flex-shrink-0" />
          )}

          <div className="flex-1 text-[11px] font-semibold leading-relaxed">
            {toast.message}
          </div>

          <button
            type="button"
            onClick={() => setToast((prev) => ({ ...prev, show: false }))}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition cursor-pointer p-0.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
}