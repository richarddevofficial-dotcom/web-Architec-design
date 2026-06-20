"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiPhone, FiLock } from "react-icons/fi";
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
          scrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo Component */}
            <Logo size="md" />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 lg:px-4 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-300 ${
                    pathname === link.href
                      ? "bg-red-500 text-white shadow-md shadow-red-500/20"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-white rounded-full hidden sm:block"></span>
                  )}
                </Link>
              ))}

              {/* Divider */}
              <span className="w-px h-6 bg-gray-200 mx-2"></span>

              {/* Contact Quick Link */}
              <Link
                href="/contact"
                className="flex items-center gap-1.5 px-3 lg:px-4 py-2 rounded-lg text-sm lg:text-base font-medium bg-red-500 text-white hover:bg-red-600 transition-all shadow-md shadow-red-500/20"
              >
                <FiPhone size={14} />
                <span>Get Quote</span>
              </Link>

              {/* Admin Link */}
              <Link
                href="/admin/login"
                className="px-2 py-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-gray-100 transition-all ml-1"
                title="Admin Panel"
              >
                <FiLock size={16} />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ${
            isOpen
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="bg-white border-t shadow-lg px-4 py-3 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  pathname === link.href
                    ? "bg-red-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-gray-100 pt-2 mt-2 space-y-1">
              <Link
                href="/contact"
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-base font-medium bg-red-500 text-white shadow-md"
              >
                <FiPhone size={18} />
                Get a Quote
              </Link>
              <Link
                href="/admin/login"
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-base font-medium text-gray-500 hover:bg-gray-50"
              >
                <FiLock size={18} />
                Admin Panel
              </Link>
            </div>

            {/* Mobile Contact Info */}
            <div className="px-4 py-3 mt-2 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 font-medium mb-1">
                Contact Info
              </p>
              <a
                href="tel:+15551234567"
                className="text-sm text-gray-700 hover:text-red-500 transition-colors block"
              >
                +1 (555) 123-4567
              </a>
              <a
                href="mailto:info@emmanuelladesigns.com"
                className="text-sm text-gray-700 hover:text-red-500 transition-colors block"
              >
                info@emmanuelladesigns.com
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16 lg:h-20"></div>
    </>
  );
}
