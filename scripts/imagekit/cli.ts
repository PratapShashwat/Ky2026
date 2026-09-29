import type { CliArgs } from "./types";

/**
 * Parse command line arguments
 */
export function parseArgs(): CliArgs {
  const args = process.argv.slice(2);
  const result: CliArgs = {
    force: false,
    dryRun: false,
    filter: undefined,
  };

  let i = 0;
  while (i < args.length) {
    const arg = args[i];
    const nextArg = args[i + 1];

    switch (arg) {
      case "--force":
      case "-f":
        result.force = true;
        i += 1;
        break;

      case "--dry-run":
      case "-d":
        result.dryRun = true;
        i += 1;
        break;

      case "--filter":
        result.filter = getRequiredValue(arg, nextArg);
        i += 2;
        break;

      case "--help":
      case "-h":
        printHelp();
        process.exit(0);

      default:
        console.warn(`Unknown argument: ${arg}`);
        i += 1;
        break;
    }
  }

  return result;
}

/**
 * Get required value for a flag, exit if missing
 */
function getRequiredValue(flag: string, value: string | undefined): string {
  if (!value || value.startsWith("--")) {
    console.error(`Error: ${flag} requires a value`);
    process.exit(1);
  }
  return value;
}

/**
 * Print help message
 */
function printHelp(): void {
  console.log(`
Upload images to ImageKit CDN

Usage:
  npx tsx scripts/upload-to-imagekit.ts [options]

Options:
  --force, -f     Overwrite existing files (default: skip existing)
  --dry-run, -d   Preview uploads without actually uploading
  --filter        Only upload images matching this pattern (e.g., "hero", "about")
  --help, -h      Show this help message

Examples:
  npx tsx scripts/upload-to-imagekit.ts                    # Upload all, skip existing
  npx tsx scripts/upload-to-imagekit.ts --force            # Upload all, overwrite existing
  npx tsx scripts/upload-to-imagekit.ts --dry-run          # Preview what would be uploaded
  npx tsx scripts/upload-to-imagekit.ts --filter hero      # Only upload hero images
  `);
}
