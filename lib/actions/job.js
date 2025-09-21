import prisma from "@/lib/db.js";
import { NextResponse } from "next/server";

export async function jobPermission(userId, id, role) {
    if (role === "ADMIN") return null;

    if (role !== "EMPLOYER") {
        return NextResponse.json(
            {
                success: false,
                errors: {
                    general: "You do not have permission to perform this action.",
                },
            },
            { status: 403 }
        );
    }

    const job = await prisma.job.findUnique({
        where: { id: parseInt(id) },
        select: { employerId: true },
    });

    if (!job) {
        return NextResponse.json(
            { success: false, errors: { general: "Job not found." } },
            { status: 404 }
        );
    }
    if (job.employerId !== userId) {
        return NextResponse.json(
            {
                success: false,
                errors: {
                    general: "You do not have permission to perform this action.",
                },
            },
            { status: 403 }
        );
    }
    return null;
}
