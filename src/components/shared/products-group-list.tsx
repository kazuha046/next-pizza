"use client"

import React, {useEffect, useRef} from "react"
import {Title} from "./title"
import {useIntersection} from "react-use"
import {cn} from "@/lib/utils"
import {ProductCart} from "./product-cart"
import {useCategoryStore} from "@/store/category"

interface Props {
    title: string
    items: any[]
    className?: string
    listClassName?: string
    categoryId: number
}

export const ProductsGroupList: React.FC<Props> = (
    {
        title,
        items,
        className,
        listClassName,
        categoryId
    }
) => {
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId)
    const intersectionRef = useRef<HTMLDivElement>(null)

    const intersection = useIntersection(intersectionRef as React.RefObject<HTMLElement>, {
        threshold: 0.4
    })

    useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveCategoryId(categoryId)
        }
    }, [categoryId, intersection?.isIntersecting, setActiveCategoryId])

    return (
        <div className={className} id={title} ref={intersectionRef}>
            <Title text={title} size={"lg"} className={"font-extrabold mb-5"}/>

            <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-12.5", listClassName)}>
                {items.map((product: any, index: number) => (
                    <ProductCart
                        key={index}
                        ingredients={product.ingredients}
                        id={product.id}
                        name={product.name}
                        price={product.items[0].price}
                        imageUrl={product.imageUrl}
                    />
                ))}
            </div>
        </div>
    )
}

