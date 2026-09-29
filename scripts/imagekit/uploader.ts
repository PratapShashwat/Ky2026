import * as fs from "fs";
import * as path from "path";
import type ImageKit from "imagekit";
import type { ImageToUpload, UploadResult, UploadSummary, CliArgs } from "./types";

/**
 * Check if file already exists on ImageKit
 */
async function checkIfExists(
  imagekit: ImageKit,
  folder: string,
  fileName: string
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

/**
 * Upload a single image to ImageKit
 */
async function uploadSingleImage(
  imagekit: ImageKit,
  img: ImageToUpload,
  publicDir: string,
  args: CliArgs
): Promise<UploadResult | null> {
  const filePath = path.join(publicDir, img.localFile);
  const remotePath = `${img.folder}/${img.remoteName}`;

  // Check if local file exists
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Not found: ${img.localFile}`);
    return null;
  }

  // Dry run - just show what would be uploaded
  if (args.dryRun) {
    console.log(`📋 Would upload: ${img.localFile} → ${remotePath}`);
    return { name: remotePath, url: "(dry-run)" };
  }

  // Check if remote file exists (unless --force)
  if (!args.force) {
    const exists = await checkIfExists(imagekit, img.folder, img.remoteName);
    if (exists) {
      console.log(`⏭️  Exists: ${remotePath}`);
      return { name: remotePath, url: "", skipped: true };
    }
  }

  // Read and upload file
  const fileBuffer = fs.readFileSync(filePath);
  const base64File = fileBuffer.toString("base64");

  const response = await imagekit.upload({
    file: base64File,
    fileName: img.remoteName,
    folder: img.folder,
    useUniqueFileName: false,
  });

  console.log(`✅ Uploaded: ${remotePath}`);
  return { name: remotePath, url: response.url };
}

/**
 * Upload all images to ImageKit
 */
export async function uploadImages(
  imagekit: ImageKit,
  images: ImageToUpload[],
  args: CliArgs
): Promise<UploadSummary> {
  const publicDir = path.join(process.cwd(), "public");
  const summary: UploadSummary = {
    uploaded: [],
    skipped: [],
    failed: [],
  };

  // Filter images if --filter is provided
  const imagesToUpload = args.filter
    ? images.filter(
        (img) =>
          img.localFile.includes(args.filter!) ||
          img.folder.includes(args.filter!) ||
          img.remoteName.includes(args.filter!)
      )
    : images;

  console.log(`\n📦 Processing ${imagesToUpload.length} images...\n`);

  for (const img of imagesToUpload) {
    try {
      const result = await uploadSingleImage(imagekit, img, publicDir, args);

      if (result) {
        if (result.skipped) {
          summary.skipped.push(result.name);
        } else {
          summary.uploaded.push(result);
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error(`❌ Failed: ${img.localFile} - ${message}`);
      summary.failed.push(img.localFile);
    }
  }

  return summary;
}

/**
 * Display upload summary
 */
export function displaySummary(summary: UploadSummary, args: CliArgs): void {
  console.log("\n" + "═".repeat(60));
  console.log("📊 UPLOAD SUMMARY");
  console.log("═".repeat(60));

  if (args.dryRun) {
    console.log("   (DRY RUN - no files were uploaded)");
  }

  console.log(`   ✅ Uploaded: ${summary.uploaded.length}`);
  console.log(`   ⏭️  Skipped:  ${summary.skipped.length}`);
  console.log(`   ❌ Failed:   ${summary.failed.length}`);

  if (summary.failed.length > 0) {
    console.log("\n   Failed files:");
    for (const file of summary.failed) {
      console.log(`     - ${file}`);
    }
  }

  console.log("═".repeat(60) + "\n");
}
