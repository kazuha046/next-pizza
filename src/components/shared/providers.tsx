"use client"

import {ReactNode} from "react"
import {Toaster} from "react-hot-toast"
import {SessionProvider} from "next-auth/react"
import NextTopLoader from "nextjs-toploader"

export const Providers = ({children}: { children: ReactNode }) => {
    return (
        <>
            <SessionProvider>{children}</SessionProvider>
            <Toaster/>
            <NextTopLoader/>
        </>
    )
}
