"use client";

import { memo } from "react";
import Image from "next/image";
import { IMAGES } from "@/lib/images";

interface BHUGateProps {
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * BHU Gate with Mahamana statue
 * Used on both mobile and desktop
 */
export const BHUGate = memo(function BHUGate({ ref }: BHUGateProps) {
  return (
    <div
      ref={ref}
      className="absolute left-[50.7%] -translate-x-1/2 w-[70%] sm:w-[48%] bottom-[45px] sm:bottom-[-170px]"
      style={{ zIndex: 10 }}
    >
      {/* Mahamana statue - positioned in center archway */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[58%] sm:w-[58%] z-[5] bottom-[18px] sm:bottom-[292px]">
        <Image
          src={IMAGES.vibes.mahamana}
          alt="Mahamana Malviya"
          width={500}
          height={600}
          className="w-full h-auto"
          style={{ filter: "drop-shadow(0 0 15px rgba(255,215,0,0.3))" }}
        />
      </div>

      {/* Gate image on top */}
      <Image
        src={IMAGES.vibes.bhuGate}
        alt="IIT BHU Gate"
        width={1400}
        height={900}
        className="sm:bottom-61 bottom-0 absolute z-10"
        style={{
          filter: "drop-shadow(0 0 40px rgba(255,215,0,0.3)) drop-shadow(0 15px 30px rgba(0,0,0,0.5))",
        }}
        priority
      />
    </div>
  );
});
