import {cn} from "@/lib/utils"
import {Title} from "./title"
import {Button} from "../ui/button"
import Image from "next/image"

interface Props {
    imageUrl: string;
    name: string;
    price: number;
    loading?: boolean;
    onSubmit?: VoidFunction;
    className?: string;
}

export const ChooseProductForm = (
    {
        name,
        imageUrl,
        price,
        onSubmit,
        className,
        loading
    }: Props) => {
    return (
        <div className={cn(className, "flex flex-col lg:flex-row flex-1")}>
            <div className="flex items-center justify-center flex-1 relative w-full">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    sizes="(max-width: 640px) 200px, 350px"
                    className="relative left-2 top-2 transition-all z-10 duration-300 object-contain"
                />
            </div>

            <div className="w-full lg:w-122.5 bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1"/>

                <Button
                    loading={loading}
                    onClick={() => onSubmit?.()}
                    className="h-13.75 px-10 text-base rounded-[18px] w-full mt-10"
                >
                    Add to cart for {price} ₽
                </Button>
            </div>
        </div>
    )
}
