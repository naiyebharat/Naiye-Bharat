"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  // Handle Body Lock and Close menu on route change
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);



  return (
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
                <svg className="w-3 h-3 ml-2 mt-0.5 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
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
            
            <Link href="/login" className="group relative ml-4 px-8 py-3 bg-oxford-900 text-gold-400 border border-gold-500/20 rounded-2xl font-bold tracking-[0.2em] transition-all duration-500 shadow-xl hover:shadow-gold-500/10 text-[10px] uppercase overflow-hidden hover:scale-105 active:scale-95">
              <span className="relative z-10 transition-colors group-hover:text-oxford-900">Client Portal</span>
              <div className="absolute inset-0 bg-gold-500 transform translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
            </Link>
          </div>
        </div>

        {/* Mobile Menu - Redesigned slide-down from top with scroll */}
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
                <svg className={`w-5 h-5 transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
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
            
            <div className="pt-8">
              <Link 
                href="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-5 bg-oxford-900 text-gold-400 font-bold rounded-[24px] text-center shadow-2xl hover:bg-gold-500 hover:text-oxford-900 transition-all uppercase tracking-widest text-[10px] relative overflow-hidden active:scale-95"
              >
                <span className="relative z-10 font-black">Secure Client Portal</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
