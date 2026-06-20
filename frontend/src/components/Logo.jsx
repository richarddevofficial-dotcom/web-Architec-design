import Link from "next/link";

export default function Logo({ size = "md", withText = true, white = false }) {
  const sizes = {
    sm: { container: "w-8 h-8", text: "text-sm", icon: "text-lg" },
    md: {
      container: "w-10 h-10 sm:w-12 sm:h-12",
      text: "text-base sm:text-lg",
      icon: "text-xl sm:text-2xl",
    },
    lg: {
      container: "w-14 h-14 sm:w-16 sm:h-16",
      text: "text-lg sm:text-xl",
      icon: "text-2xl sm:text-3xl",
    },
    xl: {
      container: "w-20 h-20 sm:w-24 sm:h-24",
      text: "text-2xl sm:text-3xl",
      icon: "text-4xl sm:text-5xl",
    },
  };

  const current = sizes[size] || sizes.md;
  const textColor = white ? "text-white" : "text-gray-900";
  const subColor = white ? "text-gray-300" : "text-gray-500";

  return (
    <Link
      href="/"
      className="flex items-center gap-2 sm:gap-3 group flex-shrink-0"
    >
      {/* Logo Mark */}
      <div
        className={`${current.container} relative bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 overflow-hidden`}
      >
        {/* Decorative lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-1 bg-white/50"></div>
          <div className="absolute bottom-0 right-0 w-1 h-full bg-white/50"></div>
        </div>

        {/* Main Letter */}
        <span className={`${current.icon} text-white font-bold relative z-10`}>
          E
        </span>

        {/* Small accent dot */}
        <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full"></div>
      </div>

      {/* Text */}
      {withText && (
        <div className="hidden sm:block">
          <div
            className={`${current.text} font-bold ${textColor} leading-tight`}
          >
            Emmanuella
          </div>
          <div
            className={`text-[10px] sm:text-xs ${subColor} -mt-0.5 tracking-wider uppercase`}
          >
            Designs & Architects
          </div>
        </div>
      )}
    </Link>
  );
}
