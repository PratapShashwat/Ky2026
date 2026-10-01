"use client";

// Info icon - Circle with "i"
function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="url(#infoCircleGradient)" />
      <circle cx="12" cy="12" r="8" fill="url(#infoInnerGradient)" opacity="0.3" />
      {/* Letter i */}
      <circle cx="12" cy="8" r="1.2" fill="#1a1a2e" />
      <rect x="11" y="10.5" width="2" height="6" rx="1" fill="#1a1a2e" />
      
      <defs>
        <linearGradient
          id="infoCircleGradient"
          x1="2"
          y1="2"
          x2="22"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#60a5fa" />
          <stop offset="0.5" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient
          id="infoInnerGradient"
          x1="4"
          y1="4"
          x2="20"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#93c5fd" />
          <stop offset="1" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function AlreadyLoggedInToast() {
  return (
    <div
      className="flex items-center gap-4 px-4 py-3 rounded-xl min-w-[280px]"
      style={{
        background: "linear-gradient(135deg, #0a1220 0%, #0d1a2d 50%, #0a1220 100%)",
        border: "1px solid rgba(59, 130, 246, 0.3)",
        boxShadow: "0 8px 32px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(59, 130, 246, 0.1)",
      }}
    >
      {/* Icon */}
      <div
        className="shrink-0 w-11 h-11 rounded-lg flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.1) 100%)",
          border: "1px solid rgba(59, 130, 246, 0.3)",
        }}
      >
        <InfoIcon className="w-7 h-7" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-semibold"
          style={{ color: "#60a5fa" }}
        >
          Already Signed In
        </p>
        <p
          className="text-xs mt-0.5"
          style={{ color: "rgba(147, 197, 253, 0.7)" }}
        >
          You&apos;re already logged in!
        </p>
      </div>

      {/* Decorative namaste */}
      <div className="shrink-0 text-lg" style={{ opacity: 0.8 }}>
        🙏
      </div>
    </div>
  );
}
