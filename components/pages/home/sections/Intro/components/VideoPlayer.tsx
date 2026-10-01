"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useIntro } from "../context/IntroContext";
import { IMAGES } from "@/lib/images";
import Image from "next/image";

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

      {/* Title overlay - Kashi Yatra Logo */}
      <motion.div
        className="absolute top-[-3%] left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1.2 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <Image
          src={IMAGES.intro.logo}
          alt="Kashi Yatra 2027"
          width={500}
          height={200}
          className="object-contain drop-shadow-[0_0_40px_rgba(255,200,50,0.5)]"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
