"use client";

import { memo } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { EVENT_CATEGORIES } from "@/components/pages/events/config/events.config";
import { COLORS, JAZZ_COLORS } from "@/components/pages/home/constants/palette";
import { NavbarDesign as Navbar } from "@/components/navbar/Design";

// ═══════════════════════════════════════════════════════════════════
// CATEGORY CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════
const CategoryCard = memo(function CategoryCard({
  category,
  index,
}: {
  category: (typeof EVENT_CATEGORIES)[0];
  index: number;
}) {
  return (
    <Link
      href={`/events/${category.slug}`}
      className="group relative block"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Card Container */}
      <div
        className="relative h-[320px] sm:h-[380px] rounded-2xl overflow-hidden transition-all duration-500 sm:group-hover:scale-[1.03] sm:group-hover:-translate-y-2"
        style={{
          background: `linear-gradient(180deg, 
            ${category.color}15 0%, 
            ${JAZZ_COLORS.BG_DEEP} 30%,
            ${JAZZ_COLORS.BG_ROYAL} 70%,
            ${category.color}20 100%
          )`,
          border: `2px solid ${category.color}40`,
          boxShadow: `0 10px 40px rgba(0,0,0,0.4), inset 0 1px 0 ${category.color}20`,
        }}
      >
        {/* Ornate top border */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: `linear-gradient(90deg, transparent, ${category.color}, transparent)`,
          }}
        />

        {/* Glow effect on hover - desktop only */}
        <div
          className="hidden sm:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${category.color}20 0%, transparent 70%)`,
          }}
        />

        {/* Icon/Emoji placeholder - will be replaced with images */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <span className="text-[150px]">{category.icon}</span>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
          {/* Category name */}
          <h3
            className="text-2xl sm:text-3xl font-black italic mb-2"
            style={{
              fontFamily: "Georgia, serif",
              color: COLORS.CREAM,
              textShadow: `0 2px 10px rgba(0,0,0,0.5), 0 0 30px ${category.color}50`,
            }}
          >
            {category.name}
          </h3>

          {/* Tagline */}
          <p
            className="text-sm sm:text-base opacity-80 line-clamp-2"
            style={{ color: category.color }}
          >
            {category.tagline}
          </p>

          {/* Event count badge */}
          <div
            className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold w-fit"
            style={{
              background: `${category.color}20`,
              border: `1px solid ${category.color}40`,
              color: category.color,
            }}
          >
            <span>{category.subEvents.length} Events</span>
            <svg
              className="w-3 h-3 transition-transform sm:group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        {/* Ornate corner accents */}
        <div
          className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2"
          style={{ borderColor: `${category.color}50` }}
        />
        <div
          className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2"
          style={{ borderColor: `${category.color}50` }}
        />
        <div
          className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2"
          style={{ borderColor: `${category.color}50` }}
        />
        <div
          className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2"
          style={{ borderColor: `${category.color}50` }}
        />
      </div>
    </Link>
  );
});

// ═══════════════════════════════════════════════════════════════════
// PAGE TITLE COMPONENT
// ═══════════════════════════════════════════════════════════════════
const PageTitle = memo(function PageTitle() {
  return (
    <div className="text-center mb-12 sm:mb-16">
      {/* Decorative line */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <div
          className="h-px w-16 sm:w-24"
          style={{
            background: `linear-gradient(90deg, transparent, ${COLORS.BRIGHT_GOLD})`,
          }}
        />
        <span
          className="text-xs sm:text-sm uppercase tracking-[0.3em] font-semibold"
          style={{ color: COLORS.BRIGHT_GOLD }}
        >
          Kashi Yatra 2027
        </span>
        <div
          className="h-px w-16 sm:w-24"
          style={{
            background: `linear-gradient(90deg, ${COLORS.BRIGHT_GOLD}, transparent)`,
          }}
        />
      </div>

      {/* Main title */}
      <h1
        className="text-4xl sm:text-5xl md:text-6xl font-black italic mb-4"
        style={{
          fontFamily: "Georgia, serif",
          background: `linear-gradient(135deg, ${COLORS.CREAM} 0%, ${COLORS.BRIGHT_GOLD} 50%, ${COLORS.CREAM} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Competitions
      </h1>

      {/* Subtitle */}
      <p
        className="text-base sm:text-lg max-w-2xl mx-auto"
        style={{ color: "rgba(255,255,255,0.6)" }}
      >
        Nine spectacular categories. Countless opportunities to shine.
        <br className="hidden sm:block" />
        Find your stage and let your talent speak.
      </p>

      {/* Download Rulebook Button */}
      <div className="mt-8">
        <button
          onClick={(e) => {
            e.preventDefault();
            toast.info("PDF will be available soon!");
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${JAZZ_COLORS.HOT_PINK}80 0%, ${JAZZ_COLORS.ROYAL_PURPLE}80 100%)`,
            color: COLORS.CREAM,
            border: `1px solid ${JAZZ_COLORS.HOT_PINK}50`,
            boxShadow: `0 4px 20px ${JAZZ_COLORS.HOT_PINK}30`,
          }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download Rulebook
        </button>
      </div>
    </div>
  );
});

// ═══════════════════════════════════════════════════════════════════
// MAIN PAGE CONTENT
// ═══════════════════════════════════════════════════════════════════
export function EventsPageContent() {
  return (
    <>
      {/* Fixed navbar - always visible */}
      <div className="fixed inset-x-0 top-0 z-[200]">
        <Navbar position="relative" topOffset={18} />
      </div>

      <main
        className="min-h-screen pt-28 sm:pt-32 pb-20 px-4 sm:px-6"
        style={{
          background: `linear-gradient(180deg, 
            ${JAZZ_COLORS.BG_DEEP} 0%, 
            ${JAZZ_COLORS.BG_ROYAL} 20%,
            ${JAZZ_COLORS.BG_WINE} 50%,
            ${JAZZ_COLORS.BG_ROYAL} 80%,
            ${JAZZ_COLORS.BG_DEEP} 100%
          )`,
        }}
      >
        {/* Background decorative elements */}
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `
            radial-gradient(circle at 20% 30%, ${JAZZ_COLORS.HOT_PINK} 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, ${JAZZ_COLORS.ROYAL_PURPLE} 0%, transparent 50%)
          `,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <PageTitle />

          {/* Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {EVENT_CATEGORIES.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                index={index}
              />
            ))}
          </div>

          {/* Bottom decorative element */}
          <div className="mt-16 sm:mt-20 text-center">
            <div
              className="inline-block px-6 py-3 rounded-full text-sm"
              style={{
                background: `${COLORS.BRIGHT_GOLD}10`,
                border: `1px solid ${COLORS.BRIGHT_GOLD}30`,
                color: COLORS.BRIGHT_GOLD,
              }}
            >
              Click on any category to explore events
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
