"use client";

import {
  Mail,
  User,
  Shield,
  Calendar,
  Phone,
  GraduationCap,
  FileCheck,
  CheckCircle2,
  XCircle,
  BadgeCheck,
} from "lucide-react";
import {
  COLORS,
  UserData,
  ProgressData,
  ProfileUser,
} from "../constants/palette";

// ═══════════════════════════════════════════════════════════════════
// DETAILED INFO SECTION
// Account information cards and verification status
// ═══════════════════════════════════════════════════════════════════

interface DetailedInfoProps {
  userData: UserData | null;
  user: ProfileUser;
  progress: ProgressData | null;
}

export function DetailedInfo({ userData, user, progress }: DetailedInfoProps) {
  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Left Column - Account Info Cards */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4a853]/40 to-[#d4a853]/20" />
          <h3
            className="text-lg font-semibold flex items-center gap-3 shrink-0"
            style={{ color: COLORS.CREAM }}
          >
            <div
              className="p-2 rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${COLORS.GOLD}20, ${COLORS.GOLD}10)`,
                border: `1px solid ${COLORS.GOLD}30`,
              }}
            >
              <User className="h-4 w-4" style={{ color: COLORS.GOLD }} />
            </div>
            <span style={{ fontFamily: "var(--font-ethereal), serif" }}>
              Account Information
            </span>
          </h3>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#d4a853]/40 to-[#d4a853]/20" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoCard
            icon={Mail}
            label="Email Address"
            value={userData?.email || user.email || null}
            isVerified
          />
          <InfoCard
            icon={Phone}
            label="Phone Number"
            value={userData?.phone || null}
            isVerified={progress?.steps.phone}
          />
          <InfoCard
            icon={GraduationCap}
            label="College"
            value={userData?.college || null}
            isVerified={progress?.steps.college}
          />
          <InfoCard
            icon={Shield}
            label="Aadhaar (Last 4)"
            value={
              userData?.aadhaarLast4
                ? `XXXX XXXX ${userData.aadhaarLast4}`
                : null
            }
            isVerified={progress?.steps.aadhaar}
          />
          <InfoCard
            icon={Calendar}
            label="Member Since"
            value={formatDate(userData?.createdAt || null)}
          />
          <InfoCard
            icon={User}
            label="Gender"
            value={userData?.gender || null}
          />
        </div>
      </div>

      {/* Right Column - Verification Status */}
      <div className="space-y-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4a853]/40 to-[#d4a853]/20" />
          <h3
            className="text-lg font-semibold flex items-center gap-3 shrink-0"
            style={{ color: COLORS.CREAM }}
          >
            <div
              className="p-2 rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${COLORS.GOLD}20, ${COLORS.GOLD}10)`,
                border: `1px solid ${COLORS.GOLD}30`,
              }}
            >
              <FileCheck className="h-4 w-4" style={{ color: COLORS.GOLD }} />
            </div>
            <span style={{ fontFamily: "var(--font-ethereal), serif" }}>
              Verification
            </span>
          </h3>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#d4a853]/40 to-[#d4a853]/20" />
        </div>

        <div
          className="relative rounded-2xl p-6 overflow-hidden"
          style={{
            background: `linear-gradient(145deg, ${COLORS.BG_ROYAL}95 0%, ${COLORS.BG_WINE}80 100%)`,
            border: `1px solid ${COLORS.GOLD}20`,
            boxShadow: `0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 ${COLORS.GOLD}10`,
          }}
        >
          {/* Decorative corner accents */}
          <div
            className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 rounded-tl-lg opacity-30"
            style={{ borderColor: COLORS.GOLD }}
          />
          <div
            className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 rounded-tr-lg opacity-30"
            style={{ borderColor: COLORS.GOLD }}
          />
          <div
            className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 rounded-bl-lg opacity-30"
            style={{ borderColor: COLORS.GOLD }}
          />
          <div
            className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 rounded-br-lg opacity-30"
            style={{ borderColor: COLORS.GOLD }}
          />

          <div className="relative space-y-3">
            <VerificationStep
              icon={Shield}
              label="Aadhaar Verified"
              isCompleted={progress?.steps.aadhaar || false}
              description={
                progress?.steps.aadhaar
                  ? "Identity confirmed"
                  : "Upload your Aadhaar"
              }
            />
            <VerificationStep
              icon={GraduationCap}
              label="College Details"
              isCompleted={progress?.steps.college || false}
              description={
                progress?.steps.college
                  ? "Institution verified"
                  : "Add your college"
              }
            />
            <VerificationStep
              icon={Phone}
              label="Phone Verified"
              isCompleted={progress?.steps.phone || false}
              description={
                progress?.steps.phone
                  ? "Contact confirmed"
                  : "Verify your number"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// INFO CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════
function InfoCard({
  icon: Icon,
  label,
  value,
  isVerified,
}: {
  icon: React.ElementType;
  label: string;
  value: string | null;
  isVerified?: boolean;
}) {
  return (
    <div
      className="relative rounded-2xl p-5 transition-all duration-300 hover:translate-y-[-3px] hover:shadow-xl group overflow-hidden"
      style={{
        background: `linear-gradient(145deg, ${COLORS.BG_ROYAL}95 0%, ${COLORS.BG_WINE}80 100%)`,
        border: `1px solid ${COLORS.GOLD}20`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 ${COLORS.GOLD}10`,
      }}
    >
      {/* Hover glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${COLORS.GOLD}08 0%, transparent 70%)`,
        }}
      />

      <div className="relative flex items-start gap-4">
        <div
          className="p-3.5 rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${COLORS.GOLD}15, ${COLORS.GOLD}08)`,
            border: `1px solid ${COLORS.GOLD}25`,
            boxShadow: `0 4px 15px ${COLORS.GOLD}10`,
          }}
        >
          <Icon className="h-5 w-5" style={{ color: COLORS.GOLD }} />
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="text-xs uppercase tracking-wider mb-1.5 flex items-center gap-2 font-semibold"
            style={{ color: `${COLORS.GOLD}80` }}
          >
            {label}
            {isVerified && (
              <BadgeCheck
                className="h-3.5 w-3.5"
                style={{ color: COLORS.SUCCESS }}
              />
            )}
          </p>
          <p
            className="text-base font-medium truncate"
            style={{ color: value ? COLORS.CREAM : `${COLORS.CREAM}40` }}
          >
            {value || "Not provided"}
          </p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// VERIFICATION STEP ITEM
// ═══════════════════════════════════════════════════════════════════
function VerificationStep({
  icon: Icon,
  label,
  isCompleted,
  description,
}: {
  icon: React.ElementType;
  label: string;
  isCompleted: boolean;
  description: string;
}) {
  return (
    <div
      className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300"
      style={{
        background: isCompleted ? `${COLORS.SUCCESS}08` : `${COLORS.ERROR}05`,
        border: `1px solid ${isCompleted ? `${COLORS.SUCCESS}30` : `${COLORS.ERROR}20`}`,
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{
          background: isCompleted
            ? `linear-gradient(135deg, ${COLORS.SUCCESS}20, ${COLORS.SUCCESS}10)`
            : `linear-gradient(135deg, ${COLORS.GOLD}15, ${COLORS.GOLD}08)`,
          border: `1px solid ${isCompleted ? `${COLORS.SUCCESS}40` : `${COLORS.GOLD}25`}`,
        }}
      >
        <Icon
          className="h-5 w-5"
          style={{ color: isCompleted ? COLORS.SUCCESS : COLORS.GOLD }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p
            className="font-semibold"
            style={{ color: isCompleted ? COLORS.SUCCESS : COLORS.CREAM }}
          >
            {label}
          </p>
          {isCompleted ? (
            <CheckCircle2
              className="h-4 w-4"
              style={{ color: COLORS.SUCCESS }}
            />
          ) : (
            <XCircle className="h-4 w-4" style={{ color: COLORS.ERROR }} />
          )}
        </div>
        <p className="text-sm" style={{ color: `${COLORS.CREAM}50` }}>
          {description}
        </p>
      </div>
    </div>
  );
}
