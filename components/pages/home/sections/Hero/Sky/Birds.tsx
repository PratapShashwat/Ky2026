"use client";

import { memo } from "react";

export const FlyingBirds = memo(function FlyingBirds({ className = "" }: { className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 200 60"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ animation: "flyBirds 20s linear infinite" }}
      >
        {/* Bird group 1 */}
        <g fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round">
          <path d="M10,20 Q15,15 20,20 Q25,15 30,20">
            <animate attributeName="d" 
              values="M10,20 Q15,15 20,20 Q25,15 30,20;M10,20 Q15,23 20,20 Q25,23 30,20;M10,20 Q15,15 20,20 Q25,15 30,20" 
              dur="0.4s" repeatCount="indefinite" />
          </path>
          <path d="M35,25 Q40,20 45,25 Q50,20 55,25">
            <animate attributeName="d" 
              values="M35,25 Q40,20 45,25 Q50,20 55,25;M35,25 Q40,28 45,25 Q50,28 55,25;M35,25 Q40,20 45,25 Q50,20 55,25" 
              dur="0.35s" repeatCount="indefinite" />
          </path>
          <path d="M25,35 Q30,30 35,35 Q40,30 45,35">
            <animate attributeName="d" 
              values="M25,35 Q30,30 35,35 Q40,30 45,35;M25,35 Q30,38 35,35 Q40,38 45,35;M25,35 Q30,30 35,35 Q40,30 45,35" 
              dur="0.45s" repeatCount="indefinite" />
          </path>
        </g>

        {/* Bird group 2 */}
        <g fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round">
          <path d="M70,15 Q75,10 80,15 Q85,10 90,15">
            <animate attributeName="d" 
              values="M70,15 Q75,10 80,15 Q85,10 90,15;M70,15 Q75,18 80,15 Q85,18 90,15;M70,15 Q75,10 80,15 Q85,10 90,15" 
              dur="0.38s" repeatCount="indefinite" />
          </path>
          <path d="M85,30 Q90,25 95,30 Q100,25 105,30">
            <animate attributeName="d" 
              values="M85,30 Q90,25 95,30 Q100,25 105,30;M85,30 Q90,33 95,30 Q100,33 105,30;M85,30 Q90,25 95,30 Q100,25 105,30" 
              dur="0.42s" repeatCount="indefinite" />
          </path>
          <path d="M60,40 Q65,35 70,40 Q75,35 80,40">
            <animate attributeName="d" 
              values="M60,40 Q65,35 70,40 Q75,35 80,40;M60,40 Q65,43 70,40 Q75,43 80,40;M60,40 Q65,35 70,40 Q75,35 80,40" 
              dur="0.36s" repeatCount="indefinite" />
          </path>
        </g>

        {/* Bird group 3 */}
        <g fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round">
          <path d="M120,22 Q125,17 130,22 Q135,17 140,22">
            <animate attributeName="d" 
              values="M120,22 Q125,17 130,22 Q135,17 140,22;M120,22 Q125,25 130,22 Q135,25 140,22;M120,22 Q125,17 130,22 Q135,17 140,22" 
              dur="0.4s" repeatCount="indefinite" />
          </path>
          <path d="M140,35 Q145,30 150,35 Q155,30 160,35">
            <animate attributeName="d" 
              values="M140,35 Q145,30 150,35 Q155,30 160,35;M140,35 Q145,38 150,35 Q155,38 160,35;M140,35 Q145,30 150,35 Q155,30 160,35" 
              dur="0.37s" repeatCount="indefinite" />
          </path>
          <path d="M155,18 Q160,13 165,18 Q170,13 175,18">
            <animate attributeName="d" 
              values="M155,18 Q160,13 165,18 Q170,13 175,18;M155,18 Q160,21 165,18 Q170,21 175,18;M155,18 Q160,13 165,18 Q170,13 175,18" 
              dur="0.43s" repeatCount="indefinite" />
          </path>
        </g>

        {/* Smaller distant birds */}
        <g fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" strokeLinecap="round" opacity="0.7">
          <path d="M50,8 Q53,5 56,8 Q59,5 62,8">
            <animate attributeName="d" 
              values="M50,8 Q53,5 56,8 Q59,5 62,8;M50,8 Q53,10 56,8 Q59,10 62,8;M50,8 Q53,5 56,8 Q59,5 62,8" 
              dur="0.3s" repeatCount="indefinite" />
          </path>
          <path d="M100,45 Q103,42 106,45 Q109,42 112,45">
            <animate attributeName="d" 
              values="M100,45 Q103,42 106,45 Q109,42 112,45;M100,45 Q103,47 106,45 Q109,47 112,45;M100,45 Q103,42 106,45 Q109,42 112,45" 
              dur="0.32s" repeatCount="indefinite" />
          </path>
          <path d="M170,42 Q173,39 176,42 Q179,39 182,42">
            <animate attributeName="d" 
              values="M170,42 Q173,39 176,42 Q179,39 182,42;M170,42 Q173,44 176,42 Q179,44 182,42;M170,42 Q173,39 176,42 Q179,39 182,42" 
              dur="0.35s" repeatCount="indefinite" />
          </path>
        </g>
      </svg>
    </div>
  );
});
