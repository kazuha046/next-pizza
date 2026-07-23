import {prisma} from "@/prisma/prisma-client"
import {NextRequest, NextResponse} from "next/server"

export async function GET(req: NextRequest) {
    const email = req.nextUrl.searchParams.get("email")

    if (!email) {
        return NextResponse.json({exists: false})
    }

    const user = await prisma.user.findFirst({
        where: {email},
        select: {verified: true}
    })

    if (!user) {
        return NextResponse.json({exists: false})
    }

    return NextResponse.json({exists: true, verified: !!user.verified})
}
