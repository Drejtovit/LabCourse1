import prisma from "@/lib/db.js";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    const body = await request.json();
    const { resumeId, candidateId } = body;

    if (!resumeId || !candidateId) {
      return NextResponse.json(
        { success: false, error: "There is no resume selected." },
        { status: 400 }
      );
    }

    await prisma.resume.updateMany({
      where: { candidateId, isActive: true },
      data: { isActive: false },
    });

    const updatedActiveResume = await prisma.resume.update({
      where: { id: resumeId },
      data: { isActive: true },
    });

    return NextResponse.json(
      { success: true, resume: updatedActiveResume },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
