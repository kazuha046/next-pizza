import React from "react"
import {cn} from "@/lib/utils"
import {Categories} from "./categories"
import {SortPopup} from "./sort-popup"
import {Container} from "./container"
import {Category} from "@/generated/prisma/client"

interface Props {
    categories: Category[]
    className?: string
}

export const TopBar: React.FC<Props> = ({categories, className}) => {
    return (
        <div className={cn("sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10", className)}>
            <Container className={"flex flex-wrap items-center justify-between gap-3"}>
                <Categories items={categories}/>
                <SortPopup/>
            </Container>
        </div>
    )
}
