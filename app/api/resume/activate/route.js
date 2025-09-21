import prisma from "@/lib/db.js";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const candidateId = url.searchParams.get("candidateId");

    if (!candidateId) {
      return NextResponse.json(
        { success: false, errors: { candidateId: "Candidate ID is required" } },
        { status: 400 }
      );
    }

    const resume = await prisma.resume.findFirst({
      where: {
        candidateId,
        isActive: true,
      },
      orderBy: { updatedAt: "desc" },
      include: {
        candidate: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                image: true,
                phoneNumber: {
                  select: { number: true },
                },
              },
            },
          },
        },
        educations: {
          orderBy: [{ endDate: "desc" }, { startDate: "desc" }],
        },
        experiences: {
          orderBy: [{ endDate: "desc" }, { startDate: "desc" }],
        },
        SkillsOnResumes: {
          include: { skill: true },
        },
      },
    });
    if (!resume) {
      return NextResponse.json(
        {
          success: false,
          errors: {
            resume: "There is no resume available. Please create one.",
          },
        },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, resume }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, errors: { general: error.message } },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { resumeId, candidateId } = body;

    if (!resumeId || !candidateId) {
      return NextResponse.json(
        { success: false, errors: { general: "There is no resume selected." } },
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
      { success: false, errors: { general: error.message } },
      { status: 500 }
    );
  }
}
