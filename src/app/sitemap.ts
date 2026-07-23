import type {MetadataRoute} from "next"
import {prisma} from "@/prisma/prisma-client"

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const products = await prisma.product.findMany({
        select: {id: true, updatedAt: true}
    })

    const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
        url: `${BASE_URL}/product/${product.id}`,
        lastModified: product.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.8
    }))

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1
        },
        ...productEntries
    ]
}
