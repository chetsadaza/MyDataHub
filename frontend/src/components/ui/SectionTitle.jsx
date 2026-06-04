/* ============================================
   SectionTitle Component
   Consistent heading for each section
   ============================================ */

"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import styles from "@/styles/sectionTitle.module.css";

export default function SectionTitle({
  title,
  subtitle,
  align = "center",
  className = "",
}) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`${styles.wrapper} ${styles[align]} ${
        isVisible ? styles.visible : ""
      } ${className}`}
    >
      <h2 className={styles.title}>
        {title}
        <span className={styles.dot}>.</span>
      </h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <div className={styles.underline}>
        <div className={styles.underlineInner}></div>
      </div>
    </div>
  );
}
