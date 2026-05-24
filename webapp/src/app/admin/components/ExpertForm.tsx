"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
// 🚀 Added CheckCircle2, AlertCircle, and X for the unified bottom-left notification portal
import { X, CheckCircle2, AlertCircle } from "lucide-react";

const ExpertValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must contain at least 3 characters")
    .required("Expert name is required"),

  age: Yup.number()
    .typeError("Age must be a valid number")
    .min(20, "Age must be greater than 20")
    .required("Age is required"),

  specialty: Yup.string().required("Please select a specialization"),

  language: Yup.string().required("Please specify at least one language"),

  pricing: Yup.number()
    .typeError("Session fee must be a valid number")
    .min(0, "Session fee cannot be negative")
    .required("Session fee is required"),

  videoUrl: Yup.string().url("Please enter a valid video URL"),

  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email address is required"),

  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must contain exactly 10 digits")
    .required("Phone number is required"),
});

export default function ExpertForm({ onSuccess }: { onSuccess: () => void }) {
  // 🌟 Premium Notification Hub State Architecture
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: '', type: "success" });

  // Auto-dismiss helper execution block (Strictly 3.5 Seconds)
  const triggerNotification = (message: string, type: "success" | "error") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
    }, 3500); 
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      specialty: "Mental Health",
      language: "",
      pricing: "",
      videoUrl: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema: ExpertValidationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const languageArray = values.language
          .split(",")
          .map((l) => l.trim())
          .filter(Boolean);

        const response = await fetch("/api/admin/add-advocate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.name,
            age: values.age,
            specialty: values.specialty,
            language: languageArray,
            pricing: values.pricing,
            videoUrl: values.videoUrl,
            email: values.email,
            phoneNumber: values.phoneNumber,
          }),
        });

        if (response.ok) {
          // Premium Success Toast
          triggerNotification(`"${values.name}" successfully synced into secure infrastructure! 🎉`, "success");
          resetForm();
          onSuccess();
        } else {
          const err = await response.json();
          // Premium Failure Notification
          triggerNotification(err.error || "Submission layer validation engine failed", "error");
        }
      } catch (error) {
        // Premium Latency Exception Logger
        triggerNotification("Internal Production API latency or network boundary error.", "error");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="bg-white dark:bg-[#0b1329] border border-slate-400 dark:border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between h-full min-h-[500px] transition-all relative">
      <div>
        {/* Module Header Container */}
        <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
          <span className="text-emerald-600 dark:text-[#00c2a8] text-xl font-bold">👤+</span>
          <h2 className="text-md font-bold text-slate-800 dark:text-white">Onboard New Layer Expert</h2>
        </div>
        
        <form onSubmit={formik.handleSubmit} className="space-y-3">
          {/* Full Name */}
          <div>
            <label className="block text-[10px] font-extrabold text-slate-700 dark:text-slate-300 tracking-wider mb-1">Expert Full Name</label>
            <input type="text" {...formik.getFieldProps('name')} className="w-full bg-slate-50/50 dark:bg-[#050b1d] border border-slate-200 dark:border-slate-800/80 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 dark:focus:border-[#00c2a8] focus:ring-2 focus:ring-emerald-500/10 dark:focus:ring-0 transition-all duration-200" />
            {formik.touched.name && formik.errors.name && <div className="text-rose-500 text-[10px] mt-0.5 font-semibold">{formik.errors.name}</div>}
          </div>

          {/* Email & Phone Inner Cluster */}
          <div className="grid grid-cols-2 gap-3 bg-emerald-50/20 dark:bg-slate-900/40 p-2.5 rounded-xl border border-emerald-100/40 dark:border-slate-800/60">
            <div>
              <label className="block text-[10px] font-extrabold text-emerald-700 dark:text-[#00c2a8] tracking-wider mb-1">Email</label>
              <input type="email" {...formik.getFieldProps('email')} placeholder="admin@internal.com" className="w-full bg-white dark:bg-[#050b1d] border border-slate-200 dark:border-slate-800/80 rounded-lg px-2 py-1 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 dark:focus:border-[#00c2a8] focus:ring-2 focus:ring-emerald-500/10 dark:focus:ring-0 transition-all duration-200" />
              {formik.touched.email && formik.errors.email && <div className="text-rose-500 text-[9px] mt-0.5 font-semibold">{formik.errors.email}</div>}
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-emerald-700 dark:text-[#00c2a8] tracking-wider mb-1">Phone</label>
              <input type="text" {...formik.getFieldProps('phoneNumber')} maxLength={10} placeholder="10 Digits" className="w-full bg-white dark:bg-[#050b1d] border border-slate-200 dark:border-slate-800/80 rounded-lg px-2 py-1 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 dark:focus:border-[#00c2a8] focus:ring-2 focus:ring-emerald-500/10 dark:focus:ring-0 transition-all duration-200" />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && <div className="text-rose-500 text-[9px] mt-0.5 font-semibold">{formik.errors.phoneNumber}</div>}
            </div>
          </div>

          {/* Age & Specialty Selectors */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-extrabold text-slate-700 dark:text-slate-300 tracking-wider mb-1">Age Context</label>
              <input type="number" {...formik.getFieldProps('age')} className="w-full bg-slate-50/50 hover:bg-white focus:bg-white dark:bg-[#050b1d] border border-slate-200 dark:border-slate-800/80 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 dark:focus:border-[#00c2a8] focus:ring-2 focus:ring-emerald-500/10 dark:focus:ring-0 transition-all duration-200" />
              {formik.touched.age && formik.errors.age && <div className="text-rose-500 text-[10px] mt-0.5 font-semibold">{formik.errors.age}</div>}
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-slate-700 dark:text-slate-300 tracking-wider mb-1">Core Focus</label>
              <select {...formik.getFieldProps('specialty')} className="w-full bg-slate-50/50 hover:bg-white focus:bg-white dark:bg-[#050b1d] border border-slate-200 dark:border-slate-800/80 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 dark:focus:border-[#00c2a8] focus:ring-2 focus:ring-emerald-500/10 dark:focus:ring-0 transition-all duration-200 font-semibold">
                <option value="Mental Health">Mental Health</option>
                <option value="Legal Support">Legal Support</option>
                <option value="Corporate Law">Corporate Law</option>
              </select>
            </div>
          </div>

          {/* Languages */}
          <div>
            <label className="block text-[10px] font-extrabold text-slate-700 dark:text-slate-300 tracking-wider mb-1">Languages Offered</label>
            <input type="text" {...formik.getFieldProps('language')} placeholder="English, Hindi" className="w-full bg-slate-50/50 hover:bg-white focus:bg-white dark:bg-[#050b1d] border border-slate-200 dark:border-slate-800/80 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 dark:focus:border-[#00c2a8] focus:ring-2 focus:ring-emerald-500/10 dark:focus:ring-0 transition-all duration-200" />
            {formik.touched.language && formik.errors.language && <div className="text-rose-500 text-[10px] mt-0.5 font-semibold">{formik.errors.language}</div>}
          </div>

          {/* Pricing */}
          <div>
            <label className="block text-[10px] font-extrabold text-slate-700 dark:text-slate-300 tracking-wider mb-1">Session Fee (₹ Amount)</label>
            <input type="number" {...formik.getFieldProps('pricing')} className="w-full bg-slate-50/50 hover:bg-white focus:bg-white dark:bg-[#050b1d] border border-slate-200 dark:border-slate-800/80 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 dark:focus:border-[#00c2a8] focus:ring-2 focus:ring-emerald-500/10 dark:focus:ring-0 transition-all duration-200" />
            {formik.touched.pricing && formik.errors.pricing && <div className="text-rose-500 text-[10px] mt-0.5 font-semibold">{formik.errors.pricing}</div>}
          </div>

          {/* Video Url */}
          <div>
            <label className="block text-[10px] font-extrabold text-slate-700 dark:text-slate-300 tracking-wider mb-1">Onboarding Pitch Video Link</label>
            <input type="url" {...formik.getFieldProps('videoUrl')} placeholder="https://..." className="w-full bg-slate-50/50 hover:bg-white focus:bg-white dark:bg-[#050b1d] border border-slate-200 dark:border-slate-800/80 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 dark:focus:border-[#00c2a8] focus:ring-2 focus:ring-emerald-500/10 dark:focus:ring-0 transition-all duration-200" />
            {formik.touched.videoUrl && formik.errors.videoUrl && <div className="text-rose-500 text-[10px] mt-0.5 font-semibold">{formik.errors.videoUrl}</div>}
          </div>

          {/* 🚀 SUBMIT BUTTON: Disabled and cursor-not-allowed locks injected */}
          <button 
            type="submit" 
            disabled={formik.isSubmitting} 
            className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-[#00c2a8] text-white dark:text-[#050b1d] dark:hover:bg-[#00ebd0] font-extrabold text-xs tracking-wider py-2.5 rounded-xl transition shadow-md shadow-emerald-600/10 dark:shadow-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {formik.isSubmitting ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white dark:border-slate-900/30 dark:border-t-slate-900 rounded-full animate-spin"></span>
                Syncing Cluster...
              </>
            ) : (
              'Verify & Onboard Expert'
            )}
          </button>
        </form>
      </div>

      {/* 🚨 UNIFIED BOTTOM-LEFT SLIDE-UP TOAST PORTAL */}
      {notification.show && (
        <div className="fixed bottom-6 left-6 z-50 max-w-sm min-w-[320px] animate-slideUp flex items-start gap-3 p-3.5 rounded-2xl border shadow-2xl backdrop-blur-md transition-all duration-300 bg-white/95 text-slate-900 border-slate-200/80 dark:bg-[#0b1329]/95 dark:text-slate-100 dark:border-slate-800">
          {notification.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-600 dark:text-[#00c2a8] flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 mt-0.5 text-rose-600 dark:text-rose-400 flex-shrink-0" />
          )}
          
          <div className="flex-1 text-[11px] font-semibold leading-relaxed">
            {notification.message}
          </div>

          <button 
            type="button" 
            onClick={() => setNotification((prev) => ({ ...prev, show: false }))}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition cursor-pointer p-0.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
}