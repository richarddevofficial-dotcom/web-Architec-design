"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  FiHome,
  FiMessageSquare,
  FiImage,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiLogOut,
  FiMenu,
  FiX,
  FiStar,
  FiSearch,
  FiUsers,
  FiBarChart2,
  FiGrid,
  FiList,
  FiChevronRight,
  FiCheck,
  FiClock,
} from "react-icons/fi";
import Logo from "@/components/Logo";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [adminName, setAdminName] = useState("Admin");

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    completion_date: "",
    client: "",
    featured: false,
    description: "",
    full_description: "",
    images: [],
  });

  // Fetch data from API
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const adminData = JSON.parse(localStorage.getItem("adminData") || "{}");

    if (!token) {
      router.push("/admin/login");
      return;
    }

    if (adminData.username) {
      setAdminName(adminData.username);
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const headers = { Authorization: `Bearer ${token}` };

      const [projectsRes, messagesRes] = await Promise.all([
        fetch(`${API_URL}/projects`, { headers }).then((r) => r.json()),
        fetch(`${API_URL}/contacts`, { headers }).then((r) => r.json()),
      ]);

      if (projectsRes.success) setProjects(projectsRes.data || []);
      if (messagesRes.success) setMessages(messagesRes.data || []);
    } catch (error) {
      console.log("Using demo data");
      // Fallback demo data
      setProjects([
        {
          id: 1,
          title: "Modern Lakeside Villa",
          category: "Residential",
          location: "California",
          description: "A stunning modern villa.",
          featured: true,
          year: "2024",
          images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
          ],
          client: "Johnson Family",
          completion_date: "2024-03-15",
        },
        {
          id: 2,
          title: "Corporate HQ",
          category: "Commercial",
          location: "New York",
          description: "Cutting-edge headquarters.",
          featured: false,
          year: "2024",
          images: [
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600",
          ],
          client: "TechCorp",
          completion_date: "2024-01-20",
        },
        {
          id: 3,
          title: "Garden Residence",
          category: "Landscape",
          location: "Oregon",
          description: "Eco-friendly landscape design.",
          featured: true,
          year: "2023",
          images: [
            "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=600",
          ],
          client: "Green Living",
          completion_date: "2023-11-10",
        },
      ]);
      setMessages([
        {
          id: 1,
          name: "John Smith",
          email: "john@example.com",
          subject: "Project Inquiry",
          message: "I am interested in building a modern home.",
          is_read: false,
          created_at: "2024-03-15T10:30:00",
        },
        {
          id: 2,
          name: "Sarah Johnson",
          email: "sarah@example.com",
          subject: "Renovation Quote",
          message: "We need to renovate our office space.",
          is_read: true,
          created_at: "2024-03-14T14:20:00",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    toast.success("Logged out");
    router.push("/admin/login");
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await fetch(`${API_URL}/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(projects.filter((p) => p.id !== id));
      toast.success("Project deleted");
    } catch {
      setProjects(projects.filter((p) => p.id !== id));
      toast.success("Project deleted (demo)");
    }
  };

  const handleToggleFeatured = async (id) => {
    const project = projects.find((p) => p.id === id);
    const updated = { ...project, featured: !project.featured };
    try {
      const token = localStorage.getItem("adminToken");
      const formData = new FormData();
      formData.append("featured", updated.featured);
      await fetch(`${API_URL}/projects/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
    } catch {}
    setProjects(projects.map((p) => (p.id === id ? updated : p)));
    toast.success("Updated");
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    const projectFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") return;
      projectFormData.append(key, formData[key]);
    });

    try {
      const token = localStorage.getItem("adminToken");
      const url = editingProject
        ? `${API_URL}/projects/${editingProject.id}`
        : `${API_URL}/projects`;
      const method = editingProject ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: projectFormData,
      });
      const data = await res.json();

      if (data.success) {
        toast.success(editingProject ? "Project updated" : "Project created");
        fetchData();
      }
    } catch {
      if (editingProject) {
        setProjects(
          projects.map((p) =>
            p.id === editingProject.id
              ? { ...p, ...formData, images: p.images }
              : p,
          ),
        );
      } else {
        const newProject = {
          id: Date.now(),
          ...formData,
          images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
          ],
          year: new Date().getFullYear().toString(),
        };
        setProjects([...projects, newProject]);
      }
      toast.success(editingProject ? "Updated (demo)" : "Created (demo)");
    }
    setShowProjectModal(false);
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await fetch(`${API_URL}/contacts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}
    setMessages(messages.filter((m) => m.id !== id));
    if (selectedMessage?.id === id) setSelectedMessage(null);
    toast.success("Message deleted");
  };

  const handleMarkAsRead = (id) => {
    setMessages(
      messages.map((m) => (m.id === id ? { ...m, is_read: true } : m)),
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Logo variant="default" size="lg" withText={false} />
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-300 border-t-yellow-500 mx-auto mt-6"></div>
          <p className="text-gray-500 mt-4 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const unreadCount = messages.filter((m) => !m.is_read).length;
  const totalProjects = projects.length;
  const featuredProjects = projects.filter((p) => p.featured).length;
  const categories = [
    "All",
    "Residential",
    "Commercial",
    "Interior Design",
    "Landscape",
    "Renovation",
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || project.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const statCards = [
    {
      label: "Total Projects",
      value: totalProjects,
      icon: FiImage,
      color: "from-blue-500 to-blue-600",
      bg: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "Featured",
      value: featuredProjects,
      icon: FiStar,
      color: "from-yellow-500 to-yellow-600",
      bg: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
    {
      label: "Messages",
      value: messages.length,
      icon: FiMessageSquare,
      color: "from-green-500 to-green-600",
      bg: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      label: "Unread",
      value: unreadCount,
      icon: FiClock,
      color: "from-red-500 to-red-600",
      bg: "bg-red-50",
      textColor: "text-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-20 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-30 h-screen bg-gray-900 text-white transition-all duration-300 overflow-hidden ${
          sidebarOpen ? "w-64" : "w-0 lg:w-20"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo Area */}
          <div className="p-5 border-b border-gray-800 flex items-center justify-between">
            <div className={`${sidebarOpen ? "block" : "hidden lg:hidden"}`}>
              <Logo variant="light" size="sm" />
            </div>
            <div
              className={`${!sidebarOpen ? "block lg:block hidden" : "hidden"} mx-auto`}
            >
              <div className="w-9 h-9 bg-yellow-500 rounded-xl flex items-center justify-center">
                <span className="text-gray-900 font-bold text-lg">MA</span>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors text-gray-400"
            >
              {sidebarOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 p-3 space-y-1">
            {[
              { id: "dashboard", icon: FiBarChart2, label: "Dashboard" },
              { id: "projects", icon: FiGrid, label: "Projects" },
              {
                id: "messages",
                icon: FiMessageSquare,
                label: "Messages",
                badge: unreadCount,
              },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm ${
                  activeTab === item.id
                    ? "bg-yellow-500 text-gray-900 font-semibold shadow-lg shadow-yellow-500/20"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <item.icon size={18} className="flex-shrink-0" />
                <span
                  className={`${sidebarOpen ? "block" : "hidden lg:hidden"} flex-1 text-left`}
                >
                  {item.label}
                </span>
                {item.badge > 0 && (
                  <span
                    className={`${sidebarOpen ? "" : "hidden lg:hidden"} bg-red-500 text-white text-xs px-2 py-0.5 rounded-full`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-3 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all text-sm"
            >
              <FiLogOut size={18} className="flex-shrink-0" />
              <span className={`${sidebarOpen ? "block" : "hidden lg:hidden"}`}>
                Logout
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
              >
                <FiMenu size={20} />
              </button>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  {activeTab === "dashboard" && "Dashboard"}
                  {activeTab === "projects" && "Projects"}
                  {activeTab === "messages" && "Messages"}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 hidden sm:block">
                Welcome,{" "}
                <span className="text-gray-900 font-semibold capitalize">
                  {adminName}
                </span>
              </span>
              <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {adminName[0]?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center`}
                      >
                        <card.icon size={20} className={card.textColor} />
                      </div>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {card.value}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{card.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none text-sm"
                  />
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    setEditingProject(null);
                    setFormData({
                      title: "",
                      category: "",
                      location: "",
                      completion_date: "",
                      client: "",
                      featured: false,
                      description: "",
                      full_description: "",
                    });
                    setShowProjectModal(true);
                  }}
                  className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-gray-800 transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-gray-900/10"
                >
                  <FiPlus size={16} />
                  Add Project
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all"
                  >
                    <div className="relative h-44 bg-gray-100">
                      <Image
                        src={
                          project.images?.[0] ||
                          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600"
                        }
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      <button
                        onClick={() => handleToggleFeatured(project.id)}
                        className={`absolute top-3 right-3 p-2 rounded-lg shadow-md transition-all ${
                          project.featured
                            ? "bg-yellow-400 text-white"
                            : "bg-white text-gray-400 hover:bg-yellow-50"
                        }`}
                      >
                        <FiStar
                          size={14}
                          fill={project.featured ? "currentColor" : "none"}
                        />
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {project.title}
                        </h3>
                        <span className="text-[10px] px-2 py-0.5 bg-yellow-50 text-yellow-700 rounded-full font-medium">
                          {project.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] text-gray-400">
                          {project.location}
                        </span>
                        <div className="flex gap-1">
                          <button
                            onClick={() => {
                              setEditingProject(project);
                              setFormData({
                                title: project.title,
                                category: project.category,
                                location: project.location,
                                completion_date: project.completion_date,
                                client: project.client || "",
                                featured: project.featured,
                                description: project.description,
                                full_description:
                                  project.full_description || "",
                              });
                              setShowProjectModal(true);
                            }}
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <FiEdit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === "messages" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-180px)]">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                <div className="p-4 border-b">
                  <h2 className="font-semibold text-gray-900 text-sm">
                    Messages ({messages.length})
                  </h2>
                </div>
                <div className="flex-1 overflow-y-auto divide-y">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      onClick={() => {
                        setSelectedMessage(msg);
                        if (!msg.is_read) handleMarkAsRead(msg.id);
                      }}
                      className={`p-4 cursor-pointer transition-colors ${
                        selectedMessage?.id === msg.id
                          ? "bg-yellow-50 border-l-3 border-yellow-500"
                          : "hover:bg-gray-50"
                      } ${!msg.is_read ? "bg-blue-50/30" : ""}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                            {msg.name}
                            {!msg.is_read && (
                              <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></span>
                            )}
                          </p>
                          <p className="text-xs text-gray-500 truncate mt-0.5">
                            {msg.subject}
                          </p>
                        </div>
                        <span className="text-[10px] text-gray-400 ml-2 flex-shrink-0">
                          {new Date(msg.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex items-center justify-center">
                {selectedMessage ? (
                  <div className="p-6 w-full h-full flex flex-col">
                    <div className="flex justify-between items-start pb-4 border-b">
                      <div>
                        <h2 className="text-lg font-bold text-gray-900">
                          {selectedMessage.subject}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          {selectedMessage.name} • {selectedMessage.email}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {new Date(
                            selectedMessage.created_at,
                          ).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteMessage(selectedMessage.id)}
                        className="p-2 text-red-400 hover:bg-red-50 rounded-lg"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                    <div className="flex-1 py-4">
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {selectedMessage.message}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-400">
                    <FiMessageSquare
                      size={40}
                      className="mx-auto mb-3 opacity-30"
                    />
                    <p className="text-sm">Select a message</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {showProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowProjectModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto z-10"
            >
              <div className="p-5 border-b sticky top-0 bg-white rounded-t-2xl">
                <h2 className="text-lg font-bold text-gray-900">
                  {editingProject ? "Edit Project" : "New Project"}
                </h2>
              </div>
              <form onSubmit={handleSaveProject} className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      name="category"
                      required
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      <option value="">Select</option>
                      {categories
                        .filter((c) => c !== "All")
                        .map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      required
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      name="completion_date"
                      required
                      value={formData.completion_date}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          completion_date: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Client
                    </label>
                    <input
                      type="text"
                      name="client"
                      value={formData.client}
                      onChange={(e) =>
                        setFormData({ ...formData, client: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={2}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="rounded text-yellow-500 focus:ring-yellow-400"
                  />
                  <span className="text-xs text-gray-600">
                    Featured project
                  </span>
                </label>
                <div className="flex justify-end gap-3 pt-2 border-t">
                  <button
                    type="button"
                    onClick={() => setShowProjectModal(false)}
                    className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/10"
                  >
                    {editingProject ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
