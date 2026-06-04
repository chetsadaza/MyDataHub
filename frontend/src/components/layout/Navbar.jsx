/* ============================================
   Navbar Component (Premium Upgraded)
   ใช้ Framer Motion สำหรับ Responsive Transitions
   และ Lucide React สำหรับชุดไอคอน
   ============================================ */

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Code } from "lucide-react";
import { NAV_LINKS, PERSONAL_INFO } from "@/lib/constants";
import styles from "@/styles/navbar.module.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = NAV_LINKS.map((link) =>
        link.href.replace("#", "")
      );

      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className={styles.container}>
          {/* Logo */}
          <a
            href="#hero"
            className={styles.logo}
            onClick={(e) => handleNavClick(e, "#hero")}
          >
            <span className={styles.logoIcon}>
              <Code size={20} className={styles.codeIcon} />
            </span>
            <span className={styles.logoText}>{PERSONAL_INFO.name}</span>
          </a>

          {/* Desktop Navigation */}
          <ul className={styles.navLinks}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`${styles.navLink} ${
                    activeSection === link.href.replace("#", "")
                      ? styles.active
                      : ""
                  }`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                  {activeSection === link.href.replace("#", "") && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={styles.activeIndicator}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <motion.a
            href="#contact"
            className={styles.ctaButton}
            onClick={(e) => handleNavClick(e, "#contact")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            Let&apos;s Talk <ArrowUpRight size={16} />
          </motion.a>

          {/* Mobile Hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay with Framer Motion */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
          >
            <ul className={styles.mobileLinks}>
              {NAV_LINKS.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a
                    href={link.href}
                    className={`${styles.mobileLink} ${
                      activeSection === link.href.replace("#", "")
                        ? styles.active
                        : ""
                    }`}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05 }}
                className={styles.mobileCtaWrapper}
              >
                <a
                  href="#contact"
                  className={styles.mobileCta}
                  onClick={(e) => handleNavClick(e, "#contact")}
                >
                  Let&apos;s Talk
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
