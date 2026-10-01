"use client";

// Custom Locked Door Icon - Failed to exit
function LockedDoorIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Door frame */}
      <rect
        x="8"
        y="4"
        width="16"
        height="24"
        rx="1"
        fill="url(#doorErrorGradient)"
        stroke="#ef4444"
        strokeWidth="1"
      />
      
      {/* Door panel (closed) */}
      <rect
        x="10"
        y="6"
        width="12"
        height="20"
        rx="0.5"
        fill="url(#doorPanelErrorGradient)"
      />
      
      {/* Lock symbol */}
      <g transform="translate(12, 12)">
        {/* Lock body */}
        <rect
          x="0"
          y="3"
          width="8"
          height="6"
          rx="1"
          fill="#ef4444"
        />
        {/* Lock shackle */}
        <path
          d="M2 3V2C2 0.9 2.9 0 4 0C5.1 0 6 0.9 6 2V3"
          stroke="#ef4444"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Keyhole */}
        <circle cx="4" cy="6" r="1" fill="#1a0a0a" />
        <rect x="3.5" y="6" width="1" height="2" fill="#1a0a0a" />
      </g>
      
      {/* X mark badge */}
      <circle cx="26" cy="8" r="4" fill="#ef4444" />
      <path
        d="M24.5 6.5L27.5 9.5M27.5 6.5L24.5 9.5"
        stroke="white"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      
      {/* Warning lines */}
      <path
        d="M4 10L6 12"
        stroke="#ef4444"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M4 16L6 16"
        stroke="#ef4444"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M4 22L6 20"
        stroke="#ef4444"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />

      <defs>
        <linearGradient id="doorErrorGradient" x1="8" y1="4" x2="24" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3d1515" />
          <stop offset="1" stopColor="#1a0a0a" />
        </linearGradient>
        <linearGradient id="doorPanelErrorGradient" x1="10" y1="6" x2="22" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4d1c1c" />
          <stop offset="1" stopColor="#2d1010" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function SignoutErrorToast() {
  return (
    <div
      className="flex items-center gap-4 px-4 py-3 rounded-xl min-w-[280px]"
      style={{
        background: "linear-gradient(135deg, #1a0a0a 0%, #2d1010 50%, #1a0a0a 100%)",
        border: "1px solid rgba(239, 68, 68, 0.3)",
        boxShadow: "0 8px 32px rgba(239, 68, 68, 0.15), inset 0 1px 0 rgba(239, 68, 68, 0.1)",
      }}
    >
      {/* Icon */}
      <div
        className="shrink-0 w-11 h-11 rounded-lg flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.1) 100%)",
          border: "1px solid rgba(239, 68, 68, 0.3)",
        }}
      >
        <LockedDoorIcon className="w-7 h-7" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-semibold"
          style={{ color: "#f87171" }}
        >
          Sign Out Failed
        </p>
        <p
          className="text-xs mt-0.5"
          style={{ color: "rgba(252, 165, 165, 0.7)" }}
        >
          Please try again
        </p>
      </div>
    </div>
  );
}
