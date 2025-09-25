import prisma from "@/lib/db.js";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ success: false, errors: { id: "Education ID is required" } }, { status: 400 });
    }

    if (!(await prisma.education.findUnique({ where: { id: parseInt(id) } }))) {
      return NextResponse.json({ success: false, errors: { id: "Education not found" } }, { status: 404 });
    }

    await prisma.education.delete({ where: { id: parseInt(id) } });

    return NextResponse.json({ success: true, message: "Education deleted successfully" }, { status: 200 });

  } catch (error) {

    return NextResponse.json(
      { success: false, errors: { general: error.message } },
      { status: 500 }
    );

  }
}
