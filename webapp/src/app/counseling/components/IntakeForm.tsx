"use client";

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { X, CheckCircle2, AlertCircle, Sun, Moon, Sparkles, UserCheck } from "lucide-react";
import { tr } from "framer-motion/client";

const ClientIntakeSchema = Yup.object({
  clientName: Yup.string().min(3, "Name must contain at least 3 characters").required("Your full name is required"),
  clientAge: Yup.number().typeError("Age must be a valid number").min(12, "Age must be greater than 12").required("Age context is required").max(80, "Age must be lesser than 80"),
  email: Yup.string().email("Please enter a valid email address").required("Email address is required"),
  phoneNumber: Yup.string().matches(/^[0-9]{10}$/, "Phone number must contain exactly 10 digits").required("Phone number is required"),
  specialty: Yup.string().required("Please select a core domain specialty"),
  language: Yup.string().required("Please select your comfortable language"),
  issueDescription: Yup.string().min(10, "Please describe your concern in at least 10 characters").required("Description layer requires context metrics"),
});

const LOCAL_STORAGE_KEY = "counseling_intake_form_state";

export default function IntakeForm({ onSuccess }: { onSuccess: (orderId: string) => void }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [isLoaded, setIsLoaded] = useState(false);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  const [initialValues, setInitialValues] = useState({
    clientName: "",
    clientAge: "",
    email: "",
    phoneNumber: "",
    specialty: "Mental Health / Therapy",
    language: "English",
    issueDescription: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try { setInitialValues(JSON.parse(savedData)); } catch (e) { console.error(e); }
    }
    if (document.documentElement.classList.contains("dark")) setTheme("dark");
    setIsLoaded(true);
  }, []);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: ClientIntakeSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await fetch("/api/counseling", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        if (response.ok && data.success) {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
          onSuccess(data.orderId);
        } else {
          setToast({ show: true, message: data.error || "Ingestion fail.", type: "error" });
        }
      } catch {
        setToast({ show: true, message: "Network boundary failure.", type: "error" });
      } finally { setSubmitting(false); }
    },
    validateOnMount: true
  });

  useEffect(() => {
    if (isLoaded) localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formik.values));
  }, [formik.values, isLoaded]);

  if (!isLoaded) return <div className="min-h-screen bg-slate-50 dark:bg-[#050b1d]" />;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen w-full bg-slate-50 dark:bg-[#050b1d] transition-colors duration-300 py-6 px-6 lg:px-12 flex flex-col justify-between relative"
    >
      <button type="button" onClick={toggleTheme} className="absolute top-6 right-6 p-3 bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 rounded-xl shadow-md text-slate-700 dark:text-slate-200 cursor-pointer">
        {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-[#00c2a8]" />}
      </button>

      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center">
        <div className="text-center mb-10 mt-6">
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-slate-800 dark:text-white flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-emerald-600 dark:text-[#00c2a8]" /> Smart Consultation Matchmaker
          </h1>
          <p className="text-xs font-semibold text-slate-400 mt-2 tracking-wide max-w-2xl mx-auto">
            Please input your query securely. Our systems will dynamically extract pricing levels, verified credentials, and real expert domain profiles.
          </p>
        </div>

        {/* Dynamic Horizontal Progress Tracker */}
        <div className="flex items-center justify-between max-w-3xl mx-auto w-full mb-12 text-xs font-bold text-slate-400 dark:text-slate-500 px-4">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-[#00c2a8]"><span className="w-6 h-6 bg-emerald-100 dark:bg-[#00c2a8]/10 text-emerald-700 dark:text-[#00c2a8] rounded-full flex items-center justify-center text-[11px]">1</span> Intake Form</div>
          <div className="h-[2px] flex-1 bg-slate-200 dark:bg-slate-800 mx-4" />
          <div className="flex items-center gap-2"><span className="w-6 h-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-[11px]">2</span> Match Profile</div>
          <div className="h-[2px] flex-1 bg-slate-200 dark:bg-slate-800 mx-4" />
          <div className="flex items-center gap-2"><span className="w-6 h-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-[11px]">3</span> Secure Room</div>
        </div>

        {/* FULL WIDTH IMMERSIVE CARD CONTAINER */}
        <div className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800/80 rounded-3xl p-8 md:p-12 shadow-2xl transition-all">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="block text-[11px] font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Your Full Name</label>
                <input type="text" {...formik.getFieldProps("clientName")} placeholder="e.g. Shiva" className="w-full bg-slate-50 dark:bg-[#050b1d] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 dark:focus:border-[#00c2a8] transition-all font-medium" />
                {formik.touched.clientName && formik.errors.clientName && <div className="text-rose-500 text-xs font-semibold flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {formik.errors.clientName}</div>}
              </div>
              <div className="space-y-2">
                <label className="block text-[11px] font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Your Age</label>
                <input type="number" {...formik.getFieldProps("clientAge")} placeholder="e.g. 28" className="w-full bg-slate-50 dark:bg-[#050b1d] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 dark:focus:border-[#00c2a8] transition-all font-medium" />
                {formik.touched.clientAge && formik.errors.clientAge && <div className="text-rose-500 text-xs font-semibold flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {formik.errors.clientAge}</div>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[11px] font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Email Address</label>
                <input type="email" {...formik.getFieldProps("email")} placeholder="shiva@domain.com" className="w-full bg-slate-50 dark:bg-[#050b1d] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 dark:focus:border-[#00c2a8] transition-all font-medium" />
                {formik.touched.email && formik.errors.email && <div className="text-rose-500 text-xs font-semibold flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {formik.errors.email}</div>}
              </div>
              <div className="space-y-2">
                <label className="block text-[11px] font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Phone Number</label>
                <input type="text" {...formik.getFieldProps("phoneNumber")} maxLength={10} placeholder="10 digit mobile code" className="w-full bg-slate-50 dark:bg-[#050b1d] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 dark:focus:border-[#00c2a8] transition-all font-medium" />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && <div className="text-rose-500 text-xs font-semibold flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {formik.errors.phoneNumber}</div>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[11px] font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Select Core Specialty</label>
                <select {...formik.getFieldProps("specialty")} className="w-full bg-slate-50 dark:bg-[#050b1d] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 dark:focus:border-[#00c2a8] transition-all font-bold">
                  <option value="Mental Health / Therapy">Mental Health / Therapy</option>
                  <option value="Legal Support / Consultation">Legal Support</option>
                  <option value="Corporate Law Node">Corporate Law Node</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-[11px] font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Comfortable Language</label>
                <select {...formik.getFieldProps("language")} className="w-full bg-slate-50 dark:bg-[#050b1d] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 dark:focus:border-[#00c2a8] transition-all font-bold">
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Punjabi">Punjabi</option>
                  <option value="Malayalam">Malayalam</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Describe Your Issue (Confidential)</label>
              <textarea {...formik.getFieldProps("issueDescription")} rows={5} placeholder="Provide a summary of your concern..." className="w-full bg-slate-50 dark:bg-[#050b1d] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 dark:focus:border-[#00c2a8] transition-all font-medium resize-none leading-relaxed" />
              {formik.touched.issueDescription && formik.errors.issueDescription && <div className="text-rose-500 text-xs font-semibold flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {formik.errors.issueDescription}</div>}
            </div>

            <div className="pt-4 flex justify-end">
              <button type="submit" disabled={!formik.isValid || formik.isSubmitting} className="w-full md:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 dark:bg-[#00c2a8] text-white dark:text-[#050b1d] dark:hover:bg-[#00ebd0] font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2">
                {formik.isSubmitting ? "Processing..." : "Find Matching Experts & Profiles →"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {toast.show && (
        <div className="fixed bottom-6 left-6 z-50 min-w-[320px] flex items-start gap-3 p-4 rounded-2xl border shadow-2xl backdrop-blur-md bg-white/95 text-slate-900 border-slate-200 dark:bg-[#0b1329]/95 dark:text-slate-100 dark:border-slate-800 animate-slideUp">
          {toast.type === "success" ? <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-[#00c2a8]" /> : <AlertCircle className="w-5 h-5 text-rose-600" />}
          <div className="flex-1 text-xs font-semibold">{toast.message}</div>
          <button type="button" onClick={() => setToast(prev => ({ ...prev, show: false }))} className="text-slate-400 hover:text-slate-600 dark:hover:text-white"><X className="w-4 h-4" /></button>
        </div>
      )}
    </motion.div>
  );
}