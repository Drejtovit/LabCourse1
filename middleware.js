import { auth } from "@/lib/auth.js";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  const userauth = await auth();
  if (
    (userauth && req.nextUrl.pathname === "/register") ||
    (userauth && req.nextUrl.pathname === "/signin")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/register", "/signin"],
};
