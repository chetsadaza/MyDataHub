/* ============================================
   Error Page — Graceful Error Handling
   ============================================ */

"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main
      id="main-content"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        background: "var(--bg-primary)",
      }}
    >
      <div style={{ maxWidth: "480px" }}>
        <div
          style={{
            fontSize: "5rem",
            marginBottom: "1rem",
            lineHeight: 1,
          }}
        >
          ⚠️
        </div>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "var(--text-4xl)",
            fontWeight: 800,
            color: "var(--text-primary)",
            marginBottom: "1rem",
          }}
        >
          Something went wrong
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "var(--text-lg)",
            lineHeight: 1.7,
            marginBottom: "2rem",
          }}
        >
          An unexpected error occurred. Please try again or refresh the page.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Button variant="primary" size="lg" onClick={() => reset()}>
            Try Again
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => (window.location.href = "/")}
          >
            Go Home
          </Button>
        </div>
      </div>
    </main>
  );
}
