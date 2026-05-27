'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlobalSOS from '@/components/GlobalSOS';

export default function AdminBypass({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // 🚀 Check karo agar URL /admin, /counseling ya /advocate se shuru hota hai
  const shouldBypass = 
    pathname?.startsWith('/admin') || 
    pathname?.startsWith('/counseling') || 
    pathname?.startsWith('/advocate'); // <-- 🔥 Advocate panel ko yahan add kar diya

  if (shouldBypass) {
    // Admin, Counseling, aur Advocate par purely main app screen render hogi (No Navbar, Footer, SOS)
    return <>{children}</>;
  }

  // Normal clients ke liye public website pages par sab kuch dikhao
  return (
    <>
      <Navbar />
      {children}
      <GlobalSOS />
      <Footer />
    </>
  );
}