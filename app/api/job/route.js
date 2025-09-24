import prisma from "@/lib/db.js";
import { auth } from "@/lib/auth.js";
import { NextResponse } from "next/server";
import { validateJobData } from "@/lib/validator/job.js";

export async function POST(request) {
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
        { success: false, errors: { general: "Unauthorized access." } },
        { status: 403 }
      );
    }

    const body = await request.json();

    const errors = validateJobData(body);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const { title, type, description, closingDate, employerId } = body;

    const employer = await prisma.employer.findUnique({
      where: { employerId },
    });

    if (!employer) {
      return NextResponse.json(
        {
          success: false,
          errors: { general: "Employer profile not found." },
        },
        { status: 404 }
      );
    }

    const jobType =
      type === "full-time"
        ? "FULL_TIME"
        : type === "part-time"
          ? "PART_TIME"
          : "CONTRACT";

    const newJob = await prisma.job.create({
      data: {
        title,
        type: jobType,
        description,
        closingDate: new Date(closingDate),
        employer: { connect: { employerId } },
      },
    });
    return NextResponse.json({ success: true, job: newJob }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, errors: { general: error.message } },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, errors: { general: "Authentication required." } },
        { status: 401 }
      );
    }
    const url = new URL(request.url);
    const employerId = url.searchParams.get("employerId");

    if (!employerId) {
      return NextResponse.json(
        { success: false, errors: { general: "Employer ID is required" } },
        { status: 400 }
      );
    }

    const jobs = await prisma.job.findMany({
      where: { employerId },
      orderBy: { updatedAt: "desc" },
      include: {
        employer: true,
        _count: {
          select: {
            applications: {
              where: { status: { in: ["PENDING", "ACCEPTED"] } },
            },
          },
        },
      },
    });

    if (jobs.length === 0) {
      return NextResponse.json(
        {
          success: false,
          errors: { jobs: "There are no jobs available." },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, jobs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, errors: { general: error.message } },
      { status: 500 }
    );
  }
}
