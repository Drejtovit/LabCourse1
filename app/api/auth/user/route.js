import prisma from "@/lib/db.js";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { validateUserData } from "@/lib/validator/user";

export async function POST(request) {
  try {
    const body = await request.json();

    const errors = validateUserData(body);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { message: "Validation failed", errors },
        { status: 400 }
      );
    }

    const { name, email, password, confirmPassword, role, phoneNumber } = body;
    const userExists = await prisma.user.findUnique({
      where: { email: email },
    });

    if (userExists) {
      return NextResponse.json(
        { user: null, message: "User already exists" },
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
      },
    });
    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
