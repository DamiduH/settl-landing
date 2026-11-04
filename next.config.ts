import type { NextConfig } from "next";
import { securityHeaders } from "./lib/security-headers";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders(process.env.NODE_ENV === "development") }];
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    qualities: [75, 85],
    formats: ["image/avif", "image/webp"],
  },
  // The Open Graph image reads these files from disk.
  outputFileTracingIncludes: {
    "/opengraph-image": [
      "./node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-700-normal.woff",
      "./node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-800-normal.woff",
      "./public/images/hero-app.jpg",
    ],
  },
};

export default nextConfig;
