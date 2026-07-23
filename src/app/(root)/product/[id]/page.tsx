import {ProductForm} from "@/components/shared/product-form"
import {prisma} from "@/prisma/prisma-client"
import {notFound} from "next/navigation"
import {Container} from "@/components/shared/container"
import type {Metadata} from "next"

export async function generateMetadata({params}: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const {id} = await params

    const product = await prisma.product.findFirst({
        where: {id: Number(id)},
        include: {items: true}
    })

    if (!product) {
        return {title: "Product Not Found"}
    }

    const price = product.items[0]?.price ?? 0

    return {
        title: product.name,
        description: `${product.name} — from ${price} ₽. Order online with fast delivery.`,
        openGraph: {
            title: product.name,
            description: `${product.name} — from ${price} ₽`,
            images: [{url: product.imageUrl, width: 800, height: 800, alt: product.name}]
        }
    }
}

export default async function ProductPage({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params

    const product = await prisma.product.findFirst({
        where: {id: Number(id)},
        include: {
            ingredients: true,
            category: {
                include: {
                    products: {
                        include: {
                            items: true
                        }
                    }
                }
            },
            items: true
        }
    })

    if (!product) {
        return notFound()
    }

    return (
        <Container className="flex flex-col my-10">
            <ProductForm product={product}/>
        </Container>
    )
}
