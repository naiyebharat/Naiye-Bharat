// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import {
  History,
  Eye,
  Languages,
  RotateCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OrderData {
  _id: string;
  clientName: string;
  clientAge?: number;
  email: string;
  phoneNumber: string;
  specialty: string;
  language: string;
  issueDescription?: string;
  sessionCost: number;
  paymentStatus: string;
  isVerified: boolean;
  status: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: string;
  expertId?: {
    name: string;
    avatar?: string;
  };
}

// 🔥 Sahi tarike se interface declare kiya props ke liye
interface OrdersLedgerProps {
  onViewOrder: (order: OrderData) => void;
}

// ✅ Props ko component arguments mein receive kiya
export default function OrdersLedger({ onViewOrder }: OrdersLedgerProps) {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false); 

  // 🔄 Dynamic API Fetch Logic Hub
  const fetchOrders = async (isManualSync = false) => {
    if (isManualSync) setIsRefreshing(true);
    else setLoading(true);

    try {
      const res = await fetch("/api/admin/orders");
      const json = await res.json();
      if (json.success) {
        setOrders(json.data);
      }
    } catch (err) {
      console.error("Failed to load orders ledger node:", err);
    } finally {
      loading && setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleManualRefreshTrigger = () => {
    fetchOrders(true); 
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-[#0b1329] border border-slate-400 dark:border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between h-full min-h-[520px] max-h-[620px] transition-all relative"
    >
      {/* Header Block with Live Sync Integration */}
      <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-800 pb-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-emerald-600 dark:text-[#00c2a8]" />
          <div>
            <h2 className="text-md font-bold text-slate-900 dark:text-white">
              All Consultations Orders
            </h2>
            <p className="hidden md:block text-[11px] text-slate-600 dark:text-gray-400 mt-0.5">
              Track paid case entries, client configurations, and dashboard session logs.
            </p>
          </div>
        </div>

        {/* Premium Sync Interaction Button Module */}
        <button
          type="button"
          onClick={handleManualRefreshTrigger}
          disabled={loading || isRefreshing}
          className="p-2 bg-slate-50 hover:bg-slate-100 hover:text-emerald-600 hover:border-emerald-200 dark:bg-[#050b1d] dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-600 dark:text-slate-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center"
          title="Force Sync Ledger Database"
        >
          <RotateCw
            className={`w-4 h-4 transition-transform duration-700 ease-in-out ${
              isRefreshing ? "animate-spin text-emerald-600 dark:text-[#00c2a8]" : ""
            }`}
          />
        </button>
      </div>

      {/* Main Responsive Canvas Table with Fixed Heights & Scrollbar */}
      <div className="flex-1 overflow-y-auto pr-1 scrollbar-premium">
        {loading && !isRefreshing ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 select-none">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-800" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-600 dark:border-t-[#00c2a8] animate-spin" />
            </div>
            <span className="text-xs font-black text-slate-600 dark:text-slate-400 tracking-widest animate-pulse uppercase">
              Synchronizing Ledger Data Network...
            </span>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 text-xs font-semibold uppercase tracking-wider text-slate-500">
            No dynamic case entries captured inside network.
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full overflow-x-auto scrollbar-premium"
          >
            <table className="w-full min-w-[950px] text-left border-collapse">
              <thead className="sticky top-0 bg-white dark:bg-[#0b1329] z-10 shadow-[0_1px_0_0_rgba(0,0,0,0.05)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.05)]">
                <tr className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-400">
                  <th className="pb-3 pt-1">Client Details</th>
                  <th className="pb-3 pt-1">Assigned Advocate</th>
                  <th className="pb-3 pt-1">Specialty Core</th>
                  <th className="pb-3 pt-1">Language</th>
                  <th className="pb-3 pt-1">Session Fee</th>
                  <th className="pb-3 pt-1">Intake Time</th>
                  <th className="pb-3 pt-1 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs text-slate-700 dark:text-slate-300">
                <AnimatePresence>
                  {orders.map((order, idx) => (
                    <motion.tr
                      key={order._id || order.id || idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ delay: idx * 0.04 }}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors"
                    >
                      <td className="py-3.5">
                        <div>
                          <h4 className="font-extrabold text-slate-900 dark:text-white leading-tight">
                            {order.clientName}
                          </h4>
                          <p className="text-[10px] text-slate-600 dark:text-slate-500 mt-0.5 font-bold truncate max-w-[150px]">
                            {order.email}
                          </p>
                        </div>
                      </td>
                      <td className="py-3.5 font-bold text-slate-900 dark:text-slate-100">
                        {order.expertId?.name ? (
                          `Adv. ${order.expertId.name}`
                        ) : (
                          <span className="text-slate-600 dark:text-slate-400 font-semibold">
                            Unassigned Node
                          </span>
                        )}
                      </td>
                      <td className="py-3.5">
                        <span className="text-[9px] font-black bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 uppercase px-2 py-0.5 rounded-md text-slate-700 dark:text-slate-400 tracking-wide">
                          {order.specialty}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <span className="flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          <Languages className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                          {order.language || "Not Specified"}
                        </span>
                      </td>
                      <td className="py-3.5 font-black text-slate-900 dark:text-[#00c2a8]">
                        ₹{order.sessionCost || order.amount || 0}
                      </td>
                      <td className="py-3.5 text-slate-600 dark:text-slate-500 font-bold">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-3.5 text-right">
                        {/* ✅ Yeh button ab parent component ki state successfully hit karega */}
                        <button
                          type="button"
                          onClick={() => onViewOrder(order)}
                          className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 hover:text-emerald-500 dark:hover:text-[#00c2a8] transition-colors cursor-pointer inline-flex items-center"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </motion.div>
        )}

        {/* End of List Marker Banner */}
        {orders.length > 0 && (
          <div className="mt-6 mb-2 flex items-center justify-center gap-3 opacity-80 dark:opacity-50 flex-shrink-0">
            <div className="h-[1px] bg-gradient-to-r from-transparent to-slate-200 dark:to-slate-700 flex-1"></div>
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold tracking-widest text-slate-600 dark:text-slate-400 uppercase bg-emerald-50/20 border border-emerald-100/50 dark:bg-slate-900 dark:border-slate-800 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-emerald-500 dark:bg-[#00c2a8] rounded-full"></span>
              Consultation Ledger Pipeline Ends
            </div>
            <div className="h-[1px] bg-gradient-to-l from-transparent to-slate-200 dark:to-slate-700 flex-1"></div>
          </div>
        )}
      </div>
    </motion.div>
  );
}