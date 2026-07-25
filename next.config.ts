import type {NextConfig} from "next"

const nextConfig: NextConfig = {
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
