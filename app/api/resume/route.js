import prisma from "@/lib/db.js";
import { NextResponse } from "next/server";
import { validateResumeData } from "@/lib/validator/resume.js";

export async function POST(request) {
  try {
    const body = await request.json();

    const errors = validateResumeData(body);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const { profession, salary, candidateId, age, details } = body;
    const salaryFloat = parseFloat(salary.trim().replace(/,/g, ""));

    const numberOfResumes = await prisma.resume.count({
      where: { candidateId },
    });
    if (numberOfResumes === 5) {
      return NextResponse.json(
        {
          success: false,
          errors: { maxResumes: "Maximum number of resumes reached" },
        },
        { status: 400 }
      );
    }

    const newResume = await prisma.resume.create({
      data: {
        profession,
        salary: salaryFloat,
        candidate: { connect: { candidateId } },
        age: parseInt(age, 10) || null,
        details: details || null,
      },
    });

    return NextResponse.json(
      { success: true, resume: newResume },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, errors: { general: error.message } },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const candidateId = url.searchParams.get("candidateId");
    const isActive = url.searchParams.get("isActive");
    const where = {};

    if (candidateId) {
      where.candidateId = candidateId;
    }
    if (isActive === "true") {
      where.isActive = true;
    }

    const resumes = await prisma.resume.findMany({
      where,
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
      },
    });

    if (resumes.length === 0) {
      return NextResponse.json(
        {
          success: false,
          errors: { general: "There are no resumes available." },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, resumes }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, errors: { general: error.message } },
      { status: 500 }
    );
  }
}
