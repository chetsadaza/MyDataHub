/* ============================================
   404 Not Found Page
   ============================================ */

import Button from "@/components/ui/Button";

export default function NotFound() {
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
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "480px" }}>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "8rem",
            fontWeight: 800,
            background:
              "linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1,
            marginBottom: "1rem",
          }}
        >
          404
        </h1>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "var(--text-2xl)",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "0.75rem",
          }}
        >
          Page Not Found
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "var(--text-base)",
            lineHeight: 1.7,
            marginBottom: "2rem",
          }}
        >
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Button href="/" variant="primary" size="lg">
          Back to Home
        </Button>
      </div>
    </main>
  );
}
