"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { formatDate } from "@/lib/utils/helpers.js";

export default function DashboardPageClient({ users, applications, jobs }) {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <div className="d-flex min-vh-100 bg-light">
            <div className="d-none d-md-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{ width: "280px" }}>
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none mt-5">
                    <span className="fs-4">Dashboard</span>
                </a>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <Link href="/dashboard" className="nav-link active" aria-current="page">
                            Overview
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/users" className="nav-link link-body-emphasis">
                            Users
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/jobs" className="nav-link link-body-emphasis">
                            Jobs
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/applications" className="nav-link link-body-emphasis">
                            Applications
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/contact" className="nav-link link-body-emphasis">
                            Contact Us
                        </Link>
                    </li>
                </ul>
            </div>

            <button
                className="btn btn-secondary d-md-none position-fixed m-2 p-1"
                style={{ zIndex: 1051, top: 0, left: 0, opacity: 0.85 }}
                onClick={() => setShowSidebar(true)}
                aria-label="Open sidebar"
            >
                <i className="lni lni-arrow-right"></i>
            </button>

            <div className={`offcanvas offcanvas-start ${showSidebar ? "show" : ""}`} tabIndex="-1" style={{ visibility: showSidebar ? "visible" : "hidden", width: "280px", zIndex: 1052 }}>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title">Dashboard</h5>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowSidebar(false)}></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                            <Link href="#" className="nav-link active" aria-current="page" onClick={() => setShowSidebar(false)}>
                                Overview
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="nav-link link-body-emphasis" onClick={() => setShowSidebar(false)}>
                                Users
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="nav-link link-body-emphasis" onClick={() => setShowSidebar(false)}>
                                Jobs
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="nav-link link-body-emphasis" onClick={() => setShowSidebar(false)}>
                                Applications
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="nav-link link-body-emphasis" onClick={() => setShowSidebar(false)}>
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <main className="flex-grow-1 p-3 p-md-4 mt-5" style={{ background: "#f8f9fa" }}>

                <div className="row g-3 g-md-4 mb-4 mt-2">
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="card shadow border-0 text-center h-100 bg-gradient bg-primary text-white" >
                            <div className="card-body py-4" style={{ backgroundColor: "rgba(159, 220, 235, 1)" }}>
                                <div className="mb-2">
                                    <i className="bi bi-people-fill fs-1"></i>
                                </div>
                                <h6 className="mb-1">Users</h6>
                                <h2 className="fw-bold mb-0">{users?.users?.length}</h2>
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
                                <h2 className="fw-bold mb-0">{applications?.applications?.length}</h2>
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
                                <h2 className="fw-bold mb-0">{jobs?.jobs?.length}</h2>
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
                                    <th className="d-none d-md-table-cell">ID</th>
                                    <th className="d-none d-sm-table-cell">Photo</th>
                                    <th>User</th>
                                    <th className="d-none d-lg-table-cell">Email</th>
                                    <th className="d-none d-md-table-cell">Role</th>
                                    <th className="d-none d-lg-table-cell">Status</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.users?.slice(0, 5).map((user, index) => (
                                    <tr key={index}>
                                        <td className="d-none d-md-table-cell small">{index + 1}</td>
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
                                                <button className="btn btn-sm btn-primary px-2 py-1 me-3" aria-label={`Edit ${user?.name}`}>
                                                    <i className="lni lni-pencil"></i>
                                                </button>
                                                <button className="btn btn-sm btn-danger px-2 py-1" aria-label={`Delete ${user?.name}`}>
                                                    <i className="lni lni-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {users?.users?.length > 5 && (
                                    <tr>
                                        <td colSpan="7" className="text-center py-3">
                                            <Link href="/dashboard/users" className="btn btn-info btn-sm">
                                                View All {users.users.length} Users
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
                                    <th className="d-none d-md-table-cell">#</th>
                                    <th>Applicant</th>
                                    <th className="d-none d-sm-table-cell">Job Title</th>
                                    <th className="d-none d-lg-table-cell">Status</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications?.applications?.slice(0, 5).map((application, index) => (
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
                                {applications?.applications?.length > 5 && (
                                    <tr>
                                        <td colSpan="7" className="text-center py-3">
                                            <Link href="/dashboard/users" className="btn btn-info btn-sm">
                                                View All {applications.applications.length} Applications
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
                        <h6 className="mb-0 fw-semibold text-secondary">Jobs(5)</h6>
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
                                {jobs?.jobs?.slice(0, 5).map((job, index) => (
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
                                        <td className="text-end">
                                            <div className="btn-group" role="group">
                                                <button className="btn btn-sm btn-primary px-2 py-1 me-3" aria-label="Edit Job">
                                                    <i className="lni lni-pencil"></i>
                                                </button>
                                                <button className="btn btn-sm btn-danger px-2 py-1" aria-label="Delete Job">
                                                    <i className="lni lni-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {jobs?.jobs?.length > 5 && (
                                    <tr>
                                        <td colSpan="7" className="text-center py-3">
                                            <Link href="/dashboard/users" className="btn btn-info btn-sm">
                                                View All {jobs.jobs.length} Jobs
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
