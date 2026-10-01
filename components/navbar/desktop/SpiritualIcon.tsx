
/**
 * Small spiritual / ethereal glyph beside secondary links.
 */
export function SpiritualIcon({ kind, className = "" }: { kind: "om" | "lotus"; className?: string }) {
  return (
    <span
      aria-hidden
      className={`spirit-icon relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{
        width: "clamp(15px, 1.3vw, 22px)",
        height: "clamp(15px, 1.3vw, 22px)",
      }}
    >
      {kind === "om" ? (
        <span
          className="leading-none"
          style={{
            fontFamily: "serif",
            fontWeight: 700,
            fontSize: "clamp(15px, 1.3vw, 22px)",
            background: "linear-gradient(135deg, #FFF3C4, #FFD700 45%, #C8891F)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          ॐ
        </span>
      ) : (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <defs>
            <linearGradient id="lotusGold" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF3C4" />
              <stop offset="50%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#C8891F" />
            </linearGradient>
          </defs>
          <path d="M12 3 C13.6 8 13.6 13 12 17 C10.4 13 10.4 8 12 3 Z" fill="url(#lotusGold)" />
          <path d="M12 17 C9 13 6.5 10.5 4 9.5 C5 13 8 16 12 17 Z" fill="url(#lotusGold)" opacity="0.92" />
          <path d="M12 17 C15 13 17.5 10.5 20 9.5 C19 13 16 16 12 17 Z" fill="url(#lotusGold)" opacity="0.92" />
          <path d="M12 17 C7 15 3.5 13.5 1.5 12.5 C3 16 7 18 12 18 Z" fill="url(#lotusGold)" opacity="0.8" />
          <path d="M12 17 C17 15 20.5 13.5 22.5 12.5 C21 16 17 18 12 18 Z" fill="url(#lotusGold)" opacity="0.8" />
          <path d="M3 19 Q12 21 21 19" stroke="#FFE9A8" strokeWidth="0.8" strokeOpacity="0.5" fill="none" />
        </svg>
      )}
    </span>
  );
}
