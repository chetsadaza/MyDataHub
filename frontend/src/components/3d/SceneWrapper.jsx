/* ============================================
   SceneWrapper — Shared 3D Canvas Wrapper
   จัดการ Canvas, Camera, Lighting, Suspense
   พร้อม lazy loading และ mobile detection
   ============================================ */

"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";

export default function SceneWrapper({
  children,
  camera = { position: [0, 0, 5], fov: 45 },
  className = "",
  style = {},
}) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // ไม่แสดง 3D บนอุปกรณ์ที่ต้องการลด motion หรือจอเล็กมาก
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isSmallScreen = window.innerWidth < 640;

    if (!prefersReducedMotion && !isSmallScreen) {
      setShouldRender(true);
    }

    const handleResize = () => {
      setShouldRender(window.innerWidth >= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!shouldRender) return null;

  return (
    <div className={className} style={{ ...style }}>
      <Canvas
        camera={camera}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Ambient light — soft overall illumination */}
          <ambientLight intensity={0.3} />

          {/* Main directional light */}
          <directionalLight position={[5, 5, 5]} intensity={0.5} />

          {/* Colored point lights matching the accent gradient */}
          <pointLight position={[-3, 2, 4]} intensity={0.8} color="#6366f1" />
          <pointLight position={[3, -2, 3]} intensity={0.5} color="#a855f7" />

          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
