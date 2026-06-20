"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiPhone, FiLock, FiCalendar } from "react-icons/fi";
import Logo from "@/components/Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-lg shadow-gray-200/50"
            : "bg-white/95 backdrop-blur-md"
        }`}
      >
        {/* Top Bar - Premium Feel */}
        <div className="hidden lg:block bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-8 text-xs">
              <div className="flex items-center gap-6">
                <a
                  href="tel:+211928661250"
                  className="hover:text-yellow-400 transition-colors flex items-center gap-1.5"
                >
                  <FiPhone size={12} />
                  +211 928 661 250
                </a>
                <a
                  href="mailto:info@manuellaarchitects.com"
                  className="hover:text-yellow-400 transition-colors"
                >
                  info@manuellaarchitects.com
                </a>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-400 tracking-wider">
                  ARCHITECTURE • INTERIOR • PLANNING
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Logo variant="default" size="md" />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 lg:px-4 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-300 ${
                    pathname === link.href
                      ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-yellow-400 rounded-full hidden sm:block"></span>
                  )}
                </Link>
              ))}

              {/* Divider */}
              <span className="w-px h-6 bg-gray-200 mx-2"></span>

              {/* Consultation CTA */}
              <Link
                href="/contact"
                className="flex items-center gap-1.5 px-4 lg:px-5 py-2.5 rounded-lg text-sm lg:text-base font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30 group"
              >
                <FiCalendar size={15} className="text-yellow-400" />
                <span>Free Consultation</span>
              </Link>

              {/* Admin Link - Subtle */}
              <Link
                href="/admin/login"
                className="ml-1 p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
                title="Admin Panel"
              >
                <FiLock size={15} />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-colors text-gray-700"
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-[600px] opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="bg-white border-t shadow-2xl px-4 py-4 space-y-1.5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-5 py-3.5 rounded-xl text-base font-semibold transition-all ${
                  pathname === link.href
                    ? "bg-gray-900 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile CTA */}
            <div className="border-t border-gray-100 pt-3 mt-3 space-y-2">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-base font-semibold bg-gray-900 text-white shadow-lg"
              >
                <FiCalendar size={18} className="text-yellow-400" />
                Free Consultation
              </Link>

              <Link
                href="/admin/login"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-base font-medium text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <FiLock size={16} />
                Admin Panel
              </Link>
            </div>

            {/* Mobile Contact Info */}
            <div className="mt-3 p-4 bg-gray-50 rounded-xl space-y-2">
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                Contact
              </p>
              <a
                href="tel:+211928661250"
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
              >
                <FiPhone size={14} className="text-gray-400" />
                +211 928 661 250
              </a>
              <a
                href="mailto:info@manuellaarchitects.com"
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
              >
                <FiPhone size={14} className="text-gray-400" />
                info@manuellaarchitects.com
              </a>
            </div>

            {/* Mobile Tagline */}
            <div className="text-center pt-2">
              <p className="text-[10px] text-gray-400 tracking-widest uppercase">
                Architecture • Interior • Planning
              </p>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16 lg:h-20"></div>

      {/* Extra spacer for top bar on desktop */}
      <div className="hidden lg:block h-8"></div>
    </>
  );
}
