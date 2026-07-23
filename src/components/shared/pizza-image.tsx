import {cn} from "@/lib/utils"
import Image from "next/image"

interface Props {
    className?: string;
    imageUrl: string;
    size: 20 | 30 | 40;
}

export const PizzaImage = ({imageUrl, size, className}: Props) => {
    return (
        <div className={cn("flex items-center justify-center flex-1 relative w-full", className)}>
            <Image
                src={imageUrl}
                alt="Pizza"
                fill
                sizes="(max-width: 640px) 300px, (max-width: 768px) 400px, 500px"
                className="relative left-2 top-2 transition-all z-10 duration-300 object-contain"
            />

            <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2
                rounded-full border-gray-200 w-112.5 h-112.5"
            />

            <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2
                rounded-full border-gray-100 w-92.5 h-92.5"
            />
        </div>
    )
}
