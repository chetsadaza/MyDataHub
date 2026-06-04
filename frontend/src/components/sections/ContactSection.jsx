/* ============================================
   ContactSection Component
   ============================================ */

"use client";

import { useState } from "react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { sendContactMessage } from "@/lib/api";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import styles from "@/styles/contact.module.css";

// Simple SVG icons
const SocialIcon = ({ type }) => {
  const icons = {
    github: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    linkedin: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    email: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
      </svg>
    ),
  };

  return icons[type] || null;
};

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 1000;

export default function ContactSection() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.05 });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter a message";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    } else if (formData.message.length > MAX_MESSAGE_LENGTH) {
      newErrors.message = `Message must be under ${MAX_MESSAGE_LENGTH} characters`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await sendContactMessage(formData);
      setStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully. ✨",
      });
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } catch (error) {
      // Fallback message if backend is not running yet
      setStatus({
        type: "info",
        message: "Message simulation: Web app collected your data. Backend integration setup will complete in Phase 2! 🚀",
      });
      console.log("Mock message save:", formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`section ${styles.contactSection}`} id="contact">
      <div className="container">
        <SectionTitle
          title="Contact Me"
          subtitle="Let's work together or just say hello"
        />

        <div
          ref={ref}
          className={`${styles.grid} ${isVisible ? styles.visible : ""}`}
        >
          {/* Info card */}
          <Card variant="gradient" glow className={styles.infoCard}>
            <h3 className={styles.cardTitle}>Contact Info</h3>
            <p className={styles.cardDesc}>
              Feel free to reach out to me via email or through the contact form. I will get back to you as soon as possible.
            </p>

            <div className={styles.details}>
              <div className={styles.detailItem}>
                <span className={styles.icon}></span>
                <div>
                  <h4 className={styles.detailTitle}>Location</h4>
                  <p className={styles.detailText}>{PERSONAL_INFO.location}</p>
                </div>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.icon}></span>
                <div>
                  <h4 className={styles.detailTitle}>Email</h4>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className={styles.detailText}>
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.social}>
              {SOCIAL_LINKS.filter(
                (link) =>
                  link.url &&
                  link.url !== "#" &&
                  link.url !== "https://github.com/" &&
                  link.url !== "https://github.com" &&
                  link.url !== "https://linkedin.com/in/" &&
                  link.url !== "https://linkedin.com/in"
              ).map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                >
                  <SocialIcon type={link.icon} />
                </a>
              ))}
            </div>
          </Card>

          {/* Form card */}
          <Card variant="default" className={styles.formCard}>
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <span id="name-error" className={styles.fieldError} role="alert">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <span id="email-error" className={styles.fieldError} role="alert">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  Message
                  <span className={styles.charCount}>
                    {formData.message.length}/{MAX_MESSAGE_LENGTH}
                  </span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Your message details here..."
                  className={`${styles.textarea} ${errors.message ? styles.inputError : ""}`}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  aria-invalid={!!errors.message}
                ></textarea>
                {errors.message && (
                  <span id="message-error" className={styles.fieldError} role="alert">
                    {errors.message}
                  </span>
                )}
              </div>

              {status.message && (
                <div className={`${styles.status} ${styles[status.type]}`} role="status">
                  {status.message}
                </div>
              )}

              <Button type="submit" loading={loading} variant="primary" size="lg" className={styles.submitBtn}>
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
