import prisma from "@/lib/db.js";
import { NextResponse } from "next/server";

export async function getUserProfileImage(id) {
  if (!id) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: { id: id },
    select: { image: true, name: true },
  });

  if (!user) {
    return null;
  }

  return user || null;
}

export async function userPermission(userId, id, role) {
  if (role === "ADMIN") return null;

  if (!userId || !id) {
    return NextResponse.json(
      { success: false, errors: { general: "ID is required" } },
      { status: 400 }
    );

  }
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return NextResponse.json(
      { success: false, errors: { general: "User not found." } },
      { status: 404 }
    );
  }
  if (user.id !== userId) {
    return NextResponse.json(
      {
        success: false,
        errors: {
          general: "You do not have permission to perform this action.",
        },
      },
      { status: 403 }
    );
  }
  return null;
}
