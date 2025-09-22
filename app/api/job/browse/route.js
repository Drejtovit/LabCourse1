import prisma from "@/lib/db.js";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {

    const jobs = await prisma.job.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        employer: {
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

    return NextResponse.json({ success: true, jobs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, errors: { general: error.message } },
      { status: 500 }
    );
  }
}
