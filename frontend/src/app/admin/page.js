/* ============================================
   Admin Page — Dashboard for Portfolio Management
   ============================================ */

"use client";

import { useState, useEffect } from "react";
import { portfolioStorage } from "@/lib/portfolioStorage";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import styles from "@/styles/admin.module.css";
import { LogOut, User, Award, FolderPlus, Inbox, Save, Plus, Trash2, Edit3, KeyRound, Check } from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  // State values for data
  const [profile, setProfile] = useState({});
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [inbox, setInbox] = useState([]);

  // Toast notification
  const [toast, setToast] = useState({ show: false, message: "" });

  // Modal / Form state for edit/add skills
  const [skillForm, setSkillForm] = useState({ show: false, mode: "add", categoryIndex: 0, skillIndex: null, name: "", level: 80 });
  
  // Modal / Form state for edit/add projects
  const [projectForm, setProjectForm] = useState({ show: false, mode: "add", projectIndex: null, id: "", title: "", description: "", category: "Full-Stack", tags: "", liveUrl: "", githubUrl: "" });

  useEffect(() => {
    // Check auth on load
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("admin_authenticated");
      if (auth === "true") {
        setIsAuthenticated(true);
        loadData();
      }
    }
  }, []);

  const loadData = () => {
    setProfile(portfolioStorage.getProfile());
    setSkills(portfolioStorage.getSkills());
    setProjects(portfolioStorage.getProjects());
    setInbox(portfolioStorage.getInbox());
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      sessionStorage.setItem("admin_authenticated", "true");
      setIsAuthenticated(true);
      setLoginError("");
      loadData();
      showToast("Welcome back, Admin!");
    } else {
      setLoginError("Invalid passcode. Please try again.");
    }
  };

  // Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    setIsAuthenticated(false);
    setPassword("");
  };

  // Profile Save
  const handleProfileSave = (e) => {
    e.preventDefault();
    portfolioStorage.saveProfile(profile);
    showToast("Profile saved successfully!");
  };

  // Skill Handlers
  const handleOpenAddSkill = (catIndex) => {
    setSkillForm({ show: true, mode: "add", categoryIndex: catIndex, skillIndex: null, name: "", level: 80 });
  };

  const handleOpenEditSkill = (catIndex, skillIndex, skill) => {
    setSkillForm({ show: true, mode: "edit", categoryIndex: catIndex, skillIndex, name: skill.name, level: skill.level });
  };

  const handleSaveSkill = () => {
    if (!skillForm.name.trim()) return;
    const updatedSkills = JSON.parse(JSON.stringify(skills));
    const skillData = { name: skillForm.name, level: parseInt(skillForm.level) };

    if (skillForm.mode === "add") {
      updatedSkills[skillForm.categoryIndex].items.push(skillData);
    } else {
      updatedSkills[skillForm.categoryIndex].items[skillForm.skillIndex] = skillData;
    }

    setSkills(updatedSkills);
    portfolioStorage.saveSkills(updatedSkills);
    setSkillForm({ ...skillForm, show: false });
    showToast("Skill saved successfully!");
  };

  const handleDeleteSkill = (catIndex, skillIndex) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      const updatedSkills = JSON.parse(JSON.stringify(skills));
      updatedSkills[catIndex].items.splice(skillIndex, 1);
      setSkills(updatedSkills);
      portfolioStorage.saveSkills(updatedSkills);
      showToast("Skill deleted!");
    }
  };

  // Project Handlers
  const handleOpenAddProject = () => {
    setProjectForm({
      show: true,
      mode: "add",
      projectIndex: null,
      id: Date.now(),
      title: "",
      description: "",
      category: "Full-Stack",
      tags: "",
      liveUrl: "",
      githubUrl: ""
    });
  };

  const handleOpenEditProject = (index, proj) => {
    setProjectForm({
      show: true,
      mode: "edit",
      projectIndex: index,
      id: proj.id,
      title: proj.title,
      description: proj.description,
      category: proj.category,
      tags: proj.tags.join(", "),
      liveUrl: proj.liveUrl || "",
      githubUrl: proj.githubUrl || ""
    });
  };

  const handleSaveProject = () => {
    if (!projectForm.title.trim() || !projectForm.description.trim()) return;
    const updatedProjects = JSON.parse(JSON.stringify(projects));
    
    const tagsArray = projectForm.tags
      ? projectForm.tags.split(",").map(t => t.trim()).filter(Boolean)
      : [];

    const projectData = {
      id: projectForm.id,
      title: projectForm.title,
      description: projectForm.description,
      category: projectForm.category,
      tags: tagsArray,
      image: "/images/project-placeholder.svg", // Default placeholder
      liveUrl: projectForm.liveUrl || "#",
      githubUrl: projectForm.githubUrl || "#"
    };

    if (projectForm.mode === "add") {
      updatedProjects.unshift(projectData); // Add new at top
    } else {
      updatedProjects[projectForm.projectIndex] = projectData;
    }

    setProjects(updatedProjects);
    portfolioStorage.saveProjects(updatedProjects);
    setProjectForm({ ...projectForm, show: false });
    showToast("Project saved successfully!");
  };

  const handleDeleteProject = (index) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const updatedProjects = [...projects];
      updatedProjects.splice(index, 1);
      setProjects(updatedProjects);
      portfolioStorage.saveProjects(updatedProjects);
      showToast("Project deleted!");
    }
  };

  // Inbox Handlers
  const handleDeleteInbox = (id) => {
    if (confirm("Are you sure you want to delete this message?")) {
      portfolioStorage.deleteInboxMessage(id);
      setInbox(portfolioStorage.getInbox());
      showToast("Message deleted!");
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <main className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <div className={styles.lockIconContainer}>
              <KeyRound size={28} className={styles.lockIcon} />
            </div>
            <h1>MyDataHub Admin</h1>
            <p>Please enter your passcode to access the control panel</p>
          </div>
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <input
                type="password"
                placeholder="Passcode (Default: admin123)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.loginInput}
                autoFocus
              />
              {loginError && <p className={styles.errorText}>{loginError}</p>}
            </div>
            <button type="submit" className={styles.loginBtn}>
              Unlock Dashboard
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.adminContainer}>
      {/* Toast Notification */}
      {toast.show && (
        <div className={styles.toast}>
          <Check size={16} />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <header className={styles.adminHeader}>
        <div className={styles.headerTitle}>
          <h2>Control Panel</h2>
          <span>Manage your portfolio data in real-time</span>
        </div>
        <button onClick={handleLogout} className={styles.logoutBtn} title="Log Out">
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </header>

      <div className={styles.adminBody}>
        {/* Navigation Sidebar */}
        <aside className={styles.sidebar}>
          <button
            onClick={() => setActiveTab("profile")}
            className={`${styles.sidebarLink} ${activeTab === "profile" ? styles.active : ""}`}
          >
            <User size={18} />
            <span>Profile Info</span>
          </button>
          <button
            onClick={() => setActiveTab("skills")}
            className={`${styles.sidebarLink} ${activeTab === "skills" ? styles.active : ""}`}
          >
            <Award size={18} />
            <span>Skills & Tech</span>
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`${styles.sidebarLink} ${activeTab === "projects" ? styles.active : ""}`}
          >
            <FolderPlus size={18} />
            <span>Projects</span>
          </button>
          <button
            onClick={() => setActiveTab("inbox")}
            className={`${styles.sidebarLink} ${activeTab === "inbox" ? styles.active : ""}`}
          >
            <Inbox size={18} />
            <span>Inbox</span>
            {inbox.length > 0 && <span className={styles.inboxBadge}>{inbox.length}</span>}
          </button>
        </aside>

        {/* Tab Content Panel */}
        <section className={styles.contentPanel}>
          <Card variant="gradient" glow className={styles.panelCard}>
            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <form onSubmit={handleProfileSave} className={styles.tabForm}>
                <h3 className={styles.tabTitle}>Profile & About Settings</h3>
                <p className={styles.tabSubtitle}>Update your primary biography details and portfolio numbers.</p>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>First Name</label>
                    <input
                      type="text"
                      value={profile.name || ""}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={profile.fullName || ""}
                      onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Job Title</label>
                    <input
                      type="text"
                      value={profile.title || ""}
                      onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Subtitle</label>
                    <input
                      type="text"
                      value={profile.subtitle || ""}
                      onChange={(e) => setProfile({ ...profile, subtitle: e.target.value })}
                      required
                    />
                  </div>
                  <div className={styles.formGroupFull}>
                    <label>Hero Description</label>
                    <textarea
                      rows="3"
                      value={profile.description || ""}
                      onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                      required
                    ></textarea>
                  </div>
                  <div className={styles.formGroupFull}>
                    <label>About Short Biography</label>
                    <textarea
                      rows="3"
                      value={profile.shortBio || ""}
                      onChange={(e) => setProfile({ ...profile, shortBio: e.target.value })}
                      required
                    ></textarea>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Location</label>
                    <input
                      type="text"
                      value={profile.location || ""}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={profile.email || ""}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className={styles.formGroupFull}>
                    <h4 className={styles.subsectionTitle}>Portfolio Statistics</h4>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Years of Experience</label>
                    <input
                      type="text"
                      value={profile.yearsExperience || ""}
                      onChange={(e) => setProfile({ ...profile, yearsExperience: e.target.value })}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Projects Completed</label>
                    <input
                      type="text"
                      value={profile.projectsCompleted || ""}
                      onChange={(e) => setProfile({ ...profile, projectsCompleted: e.target.value })}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Happy Clients</label>
                    <input
                      type="text"
                      value={profile.happyClients || ""}
                      onChange={(e) => setProfile({ ...profile, happyClients: e.target.value })}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Resume URL (Google Drive / Direct PDF)</label>
                    <input
                      type="text"
                      value={profile.resumeUrl || ""}
                      onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className={styles.formActions}>
                  <Button type="submit" variant="primary">
                    Save Profile Changes
                  </Button>
                </div>
              </form>
            )}

            {/* SKILLS TAB */}
            {activeTab === "skills" && (
              <div className={styles.tabContent}>
                <h3 className={styles.tabTitle}>Skills & Technologies</h3>
                <p className={styles.tabSubtitle}>Manage your frontend, backend, database, and tool tags.</p>

                <div className={styles.categoriesGrid}>
                  {skills.map((category, catIndex) => (
                    <div key={category.category} className={styles.categoryCard}>
                      <div className={styles.categoryHeader}>
                        <h4>{category.category}</h4>
                        <button onClick={() => handleOpenAddSkill(catIndex)} className={styles.addBtnSmall}>
                          <Plus size={14} /> Add
                        </button>
                      </div>
                      <div className={styles.skillsAdminList}>
                        {category.items.map((skill, skillIndex) => (
                          <div key={skill.name} className={styles.skillAdminChip}>
                            <span className={styles.skillNameText}>{skill.name}</span>
                            <div className={styles.skillChipActions}>
                              <button
                                onClick={() => handleOpenEditSkill(catIndex, skillIndex, skill)}
                                className={styles.editBtnSmall}
                                title="Edit Skill"
                              >
                                <Edit3 size={12} />
                              </button>
                              <button
                                onClick={() => handleDeleteSkill(catIndex, skillIndex)}
                                className={styles.deleteBtnSmall}
                                title="Delete Skill"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        ))}
                        {category.items.length === 0 && (
                          <span className={styles.emptyText}>No skills added yet.</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PROJECTS TAB */}
            {activeTab === "projects" && (
              <div className={styles.tabContent}>
                <div className={styles.tabHeaderWithAction}>
                  <div>
                    <h3 className={styles.tabTitle}>Projects Portfolio</h3>
                    <p className={styles.tabSubtitle}>Manage the projects displayed in your grid.</p>
                  </div>
                  <Button onClick={handleOpenAddProject} variant="primary" icon={<Plus size={16} />}>
                    Add New Project
                  </Button>
                </div>

                <div className={styles.projectsAdminList}>
                  {projects.map((project, index) => (
                    <div key={project.id || index} className={styles.projectAdminItem}>
                      <div className={styles.projectAdminInfo}>
                        <h5>{project.title}</h5>
                        <span className={styles.projectCategoryBadge}>{project.category}</span>
                        <p>{project.description.substring(0, 100)}...</p>
                        <div className={styles.projectTagsList}>
                          {project.tags.map(t => (
                            <span key={t} className={styles.miniTag}>{t}</span>
                          ))}
                        </div>
                      </div>
                      <div className={styles.projectItemActions}>
                        <button
                          onClick={() => handleOpenEditProject(index, project)}
                          className={styles.editBtn}
                          title="Edit Project"
                        >
                          <Edit3 size={16} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProject(index)}
                          className={styles.deleteBtn}
                          title="Delete Project"
                        >
                          <Trash2 size={16} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                  {projects.length === 0 && (
                    <div className={styles.emptyState}>
                      <p>No projects configured. Click "Add New Project" to create one.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* INBOX TAB */}
            {activeTab === "inbox" && (
              <div className={styles.tabContent}>
                <h3 className={styles.tabTitle}>Contact Inbox</h3>
                <p className={styles.tabSubtitle}>View contact messages submitted by your site visitors.</p>

                <div className={styles.inboxList}>
                  {inbox.map((msg) => (
                    <div key={msg.id} className={styles.inboxItem}>
                      <div className={styles.inboxMeta}>
                        <div className={styles.inboxSender}>
                          <strong>{msg.name}</strong>
                          <a href={`mailto:${msg.email}`}>{msg.email}</a>
                        </div>
                        <span className={styles.inboxDate}>
                          {new Date(msg.createdAt).toLocaleString("th-TH")}
                        </span>
                      </div>
                      <div className={styles.inboxBody}>
                        <p>{msg.message}</p>
                      </div>
                      <div className={styles.inboxActions}>
                        <button
                          onClick={() => handleDeleteInbox(msg.id)}
                          className={styles.deleteBtn}
                        >
                          <Trash2 size={14} />
                          <span>Delete Message</span>
                        </button>
                      </div>
                    </div>
                  ))}
                  {inbox.length === 0 && (
                    <div className={styles.emptyState}>
                      <p>Your inbox is empty. Message submissions will appear here.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Card>
        </section>
      </div>

      {/* SKILL FORM MODAL */}
      {skillForm.show && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h4 className={styles.modalTitle}>
              {skillForm.mode === "add" ? "Add Skill" : "Edit Skill"} — {skills[skillForm.categoryIndex]?.category}
            </h4>
            <div className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Skill Name</label>
                <input
                  type="text"
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  placeholder="e.g. React"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Self-Evaluation Level (0-100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={skillForm.level}
                  onChange={(e) => setSkillForm({ ...skillForm, level: e.target.value })}
                  required
                />
                <span className={styles.formHint}>
                  90+ = Expert, 80+ = Advanced, 70+ = Intermediate, &lt;70 = Familiar
                </span>
              </div>
              <div className={styles.modalActions}>
                <Button onClick={() => setSkillForm({ ...skillForm, show: false })} variant="secondary">
                  Cancel
                </Button>
                <Button onClick={handleSaveSkill} variant="primary">
                  Save Skill
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PROJECT FORM MODAL */}
      {projectForm.show && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modal} ${styles.modalLarge}`}>
            <h4 className={styles.modalTitle}>
              {projectForm.mode === "add" ? "Add New Project" : "Edit Project"}
            </h4>
            <div className={styles.modalForm}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Project Title</label>
                  <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    placeholder="e.g. E-Commerce Platform"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Category</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    required
                  >
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                  </select>
                </div>
                <div className={styles.formGroupFull}>
                  <label>Tags (Comma separated)</label>
                  <input
                    type="text"
                    value={projectForm.tags}
                    onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                    placeholder="e.g. React, Node.js, MongoDB, Stripe"
                  />
                </div>
                <div className={styles.formGroupFull}>
                  <label>Description</label>
                  <textarea
                    rows="4"
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    placeholder="Describe the project..."
                    required
                  ></textarea>
                </div>
                <div className={styles.formGroup}>
                  <label>Live URL (Live Demo)</label>
                  <input
                    type="text"
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                    placeholder="e.g. https://my-project.com"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>GitHub Repository URL</label>
                  <input
                    type="text"
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    placeholder="e.g. https://github.com/username/project"
                  />
                </div>
              </div>
              <div className={styles.modalActions}>
                <Button onClick={() => setProjectForm({ ...projectForm, show: false })} variant="secondary">
                  Cancel
                </Button>
                <Button onClick={handleSaveProject} variant="primary">
                  Save Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
