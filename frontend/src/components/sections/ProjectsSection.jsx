/* ============================================
   ProjectsSection Component
   ============================================ */

"use client";

import { useState, useEffect } from "react";
import { PROJECTS } from "@/lib/constants";
import { portfolioStorage } from "@/lib/portfolioStorage";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import styles from "@/styles/projects.module.css";

const CATEGORIES = ["All", "Full-Stack", "Frontend", "Backend"];

export default function ProjectsSection() {
  const [projects, setProjects] = useState(PROJECTS);
  const [activeFilter, setActiveFilter] = useState("All");
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.05 });

  useEffect(() => {
    setProjects(portfolioStorage.getProjects());
  }, []);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionTitle
          title="Projects"
          subtitle="Some of my recent work"
        />

        {/* Filter Buttons */}
        <div className={styles.filters}>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className={`${styles.filterBtn} ${
                activeFilter === category ? styles.filterActive : ""
              }`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          ref={ref}
          className={`${styles.grid} ${isVisible ? styles.visible : ""}`}
        >
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              variant="default"
              glow
              className={styles.projectCard}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Project Image */}
              <div className={styles.imageWrapper}>
                <div className={styles.imagePlaceholder}>
                  <span className={styles.imageIcon}>🖥️</span>
                  <span className={styles.imageLabel}>{project.title}</span>
                </div>
                <div className={styles.imageOverlay}>
                  <div className={styles.overlayLinks}>
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <a
                        href={project.liveUrl}
                        className={styles.overlayLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live Demo"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>
                    )}
                    {project.githubUrl && project.githubUrl !== "#" && (
                      <a
                        href={project.githubUrl}
                        className={styles.overlayLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className={styles.projectInfo}>
                <div className={styles.projectCategory}>
                  {project.category}
                </div>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDesc}>{project.description}</p>
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
