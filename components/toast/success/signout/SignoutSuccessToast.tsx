"use client";

// Custom Door Exit Icon - User leaving through door
function DoorExitIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Door frame */}
      <rect
        x="10"
        y="4"
        width="14"
        height="24"
        rx="1"
        fill="url(#doorGradient)"
        stroke="#22c55e"
        strokeWidth="1"
      />
      
      {/* Door panel (slightly open) */}
      <path
        d="M10 4L18 6V26L10 28V4Z"
        fill="url(#doorPanelGradient)"
        stroke="#16a34a"
        strokeWidth="0.5"
      />
      
      {/* Door handle */}
      <circle cx="16" cy="16" r="1.2" fill="#22c55e" />
      
      {/* Person silhouette walking out */}
      <g transform="translate(-2, 0)">
        {/* Head */}
        <circle cx="6" cy="12" r="2.5" fill="url(#personGradient)" />
        
        {/* Body */}
        <path
          d="M6 14.5V20"
          stroke="url(#personGradient)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Arms (waving goodbye) */}
        <path
          d="M6 16L3 14"
          stroke="url(#personGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M6 16L9 18"
          stroke="url(#personGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        
        {/* Legs (walking) */}
        <path
          d="M6 20L4 25"
          stroke="url(#personGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M6 20L8 25"
          stroke="url(#personGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      
      {/* Arrow pointing out */}
      <path
        d="M2 16L0 16M0 16L2 14M0 16L2 18"
        stroke="#22c55e"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
      
      {/* Checkmark badge */}
      <circle cx="26" cy="8" r="4" fill="#22c55e" />
      <path
        d="M24 8L25.5 9.5L28 7"
        stroke="white"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Sparkles */}
      <circle cx="1" cy="10" r="0.8" fill="#22c55e" opacity="0.6" />
      <circle cx="3" cy="22" r="0.6" fill="#22c55e" opacity="0.5" />

      <defs>
        <linearGradient id="doorGradient" x1="10" y1="4" x2="24" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#134e2a" />
          <stop offset="1" stopColor="#0a2d18" />
        </linearGradient>
        <linearGradient id="doorPanelGradient" x1="10" y1="4" x2="18" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1a5c34" />
          <stop offset="1" stopColor="#0f3d22" />
        </linearGradient>
        <linearGradient id="personGradient" x1="3" y1="10" x2="9" y2="25" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4ade80" />
          <stop offset="1" stopColor="#22c55e" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function SignoutSuccessToast() {
  return (
    <div
      className="flex items-center gap-4 px-4 py-3 rounded-xl min-w-[280px]"
      style={{
        background: "linear-gradient(135deg, #0a1a12 0%, #0d2818 50%, #0a1a12 100%)",
        border: "1px solid rgba(34, 197, 94, 0.3)",
        boxShadow: "0 8px 32px rgba(34, 197, 94, 0.15), inset 0 1px 0 rgba(34, 197, 94, 0.1)",
      }}
    >
      {/* Icon */}
      <div
        className="shrink-0 w-11 h-11 rounded-lg flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(22, 163, 74, 0.1) 100%)",
          border: "1px solid rgba(34, 197, 94, 0.3)",
        }}
      >
        <DoorExitIcon className="w-7 h-7" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-semibold"
          style={{ color: "#4ade80" }}
        >
          Signed Out
        </p>
        <p
          className="text-xs mt-0.5"
          style={{ color: "rgba(134, 239, 172, 0.7)" }}
        >
          See you next time!
        </p>
      </div>

      {/* Decorative wave icon */}
      <div className="shrink-0 text-lg" style={{ opacity: 0.8 }}>
        👋
      </div>
    </div>
  );
}
