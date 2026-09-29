#!/usr/bin/env npx tsx

/**
 * Upload images to ImageKit CDN
 *
 * Usage:
 *   npx tsx scripts/upload-to-imagekit.ts              # Skip existing files
 *   npx tsx scripts/upload-to-imagekit.ts --force      # Overwrite all files
 *   npx tsx scripts/upload-to-imagekit.ts --dry-run    # Preview without uploading
 *   npx tsx scripts/upload-to-imagekit.ts --filter hero # Only upload hero images
 */

import {
  parseArgs,
  createClient,
  uploadImages,
  displaySummary,
  IMAGES_TO_UPLOAD,
} from "./imagekit";

async function main(): Promise<void> {
  const args = parseArgs();

  // Display configuration
  console.log("\n🖼️  ImageKit Upload");
  console.log("═".repeat(50));
  console.log(`Force:    ${args.force ? "Yes (overwrite existing)" : "No (skip existing)"}`);
  console.log(`Dry Run:  ${args.dryRun ? "Yes" : "No"}`);
  if (args.filter) {
    console.log(`Filter:   "${args.filter}"`);
  }
  console.log("═".repeat(50));

  // Create ImageKit client
  const imagekit = createClient();

  // Upload images
  const summary = await uploadImages(imagekit, IMAGES_TO_UPLOAD, args);

  // Display summary
  displaySummary(summary, args);

  // Exit with error if any uploads failed
  if (summary.failed.length > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
