"use client"

import React, {ReactNode} from "react"
import Image from "next/image"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet"
import Link from "next/link"
import {Button} from "../ui/button"
import {ArrowLeft, ArrowRight} from "lucide-react"
import {CartDrawerItem} from "./cart-drawer-item"
import {getCartItemDetails} from "@/lib/get-cart-item-details"
import {PizzaSize, PizzaType} from "@/constants/pizza"
import {Title} from "./title"
import {cn} from "@/lib/utils"
import {useCart} from "@/hooks/use-cart"

export const CartDrawer = ({children}: { children: ReactNode }) => {
    const {totalAmount, updateItemQuantity, items, removeCartItem} = useCart()
    const [redirecting, setRedirecting] = React.useState(false)

    const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
        const newQuantity = type === "plus" ? quantity + 1 : quantity - 1
        updateItemQuantity(id, newQuantity)
    }

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>

            <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
                <div className={cn("flex flex-col h-full", !totalAmount && "justify-center")}>
                    {totalAmount > 0 && (
                        <SheetHeader>
                            <SheetTitle>
                                <span className="font-bold">{items.length} items</span> in cart
                            </SheetTitle>
                        </SheetHeader>
                    )}

                    {!totalAmount && (
                        <div className="flex flex-col items-center justify-center px-4 mx-auto">
                            <Image src="/assets/images/empty-box.png" alt="Empty cart" width={120} height={120}/>
                            <Title size="sm" text="Cart is empty" className="text-center font-bold my-2"/>

                            <p className="text-center text-neutral-500 mb-5 text-sm">
                                Add at least one pizza to place an order
                            </p>

                            <SheetClose>
                                <Button className="w-full sm:w-56 h-12 text-base" size="lg">
                                    <ArrowLeft className="w-5 mr-2"/>
                                    Go Back
                                </Button>
                            </SheetClose>
                        </div>
                    )}

                    {totalAmount > 0 && (
                        <>
                            <div className="-mx-6 mt-5 overflow-auto flex-1">
                                {items.map((item) => (
                                    <div key={item.id} className="mb-2">
                                        <CartDrawerItem
                                            id={item.id}
                                            imageUrl={item.imageUrl}
                                            details={getCartItemDetails(
                                                item.ingredients,
                                                item.pizzaType as PizzaType,
                                                item.pizzaSize as PizzaSize
                                            )}
                                            disabled={item.disabled}
                                            name={item.name}
                                            price={item.price}
                                            quantity={item.quantity}
                                            onClickCountButton={(type) =>
                                                onClickCountButton(item.id, item.quantity, type)
                                            }
                                            onClickRemove={() => removeCartItem(item.id)}
                                        />
                                    </div>
                                ))}
                            </div>

                            <SheetFooter className="-mx-6 bg-white p-4 sm:p-8">
                                <div className="w-full">
                                    <div className="flex mb-4 gap-2">
                                        <span className="flex flex-1 text-base sm:text-lg text-neutral-500 min-w-0">
                                          Total
                                          <div
                                              className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"/>
                                        </span>

                                        <span
                                            className="font-bold text-base sm:text-lg whitespace-nowrap">{totalAmount} ₽</span>
                                    </div>

                                    <Link href="/checkout">
                                        <Button
                                            onClick={() => setRedirecting(true)}
                                            loading={redirecting}
                                            type="submit"
                                            className="w-full h-12 text-base"
                                        >
                                            Place Order

                                            <ArrowRight className="w-5 ml-2"/>
                                        </Button>
                                    </Link>
                                </div>
                            </SheetFooter>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}
