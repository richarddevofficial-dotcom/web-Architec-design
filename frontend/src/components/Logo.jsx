import Link from "next/link";

export default function Logo({
  variant = "default", // 'default', 'light', 'gold', 'minimal'
  size = "md",
  withText = true,
  withTagline = false,
}) {
  const sizes = {
    sm: {
      container: "w-9 h-9",
      icon: "text-base",
      text: "text-sm",
      tagline: "text-[8px]",
    },
    md: {
      container: "w-11 h-11 sm:w-12 sm:h-12",
      icon: "text-lg sm:text-xl",
      text: "text-base sm:text-lg",
      tagline: "text-[9px] sm:text-[10px]",
    },
    lg: {
      container: "w-14 h-14 sm:w-16 sm:h-16",
      icon: "text-xl sm:text-2xl",
      text: "text-lg sm:text-xl",
      tagline: "text-[10px] sm:text-xs",
    },
    xl: {
      container: "w-20 h-20 sm:w-24 sm:h-24",
      icon: "text-3xl sm:text-4xl",
      text: "text-2xl sm:text-3xl",
      tagline: "text-xs sm:text-sm",
    },
  };

  const current = sizes[size] || sizes.md;

  // Color variants
  const colors = {
    default: {
      bg: "from-gray-900 to-gray-800",
      text: "text-gray-900",
      subtext: "text-gray-500",
      accent: "text-yellow-500",
      line: "border-gray-200",
    },
    light: {
      bg: "from-white to-gray-100",
      text: "text-white",
      subtext: "text-gray-300",
      accent: "text-yellow-400",
      line: "border-white/20",
    },
    gold: {
      bg: "from-yellow-600 to-yellow-700",
      text: "text-gray-900",
      subtext: "text-gray-500",
      accent: "text-yellow-500",
      line: "border-yellow-200",
    },
    minimal: {
      bg: "from-gray-900 to-gray-900",
      text: "text-gray-900",
      subtext: "text-gray-400",
      accent: "text-white",
      line: "border-gray-700",
    },
  };

  const color = colors[variant] || colors.default;

  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0"
    >
      {/* Monogram Logo Mark */}
      <div
        className={`${current.container} relative rounded-2xl flex items-center justify-center overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105`}
      >
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color.bg}`}></div>

        {/* Architectural Grid Lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white"></div>
        </div>

        {/* Roof/Building Silhouette */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.08]"
          viewBox="0 0 100 100"
        >
          <polygon points="50,15 15,55 85,55" fill="white" />
          <rect x="25" y="55" width="50" height="30" fill="white" />
        </svg>

        {/* MA Monogram */}
        <span
          className={`${current.icon} text-white font-bold relative z-10 tracking-tighter`}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          MA
        </span>

        {/* Gold Accent Dot */}
        <div
          className={`absolute bottom-1.5 right-1.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full shadow-sm`}
        ></div>
      </div>

      {/* Text */}
      {withText && (
        <div className="hidden sm:block">
          <div
            className={`${current.text} font-bold ${color.text} leading-tight tracking-tight`}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Manuella
          </div>
          <div
            className={`text-[10px] sm:text-xs ${color.subtext} -mt-0.5 tracking-[0.2em] uppercase font-medium`}
          >
            Architects
          </div>
          {withTagline && (
            <div
              className={`${current.tagline} ${color.subtext} mt-0.5 tracking-wider opacity-70`}
            >
              Architecture • Interior • Planning
            </div>
          )}
        </div>
      )}
    </Link>
  );
}
