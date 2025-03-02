import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    crossOrigin: "anonymous",
    env: {
        googleProviderId: process.env.GOOGLE_CLIENT_ID,
        googleProviderSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            }
        ]
    }
};

export default nextConfig;
