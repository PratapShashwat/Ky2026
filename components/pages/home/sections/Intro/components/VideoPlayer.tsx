"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useIntro } from "../context/IntroContext";

export function VideoPlayer() {
  const { phase } = useIntro();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (phase === "video" && videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, [phase]);

  // Only show during video phase (not complete - hero takes over then)
  if (phase !== "video") return null;

  return (
    <motion.div
      className="absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src="/intro/concertStage.webm"
        loop
        muted
        playsInline
      />
      
      {/* Gradient overlays for better UI visibility */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to bottom, 
              rgba(0,0,0,0.4) 0%, 
              transparent 20%, 
              transparent 60%, 
              rgba(0,0,0,0.6) 100%
            )
          `
        }}
      />

      {/* Title overlay - Kashi Yatra */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider"
          style={{
            background: "linear-gradient(180deg, #FFD700 0%, #FFA500 50%, #DAA520 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 40px rgba(255, 200, 50, 0.3)",
            filter: "drop-shadow(0 0 20px rgba(255, 180, 50, 0.4))",
          }}
        >
          KASHI YATRA
        </h1>
        <motion.p
          className="mt-4 text-lg md:text-xl text-amber-200/80 tracking-[0.3em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          — 2027 —
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
