import prisma from "@/lib/db.js";
import { auth } from "@/lib/auth.js";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, errors: { general: "Authentication required." } },
        { status: 401 }
      );
    }

    if (session.user.role !== "EMPLOYER" && session.user.role !== "ADMIN") {
      return NextResponse.json(
        {
          success: false,
          errors: { general: "Forbidden, you are not allowed." },
        },
        { status: 403 }
      );
    } //TODO when amdin 403

    const url = new URL(request.url);
    let sort = url.searchParams.get("sort") || "Newest";

    if (sort && sort === "Newest") {
      sort = "desc";
    } else if (sort && sort === "Oldest") {
      sort = "asc";
    }

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
