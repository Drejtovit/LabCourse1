import SignInNotice from "@/components/SignInNotice";
import { auth } from "@/lib/auth.js";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { formatDate } from "@/lib/utils/helpers.js";
import SideBar from "@/components/SideBar.jsx";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton.jsx";

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
    const usersData = await usersRes.json();
    if (!usersRes.ok || usersData.errors) {
        redirect('/');
    }

    const applicationsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/applications`, { cache: "no-store", headers: { cookie } });
    const applicationsData = await applicationsRes.json();
    if (!applicationsRes.ok || applicationsData.errors) {
        redirect('/');
    }

    const jobsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/jobs`, { cache: "no-store", headers: { cookie } });
    const jobsData = await jobsRes.json();
    if (!jobsRes.ok || jobsData.errors) {
        redirect('/');
    }

    return (
        <div className="d-flex min-vh-100 bg-light">
            <SideBar></SideBar>
            <main className="flex-grow-1 p-3 p-md-4 mt-5" style={{ background: "#f8f9fa" }}>
                <div className="row g-3 g-md-4 mb-4 mt-2">
                    <div className="col-12 col-sm-6 col-md-4">
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
                                                <Link className="btn btn-sm btn-primary px-2 py-1 me-3" aria-label="Edit User" href={`/dashboard/users/edit/${user.id}`}>
                                                    <i className="lni lni-pencil"></i>
                                                </Link>
                                                <DeleteButton id={user.id} classes="btn btn-sm btn-danger px-2 py-1" link="/dashboard/users" item="user"></DeleteButton>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {usersData?.users?.length > 5 && (
                                    <tr>
                                        <td colSpan="7" className="text-center py-3">
                                            <Link href="/dashboard/users" className="btn btn-info btn-sm">
                                                View All {usersData.users.length} Users
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
                                            <div className="btn-group" role="group">
                                                <button className="btn btn-sm btn-primary px-2 py-1 me-3" aria-label="Edit Application">
                                                    <i className="lni lni-pencil"></i>
                                                </button>
                                                <button className="btn btn-sm btn-danger px-2 py-1" aria-label="Delete Application">
                                                    <i className="lni lni-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {applicationsData?.applications?.length > 5 && (
                                    <tr>
                                        <td colSpan="7" className="text-center py-3">
                                            <Link href="/dashboard/applications" className="btn btn-info btn-sm">
                                                View All {applicationsData.applications.length} Applications
                                            </Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card shadow border-0 rounded-4">
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
                                                <div className="fw-medium small">{job.title}</div>
                                                <div className="text-muted small d-lg-none">{formatDate(job.createdAt, false)} • {formatDate(job.closingDate, false)}</div>
                                            </div>
                                        </td>
                                        <td className="d-none d-lg-table-cell small">{job?.employer?.user?.name}</td>
                                        <td className="d-none d-lg-table-cell small">{formatDate(job?.createdAt, false)} • {formatDate(job.closingDate, false)}</td>
                                        <td className="text-end">
                                            <div className="btn-group" role="group">
                                                <Link className="btn btn-sm btn-primary px-2 py-1 me-3" aria-label="Edit Job" href={`/dashboard/jobs/edit/${job.id}`}>
                                                    <i className="lni lni-pencil"></i>
                                                </Link>
                                                <DeleteButton id={job.id} classes="btn btn-sm btn-danger px-2 py-1" link="/dashboard/jobs" item="job"></DeleteButton>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {jobsData?.jobs?.length > 5 && (
                                    <tr>
                                        <td colSpan="7" className="text-center py-3">
                                            <Link href="/dashboard/jobs" className="btn btn-info btn-sm">
                                                View All {jobsData.jobs.length} Jobs
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