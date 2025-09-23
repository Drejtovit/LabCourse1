import SignInNotice from "@/components/SignInNotice";
import DashboardPageClient from "./DashBoardPageClient";
import { auth } from "@/lib/auth.js";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function DashboardPage() {

    const session = await auth();
    if (!session) {
        return <SignInNotice />;
    }

    if (session?.user?.role !== "ADMIN") {
        redirect('/');
    }
    const header = await headers();
    const cookie = header.get('cookie');

    const usersRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, { cache: "no-store", headers: { cookie } });
    const users = await usersRes.json();
    if (!usersRes.ok || users.errors) {
        redirect('/');
    }
    const applicationsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/applications`, { cache: "no-store", headers: { cookie } });
    const applications = await applicationsRes.json();
    if (!applicationsRes.ok || applications.errors) {
        redirect('/');
    }
    const jobsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/jobs`, { cache: "no-store", headers: { cookie } });
    const jobs = await jobsRes.json();
    if (!jobsRes.ok || jobs.errors) {
        redirect('/');
    }

    return (<DashboardPageClient users={users} applications={applications} jobs={jobs} />);
}