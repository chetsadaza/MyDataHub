import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CursorGlow from "@/components/ui/CursorGlow";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "Jed | Portfolio",
  description:
    "Personal portfolio website showing my software development projects and skills.",
  keywords: [
    "developer",
    "software engineer",
    "portfolio",
    "nextjs",
    "react",
    "expressjs",
  ],
  openGraph: {
    title: "Jed | Portfolio",
    description:
      "Personal portfolio website showing my software development projects and skills.",
    type: "website",
    locale: "th_TH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jed | Portfolio",
    description:
      "Personal portfolio website showing my software development projects and skills.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {/* Skip to content — Accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <CursorGlow />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
