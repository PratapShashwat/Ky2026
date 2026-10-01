"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TrailPoint {
  id: number;
  x: number;
  y: number;
}

/**
 * Magical cursor trail effect for intro section
 */
export function CursorTrail() {
  const [trails, setTrails] = useState<TrailPoint[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let idCounter = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      const newPoint: TrailPoint = {
        id: idCounter++,
        x: e.clientX,
        y: e.clientY,
      };

      setTrails((prev) => [...prev.slice(-8), newPoint]); // Keep last 8 points
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setTrails([]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Auto-remove old trail points
  useEffect(() => {
    if (trails.length === 0) return;

    const timer = setTimeout(() => {
      setTrails((prev) => prev.slice(1));
    }, 80);

    return () => clearTimeout(timer);
  }, [trails]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <AnimatePresence>
        {trails.map((point, index) => {
          const size = 6 + (index / trails.length) * 10;
          const opacity = 0.2 + (index / trails.length) * 0.5;
          
          return (
            <motion.div
              key={point.id}
              className="absolute rounded-full"
              style={{
                left: point.x,
                top: point.y,
                width: size,
                height: size,
                marginLeft: -size / 2,
                marginTop: -size / 2,
                background: `radial-gradient(circle, rgba(255, 215, 0, ${opacity}) 0%, rgba(255, 180, 50, ${opacity * 0.5}) 50%, transparent 100%)`,
                boxShadow: `0 0 ${size}px ${size / 3}px rgba(255, 200, 100, ${opacity * 0.6})`,
              }}
              initial={{ scale: 1, opacity: opacity }}
              animate={{ scale: 0.5, opacity: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
