/* ============================================
   SkillBadge Component (Premium Chip Design)
   ============================================ */

"use client";

import styles from "@/styles/skillBadge.module.css";

// Helper to convert hex to RGB values for transparent glow
function hexToRgb(hex) {
  hex = hex.replace(/^#/, "");
  const bigInt = parseInt(hex, 16);
  const r = (bigInt >> 16) & 255;
  const g = (bigInt >> 8) & 255;
  const b = bigInt & 255;
  return `${r}, ${g}, ${b}`;
}

export default function SkillBadge({ name, level, index = 0 }) {
  // Translate percentage to text label
  const getLevelLabel = (pct) => {
    if (pct >= 90) return "Expert";
    if (pct >= 80) return "Advanced";
    if (pct >= 70) return "Intermediate";
    return "Familiar";
  };

  // Get brand color for neon glow effects
  const getBrandColor = (techName) => {
    const colors = {
      "react": "#61dafb",
      "next.js": "#ffffff",
      "javascript": "#f7df1e",
      "html5": "#e34f26",
      "css3": "#1572b6",
      "tailwind css": "#06b6d4",
      "typescript": "#3178c6",
      "node.js": "#5fa04e",
      "express.js": "#a8a8a8",
      "php": "#777bb4",
      "restful apis": "#00e5ff",
      "mysql": "#00758f",
      "mongodb": "#47a248",
      "firebase": "#ffca28",
      "git": "#f05032",
      "github": "#ffffff",
      "figma": "#f24e1e",
      "vs code": "#007acc"
    };
    return colors[techName.toLowerCase()] || "#a855f7"; // Default purple
  };

  const brandColor = getBrandColor(name);
  const levelLabel = getLevelLabel(level);
  const rgbValues = brandColor === "#ffffff" ? "255, 255, 255" : hexToRgb(brandColor);

  return (
    <div
      className={styles.chip}
      style={{
        "--brand-color": brandColor,
        "--brand-color-rgb": rgbValues,
        animationDelay: `${index * 0.05}s`
      }}
    >
      <span className={styles.dot}></span>
      <div className={styles.content}>
        <span className={styles.name}>{name}</span>
        <span className={styles.levelTag}>{levelLabel}</span>
      </div>
    </div>
  );
}
