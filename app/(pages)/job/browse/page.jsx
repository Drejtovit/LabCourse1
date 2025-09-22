import { redirect } from "next/navigation";
import BrowseJobClient from "./BrowseJobClient";

export default async function BrowseJobs() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/job/browse`, { cache: 'no-store' });

    const data = await res.json();
    if (!res.ok || data.errors) {
        redirect('/');
    }
    const jobs = data.jobs;
    return (
        <>
            <BrowseJobClient jobs={jobs} />
        </>
    );
}
