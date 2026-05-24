'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlobalSOS from '@/components/GlobalSOS';

export default function AdminBypass({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Agar URL /admin se shuru hota hai, toh yeh true ho jayega
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    // Admin panel par sirf main content (form) dikhao, baaki sab hide
    return <>{children}</>;
  }

  // Normal clients ke liye sab kuch dikhao
  return (
    <>
      <Navbar />
      {children}
      <GlobalSOS />
      <Footer />
    </>
  );
}