import prisma from "@/lib/db.js";
import { NextResponse } from "next/server";

export async function resumePermission(userId, resumeId, role) {
  if (role === "ADMIN") return null;

  if (role !== "CANDIDATE") {
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

  const resume = await prisma.resume.findUnique({
    where: { id: parseInt(resumeId) },
    select: { candidateId: true },
  });

  if (!resume) {
    return NextResponse.json(
      { success: false, errors: { general: "Resume not found." } },
      { status: 404 }
    );
  }
  if (resume.candidateId !== userId) {
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
