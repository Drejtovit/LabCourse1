import SignInNotice from "@/components/SignInNotice";
import Forbidden from "@/components/Forbidden";
import { auth } from "@/lib/auth.js";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { formatDate } from "@/lib/utils/helpers.js";
import SideBar from "@/components/SideBar.jsx";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton.jsx";
import ApplicationStatusButton from "@/components/ApplicationStatusButton.jsx";
import ResumeStatusButton from "@/components/ResumeStatusButton.jsx";

export default async function DashboardPage() {

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

    const [usersRes, applicationsRes, jobsRes, resumesRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
            cache: "no-store",
            headers: { cookie }
        }),
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/applications`, {
            cache: "no-store",
            headers: { cookie }
        }),
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/jobs`, {
            cache: "no-store",
            headers: { cookie }
        }),
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/resumes`, {
            cache: "no-store",
            headers: { cookie }
        })
    ]);

    if (!usersRes.ok || !applicationsRes.ok || !jobsRes.ok || !resumesRes.ok) {
        redirect('/');
    }

    const [usersData, applicationsData, jobsData, resumesData] = await Promise.all([
        usersRes.json(),
        applicationsRes.json(),
        jobsRes.json(),
        resumesRes.json()
    ]);

    if (usersData.errors || applicationsData.errors || jobsData.errors || resumesData.errors) {
        redirect('/');
    }

    return (
        <div className="d-flex min-vh-100 bg-light">
            <SideBar></SideBar>
            <main className="flex-grow-1 p-3 p-md-4 mt-5" style={{ background: "#f8f9fa" }}>
                <div className="row g-3 g-md-4 mb-4 mt-2">
                    <div className="col-12 col-sm-6 col-md-4 col-lg-6 offset-lg-3 mt-lg-3">
                        <div className="card shadow border-0 text-center h-100 bg-gradient bg-primary text-white" >
                            <div className="card-body py-4" style={{ backgroundColor: "rgba(159, 220, 235, 1)" }}>
                                <div className="mb-2">
                                    <i className="bi bi-people-fill fs-1"></i>
                                </div>
                                <h6 className="mb-1">Users</h6>
                                <h2 className="fw-bold mb-0">{usersData?.users?.length}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="card shadow border-0 text-center h-100 bg-gradient bg-success text-white">
                            <div className="card-body py-4" style={{ backgroundColor: "rgba(198, 216, 255, 1)" }}>
                                <div className="mb-2">
                                    <i className="bi bi-ui-checks-grid fs-1"></i>
                                </div>
                                <h6 className="mb-1">Applications</h6>
                                <h2 className="fw-bold mb-0">{applicationsData?.applications?.length}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="card shadow border-0 text-center h-100 bg-gradient bg-info text-white">
                            <div className="card-body py-4" style={{ backgroundColor: "rgba(159, 220, 235, 1)" }}>
                                <div className="mb-2">
                                    <i className="bi bi-briefcase-fill fs-1"></i>
                                </div>
                                <h6 className="mb-1">Jobs</h6>
                                <h2 className="fw-bold mb-0">{jobsData?.jobs?.length}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 ">
                        <div className="card shadow border-0 text-center h-100 bg-gradient bg-info text-white">
                            <div className="card-body py-4" style={{ backgroundColor: "rgba(198, 216, 255, 1)" }}>
                                <div className="mb-2">
                                    <i className="bi bi-briefcase-fill fs-1"></i>
                                </div>
                                <h6 className="mb-1">Resumes</h6>
                                <h2 className="fw-bold mb-0">{resumesData?.resumes?.length}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mb-4 shadow border-0 rounded-4">
                    <div className="card-header bg-white border-bottom rounded-top-4 d-flex align-items-center py-2">
                        <i className="bi bi-people-fill text-primary fs-5 me-2"></i>
                        <h6 className="mb-0 fw-semibold text-secondary">User Management</h6>
                    </div>
                    <div className="table-responsive">
                        <table className="table align-middle mb-0 table-hover table-sm">
                            <thead className="table-light">
                                <tr>
                                    <th className="d-none d-md-table-cell" style={{ width: "60px" }}>ID</th>
                                    <th className="d-none d-sm-table-cell">Photo</th>
                                    <th>User</th>
                                    <th className="d-none d-lg-table-cell">Email</th>
                                    <th className="d-none d-md-table-cell">Role</th>
                                    <th className="d-none d-lg-table-cell">Status</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersData?.users?.slice(0, 5).map((user, index) => (
                                    <tr key={index}>
                                        <td className="d-none d-md-table-cell small">{user?.id}</td>
                                        <td className="d-none d-sm-table-cell">
                                            <Image
                                                src={user?.image || "/assets/img/default-avatar.png"}
                                                alt={user?.name}
                                                className="rounded-circle"
                                                width={32}
                                                height={32}
                                                style={{ objectFit: "cover", border: "2px solid #eee" }}
                                            />
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <Image
                                                    src={user?.image || "/assets/img/default-avatar.png"}
                                                    alt={user?.name}
                                                    className="rounded-circle me-2 d-sm-none"
                                                    width={28}
                                                    height={28}
                                                    style={{ objectFit: "cover", border: "2px solid #eee" }}
                                                />
                                                <div>
                                                    <div className="fw-medium small">{user?.name}</div>
                                                    <div className="text-muted small d-lg-none">{user?.email}</div>
                                                    <div className="d-md-none">
                                                        <span className={`badge badge-sm ${user?.role === "EMPLOYER" ? "bg-primary" : "bg-secondary"} me-1`}>
                                                            {user?.role}
                                                        </span>
                                                        <span className={`badge badge-sm ${new Date(user?.updatedAt).getTime() > (Date.now() - 30 * 24 * 60 * 60 * 1000) ? "bg-success" : "bg-danger"}`}>
                                                            {new Date(user?.updatedAt).getTime() > (Date.now() - 30 * 24 * 60 * 60 * 1000) ? "Active" : "Inactive"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="d-none d-lg-table-cell small">{user?.email}</td>
                                        <td className="d-none d-md-table-cell">
                                            <span className={`badge ${user?.role === "EMPLOYER" ? "bg-primary" : "bg-secondary"} me-1`}>
                                                {user?.role}
                                            </span>
                                        </td>
                                        <td className="d-none d-lg-table-cell">
                                            <span className={`badge ${new Date(user?.updatedAt).getTime() > (Date.now() - 30 * 24 * 60 * 60 * 1000) ? "bg-success" : "bg-danger"}`}>
                                                {new Date(user?.updatedAt).getTime() > (Date.now() - 30 * 24 * 60 * 60 * 1000) ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="text-end">
                                            <div className="btn-group" role="group">
                                                <Link className="btn btn-sm btn-primary px-2 py-1 me-3" aria-label="Edit User" href={`/dashboard/users/edit/${user?.id}`}>
                                                    <i className="lni lni-pencil"></i>
                                                </Link>
                                                <DeleteButton id={user?.id} classes="btn btn-sm btn-danger px-2 py-1" link="/dashboard/users" item="user"></DeleteButton>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {usersData?.users?.length > 5 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center py-3">
                                            <Link href="/dashboard/users" className="btn btn-info btn-sm">
                                                View All {usersData?.users?.length} Users
                                            </Link>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center py-3">
                                            <Link href="/dashboard/users" className="btn btn-secondary btn-sm">
                                                Only {usersData?.users?.length} Users Available
                                            </Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card mb-4 shadow border-0 rounded-4">
                    <div className="card-header bg-white border-bottom rounded-top-4 d-flex align-items-center py-2">
                        <i className="bi bi-ui-checks-grid text-success fs-5 me-2"></i>
                        <h6 className="mb-0 fw-semibold text-secondary">Applications</h6>
                    </div>
                    <div className="table-responsive">
                        <table className="table align-middle mb-0 table-hover table-sm">
                            <thead className="table-light">
                                <tr>
                                    <th className="d-none d-md-table-cell" >#</th>
                                    <th>Applicant</th>
                                    <th className="d-none d-sm-table-cell">Job Title</th>
                                    <th className="d-none d-lg-table-cell">Status</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applicationsData?.applications?.slice(0, 5).map((application, index) => (
                                    <tr key={index}>
                                        <td className="d-none d-md-table-cell small">{index + 1}</td>
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
                                                    jobId={application?.jobId}
                                                    candidateId={application?.candidateId}
                                                    disabled={application?.status === "ACCEPTED"}
                                                    newStatus="ACCEPTED"
                                                    classes="btn btn-success px-2 py-1"
                                                ><i className="lni lni-thumbs-up"></i></ApplicationStatusButton>
                                                <ApplicationStatusButton
                                                    jobId={application?.jobId}
                                                    candidateId={application?.candidateId}
                                                    disabled={application?.status === "PENDING"}
                                                    newStatus="PENDING"
                                                    classes="btn btn-warning px-2 py-1"
                                                ><i className="lni lni-hourglass"></i></ApplicationStatusButton>
                                                <ApplicationStatusButton
                                                    jobId={application?.jobId}
                                                    candidateId={application?.candidateId}
                                                    disabled={application?.status === "REJECTED"}
                                                    newStatus="REJECTED"
                                                    classes="btn btn-secondary px-2 py-1 me-4"
                                                ><i className="lni lni-thumbs-down"></i></ApplicationStatusButton>
                                                <DeleteButton id={`${application?.jobId}+${application?.candidateId}`} classes="btn btn-danger px-2 py-1" link="/dashboard/applications" item="application" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {applicationsData?.applications?.length > 5 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center py-3">
                                            <Link href="/dashboard/applications" className="btn btn-info btn-sm">
                                                View All {applicationsData?.applications?.length} Applications
                                            </Link>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center py-3">
                                            <Link href="/dashboard/applications" className="btn btn-secondary btn-sm">
                                                Only {applicationsData?.applications?.length} Applications Available
                                            </Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card mb-4 shadow border-0 rounded-4">
                    <div className="card-header bg-white border-bottom rounded-top-4 d-flex align-items-center py-2">
                        <i className="bi bi-briefcase-fill text-info fs-5 me-2"></i>
                        <h6 className="mb-0 fw-semibold text-secondary">Jobs</h6>
                    </div>
                    <div className="table-responsive">
                        <table className="table align-middle mb-0 table-hover table-sm">
                            <thead className="table-light">
                                <tr>
                                    <th className="d-none d-md-table-cell">#</th>
                                    <th>Job Details</th>
                                    <th className="d-none d-lg-table-cell">Department</th>
                                    <th className="d-none d-lg-table-cell">Posted On/Deadline</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobsData?.jobs?.slice(0, 5).map((job, index) => (
                                    <tr key={index}>
                                        <td className="d-none d-md-table-cell small">{job?.id}</td>
                                        <td>
                                            <div>
                                                <div className="fw-medium small">{job?.title}</div>
                                                <div className="text-muted small d-lg-none">{formatDate(job?.createdAt, false)} • {formatDate(job?.closingDate, false)}</div>
                                            </div>
                                        </td>
                                        <td className="d-none d-lg-table-cell small">{job?.employer?.user?.name}</td>
                                        <td className="d-none d-lg-table-cell small">{formatDate(job?.createdAt, false)} • {formatDate(job?.closingDate, false)}</td>
                                        <td className="text-end">
                                            <div className="btn-group" role="group">
                                                <Link className="btn btn-sm btn-primary px-2 py-1 me-3" aria-label="Edit Job" href={`/dashboard/jobs/edit/${job?.id}`}>
                                                    <i className="lni lni-pencil"></i>
                                                </Link>
                                                <DeleteButton id={job?.id} classes="btn btn-sm btn-danger px-2 py-1" link="/dashboard/jobs" item="job"></DeleteButton>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {jobsData?.jobs?.length > 5 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center py-3">
                                            <Link href="/dashboard/jobs" className="btn btn-info btn-sm">
                                                View All {jobsData?.jobs?.length} Jobs
                                            </Link>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center py-3">
                                            <Link href="/dashboard/jobs" className="btn btn-secondary btn-sm">
                                                Only {jobsData?.jobs?.length} Jobs Available
                                            </Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card mb-4 shadow border-0 rounded-4">
                    <div className="card-header bg-white border-bottom rounded-top-4 d-flex align-items-center py-2">
                        <i className="bi bi-people-fill text-primary fs-5 me-2"></i>
                        <h6 className="mb-0 fw-semibold text-secondary">Resume Management</h6>
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
                                    <th className="d-none d-lg-table-cell">isActive</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resumesData?.resumes?.slice(0, 5).map((resume, index) => (
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
                                {resumesData?.resumes?.length > 5 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center py-3">
                                            <Link href="/dashboard/resumes" className="btn btn-info btn-sm">
                                                View All {resumesData.resumes.length} Resumes
                                            </Link>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center py-3">
                                            <Link href="/dashboard/resumes" className="btn btn-secondary btn-sm">
                                                Only {resumesData?.resumes?.length} Resumes Available
                                            </Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div >
    );
}