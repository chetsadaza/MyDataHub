/* ============================================
   CursorGlow Component
   สร้าง Background Glow อัจฉริยะวิ่งตามเคอร์เซอร์เมาส์
   ============================================ */

"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/cursorGlow.module.css";

export default function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // ตรวจสอบว่าเป็น Mobile หรือเปล่า (ไม่แสดงผลบนจอทัชสกรีน)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) {
      window.addEventListener("mousemove", updateMousePosition);
      document.body.addEventListener("mouseenter", handleMouseEnter);
      document.body.addEventListener("mouseleave", handleMouseLeave);
      setIsVisible(true);
    }

    return () => {
      if (!isTouchDevice) {
        window.removeEventListener("mousemove", updateMousePosition);
        document.body.removeEventListener("mouseenter", handleMouseEnter);
        document.body.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={styles.glow}
      style={{
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
      }}
    />
  );
}
