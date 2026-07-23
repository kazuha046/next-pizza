import {Nunito} from "next/font/google"
import "./globals.css"
import {ReactNode} from "react"
import {Providers} from "@/components/shared/providers"
import type {Metadata} from "next"

const nunito = Nunito({
    subsets: ["latin"],
    variable: "--font-nunito",
    weight: ["400", "500", "600", "700", "800", "900"]
})

export const metadata: Metadata = {
    title: {
        default: "Next Pizza — Best Pizza Delivery",
        template: "%s | Next Pizza"
    },
    description:
        "Order the best pizza delivery in town. Fresh ingredients, fast delivery, affordable prices. Choose from classic to gourmet pizzas.",
    keywords: ["pizza", "delivery", "food", "order online", "restaurant", "fast delivery"],
    openGraph: {
        title: "Next Pizza — Best Pizza Delivery",
        description:
            "Order the best pizza delivery in town. Fresh ingredients, fast delivery, affordable prices.",
        type: "website",
        locale: "en_US",
        siteName: "Next Pizza"
    },
    twitter: {
        card: "summary_large_image",
        title: "Next Pizza — Best Pizza Delivery",
        description:
            "Order the best pizza delivery in town. Fresh ingredients, fast delivery, affordable prices."
    },
    robots: {
        index: true,
        follow: true
    }
}

export default function Layout({children}: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" type="image/png" href="/favicon/favicon-48x48.png" sizes="48x48"/>
                <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg"/>
                <link rel="shortcut icon" href="/favicon/favicon.ico"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
                <link rel="manifest" href="/favicon/site.webmanifest"/>

                <meta name="apple-mobile-web-app-title" content="Next Pizza"/>
            </head>

            <body className={nunito.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
