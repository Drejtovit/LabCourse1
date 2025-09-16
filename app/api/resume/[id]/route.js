import prisma from "@/lib/db.js";
import { NextResponse } from "next/server";
import { resumePermission } from "@/lib/actions/resume.js";
import { auth } from "@/lib/auth.js";
import { validateResumeData } from "@/lib/validator/resume.js";

export async function GET(request, { params }) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { success: false, errors: { general: "Authentication required." } },
        { status: 401 }
      );
    }

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
      },
    });

    if (!resume) {
      return NextResponse.json(
        {
          success: false,
          errors: { general: "There are no resumes available." },
        },
        { status: 404 }
      );
    }
    const permissionError = await resumePermission(
      session.user.id,
      resume.id,
      session.user.role
    );

    if (permissionError) return permissionError;

    return NextResponse.json({ success: true, resume }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { success: false, errors: { general: "Authentication required." } },
        { status: 401 }
      );
    }

    const permissionError = await resumePermission(
      session.user.id,
      params.id,
      session.user.role
    );

    if (permissionError) return permissionError;
    const { id } = await params;
    const body = await request.json();

    const errors = validateResumeData(body);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const { profession, salary, age, details } = body;
    const salaryFloat = parseFloat(salary.trim().replace(/,/g, ""));

    const updatedResume = await prisma.resume.update({
      where: { id: parseInt(id) },
      data: {
        profession,
        salary: salaryFloat,
        age: parseInt(age, 10),
        details: details,
      },
    });

    return NextResponse.json(
      { success: true, resume: updatedResume },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { success: false, errors: { general: "Authentication required." } },
        { status: 401 }
      );
    }

    const permissionError = await resumePermission(
      session.user.id,
      params.id,
      session.user.role
    );

    if (permissionError) return permissionError;

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
      { success: false, errors: { general: error.message } },
      { status: 500 }
    );
  }
}
