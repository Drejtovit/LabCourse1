import prisma from "@/lib/db.js";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    const { id } = await request.json();

    if (!id) {
        return NextResponse.json({ success: false, errors: { id: "Phone number ID is required" } }, { status: 400 });
    }
    if (!(await prisma.phoneNumber.findUnique({ where: { id: id } }))) {
        return NextResponse.json({ success: false, errors: { id: "Phone number not found" } }, { status: 404 });
    }

    try {
        await prisma.phoneNumber.delete({ where: { id: id } });
        return NextResponse.json({ success: true, message: "Phone number deleted successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, errors: { general: error.message } }, { status: 500 });
    }
}
