import React from "react";
import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { COLORS } from "./constants/palette";

const Footer = () => {
  return (
    <>
      <div className="mt-10 flex items-center justify-center gap-4">
        <div
          className="h-px w-20"
          style={{
            background: `linear-gradient(90deg, transparent, ${COLORS.GOLD}40)`,
          }}
        />
        <div className="w-7 h-7 relative">
          <Image
            src={IMAGES.contact.floatingDiya}
            alt=""
            width={28}
            height={28}
            className="object-contain"
          />
        </div>
        <div
          className="h-px w-20"
          style={{
            background: `linear-gradient(90deg, ${COLORS.GOLD}40, transparent)`,
          }}
        />
      </div>
      <p
        className="text-center text-xs mt-3 tracking-widest uppercase"
        style={{ color: `${COLORS.GOLD}50` }}
      >
        Your data is secure and encrypted
      </p>
    </>
  );
};

export default Footer;
