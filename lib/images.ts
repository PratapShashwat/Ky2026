/**
 * Global Image Configuration
 *
 * Centralized image URLs for the entire project.
 * ALL images served from ImageKit CDN for optimal performance.
 *
 * Organization:
 * - common/ = used on both mobile and desktop
 * - desktop/ = desktop-only (hidden on mobile)
 * - mobile/ = mobile-only (hidden on desktop)
 */

const IMAGEKIT_BASE = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

export const IMAGES = {
  // ============================================
  // PASSES - All common (shown on both platforms)
  // ============================================
  passes: {
    yatri: `${IMAGEKIT_BASE}/passes/yatri-pass.png`,
    darbar: `${IMAGEKIT_BASE}/passes/darbar-pass.png`,
    swarnim: `${IMAGEKIT_BASE}/passes/swarnim-pass.png`,
  },

  // ============================================
  // HERO SECTION - All common
  // ============================================
  hero: {
    logo: `${IMAGEKIT_BASE}/hero/common/kashiyatra-logo.png`,
    ghatsDay: `${IMAGEKIT_BASE}/hero/common/ghats-day.png`,
    ghatsNight: `${IMAGEKIT_BASE}/hero/common/ghats-night.png`,
    temple: `${IMAGEKIT_BASE}/hero/common/kashivishwanath-temple.png`,
    varanasiBack: `${IMAGEKIT_BASE}/hero/common/varanasi-back.png`,
    steppingStone: `${IMAGEKIT_BASE}/hero/common/stepping-stone.png`,
    kites: `${IMAGEKIT_BASE}/hero/common/kites.png`,
  },

  // ============================================
  // NAVBAR - All common
  // ============================================
  navbar: {
    background: `${IMAGEKIT_BASE}/navbar/common/nav-bg.png`,
    badge: `${IMAGEKIT_BASE}/navbar/common/nav-badge.png`,
  },

  // ============================================
  // BANARASI VIBES SECTION
  // ============================================
  vibes: {
    // Common (both platforms)
    background: `${IMAGEKIT_BASE}/vibes/common/vibes-bg.png`,
    mahamana: `${IMAGEKIT_BASE}/vibes/common/mahamana.png`,
    bhuGate: `${IMAGEKIT_BASE}/vibes/common/bhu-gate.png`,
    rickshaw: `${IMAGEKIT_BASE}/vibes/common/rickshaw.png`,

    // Desktop-only decorative characters
    mandala: `${IMAGEKIT_BASE}/vibes/desktop/mandala.png`,
    gangaAartiSaint: `${IMAGEKIT_BASE}/vibes/desktop/ganga-aarti-saint.png`,
    bharatnatyamDancer: `${IMAGEKIT_BASE}/vibes/desktop/bharatnatyam-dancer.png`,

    // Mobile-only decorative elements
    mobile: {
      rangoliBg: `${IMAGEKIT_BASE}/vibes/mobile/rangoli-bg.png`,
      trishul: `${IMAGEKIT_BASE}/vibes/mobile/trishul.png`,
      lotusPairs: `${IMAGEKIT_BASE}/vibes/mobile/lotus-pairs.png`,
      etherealDancer: `${IMAGEKIT_BASE}/vibes/mobile/ethereal-dancer.png`,
      diyaPairs: `${IMAGEKIT_BASE}/vibes/mobile/diya-pairs.png`,
      conchShell: `${IMAGEKIT_BASE}/vibes/mobile/conch-shell.png`,
      varanasiSilhouette: `${IMAGEKIT_BASE}/vibes/mobile/varanasi-silhouette.png`,
    },
  },

  // ============================================
  // FEST HIGHLIGHTS SECTION
  // ============================================
  highlights: {
    // Common
    durgaTemple: `${IMAGEKIT_BASE}/highlights/common/durga-temple.svg`,
    // Desktop-only
    durga: `${IMAGEKIT_BASE}/highlights/desktop/durga.svg`,
  },

  // ============================================
  // FESTIVAL VIBES / THE EXPERIENCE SECTION
  // ============================================
  festivalVibes: {
    dj: `${IMAGEKIT_BASE}/festival-vibes/common/dj.png`,
    sareeDrape: `${IMAGEKIT_BASE}/festival-vibes/common/saree-drape.png`,
  },

  // ============================================
  // PRO NITES SECTION
  // ============================================
  proNites: {
    dancingGirl: `${IMAGEKIT_BASE}/pro-nites/common/dancing-girl.png`,
    moon: `${IMAGEKIT_BASE}/pro-nites/common/moon.png`,
    silhouette: `${IMAGEKIT_BASE}/pro-nites/common/silhouette.png`,
    aerobics: `${IMAGEKIT_BASE}/pro-nites/common/aerobics.png`,
  },

  // ============================================
  // FOOTER SECTION - Desktop decorative elements
  // ============================================
  footer: {
    etherealDancer: `${IMAGEKIT_BASE}/footer/desktop/ethereal-dancer.png?v=3`,
    floatingGarland: `${IMAGEKIT_BASE}/footer/desktop/floating-garland.png`,
    ghatSilhouette: `${IMAGEKIT_BASE}/footer/desktop/ghat-silhouette.png`,
    subtleRangoli: `${IMAGEKIT_BASE}/footer/desktop/subtle-rangoli.png`,
  },

  // ============================================
  // MISCELLANEOUS
  // ============================================
  misc: {
    lordShiva: `${IMAGEKIT_BASE}/misc/lord-shiva.png`,
    welcomeFlag: `${IMAGEKIT_BASE}/misc/welcome-flag.png`,
  },

  // ============================================
  // ABOUT PAGE - All common
  // ============================================
  about: {
    mandalaOrnament: `${IMAGEKIT_BASE}/about/common/mandala-ornament.png`,
    peacock: `${IMAGEKIT_BASE}/about/common/peacock.png`,
    omLotus: `${IMAGEKIT_BASE}/about/common/om-lotus.png`,
    mysticDivider: `${IMAGEKIT_BASE}/about/common/mystic-divider.png`,
    diyaCluster: `${IMAGEKIT_BASE}/about/common/diya-cluster.png`,
    cornerOrnament: `${IMAGEKIT_BASE}/about/common/corner-ornament.png`,
    bhuGate: `${IMAGEKIT_BASE}/about/common/bhu-royal-gate.png`,
    ghatsSilhouette: `${IMAGEKIT_BASE}/about/common/ghats-silhouette.png`,
  },

  // ============================================
  // CONTACT PAGE - All common
  // ============================================
  contact: {
    // Contact-specific images
    envelopeScroll: `${IMAGEKIT_BASE}/contact/common/envelope-scroll.png`,
    conch: `${IMAGEKIT_BASE}/contact/common/conch.png`,
    lotusMandala: `${IMAGEKIT_BASE}/contact/common/lotus-mandala.png`,
    floatingDiya: `${IMAGEKIT_BASE}/contact/common/floating-diya.png`,
    // Shared decorative images (reused from about)
    mandalaOrnament: `${IMAGEKIT_BASE}/about/common/mandala-ornament.png`,
    peacock: `${IMAGEKIT_BASE}/about/common/peacock.png`,
    mysticDivider: `${IMAGEKIT_BASE}/about/common/mystic-divider.png`,
    cornerOrnament: `${IMAGEKIT_BASE}/about/common/corner-ornament.png`,
  },

  // ============================================
  // LOGIN PAGE - All common
  // ============================================
  login: {
    mysticGate: `${IMAGEKIT_BASE}/login/common/mystic-gate.png`,
  },
} as const;

/**
 * Helper to get ImageKit URL with transformations
 * @example getImageUrl(IMAGES.passes.yatri, "tr:w-300,q-80")
 */
export function getImageUrl(path: string, transformations?: string): string {
  if (!transformations) return path;

  // Insert transformations after base URL
  const imagePath = path.replace(IMAGEKIT_BASE as string, "");
  return `${IMAGEKIT_BASE}/${transformations}${imagePath}`;
}
