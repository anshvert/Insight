import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    crossOrigin: "anonymous",
    env: {
        googleProviderId: process.env.GOOGLE_CLIENT_ID,
        googleProviderSecret: process.env.GOOGLE_CLIENT_SECRET,
        githubProviderId: process.env.NODE_ENV == "production" ? process.env.GITHUB_CLIENT_ID_PROD : process.env.GITHUB_CLIENT_ID,
        githubProviderSecret: process.env.NODE_ENV == "production" ? process.env.GITHUB_CLIENT_SECRET_PROD : process.env.GITHUB_CLIENT_SECRET,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            }
        ]
    }
};

export default nextConfig;
