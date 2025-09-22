import prisma from "@/lib/db.js";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth.js";

export async function DELETE(request) {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json(
                { success: false, errors: { general: "Authentication required." } },
                { status: 401 }
            );
        }
        await prisma.refreshToken.deleteMany({
            where: {
                userId: session.user.id,
                expiresAt: { lt: new Date() },
            },
        });

        return NextResponse.json(
            { success: true },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, errors: { general: error.message } },
            { status: 500 }
        );
    }
}