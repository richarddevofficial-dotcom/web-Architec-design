"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import toast from "react-hot-toast";
import { portfolioProjects } from "@/data/mockData";
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
} from "react-icons/fi";

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

  // Form state for the modal
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    completionDate: "",
    client: "",
    featured: false,
    description: "",
    fullDescription: "",
  });

  // Mock messages
  const mockMessages = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      phone: "+1 555-0101",
      subject: "Residential Project Inquiry",
      message:
        "I am interested in building a modern home with sustainable features. Could you please provide more information about your residential design services and approximate timelines?",
      read: false,
      createdAt: "2024-03-15T10:30:00",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1 555-0102",
      subject: "Commercial Renovation",
      message:
        "We need to renovate our office space to accommodate 50 employees. Looking for a modern, open-plan design that encourages collaboration.",
      read: true,
      createdAt: "2024-03-14T14:20:00",
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike@example.com",
      phone: "+1 555-0103",
      subject: "Landscape Design Consultation",
      message:
        "Looking for landscape design services for our new property. We have about 2 acres and want to create an outdoor entertainment space.",
      read: false,
      createdAt: "2024-03-13T09:15:00",
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily@example.com",
      phone: "",
      subject: "Interior Design Quote",
      message:
        "We just purchased a new apartment and need interior design services. The apartment is 1500 sq ft with 3 bedrooms.",
      read: false,
      createdAt: "2024-03-12T16:45:00",
    },
  ];

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    // Load data
    setProjects(portfolioProjects);
    setMessages(mockMessages);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    toast.success("Logged out successfully");
    router.push("/admin/login");
  };

  const handleDeleteProject = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((p) => p.id !== id));
      toast.success("Project deleted successfully");
    }
  };

  const handleToggleFeatured = (id) => {
    setProjects(
      projects.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)),
    );
    toast.success("Project updated successfully");
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      location: project.location,
      completionDate: project.completionDate,
      client: project.client || "",
      featured: project.featured,
      description: project.description,
      fullDescription: project.fullDescription || "",
    });
    setShowProjectModal(true);
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      category: "",
      location: "",
      completionDate: "",
      client: "",
      featured: false,
      description: "",
      fullDescription: "",
    });
    setShowProjectModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSaveProject = (e) => {
    e.preventDefault();

    if (editingProject) {
      // Update existing project
      setProjects(
        projects.map((p) =>
          p.id === editingProject.id
            ? { ...p, ...formData, images: p.images }
            : p,
        ),
      );
      toast.success("Project updated successfully");
    } else {
      // Add new project
      const newProject = {
        id: projects.length + 1,
        ...formData,
        images: [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        ],
        year: new Date().getFullYear().toString(),
      };
      setProjects([...projects, newProject]);
      toast.success("Project added successfully");
    }
    setShowProjectModal(false);
  };

  const handleDeleteMessage = (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      setMessages(messages.filter((m) => m.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
      toast.success("Message deleted successfully");
    }
  };

  const handleMarkAsRead = (id) => {
    setMessages(messages.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const unreadCount = messages.filter((m) => !m.read).length;
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
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || project.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white transform transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0 lg:w-20"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">E</span>
                </div>
                <div
                  className={`${sidebarOpen ? "lg:block" : "lg:hidden"} ${!sidebarOpen ? "hidden" : ""}`}
                >
                  <h1 className="font-bold text-sm">EDA Admin</h1>
                  <p className="text-xs text-gray-400">Dashboard</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                {sidebarOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "dashboard"
                  ? "bg-red-500 text-white"
                  : "hover:bg-gray-800 text-gray-300"
              }`}
            >
              <FiBarChart2 className="w-5 h-5 flex-shrink-0" />
              <span
                className={`${sidebarOpen ? "lg:block" : "lg:hidden"} ${!sidebarOpen ? "hidden" : ""}`}
              >
                Dashboard
              </span>
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "projects"
                  ? "bg-red-500 text-white"
                  : "hover:bg-gray-800 text-gray-300"
              }`}
            >
              <FiImage className="w-5 h-5 flex-shrink-0" />
              <span
                className={`${sidebarOpen ? "lg:block" : "lg:hidden"} ${!sidebarOpen ? "hidden" : ""}`}
              >
                Projects
              </span>
            </button>

            <button
              onClick={() => setActiveTab("messages")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors relative ${
                activeTab === "messages"
                  ? "bg-red-500 text-white"
                  : "hover:bg-gray-800 text-gray-300"
              }`}
            >
              <FiMessageSquare className="w-5 h-5 flex-shrink-0" />
              <span
                className={`${sidebarOpen ? "lg:block" : "lg:hidden"} ${!sidebarOpen ? "hidden" : ""}`}
              >
                Messages
              </span>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-auto">
                  {unreadCount}
                </span>
              )}
            </button>
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-red-400"
            >
              <FiLogOut className="w-5 h-5 flex-shrink-0" />
              <span
                className={`${sidebarOpen ? "lg:block" : "lg:hidden"} ${!sidebarOpen ? "hidden" : ""}`}
              >
                Logout
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-h-screen">
        {/* Top Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiMenu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {activeTab === "dashboard" && "Dashboard Overview"}
                  {activeTab === "projects" && "Projects Management"}
                  {activeTab === "messages" && "Messages"}
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {/* Dashboard Overview */}
          {activeTab === "dashboard" && (
            <div>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Projects</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        {totalProjects}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FiImage className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Featured Projects</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        {featuredProjects}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <FiStar className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Messages</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        {messages.length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <FiMessageSquare className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Unread Messages</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        {unreadCount}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <FiMessageSquare className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Recent Messages */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Recent Messages
                </h2>
                <div className="space-y-4">
                  {messages.slice(0, 5).map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 rounded-lg border ${!message.read ? "border-red-200 bg-red-50" : "border-gray-200"}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">
                            {message.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {message.subject}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(message.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Projects Management */}
          {activeTab === "projects" && (
            <div>
              {/* Actions Bar */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                  />
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAddProject}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <FiPlus />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden group"
                  >
                    <div className="relative h-48">
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2 flex space-x-2">
                        <button
                          onClick={() => handleToggleFeatured(project.id)}
                          className={`p-2 rounded-lg shadow-lg transition-colors ${
                            project.featured
                              ? "bg-yellow-400 text-white"
                              : "bg-white text-gray-600 hover:bg-yellow-100"
                          }`}
                        >
                          <FiStar className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {project.title}
                        </h3>
                        <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full">
                          {project.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          {project.location}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditProject(project)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {activeTab === "messages" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Messages List */}
              <div className="lg:col-span-1 bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="font-semibold text-gray-900">All Messages</h2>
                </div>
                <div className="divide-y max-h-[600px] overflow-y-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      onClick={() => {
                        setSelectedMessage(message);
                        if (!message.read) handleMarkAsRead(message.id);
                      }}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedMessage?.id === message.id
                          ? "bg-red-50 border-l-4 border-red-500"
                          : ""
                      } ${!message.read ? "bg-blue-50/50" : ""}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">
                            {message.name}
                            {!message.read && (
                              <span className="ml-2 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                            )}
                          </p>
                          <p className="text-xs text-gray-600 mt-1 truncate">
                            {message.subject}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">
                          {new Date(message.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Detail */}
              <div className="lg:col-span-2">
                {selectedMessage ? (
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          {selectedMessage.subject}
                        </h2>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm text-gray-600">
                            <strong>From:</strong> {selectedMessage.name} (
                            {selectedMessage.email})
                          </p>
                          {selectedMessage.phone && (
                            <p className="text-sm text-gray-600">
                              <strong>Phone:</strong> {selectedMessage.phone}
                            </p>
                          )}
                          <p className="text-sm text-gray-600">
                            <strong>Date:</strong>{" "}
                            {new Date(
                              selectedMessage.createdAt,
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteMessage(selectedMessage.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="border-t pt-6">
                      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {selectedMessage.message}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <FiMessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Select a message to view its contents
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Project Modal - NOW INSIDE THE RETURN STATEMENT */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h2>
            </div>

            <form onSubmit={handleSaveProject} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                    placeholder="Project title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                  >
                    <option value="">Select category</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Interior Design">Interior Design</option>
                    <option value="Landscape">Landscape</option>
                    <option value="Renovation">Renovation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                    placeholder="Project location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Completion Date *
                  </label>
                  <input
                    type="date"
                    name="completionDate"
                    required
                    value={formData.completionDate}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client
                  </label>
                  <input
                    type="text"
                    name="client"
                    value={formData.client}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                    placeholder="Client name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleFormChange}
                      className="rounded text-red-500 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-600">
                      Mark as featured project
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows="3"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                  placeholder="Brief description"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Description
                </label>
                <textarea
                  name="fullDescription"
                  rows="4"
                  value={formData.fullDescription}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                  placeholder="Detailed project description"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  {editingProject ? "Update Project" : "Add Project"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
