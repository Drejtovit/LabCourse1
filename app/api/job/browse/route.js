import prisma from "@/lib/db.js";
import { auth } from "@/lib/auth.js";
import { NextResponse } from "next/server";
import is from "zod/v4/locales/is.cjs";

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
        {
          success: false,
          errors: { general: "Forbidden, you are not allowed." },
        },
        { status: 403 }
      );
    } //TODO when amdin 403

    // const url = new URL(request.url);
    // let sort = url.searchParams.get("sort") || "Newest";

    // if (sort && sort === "Newest") {
    //   sort = "desc";
    // } else if (sort && sort === "Oldest") {
    //   sort = "asc";
    // }

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
