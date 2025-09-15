import prisma from "@/lib/db.js";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await prisma.resume.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(
      { success: true, message: "Resume deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
