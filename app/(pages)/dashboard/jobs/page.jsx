import SignInNotice from "@/components/SignInNotice";
import SideBar from "@/components/SideBar";
import { auth } from "@/lib/auth.js";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { formatDate } from "@/lib/utils/helpers.js";
import Link from "next/link";
import DeleteButton from "../../../../components/DeleteButton.jsx";

export default async function DashboardJobsPage() {

    const session = await auth();
    if (!session) {
        return <SignInNotice />;
    }

    if (session?.user?.role !== "ADMIN") {
        redirect('/');
    }
    const header = await headers();
    const cookie = header.get('cookie');

    const jobsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/jobs`, { cache: "no-store", headers: { cookie } });
    const jobs = await jobsRes.json();
    if (!jobsRes.ok || jobs.errors) {
        redirect('/');
    }

    return (
        <>
            <div className="d-flex min-vh-100 bg-light">
                <SideBar></SideBar>

                <main className="flex-grow-1 p-4 p-md-5 mt-5 " style={{ background: "#f8f9fa" }}>
                    <div className="card shadow border-0 rounded-4 ">
                        <div className="card-header bg-white border-bottom rounded-top-4 d-flex align-items-center py-2">
                            <i className="bi bi-briefcase-fill text-info fs-5 me-2"></i>
                            <h6 className="mb-0 fw-semibold text-secondary">Jobs({jobs?.jobs?.length})</h6>
                        </div>
                        <div className="table-responsive">
                            <table className="table align-middle mb-0 table-hover table-sm">
                                <thead className="table-light">
                                    <tr>
                                        <th className="d-none d-md-table-cell">#</th>
                                        <th>Job Details</th>
                                        <th className="d-none d-lg-table-cell">Department</th>
                                        <th className="d-none d-lg-table-cell">Posted On/Deadline</th>
                                        <th className=" d-lg-table-cell">Type</th>
                                        <th className="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jobs?.jobs?.map((job, index) => (
                                        <tr key={index}>
                                            <td className="d-none d-md-table-cell small">{index + 1}</td>
                                            <td>
                                                <div>
                                                    <div className="fw-medium small">{job.title}</div>
                                                    <div className="text-muted small d-lg-none">{formatDate(job.createdAt, false)} • {formatDate(job.closingDate, false)}</div>
                                                </div>
                                            </td>
                                            <td className="d-none d-lg-table-cell small">{job?.employer?.user?.name}</td>
                                            <td className="d-none d-lg-table-cell small">{formatDate(job?.createdAt, false)} • {formatDate(job.closingDate, false)}</td>
                                            <td className={`d-lg-table-cell small `}>
                                                <span className={`${job.type === "FULL_TIME" ? "full-time" : job.type === "PART_TIME" ? "part-time" : "contract"}`}>
                                                    {job.type === "FULL_TIME" ? "Full Time" : job.type === "PART_TIME" ? "Part Time" : "Contract"}
                                                </span>
                                            </td>
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
                                    <tr>
                                        <td colSpan="7" className="text-center py-3">
                                            <Link href="/dashboard/jobs/create" className="btn btn-info btn-sm">
                                                Create a Job
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