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
    api: {
        bodyParser: {
            sizeLimit: '50mb', // Increase the body size limit to 10 MB (or whatever you need)
        },
    },
};

export default nextConfig;
