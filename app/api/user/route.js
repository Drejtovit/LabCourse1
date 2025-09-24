import prisma from "@/lib/db.js";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth.js";
import { hash } from "bcryptjs";
import { validateUserData } from "@/lib/validator/user";

export async function POST(request) {
  try {
    const body = await request.json();

    const errors = validateUserData(body);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const {
      name,
      email,
      password,
      confirmPassword,
      role,
      phoneNumber,
      zip,
      city,
      state,
      ...userRelation
    } = body;

    const userExists = await prisma.user.findUnique({
      where: { email: email },
    });

    if (userExists) {
      return NextResponse.json(
        { success: false, errors: { general: "User already exists" } },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role.toUpperCase(),
        phoneNumber: {
          create: {
            number: phoneNumber,
          },
        },
        ...(role === "candidate"
          ? {
            candidate: {
              create: {
                birthDate: new Date(userRelation.birthDate),
                zip,
                city,
                state,
              },
            },
          }
          : {
            employer: {
              create: {
                description: userRelation.description,
                websiteUrl: userRelation.websiteUrl,
                zip,
                city,
                state,
              },
            },
          }),
      },
    });
    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { success: true, user: rest, message: "User created successfully" },
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
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ errors: { general: "Unauthorized" } }, { status: 401 });
    }

    const users = await prisma.user.findMany({
      where: {
        role: { in: ["EMPLOYER", "CANDIDATE"] },
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        role: true,
        updatedAt: true,
        employer: { select: { city: true, state: true } },
        candidate: { select: { city: true, state: true } },
      },

    });
    return NextResponse.json({ users }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { success: false, errors: { general: error.message } },
      { status: 500 }
    );
  }
}