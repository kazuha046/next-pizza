"use client"

import {FormProvider, useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {useCart} from "@/hooks/use-cart"
import toast from "react-hot-toast"
import React, {useEffect, useState} from "react"
import {useSession} from "next-auth/react"
import {Api} from "@/components/services/api-client"
import {Container} from "@/components/shared/container"
import {Title} from "@/components/shared/title"
import {CheckoutCart} from "@/components/shared/checkout-cart"
import {CheckoutPersonalForm} from "@/components/shared/checkout-personal-form"
import {CheckoutAddressForm} from "@/components/shared/checkout-address-form"
import {CheckoutSidebar} from "@/components/shared/checkout-sidebar"
import {checkoutFormSchema, CheckoutFormValues} from "@/constants/checkout-form-schema"
import {createOrder} from "@/app/actions"

export default function CheckoutPage() {
    const [submitting, setSubmitting] = useState(false)
    const {totalAmount, updateItemQuantity, items, removeCartItem, loading} = useCart()
    const {data: session} = useSession()

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            phone: "",
            address: "",
            comment: ""
        }
    })

    useEffect(() => {
        async function fetchUserInfo() {
            const data = await Api.auth.getMe()
            const [firstName, lastName] = data.fullName.split(" ")

            form.setValue("firstName", firstName)
            form.setValue("lastName", lastName)
            form.setValue("email", data.email)
        }

        if (session) {
            fetchUserInfo().then(() => console.log("Fetch user info"))
        }
    }, [session])

    const onSubmit = async (data: CheckoutFormValues) => {
        try {
            setSubmitting(true)

            const url = await createOrder(data)

            if (url) {
                toast.success("Order placed successfully! 📝 Redirecting to payment... ", {
                    icon: "✅"
                })

                location.href = url
            } else {
                throw new Error("Failed to get payment link")
            }
        } catch (err) {
            console.log(err)

            setSubmitting(false)
            toast.error("Failed to create order", {
                icon: "❌"
            })
        }
    }

    const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
        const newQuantity = type === "plus" ? quantity + 1 : quantity - 1
        updateItemQuantity(id, newQuantity)
    }

    return (
        <Container className="mt-10 pb-16 sm:pb-10">
            <Title text="Checkout" className="font-extrabold mb-8 text-[36px]"/>

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
                        <div className="flex flex-col gap-10 flex-1 mb-20">
                            <CheckoutCart
                                onClickCountButton={onClickCountButton}
                                removeCartItem={removeCartItem}
                                items={items}
                                loading={loading}
                            />

                            <CheckoutPersonalForm className={loading ? "opacity-40 pointer-events-none" : ""}/>
                            <CheckoutAddressForm className={loading ? "opacity-40 pointer-events-none" : ""}/>
                        </div>

                        <div className="w-full lg:w-112.5">
                            <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting}/>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    )
}
