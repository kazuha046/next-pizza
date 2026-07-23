import React from "react"
import Link from "next/link"
import {Title} from "./title"
import {Button} from "../ui/button"
import {Plus} from "lucide-react"
import {Ingredient} from "@prisma/client"
import Image from "next/image"

interface Props {
    id: number
    name: string
    price: number
    imageUrl: string
    ingredients: Ingredient[]
    className?: string
}

export const ProductCart: React.FC<Props> = (
    {
        id,
        name,
        price,
        imageUrl,
        ingredients,
        className
    }
) => {
    return (
        <div className={className}>
            <Link href={`/product/${id}`}>
                <div className={"flex justify-center p-4 sm:p-6 bg-secondary rounded-lg h-52 sm:h-65 relative"}>
                    <Image
                        src={imageUrl}
                        alt={`${name} Product Image`}
                        fill
                        sizes="(max-width: 640px) 208px, 260px"
                        className={"object-contain"}
                    />
                </div>

                <Title text={name} size={"sm"} className={"mb-1 mt-3 font-bold"}/>

                <p className={"text-sm text-gray-400"}>
                    {
                        ingredients.map((ingredient) => ingredient.name).join(", ")
                    }
                </p>

                <div className={"flex justify-between items-center mt-4"}>
                    <span className={"text-[20px]"}>
                        from <b>{price} ₽</b>
                    </span>

                    <Button variant={"secondary"} className={"text-base font-bold"}>
                        <Plus size={20} className={"mr-1"}/> Add
                    </Button>
                </div>
            </Link>
        </div>
    )
}
