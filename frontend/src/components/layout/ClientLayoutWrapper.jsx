/* ============================================
   ClientLayoutWrapper — Conditional Layout Wrapper
   ซ่อน Navbar, Footer และ CursorGlow บนหน้าแอดมิน (/admin)
   ============================================ */

"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CursorGlow from "@/components/ui/CursorGlow";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  
  // ตรวจสอบว่าเป็นหน้าแอดมินหรือไม่
  const isAdmin = pathname ? pathname.startsWith("/admin") : false;

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <CursorGlow />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
