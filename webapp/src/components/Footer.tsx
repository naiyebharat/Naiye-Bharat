import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-oxford-900 text-slate-300 py-16 mt-auto border-t-[6px] border-gold-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="gsap-fade">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 relative">
                <Image src="/img/logo.png" alt="NaiyeBharat Logo" width={64} height={64} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">Naiye<span className="text-gold-500">Bharat</span></h3>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm">
              Your Trusted Legal Partner for over two decades. We provide comprehensive legal solutions with absolute integrity, unmatched expertise, and relentless dedication to justice.
            </p>
          </div>

          {/* Quick Links */}
          <div className="gsap-fade">
            <h4 className="text-lg font-serif font-semibold mb-6 text-white tracking-wide uppercase">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-slate-400 hover:text-gold-400 transition-colors inline-block relative group">Home<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold-400 transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link href="/about" className="text-slate-400 hover:text-gold-400 transition-colors inline-block relative group">Our Legacy<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold-400 transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link href="/counselling" className="text-slate-400 hover:text-gold-400 transition-colors inline-block relative group">Counselling<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold-400 transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link href="/pricing" className="text-slate-400 hover:text-gold-400 transition-colors inline-block relative group">Billing & Pricing<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold-400 transition-all duration-300 group-hover:w-full"></span></Link></li>
            </ul>
          </div>

          {/* Practice Areas Summary */}
          <div className="gsap-fade">
            <h4 className="text-lg font-serif font-semibold mb-6 text-white tracking-wide uppercase">Practice Areas</h4>
            <ul className="space-y-3">
              <li><Link href="/services/civil" className="text-slate-400 hover:text-gold-400 transition-colors text-sm">Civil Litigation</Link></li>
              <li><Link href="/services/criminal" className="text-slate-400 hover:text-gold-400 transition-colors text-sm">Criminal Defense</Link></li>
              <li><Link href="/services/corporate" className="text-slate-400 hover:text-gold-400 transition-colors text-sm">Corporate & Commercial</Link></li>
              <li><Link href="/services/family" className="text-slate-400 hover:text-gold-400 transition-colors text-sm">Family & Matrimonial</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="gsap-fade">
            <h4 className="text-lg font-serif font-semibold mb-6 text-white tracking-wide uppercase">Contact Us</h4>
            <div className="space-y-4 text-sm text-slate-400">
              <div className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-gold-500 w-4 text-center"></i>
                <p>Chamber Number 701,<br/>Saket District Court, New Delhi,<br/>India 110017</p>
              </div>
              <div className="flex items-center">
                <i className="fas fa-phone mr-3 text-gold-500 w-4 text-center"></i>
                <p>+91 85120 05097</p>
              </div>
              <div className="flex items-center">
                <i className="fas fa-envelope mr-3 text-gold-500 w-4 text-center"></i>
                <p>naiyebharat@gmail.com</p>
              </div>
            </div>
            
            <div className="flex gap-4 mt-8">
              <a href="https://www.instagram.com/naiyebharat" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-oxford-800 border border-slate-700 text-gold-400 hover:border-gold-500 hover:bg-gold-500 hover:text-oxford-900 transition-all shadow-md">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-oxford-800 border border-slate-700 text-gold-400 hover:border-gold-500 hover:bg-gold-500 hover:text-oxford-900 transition-all shadow-md">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://wa.me/918512005097" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-oxford-800 border border-slate-700 text-gold-400 hover:border-gold-500 hover:bg-gold-500 hover:text-oxford-900 transition-all shadow-md">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gsap-fade">
          <p className="text-slate-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} NaiyeBharat. All Rights Reserved.
          </p>
          <div className="text-slate-500 text-sm flex space-x-6">
            <Link href="/privacy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
