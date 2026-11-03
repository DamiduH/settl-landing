import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
