"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
// Lucide icons
import { User, ShieldAlert, LogOut, ChevronDown, AlertTriangle } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // Logout confirmation state ke liye
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            setUser(data.user);
          }
        }
      } catch (err) {
        console.error("Error checking auth:", err);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        setUser(null);
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Handle Body Lock for Mobile Menu and Logout Modal
  useEffect(() => {
    if (mobileMenuOpen || showLogoutConfirm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen, showLogoutConfirm]);

  return (
    <>
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 transition-all duration-500 shadow-sm" id="navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center h-24 justify-between">
            
            {/* Mobile hamburger left */}
            <div className="flex xl:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-oxford-800 hover:text-gold-500 focus:outline-none transition-colors p-3 rounded-xl hover:bg-slate-100/50"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"} />
                </svg>
              </button>
            </div>

            {/* Logo and Brand Name */}
            <div className="flex-1 flex justify-center xl:justify-start">
              <div className="flex items-center space-x-6">
                <Link 
                  href="/" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 sm:space-x-4 group cursor-pointer"
                >
                  <div className="w-10 h-10 sm:w-14 sm:h-14 relative transition-transform duration-500 group-hover:scale-110">
                    <div className="absolute inset-0 bg-gold-500 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    <Image 
                      src="/img/logo.png" 
                      alt="NaiyeBharat Logo" 
                      width={56} 
                      height={56} 
                      className="w-full h-full object-contain relative z-10" 
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl sm:text-2xl font-serif font-bold text-oxford-900 tracking-tight flex items-baseline leading-none">
                      Naiye<span className="text-gold-500">Bharat</span>
                    </span>
                    <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-slate-400 mt-1">Justice & Integrity</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Desktop menu */}
            <div className="hidden xl:flex xl:items-center space-x-10">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Pricing", path: "/pricing" }
              ].map((link) => (
                <Link key={link.path} href={link.path} className="text-oxford-700 hover:text-oxford-900 font-bold tracking-widest transition-all relative group text-[11px] uppercase">
                  {link.name}
                  <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </Link>
              ))}

              <div className="relative group py-6">
                <div className="text-oxford-700 hover:text-oxford-900 font-bold tracking-widest flex items-center transition-all text-[11px] uppercase cursor-pointer">
                  Practice Areas
                  <ChevronDown className="w-3 h-3 ml-1.5 transition-transform duration-300 group-hover:rotate-180" />
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 top-[100%] mt-2 w-72 glass-panel border border-slate-100 shadow-oxford rounded-3xl py-4 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 origin-top group-hover:translate-y-0 -translate-y-4">
                  {["Civil", "Criminal", "Corporate", "Family", "Property", "Court Marriage"].map((item) => (
                    <Link 
                      key={item} 
                      href={`/services/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                      className="block px-8 py-3 text-[12px] font-bold uppercase tracking-wider text-oxford-700 hover:text-gold-600 transition-colors border-l-4 border-transparent hover:border-gold-500 hover:bg-slate-50/50"
                    >
                      {item} Law
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/counselling" className="text-gold-600 hover:text-gold-700 font-bold tracking-widest transition-all relative group text-[11px] uppercase">
                Counselling
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gold-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </Link>

              <Link href="/#Contact" className="text-oxford-700 hover:text-oxford-900 font-bold tracking-widest transition-all relative group text-[11px] uppercase">
                Contact
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </Link>
              
              {loading ? (
                <div className="w-10 h-10 rounded-full bg-slate-100 animate-pulse ml-4"></div>
              ) : user ? (
                <div className="relative ml-4">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center cursor-pointer space-x-2.5 focus:outline-none group p-1.5 pr-4 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-200"
                  >
                    <div className="w-9 h-9 rounded-full bg-gold-500 text-oxford-900 font-bold flex items-center justify-center border border-gold-400 shadow-sm uppercase text-sm">
                      {user.name ? user.name.charAt(0) : "U"}
                    </div>
                    <div className="flex flex-col items-start leading-tight">
                      <span className="text-[11px] font-bold tracking-wider text-oxford-800 group-hover:text-gold-600 transition-colors max-w-[100px] truncate">
                        {user.name || "My Account"}
                      </span>
                      <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">
                        {user.role}
                      </span>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${dropdownOpen ? 'rotate-180 text-gold-600' : ''}`} />
                  </button>

                  {dropdownOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setDropdownOpen(false)}
                      />
                      <div className="absolute right-0 mt-3 w-64 bg-white border border-slate-100 shadow-2xl rounded-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        
                        <div className="px-4 py-3 border-b border-slate-50 mb-1 bg-slate-50/50 rounded-t-2xl">
                          <p className="text-xs font-bold text-oxford-900 truncate">{user.name}</p>
                          <p className="text-[9px] font-black tracking-widest text-gold-600 uppercase mt-0.5">{user.role} account</p>
                        </div>
                        
                        {user.role === "client" && (
                          <Link 
                            href="/client" 
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center space-x-3 px-4 py-2.5 text-xs font-bold text-oxford-700 hover:text-gold-600 hover:bg-slate-50 transition-colors group"
                          >
                            <User className="w-4 h-4 text-slate-400 group-hover:text-gold-500 transition-colors" />
                            <span>Client Portal</span>
                          </Link>
                        )}
                        {user.role === "advocate" && (
                          <Link 
                            href="/advocate" 
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center space-x-3 px-4 py-2.5 text-xs font-bold text-oxford-700 hover:text-gold-600 hover:bg-slate-50 transition-colors group"
                          >
                            <User className="w-4 h-4 text-slate-400 group-hover:text-gold-500 transition-colors" />
                            <span>Advocate Portal</span>
                          </Link>
                        )}
                        {user.role === "admin" && (
                          <Link 
                            href="/admin" 
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center space-x-3 px-4 py-2.5 text-xs font-bold text-oxford-700 hover:text-gold-600 hover:bg-slate-50 transition-colors group"
                          >
                            <ShieldAlert className="w-4 h-4 text-slate-400 group-hover:text-gold-500 transition-colors" />
                            <span>Admin Panel</span>
                          </Link>
                        )}
                        
                        {/* Direct logout ki jagah popup trigger karega */}
                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            setShowLogoutConfirm(true);
                          }}
                          className="cursor-pointer w-full flex items-center space-x-3 px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50/60 transition-colors border-t border-slate-50 mt-1"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link href="/login" className="group relative ml-4 px-8 py-3 bg-oxford-900 text-gold-400 border border-gold-500/20 rounded-2xl font-bold tracking-[0.2em] transition-all duration-500 shadow-xl hover:shadow-gold-500/10 text-[10px] uppercase overflow-hidden hover:scale-105 active:scale-95">
                  <span className="relative z-10 transition-colors group-hover:text-oxford-900">Sign In</span>
                  <div className="absolute inset-0 bg-gold-500 transform translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`xl:hidden fixed left-0 right-0 top-24 bg-white shadow-2xl transition-all duration-500 ease-in-out border-t border-slate-100 rounded-b-[40px] overflow-y-auto z-40 ${
              mobileMenuOpen ? "max-h-[calc(100vh-6rem)] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
            }`}
          >
            <div className="px-5 sm:px-8 pt-6 sm:pt-8 pb-12 space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Pricing", path: "/pricing" },
                { name: "Counselling", path: "/counselling", highlight: true },
                { name: "Contact", path: "/#Contact" }
              ].map((link) => (
                <Link 
                  key={link.path} 
                  href={link.path} 
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block font-bold py-4 transition-all px-4 rounded-xl hover:bg-slate-50 ${
                    link.highlight ? 'text-gold-600 text-sm tracking-[0.2em] uppercase' : 'text-oxford-800 text-lg font-serif'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="py-2">
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full text-left flex justify-between items-center text-oxford-800 font-serif font-bold text-lg py-4 px-4 hover:bg-slate-50 rounded-xl transition-all"
                >
                  Practice Areas
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileServicesOpen && (
                  <div className="mt-2 grid grid-cols-1 gap-2 pl-4 animate-in fade-in slide-in-from-top-4">
                    {["Civil", "Criminal", "Corporate", "Family", "Property", "Court Marriage"].map((area) => (
                      <Link 
                        key={area} 
                        href={`/services/${area.toLowerCase().replace(/\s+/g, '-')}`} 
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-slate-500 hover:text-gold-600 py-3 px-6 transition-colors text-sm font-bold uppercase tracking-widest border-l-2 border-slate-100 hover:border-gold-500"
                      >
                        {area} Law
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              {loading ? (
                <div className="h-14 w-full bg-slate-100 rounded-[24px] animate-pulse mt-4"></div>
              ) : user ? (
                <div className="space-y-3 pt-4 border-t border-slate-100 mt-4">
                  <div className="flex items-center space-x-4 px-4 py-2 bg-slate-50 rounded-2xl">
                    <div className="w-12 h-12 rounded-full bg-gold-500 text-oxford-900 font-bold flex items-center justify-center border border-gold-400 shadow-sm uppercase text-lg">
                      {user.name ? user.name.charAt(0) : "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-oxford-900 truncate">{user.name}</p>
                      <p className="text-[10px] font-semibold text-gold-600 uppercase tracking-wider">{user.role}</p>
                    </div>
                  </div>
                  
                  {user.role === "client" && (
                    <Link 
                      href="/client" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full py-4 bg-oxford-900 text-gold-400 font-bold rounded-2xl text-center shadow-lg transition-all uppercase tracking-widest text-[10px]"
                    >
                      Client Portal
                    </Link>
                  )}
                  {user.role === "advocate" && (
                    <Link 
                      href="/advocate" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full py-4 bg-oxford-900 text-gold-400 font-bold rounded-2xl text-center shadow-lg transition-all uppercase tracking-widest text-[10px]"
                    >
                      Advocate Portal
                    </Link>
                  )}
                  {user.role === "admin" && (
                    <Link 
                      href="/admin" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full py-4 bg-oxford-900 text-gold-400 font-bold rounded-2xl text-center shadow-lg transition-all uppercase tracking-widest text-[10px]"
                    >
                      Admin Panel
                    </Link>
                  )}
                  
                  {/* Mobile me bhi handle confirmation toggle */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setShowLogoutConfirm(true);
                    }}
                    className="block w-full py-4 bg-red-50 text-red-600 hover:bg-red-100 font-bold rounded-2xl text-center transition-all uppercase tracking-widest text-[10px]"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="pt-8">
                  <Link 
                    href="/login" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full py-5 bg-oxford-900 text-gold-400 font-bold rounded-[24px] text-center shadow-2xl hover:bg-gold-500 hover:text-oxford-900 transition-all uppercase tracking-widest text-[10px] relative overflow-hidden active:scale-95"
                  >
                    <span className="relative z-10 font-black">Sign In</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* --- PREMIUN CONFIRMATION POPUP MODAL --- */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop Blur effect */}
          <div 
            className="fixed inset-0 bg-oxford-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
            onClick={() => setShowLogoutConfirm(false)}
          />
          
          {/* Modal Content Box */}
          <div className="bg-white rounded-[32px] border border-slate-100 max-w-md w-full p-8 shadow-2xl relative z-10 text-center animate-in fade-in zoom-in-95 duration-300 ease-out">
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5 text-red-500 border border-red-100">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            
            <h3 className="text-xl font-serif font-bold text-oxford-900 mb-2">
              Sign Out Confirmation
            </h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed px-2 mb-8">
              Bhai, are you sure you want to log out from NaiyeBharat? You will need to sign in again to access your panel.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Cancel Button */}
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="cursor-pointer flex-1 order-2 sm:order-1 py-3.5 bg-slate-50 hover:bg-slate-100 text-oxford-800 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-200"
              >
                Cancel
              </button>
              
              {/* Confirm Logout Button */}
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  handleLogout();
                }}
                className="cursor-pointer flex-1 order-1 sm:order-2 py-3.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-red-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Yes, Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}