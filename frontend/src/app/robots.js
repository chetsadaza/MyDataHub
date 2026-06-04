/* ============================================
   Robots.txt — SEO Configuration
   ============================================ */

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    // TODO: เปลี่ยนเป็น URL จริงก่อน deploy
    // sitemap: "https://your-domain.com/sitemap.xml",
  };
}
