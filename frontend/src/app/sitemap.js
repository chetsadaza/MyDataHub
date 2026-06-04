/* ============================================
   Sitemap.xml — SEO Configuration
   ============================================ */

// TODO: เปลี่ยนเป็น URL จริงก่อน deploy
const BASE_URL = "https://your-domain.com";

export default function sitemap() {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
