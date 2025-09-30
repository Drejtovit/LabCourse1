import SignInNotice from "@/components/SignInNotice";
import SideBar from "@/components/SideBar";
import { auth } from "@/lib/auth.js";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import DeleteButton from "@/components/DeleteButton.jsx";
import ResumeStatusButton from "@/components/ResumeStatusButton.jsx";
import Forbidden from "@/components/Forbidden";

export default async function DashboardResumesPage() {

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

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/resumes`, { cache: "no-store", headers: { cookie } });
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
                            <i className="bi bi-people-fill text-primary fs-5 me-2"></i>
                            <h6 className="mb-0 fw-semibold text-secondary">Resume Management ({data?.resumes?.length})</h6>
                        </div>
                        <div className="table-responsive">
                            <table className="table align-middle mb-0 table-hover table-sm">
                                <thead className="table-light">
                                    <tr>
                                        <th className="d-none d-md-table-cell" style={{ width: "60px" }}>ID</th>
                                        <th className="d-none d-sm-table-cell">Photo</th>
                                        <th>Resume</th>
                                        <th className="d-none d-lg-table-cell">Email</th>
                                        <th className="d-none d-md-table-cell">Profession</th>
                                        <th className="d-none d-lg-table-cell">Status</th>
                                        <th className="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.resumes?.map((resume, index) => (
                                        <tr key={index}>
                                            <td className="d-none d-md-table-cell small">{resume?.id}</td>
                                            <td className="d-none d-sm-table-cell">
                                                <Image
                                                    src={resume?.candidate?.user?.image || "/assets/img/default-avatar.png"}
                                                    alt={resume?.candidate?.user?.name}
                                                    className="rounded-circle"
                                                    width={32}
                                                    height={32}
                                                    style={{ objectFit: "cover", border: "2px solid #eee" }}
                                                />
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <Image
                                                        src={resume?.candidate?.user?.image || "/assets/img/default-avatar.png"}
                                                        alt={resume?.candidate?.user?.name}
                                                        className="rounded-circle me-2 d-sm-none"
                                                        width={28}
                                                        height={28}
                                                        style={{ objectFit: "cover", border: "2px solid #eee" }}
                                                    />
                                                    <div>
                                                        <div className="fw-medium small">{resume?.candidate?.user?.name}</div>
                                                        <div className="text-muted small d-lg-none">{resume?.candidate?.user?.email}</div>
                                                        <div className="d-md-none">
                                                            <span className="fw-medium small me-2">
                                                                {resume?.profession}
                                                            </span>
                                                            <span className={`badge badge-sm ${resume?.isActive ? "bg-success" : "bg-danger"}`}>
                                                                {resume?.isActive ? "Active" : "Inactive"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="d-none d-lg-table-cell small">{resume?.candidate?.user?.email}</td>
                                            <td className="d-none d-md-table-cell">
                                                <span className="fw-medium small">
                                                    {resume?.profession}
                                                </span>
                                            </td>
                                            <td className="d-none d-lg-table-cell">
                                                <span className={`badge ${resume?.isActive ? "bg-success" : "bg-danger"}`}>
                                                    {resume?.isActive ? "Active" : "Inactive"}
                                                </span>
                                            </td>
                                            <td className="text-end">
                                                <div className="btn-group" role="group">
                                                    <ResumeStatusButton
                                                        resumeId={resume?.id}
                                                        candidateId={resume?.candidate?.candidateId}
                                                        newStatus={true}
                                                        classes="btn btn-success px-2 py-1"
                                                        disabled={resume?.isActive === true}>
                                                        <i className="lni lni-check-mark-circle"></i>
                                                    </ResumeStatusButton>
                                                    <ResumeStatusButton
                                                        resumeId={resume?.id}
                                                        candidateId={resume?.candidate?.candidateId}
                                                        newStatus={false}
                                                        classes="btn btn-danger px-2 py-1 ms-2"
                                                        disabled={resume?.isActive === false}>
                                                        <i className="lni lni lni-cross-circle"></i>
                                                    </ResumeStatusButton>
                                                    <Link className="btn btn-sm btn-primary px-2 py-1 me-3 ms-2" aria-label="Edit Resume" href={`/dashboard/resumes/edit/${resume?.id}`}>
                                                        <i className="lni lni-pencil"></i>
                                                    </Link>
                                                    <DeleteButton id={resume?.id} classes="btn btn-sm btn-danger px-2 py-1" link="/dashboard/resumes" item="resume"></DeleteButton>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="7" className="text-center py-3">
                                            <Link href="/dashboard/resumes/create" className="btn btn-info btn-sm">
                                                Create a Resume
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main >
            </div>
        </>
    );
}