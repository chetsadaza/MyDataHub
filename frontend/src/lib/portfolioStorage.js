/* ============================================
   Portfolio Storage — Client-Side Data State Provider
   ============================================ */

import { PERSONAL_INFO, SKILLS, PROJECTS } from "./constants";

const KEYS = {
  PROFILE: "mydatahub_profile",
  SKILLS: "mydatahub_skills",
  PROJECTS: "mydatahub_projects",
  INBOX: "mydatahub_inbox"
};

// Check if localStorage is available (Next.js SSR safety check)
const isClient = typeof window !== "undefined";

const safeGet = (key, fallback) => {
  if (!isClient) return fallback;
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return fallback;
  }
};

const safeSet = (key, val) => {
  if (!isClient) return;
  try {
    localStorage.setItem(key, JSON.stringify(val));
    // Trigger custom event to notify components about the data change
    window.dispatchEvent(new Event("portfolio-data-updated"));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
};

export const portfolioStorage = {
  // Profile (General Info & Stats)
  getProfile: () => {
    const data = safeGet(KEYS.PROFILE, null);
    if (!data) {
      safeSet(KEYS.PROFILE, PERSONAL_INFO);
      return PERSONAL_INFO;
    }
    return data;
  },
  saveProfile: (data) => {
    safeSet(KEYS.PROFILE, data);
  },

  // Skills
  getSkills: () => {
    const data = safeGet(KEYS.SKILLS, null);
    if (!data) {
      safeSet(KEYS.SKILLS, SKILLS);
      return SKILLS;
    }
    return data;
  },
  saveSkills: (data) => {
    safeSet(KEYS.SKILLS, data);
  },

  // Projects
  getProjects: () => {
    const data = safeGet(KEYS.PROJECTS, null);
    if (!data) {
      safeSet(KEYS.PROJECTS, PROJECTS);
      return PROJECTS;
    }
    return data;
  },
  saveProjects: (data) => {
    safeSet(KEYS.PROJECTS, data);
  },

  // Inbox (Contact Messages)
  getInbox: () => {
    return safeGet(KEYS.INBOX, []);
  },
  saveInbox: (data) => {
    safeSet(KEYS.INBOX, data);
  },
  addInboxMessage: ({ name, email, message }) => {
    if (!isClient) return;
    const inbox = safeGet(KEYS.INBOX, []);
    const newMsg = {
      id: Date.now(),
      name,
      email,
      message,
      createdAt: new Date().toISOString()
    };
    inbox.unshift(newMsg); // Add to the top
    safeSet(KEYS.INBOX, inbox);
    return newMsg;
  },
  deleteInboxMessage: (id) => {
    if (!isClient) return;
    const inbox = safeGet(KEYS.INBOX, []);
    const filtered = inbox.filter(msg => msg.id !== id);
    safeSet(KEYS.INBOX, filtered);
  }
};
