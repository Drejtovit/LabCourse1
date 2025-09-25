import { auth } from "@/lib/auth.js";
import prisma from "@/lib/db.js";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ errors: { general: "Unauthorized" } }, { status: 401 });
        }

        const candidates = await prisma.candidate.findMany({
            include: {
                user: { select: { name: true, email: true } }
                // resumes: true
            },
        });
        return NextResponse.json({ candidates }, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { success: false, errors: { general: error.message } },
            { status: 500 }
        );
    }
}