import prisma from "@/lib/db.js";
import { auth } from "@/lib/auth.js";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PUT(request, { params }) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ success: false, errors: { general: "Unauthorized" } }, { status: 401 });
        }

        const { id } = await params;

        if (session.user.id !== id && session.user.role !== "ADMIN") {
            return NextResponse.json({ success: false, errors: { general: "Forbidden" } }, { status: 403 });
        }

        const body = await request.json();

        const { oldPassword, newPassword } = body;

        if (!oldPassword || !newPassword) {
            return NextResponse.json({ success: false, errors: { password: "Old password and new password are required" } }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id },
            select: { password: true }
        });
        const isValid = await bcrypt.compare(
            oldPassword,
            user.password
        );

        if (!isValid) {
            return NextResponse.json({ success: false, errors: { password: "Old password is incorrect" } }, { status: 400 });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            return NextResponse.json({ success: false, errors: { password: "New password must be at least 8 characters long and include uppercase, lowercase, number, and special character" } }, { status: 400 });
        }

        const newPasswordHash = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id },
            data: { password: newPasswordHash }
        });

        return NextResponse.json(
            { success: true, message: "Password updated successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, errors: { general: error.message } },
            { status: 500 }
        );
    }
}
