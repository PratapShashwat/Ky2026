"use client";

import { NavbarDesign as Navbar } from "@/components/navbar/Design";
import {
  MyAccountProgressQuery,
  MyAccountProgressResponseType,
} from "@/lib/api/graphql/queries/user.queries";
import { useQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import { StepperIndicator } from "./StepperIndicator";
import { STEPS } from "./config/data";
import { COLORS } from "./constants/palette";
import { AadhaarStep } from "./steps/adhaar/AadhaarStep";
import { CollegeDetailsStep } from "./steps/college/CollegeDetailsStep";
import { PhoneVerificationStep } from "./steps/phone/PhoneVerificationStep";

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════
export function CompleteProfileContent() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<null | number>(null);
  const {
    data,
    loading: stepLoading,
    error,
    refetch: refetchProgress,
  } = useQuery<MyAccountProgressResponseType>(MyAccountProgressQuery, {
    fetchPolicy: "cache-first",
  });

  useEffect(() => {
    if (data?.myAccount?.progress.currentStep !== undefined) {
      setCurrentStep(data.myAccount.progress.currentStep);
    }
  }, [data]);

  if (stepLoading) {
    return;
  }

  if (error) {
  }

  return (
    <>
      {/* Fixed navbar */}
      <div className="fixed inset-x-0 top-0 z-[200]">
        <Navbar position="relative" topOffset={18} />
      </div>

      <main
        className="min-h-screen pt-28 sm:pt-32 pb-12 px-4"
        style={{
          background: `
            radial-gradient(ellipse at 20% 0%, rgba(212,168,83,0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, rgba(139,21,56,0.08) 0%, transparent 50%),
            linear-gradient(180deg, ${COLORS.BG_DEEP} 0%, ${COLORS.BG_ROYAL} 50%, ${COLORS.BG_DEEP} 100%)
          `,
        }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3"
              style={{
                background: `linear-gradient(135deg, ${COLORS.CREAM} 0%, ${COLORS.GOLD_LIGHT} 50%, ${COLORS.GOLD} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Complete Your Profile
            </h1>
            <p style={{ color: `${COLORS.CREAM}60` }}>
              Just a few steps to unlock the full Kashi Yatra experience
            </p>
          </div>

          {/* Stepper Indicator */}
          <div className="mb-10">
            <StepperIndicator
              steps={STEPS}
              currentStep={data?.myAccount?.progress.currentStep}
              completedSteps={data?.myAccount?.progress.completedSteps}
            />
          </div>

          {/* Step Content Card */}
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: `linear-gradient(145deg, ${COLORS.BG_WINE}60 0%, ${COLORS.BG_ROYAL}80 100%)`,
              border: `1px solid ${COLORS.GOLD}20`,
              boxShadow: `0 0 60px ${COLORS.GOLD}05, 0 25px 50px rgba(0,0,0,0.4)`,
            }}
          >
            {/* Decorative top border */}
            <div
              className="h-1"
              style={{
                background: `linear-gradient(90deg, transparent, ${COLORS.GOLD}60, transparent)`,
              }}
            />

            <div className="p-6 sm:p-10">
              {/* Step Content */}
              {currentStep === 1 && <AadhaarStep refetchProgress={refetchProgress} />}
              {currentStep === 2 && <CollegeDetailsStep refetchProgress={refetchProgress} />}
              {currentStep === 3 && <PhoneVerificationStep refetchProgress={refetchProgress} />}
            </div>
          </div>

          {/* Footer Decoration */}
          <Footer />
        </div>
      </main>
    </>
  );
}
