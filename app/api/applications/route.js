import prisma from "@/lib/db.js";
import { auth } from "@/lib/auth.js";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ success: false, errors: { general: "Authentication required." } }, { status: 401 });
    }

    if (session.user.role !== "CANDIDATE" && session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, errors: { general: "Unauthorized access." } }, { status: 403 });
    }

    const body = await request.json();

    const { jobId, candidateId } = body;

    const job = await prisma.job.findUnique({
      where: { id: parseInt(jobId) },
    });
    if (!job) {
      return NextResponse.json(
        {
          success: false,
          errors: { general: "Job not found." },
        },
        { status: 404 }
      );
    }

    const candidate = await prisma.candidate.findUnique({
      where: { candidateId },
    });
    if (!candidate) {
      return NextResponse.json({ success: false, errors: { general: "Candidate not found." } }, { status: 404 });
    }

    const existingApplication = await prisma.application.findUnique({
      where: {
        jobId_candidateId: { jobId: parseInt(jobId), candidateId: candidateId },
      },
    });
    if (existingApplication) {
      return NextResponse.json({ success: false, errors: { general: "You have already applied for this job." } }, { status: 409 });
    }

    const application = await prisma.application.create({
      data: {
        job: { connect: { id: parseInt(jobId) } },
        candidate: { connect: { candidateId } },
      },
    });

    return NextResponse.json({ success: true, application }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, errors: { general: error.message } }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ success: false, errors: { general: "Authentication required." } }, { status: 401 });
    }

    if (session.user.role !== "EMPLOYER" && session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, errors: { general: "Unauthorized access." } }, { status: 403 });

    }
    const url = new URL(request.url);
    const employerId = url.searchParams.get("employerId");

    if (!employerId) {
      return NextResponse.json({ success: false, errors: { general: "Employer ID is required" } }, { status: 400 });
    }

    const jobs = await prisma.job.findMany({
      where: { employerId },
      orderBy: { createdAt: "asc" },
    });

    if (jobs.length === 0) {
      return NextResponse.json({ success: false, errors: { jobs: "There are no jobs available." } }, { status: 404 });
    }

    const applications = await prisma.application.findMany({
      where: {
        job: { id: { in: jobs.map((job) => job.id) } },
        status: { not: "REJECTED" },
      },
      orderBy: { appliedAt: "asc" },
      include: {
        candidate: {
          include: {
            user: { select: { name: true, email: true, image: true } },
            resumes: { where: { isActive: true }, select: { id: true } },
          },
        },
        job: {
          include: {
            employer: { include: { user: { select: { name: true } } } },
          },
        },
      },
    });

    return NextResponse.json({ success: true, applications }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, errors: { general: error.message } }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ success: false, errors: { general: "Authentication required." } }, { status: 401 });
    }
    if (session.user.role !== "EMPLOYER" && session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, errors: { general: "Unauthorized access." } }, { status: 403 });
    }

    const body = await request.json();

    const { candidateId, status, jobId } = body;

    const job = await prisma.job.findUnique({
      where: { id: parseInt(jobId) },
    });

    if (!job || (job.employerId !== session.user.id && session.user.role !== "ADMIN")) {
      return NextResponse.json({ success: false, errors: { general: "Unauthorized or job not found." } }, { status: 404 });
    }

    const updatedApplication = await prisma.application.update({
      where: {
        jobId_candidateId: { jobId: parseInt(jobId), candidateId: candidateId },
      },
      data: {
        status: status,
      },
    });

    return NextResponse.json({ success: true, application: updatedApplication }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, errors: { general: error.message } }, { status: 500 });
  }
}
export async function DELETE(request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ success: false, errors: { general: "Authentication required." } }, { status: 401 });
    }
    if (session.user.role !== "EMPLOYER" && session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, errors: { general: "Unauthorized access." } }, { status: 403 });
    }

    const body = await request.json();

    const { jobId, candidateId } = body;

    const job = await prisma.job.findUnique({
      where: { id: parseInt(jobId) },
    });

    if (!job || (job.employerId !== session.user.id && session.user.role !== "ADMIN")) {
      return NextResponse.json({ success: false, errors: { general: "Unauthorized or job not found." } }, { status: 404 });
    }

    await prisma.application.delete({
      where: {
        jobId_candidateId: { jobId: parseInt(jobId), candidateId: candidateId },
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, errors: { general: error.message } }, { status: 500 });
  }
}