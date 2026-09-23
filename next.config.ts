import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to /out.
  output: "export",
  // /ar -> /ar/index.html so it works on any static host.
  trailingSlash: true,
  // No image server in a static export; images are pre-sized in /public/img.
  images: { unoptimized: true },
};

export default nextConfig;
