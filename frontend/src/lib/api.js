/* ============================================
   API Client — เรียก Backend API
   ============================================ */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, mergedOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error.message);
    throw error;
  }
}

/**
 * ส่งข้อความจาก Contact Form
 */
export async function sendContactMessage({ name, email, message }) {
  return fetchAPI("/contact", {
    method: "POST",
    body: JSON.stringify({ name, email, message }),
  });
}

/**
 * ดึงข้อมูล Projects จาก Backend
 */
export async function getProjects() {
  return fetchAPI("/projects");
}

/**
 * ดึง Project ตาม ID
 */
export async function getProjectById(id) {
  return fetchAPI(`/projects/${id}`);
}
