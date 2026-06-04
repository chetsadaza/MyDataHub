/* ============================================
   SkillsSection Component
   ============================================ */

"use client";

import { useState, useEffect } from "react";
import { SKILLS } from "@/lib/constants";
import { portfolioStorage } from "@/lib/portfolioStorage";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import SkillBadge from "@/components/ui/SkillBadge";
import styles from "@/styles/skills.module.css";

export default function SkillsSection() {
  const [skills, setSkills] = useState(SKILLS);
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.05 });

  useEffect(() => {
    setSkills(portfolioStorage.getSkills());
  }, []);

  return (
    <section className={`section ${styles.skillsSection}`} id="skills">
      <div className="container">
        <SectionTitle
          title="Skills"
          subtitle="Technologies and tools I work with"
        />

        <div
          ref={ref}
          className={`${styles.grid} ${isVisible ? styles.visible : ""}`}
        >
          {skills.map((category, catIndex) => (
            <Card
              key={category.category}
              variant="gradient"
              glow
              className={styles.skillCard}
              style={{ animationDelay: `${catIndex * 0.2}s` }}
            >
              <div className={styles.cardHeader}>
                <span className={styles.categoryIcon}>{category.icon}</span>
                <h3 className={styles.categoryTitle}>{category.category}</h3>
              </div>
              <div className={styles.skillsList}>
                {category.items.map((skill, index) => (
                  <SkillBadge
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    index={index}
                  />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
