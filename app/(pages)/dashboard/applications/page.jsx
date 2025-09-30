import SignInNotice from "@/components/SignInNotice";
import Forbidden from "@/components/Forbidden";
import SideBar from "@/components/SideBar";
import { auth } from "@/lib/auth.js";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Image from "next/image";
import DeleteButton from "@/components/DeleteButton.jsx";
import ApplicationStatusButton from "@/components/ApplicationStatusButton.jsx";

export default async function DashboardApplicationsPage() {

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


    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/applications`, { cache: "no-store", headers: { cookie } });
    const data = await res.json();
    if (!res.ok || data.errors) {
        redirect('/dashboard');
    }

    return (
        <>
            <div className="d-flex min-vh-100 bg-light">
                <SideBar></SideBar>

                <main className="flex-grow-1 p-4 p-md-5 mt-5 " style={{ background: "#f8f9fa" }}>
                    <div className="card mb-4 shadow border-0 rounded-4">
                        <div className="card-header bg-white border-bottom rounded-top-4 d-flex align-items-center py-2">
                            <i className="bi bi-ui-checks-grid text-success fs-5 me-2"></i>
                            <h6 className="mb-0 fw-semibold text-secondary">Applications ({data?.applications?.length})</h6>
                        </div>
                        <div className="table-responsive">
                            <table className="table align-middle mb-0 table-hover table-sm">
                                <thead className="table-light">
                                    <tr>
                                        <th className="d-none d-md-table-cell" >JobId # CandidateId</th>
                                        <th>Applicant</th>
                                        <th className="d-none d-sm-table-cell">Job Title</th>
                                        <th className="d-none d-lg-table-cell">Status</th>
                                        <th className="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.applications?.map((application, index) => (
                                        <tr key={index}>
                                            <td className="d-none d-md-table-cell small">{application.jobId}, {application.candidateId}</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <Image
                                                        src={application?.candidate?.user?.image || "/assets/img/default-avatar.png"}
                                                        alt={application?.candidate?.user?.name || "Default Avatar"}
                                                        className="rounded-circle me-2"
                                                        width={28}
                                                        height={28}
                                                        style={{ objectFit: "cover", border: "2px solid #eee" }}
                                                    />
                                                    <div>
                                                        <div className="fw-medium small">{application?.candidate?.user?.name}</div>
                                                        <div className="text-muted small d-sm-none">{application?.job?.title}</div>
                                                        <div className="d-lg-none">
                                                            <span className={`badge text-light badge-sm bg-${application?.status === "ACCEPTED" ? "success" : application?.status === "REJECTED" ? "danger" : "secondary"}`}>{application?.status}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="d-none d-sm-table-cell small">{application?.job?.title}</td>
                                            <td className="d-none d-lg-table-cell">
                                                <span className={`badge text-light badge-sm bg-${application?.status === "ACCEPTED" ? "success" : application?.status === "REJECTED" ? "danger" : "secondary"}`}>{application?.status}</span>
                                            </td>
                                            <td className="text-end">
                                                <div className="btn-group btn-group-sm" role="group">
                                                    <ApplicationStatusButton
                                                        jobId={application.jobId}
                                                        candidateId={application.candidateId}
                                                        disabled={application.status === "ACCEPTED"}
                                                        newStatus="ACCEPTED"
                                                        classes="btn btn-success px-2 py-1"
                                                    ><i className="lni lni-thumbs-up"></i></ApplicationStatusButton>
                                                    <ApplicationStatusButton
                                                        jobId={application.jobId}
                                                        candidateId={application.candidateId}
                                                        disabled={application.status === "PENDING"}
                                                        newStatus="PENDING"
                                                        classes="btn btn-warning px-2 py-1"
                                                    ><i className="lni lni-hourglass"></i></ApplicationStatusButton>
                                                    <ApplicationStatusButton
                                                        jobId={application.jobId}
                                                        candidateId={application.candidateId}
                                                        disabled={application.status === "REJECTED"}
                                                        newStatus="REJECTED"
                                                        classes="btn btn-secondary px-2 py-1 me-4"
                                                    ><i className="lni lni-thumbs-down"></i></ApplicationStatusButton>
                                                    <DeleteButton id={`${application.jobId}+${application.candidateId}`} classes="btn btn-danger px-2 py-1" link="/dashboard/applications" item="application" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main >
            </div>
        </>
    );
}