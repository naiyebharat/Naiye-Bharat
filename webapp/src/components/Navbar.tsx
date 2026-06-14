"use client";

import { useCallback, useEffect } from "react";

function LogoSVG() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#1a1a1a" stroke="#d4af37" strokeWidth="2" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="#d4af37" strokeWidth="1" strokeDasharray="3,2" />
      <rect x="47" y="25" width="6" height="45" fill="#d4af37" />
      <rect x="40" y="65" width="20" height="8" rx="4" fill="#d4af37" />
      <rect x="44" y="20" width="12" height="6" rx="3" fill="#d4af37" />
      <rect x="30" y="35" width="40" height="3" fill="#d4af37" />
      <circle cx="38" cy="40" r="2" fill="#d4af37" />
      <line x1="38" y1="42" x2="38" y2="55" stroke="#d4af37" strokeWidth="1" />
      <line x1="38" y1="42" x2="32" y2="48" stroke="#d4af37" strokeWidth="1" />
      <line x1="38" y1="42" x2="44" y2="48" stroke="#d4af37" strokeWidth="1" />
      <path d="M 30 48 Q 38 55 46 48 L 46 52 Q 38 59 30 52 Z" fill="#d4af37" />
      <circle cx="62" cy="40" r="2" fill="#d4af37" />
      <line x1="62" y1="42" x2="62" y2="55" stroke="#d4af37" strokeWidth="1" />
      <line x1="62" y1="42" x2="56" y2="48" stroke="#d4af37" strokeWidth="1" />
      <line x1="62" y1="42" x2="68" y2="48" stroke="#d4af37" strokeWidth="1" />
      <path d="M 54 48 Q 62 55 70 48 L 70 52 Q 62 59 54 52 Z" fill="#d4af37" />
    </svg>
  );
}

