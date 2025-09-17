import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import RegisterClient from "./RegisterClient"; // move your current Register code to RegisterClient.jsx

export default async function RegisterPage() {
    const session = await auth();
    if (session) {
        redirect("/");
    }
    return <RegisterClient />;
}