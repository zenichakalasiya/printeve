/** @type {import('next').NextConfig} */

// On GitHub Pages the site is served from a repo subpath (e.g. /printeve).
// The deploy workflow sets NEXT_PUBLIC_BASE_PATH; locally it's empty so the
// app runs at the root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  // Static HTML export — required for GitHub Pages (no Node server).
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  // Pages serves each route as a folder/index.html.
  trailingSlash: true,
  images: {
    // The default image optimizer needs a server; disable it for export.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
  },
};

export default nextConfig;
