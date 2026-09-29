"use client";

import { memo } from "react";

export const Moon = memo(function Moon({ className = "", isMobile = false }: { className?: string; isMobile?: boolean }) {
  return (
    <div className={`relative ${className}`}>
      {/* Outermost halo - very subtle */}
      <div
        className={`absolute inset-0 rounded-full ${isMobile ? '' : 'moon-halo-outer'}`}
        style={{
          transform: "scale(4)",
          background: "radial-gradient(circle, rgba(200,210,255,0.04) 0%, rgba(150,170,220,0.02) 40%, transparent 70%)",
        }}
      />

      {/* Outer atmospheric glow */}
      <div
        className={`absolute inset-0 rounded-full ${isMobile ? '' : 'moon-glow-outer'}`}
        style={{
          transform: "scale(2.5)",
          background: "radial-gradient(circle, rgba(200,210,255,0.1) 0%, rgba(150,170,220,0.05) 35%, transparent 65%)",
        }}
      />

      {/* Middle glow layer */}
      <div
        className={`absolute inset-0 rounded-full ${isMobile ? '' : 'moon-glow-middle'}`}
        style={{
          transform: "scale(1.8)",
          background: "radial-gradient(circle, rgba(220,230,255,0.15) 0%, rgba(180,200,240,0.08) 45%, transparent 75%)",
        }}
      />

      {/* Inner glow - closest to moon */}
      <div
        className={`absolute inset-0 rounded-full ${isMobile ? '' : 'moon-glow-inner'}`}
        style={{
          transform: "scale(1.3)",
          background: "radial-gradient(circle, rgba(255,255,250,0.25) 0%, rgba(230,240,255,0.12) 50%, transparent 85%)",
        }}
      />

      {/* Corona effect - subtle rays */}
      <div
        className={`absolute inset-0 ${isMobile ? '' : 'moon-corona'}`}
        style={{
          transform: "scale(2.2)",
          background: `
            conic-gradient(
              from 0deg,
              transparent 0deg,
              rgba(255,255,250,0.03) 10deg,
              transparent 20deg,
              rgba(255,255,250,0.02) 45deg,
              transparent 55deg,
              rgba(255,255,250,0.03) 80deg,
              transparent 90deg,
              rgba(255,255,250,0.02) 120deg,
              transparent 130deg,
              rgba(255,255,250,0.03) 160deg,
              transparent 170deg,
              rgba(255,255,250,0.02) 200deg,
              transparent 210deg,
              rgba(255,255,250,0.03) 250deg,
              transparent 260deg,
              rgba(255,255,250,0.02) 300deg,
              transparent 310deg,
              rgba(255,255,250,0.03) 340deg,
              transparent 360deg
            )
          `,
          borderRadius: "50%",
        }}
      />

      {/* Moon surface */}
      <div
        className={`relative w-full h-full rounded-full overflow-hidden ${isMobile ? '' : 'moon-surface'}`}
        style={{
          background: `
            radial-gradient(circle at 32% 32%, #fffef8 0%, #f8f4e8 20%, #f0e8d8 45%, #e4dcc8 70%, #d8d0b8 100%)
          `,
          boxShadow: `
            0 0 30px rgba(255,255,245,0.6),
            0 0 60px rgba(230,240,255,0.35),
            0 0 100px rgba(200,210,255,0.2),
            inset -6px -6px 15px rgba(180,170,150,0.12),
            inset 3px 3px 10px rgba(255,255,255,0.1)
          `,
        }}
      >
        {/* Animated light sweep across surface */}
        <div
          className={`absolute inset-0 rounded-full ${isMobile ? '' : 'moon-light-sweep'}`}
          style={{
            background: "linear-gradient(105deg, transparent 0%, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%, transparent 100%)",
          }}
        />

        {/* Surface texture overlay */}
        <div
          className="absolute inset-0 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle at 25% 25%, transparent 0%, rgba(200,190,170,0.4) 100%)",
          }}
        />

        {/* Crater 1 - large */}
        <div
          className="absolute rounded-full"
          style={{
            width: "18%",
            height: "18%",
            top: "18%",
            left: "22%",
            background: "radial-gradient(circle at 35% 35%, rgba(215,205,185,0.5) 0%, rgba(195,185,165,0.3) 50%, transparent 100%)",
            boxShadow: "inset 1px 1px 4px rgba(180,170,150,0.35), inset -1px -1px 2px rgba(255,255,255,0.1)",
          }}
        />

        {/* Crater 2 - medium */}
        <div
          className="absolute rounded-full"
          style={{
            width: "13%",
            height: "13%",
            top: "40%",
            left: "55%",
            background: "radial-gradient(circle at 35% 35%, rgba(205,195,175,0.45) 0%, rgba(190,180,160,0.25) 50%, transparent 100%)",
            boxShadow: "inset 1px 1px 3px rgba(170,160,140,0.3)",
          }}
        />

        {/* Crater 3 - small */}
        <div
          className="absolute rounded-full"
          style={{
            width: "9%",
            height: "9%",
            top: "58%",
            left: "26%",
            background: "radial-gradient(circle at 35% 35%, rgba(200,190,170,0.4) 0%, rgba(185,175,155,0.2) 50%, transparent 100%)",
          }}
        />

        {/* Crater 4 - tiny */}
        <div
          className="absolute rounded-full"
          style={{
            width: "6%",
            height: "6%",
            top: "30%",
            left: "62%",
            background: "radial-gradient(circle, rgba(195,185,165,0.35) 0%, transparent 70%)",
          }}
        />

        {/* Crater 5 - medium-small */}
        <div
          className="absolute rounded-full"
          style={{
            width: "11%",
            height: "11%",
            top: "65%",
            left: "50%",
            background: "radial-gradient(circle at 35% 35%, rgba(205,195,175,0.4) 0%, rgba(190,180,160,0.2) 50%, transparent 100%)",
          }}
        />

        {/* Crater 6 - tiny upper */}
        <div
          className="absolute rounded-full"
          style={{
            width: "5%",
            height: "5%",
            top: "25%",
            left: "45%",
            background: "radial-gradient(circle, rgba(190,180,160,0.3) 0%, transparent 70%)",
          }}
        />

        {/* Mare (dark region) 1 */}
        <div
          className="absolute rounded-full opacity-12"
          style={{
            width: "38%",
            height: "28%",
            top: "32%",
            left: "12%",
            background: "radial-gradient(ellipse, rgba(140,130,110,0.6) 0%, transparent 70%)",
            transform: "rotate(-20deg)",
          }}
        />

        {/* Mare 2 - smaller */}
        <div
          className="absolute rounded-full opacity-10"
          style={{
            width: "20%",
            height: "15%",
            top: "55%",
            left: "40%",
            background: "radial-gradient(ellipse, rgba(150,140,120,0.5) 0%, transparent 70%)",
            transform: "rotate(10deg)",
          }}
        />

        {/* Highlight on edge - animated */}
        <div
          className={`absolute rounded-full ${isMobile ? '' : 'moon-edge-highlight'}`}
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(125deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 25%, transparent 45%)",
          }}
        />

        {/* Secondary highlight */}
        <div
          className="absolute rounded-full"
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(200deg, transparent 60%, rgba(255,255,255,0.05) 80%, rgba(255,255,255,0.1) 95%)",
          }}
        />
      </div>

      {!isMobile && (
        <style jsx>{`
        .moon-halo-outer {
          animation: moonHaloOuter 12s ease-in-out infinite;
        }
        .moon-glow-outer {
          animation: moonGlowOuter 8s ease-in-out infinite;
        }
        .moon-glow-middle {
          animation: moonGlowMiddle 6s ease-in-out infinite 0.5s;
        }
        .moon-glow-inner {
          animation: moonGlowInner 4s ease-in-out infinite 1s;
        }
        .moon-corona {
          animation: moonCorona 20s linear infinite;
        }
        .moon-surface {
          animation: moonSurfacePulse 10s ease-in-out infinite;
        }
        .moon-light-sweep {
          animation: moonLightSweep 15s ease-in-out infinite;
        }
        .moon-edge-highlight {
          animation: moonEdgeHighlight 8s ease-in-out infinite;
        }
      `}</style>
      )}
    </div>
  );
});
