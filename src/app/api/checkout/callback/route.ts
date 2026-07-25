import {PaymentCallbackData} from "@/@types/yookassa"
import prisma from "@/lib/prisma"
import {OrderSuccessTemplate} from "@/components/shared/email-temapltes/order-success"
import {sendEmail} from "@/lib/send-email"
import {CartItemDTO} from "@/components/services/dto/cart.dto"
import {Status} from "@/generated/prisma/client"
import {NextRequest, NextResponse} from "next/server"

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as PaymentCallbackData

        const order = await prisma.order.findFirst({
            where: {
                id: Number(body.object.metadata.order_id)
            }
        })

        if (!order) {
            return NextResponse.json({error: "Order not found"})
        }

        const isSucceeded = body.object.status === "succeeded"

        await prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                status: isSucceeded ? Status.SUCCESSED : Status.CANCELED
            }
        })

        const items = JSON.parse(order?.items as string) as CartItemDTO[]

        if (isSucceeded) {
            await sendEmail(
                order.email,
                "Next Pizza / Your order has been placed successfully 🎉",
                OrderSuccessTemplate({orderId: order.id, items})
            )
        } else {
            // Failed
        }
    } catch (error) {
        console.log("[Checkout Callback] Error:", error)
        return NextResponse.json({error: "Server error"})
    }
}
