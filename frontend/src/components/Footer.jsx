import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info - Now using Logo component */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <Logo variant="light" size="md" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 mt-3">
              Transforming spaces into extraordinary experiences through
              innovative architectural design, interior planning, and
              consultancy.
            </p>
            <div className="flex gap-3">
              {[
                { icon: "📱", label: "Facebook" },
                { icon: "📘", label: "Twitter" },
                { icon: "📸", label: "Instagram" },
                { icon: "💼", label: "LinkedIn" },
              ].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={social.label}
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 text-base"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold mb-4 pb-2 border-b-2 border-yellow-500 inline-block tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2.5 mt-2">
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
                    className="text-gray-400 hover:text-yellow-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold mb-4 pb-2 border-b-2 border-yellow-500 inline-block tracking-wide">
              Our Services
            </h3>
            <ul className="space-y-2.5 mt-2">
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
                  className="text-gray-400 hover:text-yellow-400 transition-colors text-sm flex items-center gap-2 cursor-pointer group"
                >
                  <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold mb-4 pb-2 border-b-2 border-yellow-500 inline-block tracking-wide">
              Contact Info
            </h3>
            <ul className="space-y-3 text-sm text-gray-400 mt-2">
              <li className="flex items-start gap-3 group">
                <span className="text-yellow-500 flex-shrink-0 mt-0.5">📧</span>
                <span className="group-hover:text-yellow-400 transition-colors">
                  info@manuellaarchitects.com
                </span>
              </li>
              <li className="flex items-start gap-3 group">
                <span className="text-yellow-500 flex-shrink-0 mt-0.5">📞</span>
                <a
                  href="tel:+211928661250"
                  className="group-hover:text-yellow-400 transition-colors"
                >
                  +211 928 661 250
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <span className="text-yellow-500 flex-shrink-0 mt-0.5">📍</span>
                <span className="group-hover:text-yellow-400 transition-colors">
                  7/11 Street, Gudele One B-7
                </span>
              </li>
              <li className="flex items-start gap-3 group">
                <span className="text-yellow-500 flex-shrink-0 mt-0.5">🕐</span>
                <span className="group-hover:text-yellow-400 transition-colors">
                  Mon - Fri: 9:00 AM - 6:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
            <p className="text-gray-500 text-xs sm:text-sm">
              &copy; {currentYear}{" "}
              <span className="text-yellow-500">Manuella Architects</span>. All
              rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-5 text-xs sm:text-sm">
              <a
                href="#"
                className="text-gray-500 hover:text-yellow-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-yellow-400 transition-colors"
              >
                Terms of Service
              </a>
              <Link
                href="/admin/login"
                className="text-gray-500 hover:text-yellow-400 transition-colors"
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
