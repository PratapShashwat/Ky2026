/**
 * Upload ALL images to ImageKit
 *
 * Usage:
 *   npx tsx scripts/upload-to-imagekit.ts          # skip existing files
 *   npx tsx scripts/upload-to-imagekit.ts --force  # overwrite all files
 */

import ImageKit from "imagekit";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env" });

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

// Parse CLI args
const forceUpload = process.argv.includes("--force");

interface ImageToUpload {
  localFile: string;
  remoteName: string;
  folder: string;
}

// Define all images to upload with their target folders
// Organized by: common/, desktop/, mobile/ subfolders
const IMAGES_TO_UPLOAD: ImageToUpload[] = [
  // ============================================
  // PASSES
  // ============================================
  { localFile: "passes/common/yatriPass.png", remoteName: "yatri-pass.png", folder: "/passes" },
  { localFile: "passes/common/darbarPass.png", remoteName: "darbar-pass.png", folder: "/passes" },
  { localFile: "passes/common/swarnimPass.png", remoteName: "swarnim-pass.png", folder: "/passes" },

  // ============================================
  // HERO SECTION - All common
  // ============================================
  { localFile: "home/hero/common/kashiyatra.png", remoteName: "kashiyatra-logo.png", folder: "/hero/common" },
  { localFile: "home/hero/common/ghatsDay.png", remoteName: "ghats-day.png", folder: "/hero/common" },
  { localFile: "home/hero/common/ghatsNight.png", remoteName: "ghats-night.png", folder: "/hero/common" },
  { localFile: "home/hero/common/kashivishwanath.png", remoteName: "kashivishwanath-temple.png", folder: "/hero/common" },
  { localFile: "home/hero/common/varanasiTownBG.png", remoteName: "varanasi-back.png", folder: "/hero/common" },
  { localFile: "home/hero/common/stone.png", remoteName: "stepping-stone.png", folder: "/hero/common" },
  { localFile: "home/hero/common/kites.png", remoteName: "kites.png", folder: "/hero/common" },

  // ============================================
  // NAVBAR - All common
  // ============================================
  { localFile: "navbar/common/navBg.png", remoteName: "nav-bg.png", folder: "/navbar/common" },
  { localFile: "navbar/common/navBadge.png", remoteName: "nav-badge.png", folder: "/navbar/common" },

  // ============================================
  // BANARASI VIBES SECTION
  // ============================================
  // Common
  { localFile: "home/banarasiVibes/common/vibesBG.png", remoteName: "vibes-bg.png", folder: "/vibes/common" },
  { localFile: "home/banarasiVibes/common/mahamana.png", remoteName: "mahamana.png", folder: "/vibes/common" },
  { localFile: "home/banarasiVibes/common/bhuGate.png", remoteName: "bhu-gate.png", folder: "/vibes/common" },
  { localFile: "home/banarasiVibes/common/rickshaw.png", remoteName: "rickshaw.png", folder: "/vibes/common" },

  // Desktop-only
  { localFile: "home/banarasiVibes/desktop/mandala.png", remoteName: "mandala.png", folder: "/vibes/desktop" },
  { localFile: "home/banarasiVibes/desktop/gangaArtiSaint.png", remoteName: "ganga-aarti-saint.png", folder: "/vibes/desktop" },
  { localFile: "home/banarasiVibes/desktop/bharatnatiyamDancer.png", remoteName: "bharatnatyam-dancer.png", folder: "/vibes/desktop" },

  // Mobile-only
  { localFile: "home/banarasiVibes/mobile/rangoliBg.png", remoteName: "rangoli-bg.png", folder: "/vibes/mobile" },
  { localFile: "home/banarasiVibes/mobile/trishul.png", remoteName: "trishul.png", folder: "/vibes/mobile" },
  { localFile: "home/banarasiVibes/mobile/lotusPairs.png", remoteName: "lotus-pairs.png", folder: "/vibes/mobile" },
  { localFile: "home/banarasiVibes/mobile/etherealDancer.png", remoteName: "ethereal-dancer.png", folder: "/vibes/mobile" },
  { localFile: "home/banarasiVibes/mobile/diyaPairs.png", remoteName: "diya-pairs.png", folder: "/vibes/mobile" },
  { localFile: "home/banarasiVibes/mobile/conchShell.png", remoteName: "conch-shell.png", folder: "/vibes/mobile" },
  { localFile: "home/banarasiVibes/mobile/varanasiSaloutte.png", remoteName: "varanasi-silhouette.png", folder: "/vibes/mobile" },

  // ============================================
  // FEST HIGHLIGHTS
  // ============================================
  { localFile: "home/festiveHighlights/common/durga_temple.svg", remoteName: "durga-temple.svg", folder: "/highlights/common" },
  { localFile: "home/festiveHighlights/desktop/durga.svg", remoteName: "durga.svg", folder: "/highlights/desktop" },

  // ============================================
  // FESTIVAL VIBES / THE EXPERIENCE
  // ============================================
  { localFile: "home/theExperience/common/baddie.png", remoteName: "dj.png", folder: "/festival-vibes/common" },
  { localFile: "home/theExperience/common/sareeDrape.png", remoteName: "saree-drape.png", folder: "/festival-vibes/common" },

  // ============================================
  // PRO NITES
  // ============================================
  { localFile: "home/proNites/common/proNiteDancingGirl.png", remoteName: "dancing-girl.png", folder: "/pro-nites/common" },
  { localFile: "home/proNites/common/moon.png", remoteName: "moon.png", folder: "/pro-nites/common" },
  { localFile: "home/proNites/common/silhoutte.png", remoteName: "silhouette.png", folder: "/pro-nites/common" },
  { localFile: "home/proNites/common/aerobics.png", remoteName: "aerobics.png", folder: "/pro-nites/common" },

  // ============================================
  // FOOTER - Desktop decorative elements
  // ============================================
  { localFile: "home/footer/desktop/dancer.png", remoteName: "ethereal-dancer.png", folder: "/footer/desktop" },
  { localFile: "home/footer/desktop/floatingGarland.png", remoteName: "floating-garland.png", folder: "/footer/desktop" },
  { localFile: "home/footer/desktop/lampCluster.png", remoteName: "lamp-cluster.png", folder: "/footer/desktop" },
  { localFile: "home/footer/desktop/silhoutteGhat.png", remoteName: "ghat-silhouette.png", folder: "/footer/desktop" },
  { localFile: "home/footer/desktop/spiritualOrna.png", remoteName: "spiritual-ornament.png", folder: "/footer/desktop" },
  { localFile: "home/footer/desktop/standingPillar.png", remoteName: "temple-pillar.png", folder: "/footer/desktop" },
  { localFile: "home/footer/desktop/subtleRangoli.png", remoteName: "subtle-rangoli.png", folder: "/footer/desktop" },

  // ============================================
  // MISCELLANEOUS
  // ============================================
  { localFile: "miscellaneous/common/lord_shiva.png", remoteName: "lord-shiva.png", folder: "/misc" },
  { localFile: "miscellaneous/common/welcomeFlag.png", remoteName: "welcome-flag.png", folder: "/misc" },

  // ============================================
  // ABOUT PAGE - All common
  // ============================================
  { localFile: "about/common/mandlaOrnament.png", remoteName: "mandala-ornament.png", folder: "/about/common" },
  { localFile: "about/common/peacock_nobg.png", remoteName: "peacock.png", folder: "/about/common" },
  { localFile: "about/common/omLotus.png", remoteName: "om-lotus.png", folder: "/about/common" },
  { localFile: "about/common/mysticDivider.png", remoteName: "mystic-divider.png", folder: "/about/common" },
  { localFile: "about/common/diyaCluster.png", remoteName: "diya-cluster.png", folder: "/about/common" },
  { localFile: "about/common/cornerOrnament.png", remoteName: "corner-ornament.png", folder: "/about/common" },
  { localFile: "about/common/bhuRoyalGate.png", remoteName: "bhu-royal-gate.png", folder: "/about/common" },
  { localFile: "about/common/ghatSaloutte.png", remoteName: "ghats-silhouette.png", folder: "/about/common" },

  // ============================================
  // CONTACT PAGE - All common
  // ============================================
  { localFile: "contact/common/envelopeScrolled.png", remoteName: "envelope-scroll.png", folder: "/contact/common" },
  { localFile: "contact/common/conch.png", remoteName: "conch.png", folder: "/contact/common" },
  { localFile: "contact/common/lotusMandla.png", remoteName: "lotus-mandala.png", folder: "/contact/common" },
  { localFile: "contact/common/floatingDiya.png", remoteName: "floating-diya.png", folder: "/contact/common" },

  // ============================================
  // LOGIN PAGE - All common
  // ============================================
  { localFile: "login/common/mysticGate.png", remoteName: "mystic-gate.png", folder: "/login/common" },
];

