import AccountManagment from "@/components/AccountManagment.jsx";
import ResumeCard from "@/components/ResumeCard.jsx";
import PageHeader from "@/components/PageHeader.jsx";
import { formatDate, formatSalary } from "@/lib/utils/helpers.js";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ManageResumes() {
    const session = await auth();
    if (!session || session.user.role !== "CANDIDATE") {
        redirect("/");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/resume?candidateId=${session.user.id}`, { cache: 'no-store' });
    const resumeData = await res.json();
    if (!res.ok || resumeData.errors) {
        redirect("resume/create");
    }

    const resumes = resumeData?.resumes;
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
                                            wage={formatSalary(resume?.salary)}
                                            status={formatDate(resume?.updatedAt)}
                                            location={resume?.candidate?.city + ", " + resume?.candidate?.state}
                                            image={resume?.candidate?.user?.image}
                                            active={resume?.isActive}
                                        ></ResumeCard>
                                    )
                                })}
                                <div className="text-center">
                                    <Link className="btn btn-common mt-3 " href="/resume/create">Add Resume</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}