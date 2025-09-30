import SignInNotice from "@/components/SignInNotice";
import { auth } from "@/lib/auth.js";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import ResumeAdminClient from "./ResumeAdminClient.jsx";
import Forbidden from '@/components/Forbidden';


export default async function ResumeAdmin() {
    const session = await auth();
    if (!session) {
        return <SignInNotice />;
    }

    if (session?.user?.role !== "ADMIN") {
        return (
            <Forbidden />
        );
    }
    const header = await headers();
    const cookie = header.get('cookie');

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users/candidates`, { cache: "no-store", headers: { cookie } });
    const data = await res.json();
    if (!res.ok || data.errors) {
        redirect('/');
    }

    return (
        <ResumeAdminClient candidates={data.candidates} />
    );
}