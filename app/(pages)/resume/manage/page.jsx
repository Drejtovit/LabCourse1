import AccountManagment from "@/components/AccountManagment.jsx";
import ResumeCard from "@/components/ResumeCard.jsx";
import PageHeader from "@/components/PageHeader.jsx";
import SignInNotice from "@/components/SignInNotice.jsx";
import Forbidden from '@/components/Forbidden';
import { formatDistanceToNow } from "date-fns";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";

export default async function ManageResumes() {
    const session = await auth();
    if (!session) {
        return (
            <SignInNotice />
        );
    }
    if (session.user.role !== "CANDIDATE" && session.user.role !== "ADMIN") {
        return (
            <Forbidden />
        );
    }
    const header = await headers();
    const cookie = header.get('cookie');
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/resume?candidateId=${session.user.id}`, { cache: 'no-store', headers: { cookie } });
    const resumeData = await res.json();

    if (!res.ok || resumeData.errors) {
        if (resumeData.errors.resume && session.user.role !== "ADMIN") {
            redirect("/resume/create");
        } else if (session.user.role !== "ADMIN") {
            redirect("/");
        }
    }
    const resumes = resumeData?.resumes || [];

    return (
        <>
            <PageHeader>Manage Resumes</PageHeader>
            <div id="content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 col-xs-12">
                            <AccountManagment type='resumes'></AccountManagment>
                        </div>
                        <div className="col-lg-8 col-md-12 col-xs-12">
                            {session.user.role === "ADMIN" && (
                                <div className="alert alert-info" role="alert">
                                    You are logged in as admin. To create and manage resumes, please
                                    create a candidate account and sign in as a candidate.
                                </div>
                            )}
                            <div className="job-alerts-item candidates">
                                <h3 className="alerts-title">Manage Resumes</h3>
                                {resumes?.length === 0 && (
                                    <div className="text-center">
                                        <p className="fw-bold fs-3">
                                            You have not created any resumes yet.
                                        </p>
                                    </div>
                                )}
                                {resumes?.map((resume) => {
                                    return (
                                        <ResumeCard key={resume?.id}
                                            resumeId={resume?.id}
                                            candidate={resume?.candidateId}
                                            name={resume?.candidate?.user?.name}
                                            specialization={resume?.profession}
                                            status={formatDistanceToNow(resume?.updatedAt, { addSuffix: true })}
                                            location={resume?.candidate?.city + ", " + resume?.candidate?.state}
                                            image={resume?.candidate?.user?.image}
                                            active={resume?.isActive}
                                        ></ResumeCard>
                                    )
                                })}
                                {resumes?.length === 5 ? (
                                    <p className="text-center text-danger fw-bold">You have reached the maximum limit of 5 resumes. Please delete an existing resume to add a new one.</p>
                                ) : (
                                    <div className="text-center">
                                        <Link className="btn btn-common mt-3 " href="/resume/create" >Add Resume</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}