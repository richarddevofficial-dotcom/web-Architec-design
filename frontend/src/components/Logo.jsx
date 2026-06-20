import Link from "next/link";

export default function Logo({
  variant = "default",
  size = "md",
  withText = true,
  withTagline = false,
}) {
  const sizes = {
    sm: {
      container: "w-9 h-9",
      icon: "text-sm",
      text: "text-xs",
      tagline: "text-[7px]",
      subtext: "text-[8px]",
    },
    md: {
      container: "w-10 h-10 sm:w-11 sm:h-11",
      icon: "text-base sm:text-lg",
      text: "text-sm sm:text-base",
      tagline: "text-[8px] sm:text-[9px]",
      subtext: "text-[9px] sm:text-[10px]",
    },
    lg: {
      container: "w-12 h-12 sm:w-14 sm:h-14",
      icon: "text-lg sm:text-xl",
      text: "text-base sm:text-lg",
      tagline: "text-[9px] sm:text-[10px]",
      subtext: "text-[10px] sm:text-xs",
    },
    xl: {
      container: "w-16 h-16 sm:w-20 sm:h-20",
      icon: "text-2xl sm:text-3xl",
      text: "text-xl sm:text-2xl",
      tagline: "text-[10px] sm:text-xs",
      subtext: "text-xs sm:text-sm",
    },
  };

  const current = sizes[size] || sizes.md;

  const colors = {
    default: {
      bg: "from-gray-900 to-gray-800",
      text: "text-gray-900",
      subtext: "text-gray-500",
      accent: "text-yellow-500",
    },
    light: {
      bg: "from-gray-800 to-gray-700",
      text: "text-white",
      subtext: "text-gray-300",
      accent: "text-yellow-400",
    },
    gold: {
      bg: "from-yellow-600 to-yellow-700",
      text: "text-gray-900",
      subtext: "text-gray-500",
      accent: "text-white",
    },
  };

  const color = colors[variant] || colors.default;

  return (
    <Link
      href="/"
      className="flex items-center gap-2 sm:gap-2.5 group flex-shrink-0"
    >
      {/* Monogram Box - MA */}
      <div
        className={`${current.container} relative rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${color.bg}`}></div>

        {/* Grid Lines */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white"></div>
        </div>

        {/* Building Silhouette */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06]"
          viewBox="0 0 100 100"
        >
          <polygon points="50,18 15,55 85,55" fill="white" />
          <rect x="28" y="55" width="44" height="30" fill="white" />
        </svg>

        {/* MA Text */}
        <span
          className={`${current.icon} text-white font-bold relative z-10 tracking-tighter`}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          MA
        </span>

        {/* Gold Dot */}
        <div
          className={`absolute bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full shadow-sm`}
        ></div>
      </div>

      {/* Text - Manuella Architects */}
      {withText && (
        <div className="hidden sm:block">
          <div
            className={`${current.text} font-bold ${color.text} leading-tight tracking-tight`}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Manuella
          </div>
          <div
            className={`${current.subtext} ${color.subtext} -mt-0.5 tracking-[0.15em] uppercase font-semibold`}
          >
            Architects
          </div>
          {withTagline && (
            <div
              className={`${current.tagline} ${color.subtext} mt-0.5 tracking-wider opacity-60`}
            >
              Architecture • Interior • Planning
            </div>
          )}
        </div>
      )}
    </Link>
  );
}
