/* ============================================
   404 Not Found Page — Premium Space Theme
   Animated astronaut, orbital rings, twinkling
   stars, quick-nav links — dark glassmorphic.
   ============================================ */

import styles from "@/styles/notFound.module.css";

export default function NotFound() {
  return (
    <main id="not-found-page" className={styles.container}>
      {/* ===== Twinkling Stars ===== */}
      <div className={styles.stars}>
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className={styles.star} />
        ))}
      </div>

      {/* ===== Background Glow Orbs ===== */}
      <div className={styles.glowOrb1} />
      <div className={styles.glowOrb2} />
      <div className={styles.glowOrb3} />

      {/* ===== Main Content ===== */}
      <div className={styles.content}>
        {/* Illustration: Astronaut + Orbital Rings + Planets */}
        <div className={styles.illustrationArea}>
          <div className={styles.orbitalRing} />
          <div className={styles.orbitalRing2} />
          <div className={styles.planet1} />
          <div className={styles.planet2} />
          <div className={styles.planet3} />

          {/* Inline Astronaut SVG */}
          <svg
            className={styles.astronaut}
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Body / Suit */}
            <ellipse cx="100" cy="120" rx="38" ry="48" fill="#1a1a2e" stroke="#3b3b5c" strokeWidth="1.5" />
            {/* Suit highlight */}
            <ellipse cx="92" cy="115" rx="22" ry="32" fill="rgba(99, 102, 241, 0.05)" />

            {/* Helmet */}
            <circle cx="100" cy="70" r="34" fill="#12121a" stroke="#4b4b6c" strokeWidth="1.5" />
            {/* Visor */}
            <ellipse cx="100" cy="68" rx="26" ry="24" fill="url(#visorGradient)" />
            {/* Visor reflection */}
            <ellipse cx="90" cy="60" rx="10" ry="8" fill="rgba(255,255,255,0.07)" transform="rotate(-15 90 60)" />

            {/* Backpack */}
            <rect x="63" y="100" width="12" height="30" rx="5" fill="#12121a" stroke="#3b3b5c" strokeWidth="1" />

            {/* Left Arm (waving) */}
            <path d="M62 110 Q45 85 55 65" stroke="#1a1a2e" strokeWidth="12" strokeLinecap="round" fill="none" />
            <path d="M62 110 Q45 85 55 65" stroke="#3b3b5c" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            {/* Left Glove */}
            <circle cx="55" cy="63" r="7" fill="#1a1a2e" stroke="#3b3b5c" strokeWidth="1" />

            {/* Right Arm */}
            <path d="M138 110 Q155 120 150 145" stroke="#1a1a2e" strokeWidth="12" strokeLinecap="round" fill="none" />
            <path d="M138 110 Q155 120 150 145" stroke="#3b3b5c" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            {/* Right Glove */}
            <circle cx="150" cy="147" r="7" fill="#1a1a2e" stroke="#3b3b5c" strokeWidth="1" />

            {/* Left Leg */}
            <path d="M82 160 Q75 185 68 195" stroke="#1a1a2e" strokeWidth="12" strokeLinecap="round" fill="none" />
            <path d="M82 160 Q75 185 68 195" stroke="#3b3b5c" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            {/* Left Boot */}
            <ellipse cx="66" cy="196" rx="10" ry="5" fill="#12121a" stroke="#3b3b5c" strokeWidth="1" />

            {/* Right Leg */}
            <path d="M118 160 Q125 180 132 190" stroke="#1a1a2e" strokeWidth="12" strokeLinecap="round" fill="none" />
            <path d="M118 160 Q125 180 132 190" stroke="#3b3b5c" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            {/* Right Boot */}
            <ellipse cx="134" cy="191" rx="10" ry="5" fill="#12121a" stroke="#3b3b5c" strokeWidth="1" />

            {/* Belt */}
            <rect x="68" y="140" width="64" height="6" rx="3" fill="#6366f1" opacity="0.6" />
            {/* Belt buckle */}
            <rect x="94" y="139" width="12" height="8" rx="2" fill="#8b5cf6" opacity="0.8" />

            {/* Antenna */}
            <line x1="100" y1="36" x2="100" y2="22" stroke="#4b4b6c" strokeWidth="1.5" />
            <circle cx="100" cy="20" r="4" fill="#6366f1">
              <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="100" cy="20" r="7" fill="none" stroke="#6366f1" strokeWidth="0.5" opacity="0.3">
              <animate attributeName="r" values="7;12;7" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Visor Gradient Definition */}
            <defs>
              <linearGradient id="visorGradient" x1="74" y1="44" x2="126" y2="92">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Error Code */}
        <h1 className={styles.errorCode}>404</h1>

        {/* Heading */}
        <h2 className={styles.heading}>Lost in Space</h2>

        {/* Description */}
        <p className={styles.description}>
          ดูเหมือนว่าคุณหลงเข้ามาในพื้นที่ที่ไม่มีอยู่จริง
          <br />
          หน้าเว็บนี้อาจถูกย้าย ลบ หรือไม่เคยมีอยู่มาก่อน
        </p>
      </div>
    </main>
  );
}
