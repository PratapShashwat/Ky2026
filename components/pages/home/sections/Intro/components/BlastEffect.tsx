"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useIntro } from "../context/IntroContext";

export function BlastEffect() {
  const { phase, startVideo } = useIntro();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/audio/explosion.mp3");
      audioRef.current.volume = 0.5;
    }
  }, []);

  useEffect(() => {
    if (phase === "blasting") {
      // Play explosion sound
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
      
      // Transition to video after blast animation completes
      const timer = setTimeout(() => {
        startVideo();
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [phase, startVideo]);

  if (phase !== "blasting") return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      {/* Core bright flash */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, #FFFFFF 0%, #FFF8DC 20%, #FFD700 40%, transparent 70%)",
        }}
        initial={{ width: 0, height: 0, opacity: 1 }}
        animate={{
          width: ["0vw", "50vw", "300vw"],
          height: ["0vw", "50vw", "300vw"],
          opacity: [1, 1, 0],
        }}
        transition={{
          duration: 1.5,
          times: [0, 0.3, 1],
          ease: "easeOut",
        }}
      />

      {/* Golden ring expanding */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-amber-400"
        initial={{ width: 0, height: 0, opacity: 1 }}
        animate={{
          width: ["0vw", "200vw"],
          height: ["0vw", "200vw"],
          opacity: [1, 0],
          borderWidth: ["4px", "1px"],
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        style={{
          boxShadow: "0 0 60px 20px rgba(255, 180, 50, 0.6)",
        }}
      />

      {/* Second golden ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-orange-400"
        initial={{ width: 0, height: 0, opacity: 1 }}
        animate={{
          width: ["0vw", "180vw"],
          height: ["0vw", "180vw"],
          opacity: [0.8, 0],
        }}
        transition={{
          duration: 1.4,
          ease: "easeOut",
          delay: 0.1,
        }}
        style={{
          boxShadow: "0 0 40px 15px rgba(255, 150, 50, 0.5)",
        }}
      />

      {/* Warm color burst layer */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 200, 100, 0.9) 0%, rgba(255, 150, 50, 0.6) 30%, rgba(255, 100, 50, 0.3) 50%, transparent 70%)",
        }}
        initial={{ width: 0, height: 0, opacity: 1 }}
        animate={{
          width: ["0vw", "250vw"],
          height: ["0vw", "250vw"],
          opacity: [1, 0.6, 0],
        }}
        transition={{
          duration: 1.5,
          times: [0, 0.4, 1],
          ease: "easeOut",
          delay: 0.05,
        }}
      />

      {/* Light rays - more prominent */}
      {[...Array(16)].map((_, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute top-1/2 left-1/2 origin-bottom"
          style={{
            width: i % 2 === 0 ? "6px" : "3px",
            height: "150vh",
            background: i % 2 === 0 
              ? "linear-gradient(to top, transparent, rgba(255, 215, 0, 0.9), rgba(255, 255, 255, 0.8), transparent)"
              : "linear-gradient(to top, transparent, rgba(255, 180, 50, 0.6), transparent)",
            transform: `translate(-50%, -100%) rotate(${i * 22.5}deg)`,
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{
            scaleY: [0, 1.5, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.2,
            times: [0, 0.4, 1],
            ease: "easeOut",
            delay: 0.1 + i * 0.02,
          }}
        />
      ))}

      {/* Particle sparks - golden */}
      {[...Array(30)].map((_, i) => {
        const angle = (i / 30) * Math.PI * 2;
        const distance = 40 + Math.random() * 40;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const size = 2 + Math.random() * 4;

        return (
          <motion.div
            key={`spark-${i}`}
            className="absolute top-1/2 left-1/2 rounded-full"
            style={{
              width: size,
              height: size,
              background: i % 3 === 0 ? "#FFD700" : i % 3 === 1 ? "#FFA500" : "#FFFFFF",
              boxShadow: `0 0 ${size * 3}px ${size}px rgba(255, 200, 100, 0.8)`,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: `${x}vw`,
              y: `${y}vh`,
              opacity: [1, 1, 0],
              scale: [1, 0.8, 0],
            }}
            transition={{
              duration: 1 + Math.random() * 0.5,
              times: [0, 0.5, 1],
              ease: "easeOut",
              delay: 0.15 + Math.random() * 0.1,
            }}
          />
        );
      })}

      {/* Floating embers */}
      {[...Array(20)].map((_, i) => {
        const startX = -50 + Math.random() * 100;
        const startY = 50 + Math.random() * 30;

        return (
          <motion.div
            key={`ember-${i}`}
            className="absolute rounded-full"
            style={{
              width: 3,
              height: 3,
              left: `${startX}%`,
              top: `${startY}%`,
              background: "#FFD700",
              boxShadow: "0 0 6px 2px rgba(255, 200, 50, 0.8)",
            }}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [0, -100 - Math.random() * 200],
              x: (Math.random() - 0.5) * 100,
            }}
            transition={{
              duration: 2 + Math.random(),
              times: [0, 0.1, 0.7, 1],
              ease: "easeOut",
              delay: 0.3 + Math.random() * 0.3,
            }}
          />
        );
      })}
    </div>
  );
}
