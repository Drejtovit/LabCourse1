import prisma from "@/lib/db.js";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json(
      { success: false, errors: { id: "Experience ID is required" } },
      { status: 400 }
    );
  }
  if (!(await prisma.experience.findUnique({ where: { id: parseInt(id) } }))) {
    return NextResponse.json(
      { success: false, errors: { id: "Experience not found" } },
      { status: 404 }
    );
  }

  try {
    await prisma.experience.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, errors: { general: error.message } },
      { status: 500 }
    );
  }
}
