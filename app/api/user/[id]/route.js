import prisma from "@/lib/db.js";
import { auth } from "@/lib/auth.js";
import { NextResponse } from "next/server";
import { validateProfileData } from "@/lib/validator/user";

export async function GET(request, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, errors: { general: "Unauthorized" } },
        { status: 401 }
      );
    }
    const url = new URL(request.url);
    const role = url.searchParams.get("role");
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id: id },
      include: {
        phoneNumber: true,
        ...(role === "CANDIDATE"
          ? {
              candidate: {
                include: {
                  resumes: true,
                },
              },
            }
          : {
              employer: true,
            }),
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, errors: { general: "User not found" } },
        { status: 404 }
      );
    }

    const { password, ...userWithoutPassword } = user;

    return NextResponse.json(
      { success: true, user: userWithoutPassword },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, errors: { general: error.message } },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, errors: { general: "Unauthorized" } },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (session.user.id !== id) {
      return NextResponse.json(
        { success: false, errors: { general: "Forbidden" } },
        { status: 403 }
      );
    }

    const body = await request.json();

    const errors = validateProfileData(body);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const {
      name,
      role,
      phoneId,
      phoneNumber,
      zip,
      city,
      state,
      ...userRelation
    } = body;

    await prisma.user.update({
      where: { id },
      data: {
        name,
        phoneNumber: {
          update: {
            where: {
              id: phoneId,
            },
            data: {
              number: phoneNumber,
            },
          },
        },
        ...(role === "CANDIDATE"
          ? {
              candidate: {
                update: {
                  birthDate: new Date(userRelation.birthDate),
                  zip,
                  city,
                  state,
                },
              },
            }
          : {
              //FIX EMPLOYER
              employer: {
                update: {
                  description: userRelation.description,
                  websiteUrl: userRelation.websiteUrl,
                  location: {
                    create: {
                      zip,
                      city,
                      state,
                    },
                  },
                },
              },
            }),
      },
    });

    return NextResponse.json(
      { success: true, message: "Profile updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, errors: { general: error.message } },
      { status: 500 }
    );
  }
}
