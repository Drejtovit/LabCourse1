import prisma from "@/lib/db.js";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {

    const url = new URL(request.url);
    let sort = url.searchParams.get("sort") || "desc";

    const resumes = await prisma.resume.findMany({
      where: {
        isActive: true,
      },
      orderBy: { updatedAt: sort === "asc" ? "asc" : "desc" },
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
        SkillsOnResumes: {
          include: {
            skill: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({ success: true, resumes }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, errors: { general: error.message } },
      { status: 500 }
    );
  }
}
