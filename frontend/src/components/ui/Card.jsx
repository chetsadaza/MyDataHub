/* ============================================
   Card Component (Premium Upgraded)
   ใช้ Framer Motion สำหรับ Micro-interactions & อนิเมชัน
   ============================================ */

"use client";

import { motion } from "framer-motion";
import styles from "@/styles/card.module.css";

export default function Card({
  children,
  variant = "default",
  hover = true,
  glow = false,
  className = "",
  onClick,
  style,
  delay = 0,
  ...props
}) {
  const classNames = [
    styles.card,
    styles[variant],
    hover ? styles.hoverable : "",
    glow ? styles.glow : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // แอนิเมชันเปิดตัวการ์ดทีละชิ้น (Fade-in-up)
  const introVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: delay,
      },
    },
  };

  const hoverProps = hover
    ? {
        whileHover: { y: -6 },
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }
    : {};

  return (
    <motion.div
      className={classNames}
      onClick={onClick}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={introVariants}
      {...hoverProps}
      {...props}
    >
      {children}
      <div className={styles.borderGlow}></div>
    </motion.div>
  );
}
