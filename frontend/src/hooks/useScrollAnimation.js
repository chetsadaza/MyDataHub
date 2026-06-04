/* ============================================
   useScrollAnimation Hook
   ใช้ Intersection Observer เพื่อ trigger animation
   เมื่อ element เข้ามาใน viewport
   ============================================ */

"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hook สำหรับ scroll-triggered animations
 * @param {Object} options
 * @param {number} options.threshold - 0-1, จุดที่ trigger (default: 0.1)
 * @param {string} options.rootMargin - margin รอบ root (default: "0px")
 * @param {boolean} options.triggerOnce - trigger ครั้งเดียว (default: true)
 * @returns {[React.RefObject, boolean]} [ref, isVisible]
 */
export function useScrollAnimation({
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px",
  triggerOnce = true,
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible];
}
