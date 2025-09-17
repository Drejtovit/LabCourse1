import { auth } from "@/lib/auth.js";
import { redirect } from "next/navigation";
import SignInClient from "./signinclient.jsx";

export default async function SignInPage() {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return <SignInClient />;
}