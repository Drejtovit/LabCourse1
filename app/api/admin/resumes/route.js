import { auth } from "@/lib/auth.js";
import prisma from "@/lib/db.js";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ errors: { general: "Unauthorized" } }, { status: 401 });
        }

        const resumes = await prisma.resume.findMany({
            include: { candidate: { select: { candidateId: true, user: { select: { name: true, email: true, image: true } } } } },
        });
        return NextResponse.json({ resumes }, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { success: false, errors: { general: error.message } },
            { status: 500 }
        );
    }
}