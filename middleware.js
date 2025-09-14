import { auth } from "@/lib/auth.js";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  const userauth = await auth();

  // if (!userauth) {
  //   return NextResponse.redirect(new URL("/signin", req.url));
  // }
  if (
    (userauth && req.nextUrl.pathname === "/register") ||
    (userauth && req.nextUrl.pathname === "/signin") ||
    (!userauth && req.nextUrl.pathname === "/profile")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/register", "/signin", "/profile"],
};
