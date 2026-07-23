"use client"

import {Dialog, DialogContent} from "@/components/ui/dialog"
import {cn} from "@/lib/utils"
import React from "react"
import {useRouter} from "next/navigation"
import {ProductWithRelations} from "@/@types/prisma"
import {ProductForm} from "./product-form"

interface Props {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({product, className}) => {
    const router = useRouter()

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn("p-0 w-[calc(100vw-2rem)] lg:w-265 max-w-[calc(100vw-2rem)] lg:max-w-265 min-h-[auto] lg:min-h-125 bg-white overflow-hidden", className)}
            >
                <ProductForm product={product} onSubmit={() => router.back()}/>
            </DialogContent>
        </Dialog>
    )
}
