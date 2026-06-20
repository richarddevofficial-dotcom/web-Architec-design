"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  FiUser,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowLeft,
  FiLogIn,
} from "react-icons/fi";
import Logo from "@/components/Logo";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Try real API first
      const response = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Real API login successful
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminData", JSON.stringify(data.admin));
        toast.success("Welcome back!");
        router.push("/admin/dashboard");
      } else {
        // If API fails, try demo login
        if (formData.username === "admin" && formData.password === "admin123") {
          localStorage.setItem("adminToken", "demo-token-manuella-2024");
          localStorage.setItem(
            "adminData",
            JSON.stringify({
              id: 1,
              username: "admin",
              email: "admin@manuellaarchitects.com",
            }),
          );
          toast.success("Logged in with demo account!");
          router.push("/admin/dashboard");
        } else {
          setError(data.message || "Invalid credentials. Please try again.");
          toast.error("Invalid credentials");
        }
      }
    } catch (err) {
      // API not available, fallback to demo login
      console.log("API not available, using demo login");
      if (formData.username === "admin" && formData.password === "admin123") {
        localStorage.setItem("adminToken", "demo-token-manuella-2024");
        localStorage.setItem(
          "adminData",
          JSON.stringify({
            id: 1,
            username: "admin",
            email: "admin@manuellaarchitects.com",
          }),
        );
        toast.success("Logged in with demo account!");
        router.push("/admin/dashboard");
      } else {
        setError("Invalid credentials. Use admin / admin123");
        toast.error("Invalid credentials");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-10 left-10 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
        </div>
        {/* Grid Pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Back to Website Link */}
        <motion.a
          href="/"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors mb-6 text-sm"
        >
          <FiArrowLeft size={16} />
          Back to Website
        </motion.a>

        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl shadow-black/20 overflow-hidden border border-gray-100">
          {/* Header with Logo */}
          <div className="bg-gray-900 p-8 sm:p-10 text-center relative overflow-hidden">
            {/* Decorative lines */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></div>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-5 right-5 w-32 h-32 border border-white/20 rounded-full"></div>
              <div className="absolute bottom-5 left-5 w-24 h-24 border border-white/20 rounded-full"></div>
            </div>

            {/* Logo */}
            <div className="relative z-10">
              <div className="mb-5 flex justify-center">
                <Logo variant="light" size="lg" withText={false} />
              </div>
              <h1
                className="text-2xl sm:text-3xl font-bold text-white mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Welcome Back
              </h1>
              <p className="text-gray-400 text-sm">
                Sign in to your admin dashboard
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8 sm:p-10">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-red-500 text-sm">!</span>
                </div>
                <p className="text-sm text-red-700">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username or Email
                </label>
                <div className="relative group">
                  <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center">
                    <FiUser
                      className="text-gray-400 group-focus-within:text-yellow-500 transition-colors"
                      size={18}
                    />
                  </div>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => {
                      setFormData({ ...formData, username: e.target.value });
                      setError("");
                    }}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:bg-white outline-none transition-all text-gray-900 placeholder-gray-400"
                    placeholder="Enter your username"
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center">
                    <FiLock
                      className="text-gray-400 group-focus-within:text-yellow-500 transition-colors"
                      size={18}
                    />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      setError("");
                    }}
                    required
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:bg-white outline-none transition-all text-gray-900 placeholder-gray-400"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-400"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-sm text-gray-500 hover:text-yellow-600 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-gray-900/20"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <FiLogIn size={18} />
                    <span>Sign In</span>
                  </>
                )}
              </motion.button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-xs text-gray-500 text-center mb-2 font-medium uppercase tracking-wider">
                Demo Credentials
              </p>
              <div className="flex justify-center gap-4 text-sm">
                <code className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 font-mono">
                  admin
                </code>
                <code className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 font-mono">
                  admin123
                </code>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 pb-6 text-center">
            <p className="text-xs text-gray-400">
              Manuella Architects © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
