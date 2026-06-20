import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold">
                  Emmanuella Designs
                </span>
                <p className="text-xs text-gray-400">& Architects</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Transforming spaces into extraordinary experiences through
              innovative architectural design.
            </p>
            <div className="flex gap-3">
              {["📱", "📘", "📸", "💼"].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-500 transition-colors text-lg"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 pb-2 border-b-2 border-red-500 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/services", label: "Services" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-red-500 transition-colors text-sm flex items-center gap-2"
                  >
                    <span>→</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 pb-2 border-b-2 border-red-500 inline-block">
              Services
            </h3>
            <ul className="space-y-2">
              {[
                "Architectural Design",
                "Interior Design",
                "Landscape Architecture",
                "Commercial Design",
                "Renovation",
                "Project Management",
              ].map((service) => (
                <li
                  key={service}
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm flex items-center gap-2 cursor-pointer"
                >
                  <span>→</span> {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 pb-2 border-b-2 border-red-500 inline-block">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span>📧</span>
                <span>info@emmanuelladesigns.com</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📞</span>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>123 Design Street, Architecture City, AC 12345</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🕐</span>
                <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
            <p className="text-gray-500 text-xs sm:text-sm">
              &copy; {currentYear} Emmanuella Designs & Architects. All rights
              reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
              <a
                href="#"
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                Terms of Service
              </a>
              <Link
                href="/admin/login"
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
