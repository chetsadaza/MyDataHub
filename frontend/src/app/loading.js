/* ============================================
   Loading Page — Skeleton Loader
   ============================================ */

export default function Loading() {
  return (
    <main
      id="main-content"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-primary)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        {/* Animated spinner */}
        <div
          style={{
            width: "48px",
            height: "48px",
            border: "3px solid rgba(255, 255, 255, 0.06)",
            borderTopColor: "#6366f1",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <p
          style={{
            color: "var(--text-tertiary)",
            fontSize: "var(--text-sm)",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Loading...
        </p>

        {/* Inline keyframes */}
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </main>
  );
}