async function checkIfExists(
  folder: string,
  fileName: string,
): Promise<boolean> {
  try {
    const files = await imagekit.listFiles({
      path: folder,
      name: fileName,
    });
    return files.length > 0;
  } catch {
    return false;
  }
}

async function uploadImage(
  img: ImageToUpload,
  publicDir: string,
): Promise<{ name: string; url: string; skipped?: boolean } | null> {
  const filePath = path.join(publicDir, img.localFile);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping (not found): ${img.localFile}`);
    return null;
  }

  // Check if file already exists on ImageKit (unless --force)
  if (!forceUpload) {
    const exists = await checkIfExists(img.folder, img.remoteName);
    if (exists) {
      console.log(`⏭️  Skipping (exists): ${img.folder}/${img.remoteName}`);
      return {
        name: `${img.folder}/${img.remoteName}`,
        url: "",
        skipped: true,
      };
    }
  }

  const fileBuffer = fs.readFileSync(filePath);
  const base64File = fileBuffer.toString("base64");

  const response = await imagekit.upload({
    file: base64File,
    fileName: img.remoteName,
    folder: img.folder,
    useUniqueFileName: false,
  });

  return { name: `${img.folder}/${img.remoteName}`, url: response.url };
}

async function main() {
  const publicDir = path.join(process.cwd(), "public");

  console.log(
    `🚀 Uploading images to ImageKit... ${forceUpload ? "(FORCE MODE - overwriting all)" : "(skip existing)"}\n`,
  );

  const results: { name: string; url: string }[] = [];
  const skipped: string[] = [];
  const failed: string[] = [];

  for (const img of IMAGES_TO_UPLOAD) {
    try {
      console.log(
        `📤 Uploading ${img.localFile} → ${img.folder}/${img.remoteName}...`,
      );
      const result = await uploadImage(img, publicDir);
      if (result) {
        if (result.skipped) {
          skipped.push(result.name);
        } else {
          results.push(result);
          console.log(`   ✅ ${result.url}\n`);
        }
      }
    } catch (error) {
      console.error(`   ❌ Failed: ${error}\n`);
      failed.push(img.localFile);
    }
  }

  console.log("\n" + "═".repeat(60));
  console.log("📋 UPLOAD SUMMARY");
  console.log("═".repeat(60));
  console.log(`✅ Uploaded: ${results.length}`);
  console.log(`⏭️  Skipped:  ${skipped.length}`);
  console.log(`❌ Failed:   ${failed.length}`);

  if (failed.length > 0) {
    console.log("\nFailed files:", failed.join(", "));
  }
}

main().catch(console.error);
