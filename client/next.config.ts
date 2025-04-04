import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    devIndicators: false,
    images: {
        remotePatterns: [
            {
                hostname: "localhost",
                port: "8000",
            },
        ],
    },
};

export default nextConfig;
