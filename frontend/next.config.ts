import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "/Student_Management_Next_Nest"
      : "",
  basePath:
    process.env.NODE_ENV === "production"
      ? "/Student_Management_Next_Nest"
      : "",
};

export default nextConfig;