export default function Navbar() {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const btn = document.getElementById("mobile-menu-button");
    const menu = document.getElementById("mobile-menu");
    const servicesBtn = document.getElementById("mobile-services-btn");
    const servicesMenu = document.getElementById("mobile-services-menu") as HTMLElement | null;

    const toggleMenu = () => menu?.classList.toggle("hidden");
    btn?.addEventListener("click", toggleMenu);

    const toggleServices = () => {
      if (!servicesMenu) return;
      const isOpen = servicesMenu.style.maxHeight !== "0px" && servicesMenu.style.maxHeight !== "";
      servicesMenu.style.maxHeight = isOpen ? "0px" : "200px";
      const svg = servicesBtn?.querySelector("svg") as HTMLElement | null;
      if (svg) svg.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
    };
    servicesBtn?.addEventListener("click", toggleServices);

    return () => {
      btn?.removeEventListener("click", toggleMenu);
      servicesBtn?.removeEventListener("click", toggleServices);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes spin-once { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .rotate-once { animation: spin-once 2s ease-in-out 1; }
        @keyframes logoGlow {
          0%   { filter: drop-shadow(0 0 0px  rgba(212,175,55,0)); }
          50%  { filter: drop-shadow(0 0 15px rgba(212,175,55,0.8)); }
          100% { filter: drop-shadow(0 0 8px  rgba(212,175,55,0.4)); }
        }
        .animate-logo-glow { animation: logoGlow 2s ease-in-out 0.5s both; }
        @keyframes emergeFromLogo {
          0%   { opacity: 0; transform: scale(0)   translateX(-50px); filter: blur(10px); }
          50%  { opacity: 0.5; transform: scale(0.8) translateX(-20px); filter: blur(5px); }
          100% { opacity: 1; transform: scale(1)   translateX(0); filter: blur(0); }
        }
        .animate-emerge { animation: emergeFromLogo 1.5s ease-out 0.8s both; }
        @keyframes shine {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .button-bg {
          background: conic-gradient(from 0deg, #00F5FF, #000, #000, #00F5FF, #000, #000, #000, #00F5FF);
          background-size: 300% 300%;
          animation: shine 6s ease-out infinite;
        }
        .navbar-scrolled {
          background-color: rgba(255,255,255,0.95) !important;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .navbar-scrolled .nav-link { color: #374151; }
        .navbar-scrolled .nav-link:hover { color: #3b82f6; }
      `}</style>

      <nav id="navbar" className="bg-white shadow-md sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 justify-between">

            {/* Mobile hamburger */}
            <div className="flex md:hidden">
              <button id="mobile-menu-button" className="text-gray-700 hover:text-blue-600 focus:outline-none transition-colors" aria-label="Open menu">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Logo + Brand */}
            <div className="flex-1 flex justify-center md:justify-start">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rotate-once animate-logo-glow cursor-pointer" onClick={scrollToTop}>
                  <LogoSVG />
                </div>
                <a href="#" className="text-xl md:text-2xl font-bold text-gray-800 hover:text-blue-600 transition-all duration-300 animate-emerge hover:scale-105">
                  NaiyeBharat
                </a>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex md:items-center space-x-6">
              <a href="#home"    className="nav-link text-gray-700 hover:text-blue-600 font-medium transition-all duration-300">Home</a>
              <a href="#about"   className="nav-link text-gray-700 hover:text-blue-600 font-medium transition-all duration-300">About Us</a>
              <a href="prize.html" className="nav-link text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">Pricing</a>

              {/* Services Dropdown */}
              <div className="relative group">
                <a href="#services" className="nav-link text-gray-700 hover:text-blue-600 font-medium flex items-center py-2 transition-colors">
                  Services
                  <svg className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                <div className="absolute left-0 top-full mt-1 w-48 bg-white shadow-xl rounded-md border border-gray-100 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                  <a href="/civil"     className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Civil Law</a>
                  <a href="/criminal"  className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Criminal Law</a>
                  <a href="/Corporate" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Corporate Law</a>
                  <a href="/family"    className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Family Law</a>
                  <a href="/Property"  className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Property Law</a>
                  <a href="/CourtMarriage"       className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">marriages</a>
                </div>
              </div>

              <a href="#Contact" className="nav-link text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</a>

              <div className="button-bg rounded-full p-0.5 hover:scale-105 transition duration-300 active:scale-100">
                <button onClick={() => (window.location.href = "/signup")} className="px-8 text-sm py-2.5 text-white rounded-full font-medium bg-gray-800">
                  signup
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div id="mobile-menu" className="md:hidden hidden px-4 pt-2 pb-4 space-y-2 bg-white shadow-md border-t border-gray-100 transition-all duration-300">
          <a href="#home"    className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">Home</a>
          <a href="#about"   className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">About Us</a>
          <a href="prize.html" className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">Pricing</a>
          <div>
            <button id="mobile-services-btn" className="w-full text-left flex justify-between items-center text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">
              Services
              <svg className="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div id="mobile-services-menu" style={{ maxHeight: "0px", overflow: "hidden", transition: "max-height 0.3s ease" }} className="pl-4 mt-1 space-y-1">
              <a href="civil.html"     className="block text-gray-600 hover:text-blue-600 py-1 transition-colors">Civil Law</a>
              <a href="criminal.html"  className="block text-gray-600 hover:text-blue-600 py-1 transition-colors">Criminal Law</a>
              <a href="corporate.html" className="block text-gray-600 hover:text-blue-600 py-1 transition-colors">Corporate Law</a>
              <a href="family.html"    className="block text-gray-600 hover:text-blue-600 py-1 transition-colors">Family Law</a>
              <a href="property.html"  className="block text-gray-600 hover:text-blue-600 py-1 transition-colors">Property Law</a>
              <a href="tax.html"       className="block text-gray-600 hover:text-blue-600 py-1 transition-colors">Court marriage</a>
            </div>
          </div>
          <a href="#Contact" className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">Contact</a>
          <a href="/signup" className="block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-center shadow-md mt-3">
            login/signup
          </a>
        </div>
      </nav>
    </>
  );
}