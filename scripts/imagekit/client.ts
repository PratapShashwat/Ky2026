import ImageKit from "imagekit";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env" });

/**
 * Create and configure ImageKit client
 */
export function createClient(): ImageKit {
  const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

  if (!publicKey || !privateKey || !urlEndpoint) {
    console.error("❌ Missing ImageKit environment variables:");
    if (!publicKey) console.error("   - NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY");
    if (!privateKey) console.error("   - IMAGEKIT_PRIVATE_KEY");
    if (!urlEndpoint) console.error("   - NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT");
    process.exit(1);
  }

  return new ImageKit({
    publicKey,
    privateKey,
    urlEndpoint,
  });
}
