import {cn} from "@/lib/utils"
import Image from "next/image"

interface Props {
    src: string
    className?: string
}

export const CartItemDetailsImage = ({src, className}: Props) => {
    return (
        <Image className={cn("w-[60px] h-[60px]", className)} src={src} alt={"image"} width={60} height={60}/>
    )
}
