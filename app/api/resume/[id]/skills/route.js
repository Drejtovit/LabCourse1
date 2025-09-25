import prisma from "@/lib/db.js";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const { skillId } = await request.json();

    if (!id || !skillId) {
      return NextResponse.json({ success: false, errors: { id: "Skill ID is required" } }, { status: 400 });
    }

    if (
      !(await prisma.skillsOnResumes.findUnique({
        where: {
          resumeId_skillId: {
            resumeId: parseInt(id),
            skillId: parseInt(skillId),
          },
        },
      }))
    ) {
      return NextResponse.json({ success: false, errors: { id: "Skill not found" } }, { status: 404 });
    }

    await prisma.skillsOnResumes.delete({
      where: {
        resumeId_skillId: {
          resumeId: parseInt(id),
          skillId: parseInt(skillId),
        },
      },
    });

    return NextResponse.json({ success: true, message: "Skill deleted successfully" }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { success: false, errors: { general: error.message } },
      { status: 500 }
    );
  }
}
