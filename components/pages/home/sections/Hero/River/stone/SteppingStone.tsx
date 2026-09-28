"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { getAnimStyle } from "./helper/constant";
import { IMAGES } from "@/lib/images";

interface SteppingStoneProps {
  label?: string;
  href?: string;
  onClick?: () => void;
  /** width/height in px */
  size?: number;
  /** phase offset so multiple stones bob out of sync */
  phase?: number;
  /** z-index for layering stones */
  zIndex?: number;
  className?: string;
  style?: CSSProperties;
}

export const SteppingStone = memo(function SteppingStone({
  label,
  href,
  onClick,
  size = 120,
  phase = 0,
  zIndex,
  className = "",
  style,
}: SteppingStoneProps) {
  const animStyle = getAnimStyle({
    phase,
    href,
    onClick,
    size,
    zIndex,
    style,
  });

  const stone = (
    <span style={animStyle} className={`stone-responsive ${className}`}>
      {/* Outer wrapper with padding for larger hover target area */}
      <span className="stone-interactive relative inline-block p-3 -m-3">
        {/* Ripple rings */}
        <span
          aria-hidden
          className="stone-ripple absolute left-1/2 -translate-x-1/2 rounded-[50%] pointer-events-none"
        />
        <span
          aria-hidden
          className="stone-ripple stone-ripple-2 absolute left-1/2 -translate-x-1/2 rounded-[50%] pointer-events-none"
        />
        {/* Water-contact glow */}
        <span
          aria-hidden
          className="stone-waterglow absolute left-1/2 -translate-x-1/2 rounded-[50%] pointer-events-none"
        />
        {/* Reflection */}
        <span
          aria-hidden
          className="stone-reflection absolute left-1/2 pointer-events-none overflow-hidden"
        >
          <Image
            src={IMAGES.hero.steppingStone}
            alt=""
            fill
            className="object-contain object-top select-none"
          />
        </span>
        {/* Stone image */}
        <Image
          src={IMAGES.hero.steppingStone}
          alt={label ? `${label} stone` : "stepping stone"}
          fill
          className="stone-img object-contain select-none pointer-events-none relative"
          style={{ filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.55))" }}
        />
        {/* Label */}
        {label && (
          <span
            className="stone-label absolute inset-0 flex items-center justify-center text-center font-bold text-amber-100 uppercase text-[8px] sm:text-[15px] tracking-wide pb-1"
            style={{
              fontFamily: "var(--font-ethereal), serif",
              textShadow: "0 1px 4px rgba(0,0,0,0.95), 0 0 2px rgba(0,0,0,0.9)",
            }}
          >
            {label}
          </span>
        )}
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: "none" }}>
        {stone}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button
        onClick={onClick}
        style={{ background: "none", border: "none", padding: 0 }}
      >
        {stone}
      </button>
    );
  }

  return stone;
});
