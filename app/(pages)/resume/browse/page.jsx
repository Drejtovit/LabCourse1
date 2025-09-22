import { redirect } from "next/navigation";
import BrowseResumesClient from "./BrowseResumeClient";
export default async function BrowseResumes() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/resume/browse`, { cache: 'no-store' });

    const data = await res.json();
    if (!res.ok || data.errors) {
        redirect('/');
    }
    const resumes = data.resumes;
    return (
        <>
            <BrowseResumesClient resumes={resumes} />
        </>
    );
}
