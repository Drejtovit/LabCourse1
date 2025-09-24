import prisma from "@/lib/db.js";
import { auth } from "@/lib/auth.js";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export async function POST(request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { errors: { authorization: "Unauthorized" }, success: false },
      { status: 401 }
    );
  }

  try {
    const body = await request.formData();
    const image = body.get("image");
    const userId = body.get("userId") ? body.get("userId") : session.user.id;
    if (!image || !userId) {
      return NextResponse.json(
        { errors: { image: "Image file is required" }, success: false },
        { status: 400 }
      );
    }
    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedTypes.includes(image.type)) {
      return NextResponse.json(
        { errors: { image: "Only PNG, JPEG, and WEBP images are allowed" } },
        { status: 400 }
      );
    }

    const bytes = await image.arrayBuffer();
    if (bytes.byteLength > 5 * 1024 * 1024) {
      return NextResponse.json(
        { errors: { image: "File size exceeds 5MB limit" }, success: false },
        { status: 400 }
      );
    }
    const base64 = `data:${image.type};base64,${Buffer.from(bytes).toString(
      "base64"
    )}`;

    const uploadResult = await cloudinary.uploader.upload(base64, {
      folder: "profile_pictures",
    });

    if (!uploadResult || !uploadResult.secure_url) {
      return NextResponse.json(
        { errors: { image: "Image upload failed" }, success: false },
        { status: 500 }
      );
    }

    await prisma.user.update({
      where: { id: userId },
      data: { image: uploadResult.secure_url },
    });

    return NextResponse.json(
      { url: uploadResult.secure_url, success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        errors: { image: "Internal Server Error", details: error.message },
        success: false,
      },
      { status: 500 }
    );
  }
}
