import prisma from "@/lib/db.js";
import { auth } from "@/lib/auth.js";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
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

    const { id } = await params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { success: false, errors: { general: "ID is required" } },
        { status: 400 }
      );
    }

    const resume = await prisma.resume.findUnique({
      where: { id: parseInt(id) },
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
        educations: true,
        experiences: true,
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

    return NextResponse.json({ success: true, resume }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, errors: { general: error.message } },
      { status: 500 }
    );
  }
}
