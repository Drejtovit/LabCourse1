import { redirect } from "next/navigation";
import { auth } from "@/lib/auth.js";
import SignInNotice from "@/components/SignInNotice";
import BrowseJobClient from "./BrowseJobClient";
import { headers } from "next/headers";

export default async function BrowseJobs() {

    const session = await auth();
    if (!session) {
        return (
            <SignInNotice />
        );
    }
    // if (session.user.role !== "EMPLOYER" && session.user.role !== "ADMIN") {
    //   redirect('/');
    // }//TODO make a 403 notice when admin 
    const header = await headers();
    const cookie = header.get('cookie');
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/job/browse`, { cache: 'no-store', headers: { cookie } });

    const data = await res.json();
    if (!res.ok || data.errors) {
        redirect('/');
    }
    const jobs = data.jobs;
    console.log(jobs);
    return (
        <>
            <BrowseJobClient jobs={jobs} />
        </>
    );
}
