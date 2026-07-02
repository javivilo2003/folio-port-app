import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a fully static site into `out/` for Cloudflare Pages. Safe here
  // because the app has no server runtime (every route prerenders).
  output: "export",
  // Serve each route as a folder with its own index.html so refreshes and
  // direct links resolve cleanly on static hosting.
  trailingSlash: true,
  images: {
    // next/image optimization needs a server; disable it for static export.
    // (The app currently uses no next/image, so this is just future-proofing.)
    unoptimized: true,
  },
};

export default nextConfig;
