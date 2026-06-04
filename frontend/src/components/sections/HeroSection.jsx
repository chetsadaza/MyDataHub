/* ============================================
   HeroSection Component (Premium + 3D)
   Split Layout: Text ซ้าย, 3D ขวา
   ============================================ */

"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Send, ChevronDown } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";
import Button from "@/components/ui/Button";
import styles from "@/styles/hero.module.css";

// Lazy load 3D components — ไม่ block initial render
const SceneWrapper = dynamic(
  () => import("@/components/3d/SceneWrapper"),
  { ssr: false }
);
const HeroScene = dynamic(
  () => import("@/components/3d/HeroScene"),
  { ssr: false }
);

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const titles = [
    PERSONAL_INFO.title,
    "Web Developer",
    "UI/UX Specialist",
    "Creative Thinker",
  ];

  // Typing animation
  useEffect(() => {
    const currentTitle = titles[titleIndex];
    let timeout;

    if (!isDeleting && charIndex < currentTitle.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentTitle.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 70);
    } else if (!isDeleting && charIndex === currentTitle.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentTitle.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 35);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, titleIndex]);

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section className={styles.hero} id="hero">
      {/* Animated Background */}
      <div className={styles.bgGradient}></div>
      <div className={styles.bgGrid}></div>

      {/* Floating Orbs */}
      <motion.div
        className={`${styles.orb} ${styles.orb1}`}
        animate={{
          y: [0, -30, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>
      <motion.div
        className={`${styles.orb} ${styles.orb2}`}
        animate={{
          y: [0, 25, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      ></motion.div>

      {/* Split Layout Container */}
      <div className={styles.splitContainer}>
        {/* Left — Text Content */}
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Available for work badge */}
          <motion.div className={styles.badge} variants={itemVariants}>
            <span className={styles.badgeDot}></span>
            Available for new opportunities
          </motion.div>

          {/* Title */}
          <motion.h1 className={styles.title} variants={itemVariants}>
            Hi, I&apos;m <span className={styles.name}>{PERSONAL_INFO.name}</span>
          </motion.h1>

          {/* Typing Animation */}
          <motion.div className={styles.typewriter} variants={itemVariants}>
            <span className={styles.typedText}>{displayText}</span>
            <span className={styles.cursor}>|</span>
          </motion.div>

          {/* Description */}
          <motion.p className={styles.description} variants={itemVariants}>
            {PERSONAL_INFO.description}
          </motion.p>

          {/* Actions buttons */}
          <motion.div className={styles.actions} variants={itemVariants}>
            <Button href="#projects" variant="primary" size="lg" icon={<ArrowRight size={18} />}>
              View Projects
            </Button>
            <Button href="#contact" variant="secondary" size="lg" icon={<Send size={16} />}>
              Get in Touch
            </Button>
          </motion.div>
        </motion.div>

        {/* Right — 3D Scene */}
        <motion.div
          className={styles.sceneContainer}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        >
          <SceneWrapper
            className={styles.canvas}
            camera={{ position: [0, 0, 6.8], fov: 45 }}
          >
            <HeroScene />
          </SceneWrapper>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 0.5 },
          y: { duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
        }}
      >
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
        <span>Scroll to explore</span>
        <ChevronDown size={14} className={styles.chevron} />
      </motion.div>
    </section>
  );
}
