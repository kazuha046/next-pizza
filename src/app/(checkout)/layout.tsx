import {Container} from "@/components/shared/container"
import {Metadata} from "next"
import {ReactNode, Suspense} from "react"
import {Header} from "@/components/shared/header"

export const metadata: Metadata = {
    title: "Checkout"
}

export default function CheckoutLayout({children}: { children: ReactNode }) {
    return (
        <main className="min-h-screen bg-[#F4F1EE]">
            <Suspense>
                <Header hasSearch={false} hasCart={false} className="border-b-gray-200"/>
            </Suspense>

            <Container>
                {children}
            </Container>
        </main>
    )
}
