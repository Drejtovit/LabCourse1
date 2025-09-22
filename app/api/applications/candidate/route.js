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
    if (session.user.role !== "CANDIDATE" && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, errors: { general: "Unauthorized access." } },
        { status: 403 }
      );
    }
    const url = new URL(request.url);
    const candidateId = url.searchParams.get("candidateId");

    if (!candidateId) {
      return NextResponse.json(
        { success: false, errors: { general: "Candidate ID is required" } },
        { status: 400 }
      );
    }

    const candidateApplications = await prisma.candidate.findUnique({
      where: { candidateId },
      include: {
        applications: {
          include: {
            job: {
              include: {
                employer: {
                  include: {
                    user: { select: { name: true, email: true, image: true } },
                  },
                },
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      { success: true, candidateApplications },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, errors: { general: error.message } },
      { status: 500 }
    );
  }
}
