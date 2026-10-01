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
 * DISABLED on mobile/touch devices
 */
export function CursorTrail() {
  const [trails, setTrails] = useState<TrailPoint[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device - no cursor trail needed
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 768;
    setIsTouchDevice(hasTouch || isSmallScreen);
  }, []);

  useEffect(() => {
    // Don't add listeners on touch devices
    if (isTouchDevice) return;

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
  }, [isTouchDevice]);

  // Auto-remove old trail points
  useEffect(() => {
    if (trails.length === 0 || isTouchDevice) return;

    const timer = setTimeout(() => {
      setTrails((prev) => prev.slice(1));
    }, 80);

    return () => clearTimeout(timer);
  }, [trails, isTouchDevice]);

  // Don't render on touch devices
  if (isTouchDevice || !isVisible) return null;

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
