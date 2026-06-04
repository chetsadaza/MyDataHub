/* ============================================
   AboutSection Component (3D Avatar)
   ============================================ */

"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { PERSONAL_INFO, STATS } from "@/lib/constants";
import { portfolioStorage } from "@/lib/portfolioStorage";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MapPin, Mail } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import styles from "@/styles/about.module.css";

// Lazy load 3D
const SceneWrapper = dynamic(
  () => import("@/components/3d/SceneWrapper"),
  { ssr: false }
);
const AboutScene = dynamic(
  () => import("@/components/3d/AboutScene"),
  { ssr: false }
);

export default function AboutSection() {
  const [profile, setProfile] = useState(PERSONAL_INFO);
  const [ref, isVisible] = useScrollAnimation();

  useEffect(() => {
    setProfile(portfolioStorage.getProfile());
  }, []);

  return (
    <section className="section" id="about">
      <div className="container">
        <SectionTitle
          title="About Me"
          subtitle="Get to know me a little better"
        />

        <div
          ref={ref}
          className={`${styles.grid} ${isVisible ? styles.visible : ""}`}
        >
          {/* Avatar Side — 3D Scene */}
          <div className={styles.avatarWrapper}>
            <div className={styles.avatarContainer}>
              {/* 3D Scene */}
              <div className={styles.sceneContainer}>
                <SceneWrapper
                  className={styles.canvas}
                  camera={{ position: [0, 0, 5.8], fov: 40 }}
                >
                  <AboutScene />
                </SceneWrapper>
              </div>

              {/* Fallback emoji — แสดงเมื่อ 3D ไม่โหลด (mobile เล็ก) */}
              <div className={styles.avatarFallback}>
                <div className={styles.avatarBorder}>
                  <div className={styles.avatar}>
                    <span className={styles.avatarEmoji}>👨‍💻</span>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className={`${styles.floatingBadge} ${styles.badge1}`}>
                ⚛️ React
              </div>
              <div className={`${styles.floatingBadge} ${styles.badge2}`}>
                🟢 Node.js
              </div>
              <div className={`${styles.floatingBadge} ${styles.badge3}`}>
                ▲ Next.js
              </div>
            </div>
          </div>

          {/* Info Side */}
          <div className={styles.info}>
            <h3 className={styles.infoTitle}>
              Passionate developer crafting{" "}
              <span className="gradient-text">digital experiences</span>
            </h3>

            <p className={styles.bio}>{profile.shortBio}</p>

            <div className={styles.details}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>
                  <MapPin size={16} className={styles.detailIcon} /> Location
                </span>
                <span className={styles.detailValue}>
                  {profile.location}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>
                  <Mail size={16} className={styles.detailIcon} /> Email
                </span>
                <span className={styles.detailValue}>
                  {profile.email}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className={styles.stats}>
              {[
                { label: "Years Experience", value: profile.yearsExperience || "" },
                { label: "Projects Completed", value: profile.projectsCompleted || "" },
                { label: "Happy Clients", value: profile.happyClients || "" }
              ].map((stat) => (
                <div key={stat.label} className={styles.statItem}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
