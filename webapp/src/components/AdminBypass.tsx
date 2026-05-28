'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlobalSOS from '@/components/GlobalSOS';

export default function AdminBypass({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // 🚀 Check karo agar URL /admin, /counseling, /advocate ya /client se shuru hota hai
  const shouldBypass = 
    pathname?.startsWith('/admin') || 
    pathname?.startsWith('/counseling') || 
    pathname?.startsWith('/advocate') ||
    pathname?.startsWith('/client'); 

  if (shouldBypass) {
    // Admin, Counseling, Advocate, aur Client portals par purely clean app screen render hogi (No Navbar, Footer, SOS)
    return <>{children}</>;
  }

  // Normal public website pages par sab kuch dikhao
  return (
    <>
      <Navbar />
      {children}
      <GlobalSOS />
      <Footer />
    </>
  );
}