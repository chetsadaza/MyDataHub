/* ============================================
   CONSTANTS — ข้อมูลส่วนตัว & ข้อมูลโปรเจกต์
   แก้ไขที่ไฟล์นี้ไฟล์เดียว ข้อมูลจะอัปเดตทั้งเว็บ
   ============================================ */

export const PERSONAL_INFO = {
  name: "Jed",
  fullName: "Jed Developer",
  title: "Full-Stack Developer",
  subtitle: "Building Modern Web Experiences",
  description:
    "Passionate Full-Stack Developer with expertise in React, Next.js, and Node.js. I love crafting beautiful, performant, and user-friendly web applications that solve real-world problems.",
  shortBio:
    "I'm a developer who loves turning ideas into reality through clean code and creative design. With experience in both frontend and backend development, I build complete digital solutions from concept to deployment.",
  avatar: "/images/avatar-placeholder.svg",
  resumeUrl: "", // TODO: ใส่ลิงก์ Resume/CV จริง
  location: "Thailand",
  email: "jed@example.com", // TODO: ใส่อีเมลจริง
  yearsExperience: "2+",
  projectsCompleted: "10+",
  happyClients: "5+",
};

// TODO: ใส่ URL จริงของ Social Media ก่อน deploy
export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/", // TODO: ใส่ GitHub username
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/", // TODO: ใส่ LinkedIn profile
    icon: "linkedin",
  },
  {
    name: "Email",
    url: "mailto:jed@example.com", // TODO: ใส่อีเมลจริง
    icon: "email",
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const SKILLS = [
  {
    category: "Frontend",
    icon: "",
    items: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 80 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
      { name: "Tailwind CSS", level: 85 },
    ],
  },
  {
    category: "Backend",
    icon: "",
    items: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 80 },
      { name: "PHP", level: 75 },
      { name: "RESTful APIs", level: 85 },
    ],
  },
  {
    category: "Database",
    icon: "",
    items: [
      { name: "MySQL", level: 80 },
      { name: "MongoDB", level: 75 },
      { name: "Firebase", level: 75 },
    ],
  },
  {
    category: "Tools",
    icon: "",
    items: [
      { name: "Git", level: 85 },
      { name: "GitHub", level: 85 },
      { name: "VS Code", level: 90 },
      { name: "Figma", level: 70 },
    ],
  },
];

export const PROJECTS = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce web application with product catalog, shopping cart, user authentication, and payment integration.",
    image: "/images/project-placeholder.svg",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "Full-Stack",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team workspace features.",
    image: "/images/project-placeholder.svg",
    tags: ["Next.js", "Socket.io", "PostgreSQL"],
    category: "Full-Stack",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio website built with Next.js featuring smooth animations, dark theme, and glassmorphism design.",
    image: "/images/project-placeholder.svg",
    tags: ["Next.js", "CSS", "Framer Motion"],
    category: "Frontend",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description:
      "An interactive weather dashboard that displays current conditions, forecasts, and historical data with beautiful data visualizations.",
    image: "/images/project-placeholder.svg",
    tags: ["React", "Chart.js", "OpenWeather API"],
    category: "Frontend",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 5,
    title: "REST API Service",
    description:
      "A scalable RESTful API service with authentication, rate limiting, caching, and comprehensive API documentation.",
    image: "/images/project-placeholder.svg",
    tags: ["Node.js", "Express", "Redis", "Swagger"],
    category: "Backend",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 6,
    title: "Chat Application",
    description:
      "A real-time chat application with private messaging, group chats, file sharing, and message encryption.",
    image: "/images/project-placeholder.svg",
    tags: ["React", "Socket.io", "Node.js", "MongoDB"],
    category: "Full-Stack",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
];

export const STATS = [
  { label: "Years Experience", value: PERSONAL_INFO.yearsExperience },
  { label: "Projects Completed", value: PERSONAL_INFO.projectsCompleted },
  { label: "Happy Clients", value: PERSONAL_INFO.happyClients },
];
