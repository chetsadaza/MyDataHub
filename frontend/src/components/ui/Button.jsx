/* ============================================
   Button Component (Premium Upgraded)
   ใช้ Framer Motion สำหรับ Spring Hover & Tap Animations
   ============================================ */

"use client";

import { motion } from "framer-motion";
import styles from "@/styles/button.module.css";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  disabled = false,
  loading = false,
  icon,
  className = "",
  type = "button",
  ...props
}) {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    loading ? styles.loading : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const motionProps = {
    whileHover: { scale: 1.03, y: -2 },
    whileTap: { scale: 0.98, y: 0 },
    transition: { type: "spring", stiffness: 400, damping: 15 },
  };

  // ถ้ามี Link (href) ให้แปลงเป็น motion.a
  if (href) {
    return (
      <motion.a
        href={href}
        className={classNames}
        {...motionProps}
        {...props}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.label}>{children}</span>
        <span className={styles.shine}></span>
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled || loading}
      {...motionProps}
      {...props}
    >
      {loading && <span className={styles.spinner}></span>}
      {icon && !loading && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{children}</span>
      <span className={styles.shine}></span>
    </motion.button>
  );
}
