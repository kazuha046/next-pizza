"use client"

import {cn} from "@/lib/utils"
import React from "react"
import {Container} from "./container"
import Image from "next/image"
import Link from "next/link"
import {SearchInput} from "./search-input"
import {CartButton} from "./cart-button"
import {ProfileButton} from "./profile-button"
import {AuthModal} from "./auth-modal"
import toast from "react-hot-toast"
import {useRouter, useSearchParams} from "next/navigation"
import {Menu, ShoppingCart, X} from "lucide-react"
import {Button} from "../ui/button"
import {useCartStore} from "@/store/cart"
import {CartDrawer} from "./cart-drawer"

interface Props {
    hasSearch?: boolean
    hasCart?: boolean
    className?: string
}

export const Header: React.FC<Props> = ({hasSearch = true, hasCart = true, className}) => {
    const router = useRouter()
    const [openAuthModal, setOpenAuthModal] = React.useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

    const searchParams = useSearchParams()

    React.useEffect(() => {
        let toastMessage = ""

        if (searchParams.has("paid")) {
            toastMessage = "Order successfully paid! Information sent to email."
        }

        if (searchParams.has("verified")) {
            toastMessage = "Email successfully verified!"
        }

        if (toastMessage) {
            setTimeout(() => {
                router.replace("/")
                toast.success(toastMessage, {
                    duration: 3000
                })
            }, 1000)
        }
    }, [])

    return (
        <header className={cn("border border-d", className)}>
            <Container className={"flex items-center justify-between py-4 sm:py-8 gap-3"}>
                <Link href={"/"}>
                    <div className={"flex items-center gap-2 sm:gap-4"}>
                        <Image src={"/logo.png"} alt={"Logo Next Pizza"} width={35} height={35}/>

                        <div>
                            <h1 className={"text-xl sm:text-2xl uppercase font-black"}>Next Pizza</h1>
                            <p className={"text-sm text-gray-400 leading-3"}>can't get any tastier</p>
                        </div>
                    </div>
                </Link>

                {hasSearch && (
                    <div className={"hidden md:block mx-10 flex-1"}>
                        <SearchInput/>
                    </div>
                )}

                <div className={"hidden md:flex items-center gap-3"}>
                    <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)}/>
                    <ProfileButton onClickSignIn={() => setOpenAuthModal(true)}/>

                    {hasCart && (<CartButton/>)}
                </div>

                <div className={"flex md:hidden items-center gap-2"}>
                    {hasCart && <MobileCartButton/>}

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={"p-2 hover:bg-gray-100 rounded-lg transition-colors"}
                    >
                        {mobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                    </button>
                </div>
            </Container>

            {mobileMenuOpen && (
                <div className={"md:hidden border-t bg-white"}>
                    <Container className={"py-4 flex flex-col gap-3"}>
                        {hasSearch && <SearchInput className="h-12"/>}

                        <ProfileButton onClickSignIn={() => {
                            setOpenAuthModal(true)
                            setMobileMenuOpen(false)
                        }}/>
                    </Container>
                </div>
            )}
        </header>
    )
}

const MobileCartButton = () => {
    const totalAmount = useCartStore((state) => state.totalAmount)
    const loading = useCartStore((state) => state.loading)

    return (
        <CartDrawer>
            <Button variant="outline" className="flex items-center gap-2" loading={loading}>
                <ShoppingCart size={16}/>
                {totalAmount > 0 && <span className="font-bold">{totalAmount} ₽</span>}
            </Button>
        </CartDrawer>
    )
}
