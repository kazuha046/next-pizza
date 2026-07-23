import type {Metadata} from "next"
import {ReactNode, Suspense} from "react"
import {Header} from "@/components/shared/header"

export const metadata: Metadata = {
    title: "Home"
}

export default function RootLayout({modal, children}: Readonly<{ modal: ReactNode, children: ReactNode }>) {
    return (
        <>
            <Suspense>
                <Header/>
            </Suspense>

            <main className={"min-h-screen"}>
                {modal}
                {children}
            </main>
        </>
    )
}
