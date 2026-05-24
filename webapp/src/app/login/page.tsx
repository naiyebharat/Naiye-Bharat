"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { seededRandom } from "@/utils/random";

export default function Login() {
  const [formType, setFormType] = useState<
    "login" | "signup" | "otp" | "forgot"
  >("login");
  const [loading, setLoading] = useState(false);

  const handleBypass = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert(
        "Professional Access: You are currently entering as a verified guest.",
      );
      window.location.href = "/";
    }, 1500);
  };

  return (
    <main className="min-h-screen relative hero-gradient flex items-center justify-center p-6 overflow-hidden">
      {/* Floating Particles for brand consistency */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              top: `${seededRandom(i * 5) * 100}%`,
              left: `${seededRandom(i * 5 + 1) * 100}%`,
              animationDelay: `${seededRandom(i * 5 + 2) * 15}s`,
              width: `${seededRandom(i * 5 + 3) * 6 + 1}px`,
              height: `${seededRandom(i * 5 + 4) * 6 + 1}px`,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 flex justify-center">
        <div className="w-full max-w-[450px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-500 hover:shadow-gold-500/10">
          {/* Card Header */}
          <div className="p-10 pb-6 text-center">
            <Link href="/">
              <div className="w-24 h-24 mx-auto mb-6 hover:scale-110 transition-transform cursor-pointer">
                <Image
                  src="/img/logo.png"
                  alt="NaiyeBharat Logo"
                  width={96}
                  height={96}
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
            <h1 className="text-3xl font-serif font-bold text-oxford-900 tracking-tight">
              {formType === "login" && "Client Access"}
              {formType === "signup" && "Create Account"}
              {formType === "otp" && "One-Time Access"}
              {formType === "forgot" && "Reset Security"}
            </h1>
            <p className="text-slate-500 mt-2 text-sm font-light">
              {formType === "login" &&
                "Enter your credentials to access the legal portal."}
              {formType === "signup" &&
                "Join NaiyeBharat for secure legal collaboration."}
              {formType === "otp" &&
                "Enter the code sent to your registered mobile."}
              {formType === "forgot" &&
                "Provide your email to recover your access."}
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleBypass} className="px-10 pb-10 space-y-5">
            {formType === "signup" && (
              <div className="relative group">
                <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1 mb-1 block">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Adv. Vivek Sharma"
                  required
                  className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:border-gold-500 focus:bg-white outline-none transition-all placeholder:text-slate-300 text-oxford-900"
                />
              </div>
            )}

            <div className="relative group">
              <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1 mb-1 block">
                Work Email
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                required
                className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:border-gold-500 focus:bg-white outline-none transition-all placeholder:text-slate-300 text-oxford-900"
              />
            </div>

            {(formType === "login" || formType === "signup") && (
              <div className="relative group">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1 block">
                    Security Password
                  </label>
                  {formType === "login" && (
                    <button
                      type="button"
                      onClick={() => setFormType("forgot")}
                      className="text-[10px] uppercase tracking-widest text-gold-600 font-bold hover:text-oxford-900 transition-colors"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:border-gold-500 focus:bg-white outline-none transition-all placeholder:text-slate-300 text-oxford-900"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full py-5 bg-oxford-900 text-gold-400 font-bold border border-gold-500/30 rounded-2xl text-center shadow-lg hover:shadow-gold-500/20 transition-all uppercase tracking-widest text-xs overflow-hidden flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin"></div>
              ) : (
                <>
                  <span className="relative z-10 group-hover:text-oxford-900 transition-colors">
                    {formType === "login" && "Secure Login"}
                    {formType === "signup" && "Create Account"}
                    {formType === "otp" && "Verify & Enter"}
                    {formType === "forgot" && "Send Reset Link"}
                  </span>
                  <div className="absolute inset-0 bg-gold-500 transform translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                </>
              )}
            </button>

            {/* OAuth Separator */}
            {formType === "login" && (
              <div className="relative py-4 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100"></div>
                </div>
                <span className="relative px-4 bg-white text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                  Or secure access via
                </span>
              </div>
            )}

            {formType === "login" && (
              <div className="flex gap-4">
                <button
                  type="button"
                  className="flex-1 py-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                  <i className="fab fa-linkedin text-blue-600"></i>
                  <span className="text-xs font-bold text-slate-600">
                    LinkedIn
                  </span>
                </button>
                <button
                  type="button"
                  className="flex-1 py-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                  <i className="fab fa-google text-red-500"></i>
                  <span className="text-xs font-bold text-slate-600">
                    Google
                  </span>
                </button>
              </div>
            )}
          </form>

          {/* Footer Switcher */}
          <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
            {formType === "login" ? (
              <p className="text-sm text-slate-500">
                Authorized personnel only.{" "}
                <button
                  onClick={() => setFormType("signup")}
                  className="text-gold-600 font-bold hover:underline"
                >
                  Request Access
                </button>
              </p>
            ) : (
              <button
                onClick={() => setFormType("login")}
                className="text-sm text-gold-600 font-bold hover:underline tracking-wide uppercase text-xs"
              >
                Back to Secure Login
              </button>
            )}
          </div>

          {/* Security Badge */}
          <div className="pb-8 text-center flex items-center justify-center gap-2 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
            <i className="fas fa-shield-alt text-lg"></i>
            <span className="text-[10px] font-bold uppercase tracking-widest">
              End-to-End SSL Encrypted
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
