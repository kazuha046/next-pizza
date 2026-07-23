/** @type {import("next").NextConfig} */
const nextConfig = {
    serverExternalPackages: ['@prisma/client', '@prisma/adapter-pg'],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "github.githubassets.com"
            },
            {
                protocol: "https",
                hostname: "fonts.gstatic.com"
            },
            {
                protocol: "https",
                hostname: "media.dodostatic.net"
            },
            {
                protocol: "https",
                hostname: "cdn.inappstory.ru"
            },
            {
                protocol: "https",
                hostname: "cdn.dodostatic.net"
            }
        ]
    }
}

export default nextConfig
