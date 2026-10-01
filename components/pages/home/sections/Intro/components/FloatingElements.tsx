"use client";

import { motion } from "framer-motion";
import { useIntro } from "../context/IntroContext";

/**
 * Floating diamond elements
 * - IDLE: Spread across screen with smooth animations
 * - HOLDING: Form PERFECT circle around button center
 * - Smooth transitions between states (no jitter)
 */
export function FloatingElements() {
  const { phase, loadProgress } = useIntro();
  
  const isLoading = phase === "loading";
  const intensity = loadProgress / 100;

  return (
    <div className="absolute inset-0 pointer-events-none">
      <GeometricShards isLoading={isLoading} intensity={intensity} />
    </div>
  );
}

function GeometricShards({ isLoading, intensity }: { isLoading: boolean; intensity: number }) {
  const orbitRadius = 130;
  const diamondSize = 22;
  
  const shards = [
    { idleX: -400, idleY: -250 },
    { idleX: 380, idleY: -230 },
    { idleX: 450, idleY: 50 },
    { idleX: 350, idleY: 250 },
    { idleX: -80, idleY: 310 },
    { idleX: -400, idleY: 210 },
    { idleX: -480, idleY: 0 },
    { idleX: -200, idleY: -290 },
  ];

  const centerOffsetY = 32;

  return (
    <>
      {shards.map((shard, i) => {
        const angleDeg = i * 45;
        const angleRad = (angleDeg * Math.PI) / 180;
        const orbitX = Math.cos(angleRad) * orbitRadius;
        const orbitY = Math.sin(angleRad) * orbitRadius;
        
        return (
          <motion.div
            key={`shard-${i}`}
            className="absolute"
            style={{
              left: "50%",
              top: "50%",
              marginTop: centerOffsetY,
            }}
          >
            {/* Position animation - SMOOTH transition both ways */}
            <motion.div
              animate={{
                x: isLoading ? orbitX : shard.idleX,
                y: isLoading ? orbitY : shard.idleY,
              }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                mass: 1,
              }}
            >
              {/* Opacity - smooth */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: isLoading ? 0.7 + intensity * 0.3 : 0.55,
                }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeInOut",
                }}
              >
                {/* Idle pulsing - only active when NOT loading */}
                <motion.div
                  animate={{
                    opacity: isLoading ? 1 : [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 4 + i * 0.3,
                    repeat: isLoading ? 0 : Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {/* Idle floating - only when NOT loading */}
                  <motion.div
                    animate={{
                      x: isLoading ? 0 : [0, 6, -4, 0],
                      y: isLoading ? 0 : [0, -6, 4, 0],
                    }}
                    transition={{
                      duration: 8 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Orbit rotation */}
                    <motion.div
                      animate={{
                        rotate: isLoading ? 360 : 0,
                      }}
                      transition={{
                        duration: isLoading ? Math.max(1.5, 4 - intensity * 2.5) : 0.8,
                        repeat: isLoading ? Infinity : 0,
                        ease: isLoading ? "linear" : "easeOut",
                      }}
                      style={{
                        transformOrigin: `${-orbitX}px ${-orbitY}px`,
                      }}
                    >
                      {/* Counter-rotate */}
                      <motion.div
                        animate={{
                          rotate: isLoading ? -360 : 0,
                          scale: isLoading ? 1 + intensity * 0.3 : 1,
                        }}
                        transition={{
                          rotate: {
                            duration: isLoading ? Math.max(1.5, 4 - intensity * 2.5) : 0.8,
                            repeat: isLoading ? Infinity : 0,
                            ease: isLoading ? "linear" : "easeOut",
                          },
                          scale: { duration: 0.3 },
                        }}
                      >
                        <DiamondSVG 
                          size={diamondSize} 
                          index={i} 
                          isLoading={isLoading} 
                          intensity={intensity} 
                        />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
    </>
  );
}

function DiamondSVG({ 
  size, 
  index, 
  isLoading, 
  intensity 
}: { 
  size: number; 
  index: number; 
  isLoading: boolean; 
  intensity: number;
}) {
  const glowSize = isLoading ? 8 + intensity * 15 : 6;
  const glowOpacity = isLoading ? 0.6 + intensity * 0.4 : 0.45;
  
  return (
    <svg 
      width={size} 
      height={size * 1.5} 
      viewBox="0 0 30 45"
      style={{
        marginLeft: -size / 2,
        marginTop: -size * 0.75,
        filter: `drop-shadow(0 0 ${glowSize}px rgba(255, 200, 100, ${glowOpacity}))`,
      }}
    >
      <defs>
        <linearGradient id={`dg-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF8DC" stopOpacity={isLoading ? 0.95 : 0.65} />
          <stop offset="50%" stopColor="#FFD700" stopOpacity={isLoading ? 0.85 : 0.5} />
          <stop offset="100%" stopColor="#FFEC8B" stopOpacity={isLoading ? 0.9 : 0.55} />
        </linearGradient>
      </defs>
      
      <path
        d="M15 0 L30 20 L15 45 L0 20 Z"
        fill={`url(#dg-${index})`}
        stroke={isLoading ? "rgba(255, 236, 139, 0.9)" : "rgba(255, 236, 139, 0.5)"}
        strokeWidth="1"
      />
      
      <path
        d="M15 5 L25 20 L15 40 L5 20 Z"
        fill="none"
        stroke={isLoading ? "rgba(255, 255, 255, 0.6)" : "rgba(255, 255, 255, 0.25)"}
        strokeWidth="0.5"
      />
    </svg>
  );
}
