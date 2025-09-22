"use client";

import Link from "next/link";
import { useState } from "react";

export default function DashboardPageClient() {
    const [showSidebar, setShowSidebar] = useState(false);

    const users = [
        {
            id: 1,
            name: "Jane Doe",
            email: "jane@example.com",
            role: "User",
            image: "/assets/img/default-avatar.png",
            active: true,
        },
        {
            id: 2,
            name: "John Smith",
            email: "john@example.com",
            role: "Admin",
            image: "/assets/img/default-avatar.png",
            active: false,
        },
    ];

    const navLinks = [
        { icon: "bi-speedometer2", label: "Overview", href: "/dashboard" },
        { icon: "bi-people", label: "Users", href: "/dashboard/users" },
        { icon: "bi-briefcase", label: "Jobs", href: "/dashboard/jobs" },
        { icon: "bi-ui-checks-grid", label: "Applications", href: "/dashboard/applications" },
    ];


    return (
        <div className="d-flex min-vh-100 bg-light">
            {/* Sidebar for desktop */}
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

            {/* Sidebar toggle button for mobile */}
            <button
                className="btn btn-secondary d-md-none position-fixed m-2 p-1"
                style={{ zIndex: 1051, top: 0, left: 0, opacity: 0.85 }}
                onClick={() => setShowSidebar(true)}
                aria-label="Open sidebar"
            >
                <i className="lni lni-arrow-right"></i>
            </button>

            {/* Offcanvas sidebar for mobile */}
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

            {/* Main content */}
            <main className="flex-grow-1 p-3 p-md-4 mt-5" style={{ background: "#f8f9fa" }}>
                {/* Stat cards */}
                <div className="row g-3 g-md-4 mb-4 mt-2">
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="card shadow border-0 text-center h-100 bg-gradient bg-primary text-white" >
                            <div className="card-body py-4" style={{ backgroundColor: "rgba(159, 220, 235, 1)" }}>
                                <div className="mb-2">
                                    <i className="bi bi-people-fill fs-1"></i>
                                </div>
                                <h6 className="mb-1">Users</h6>
                                <h2 className="fw-bold mb-0">1,245</h2>
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
                                <h2 className="fw-bold mb-0">367</h2>
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
                                <h2 className="fw-bold mb-0">89</h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Management Table */}
                <div className="card mb-4 shadow border-0 rounded-4">
                    <div className="card-header bg-white border-bottom rounded-top-4 d-flex align-items-center py-2">
                        <i className="bi bi-people-fill text-primary fs-5 me-2"></i>
                        <h6 className="mb-0 fw-semibold text-secondary">User Management</h6>
                    </div>
                    <div className="table-responsive">
                        <table className="table align-middle mb-0 table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Photo</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th className="d-none d-sm-table-cell">Role</th>
                                    <th className="d-none d-md-table-cell">Status</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, idx) => (
                                    <tr key={user.id}>
                                        <td>{idx + 1}</td>
                                        <td>
                                            <img
                                                src={user.image}
                                                alt={user.name}
                                                className="rounded-circle"
                                                width={40}
                                                height={40}
                                                style={{ objectFit: "cover", border: "2px solid #eee" }}
                                            />
                                        </td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td className="d-none d-sm-table-cell">
                                            <span className={`badge ${user.role === "Admin" ? "bg-primary" : "bg-secondary"}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="d-none d-md-table-cell">
                                            <span className={`badge ${user.active ? "bg-success" : "bg-danger"}`}>
                                                {user.active ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="text-end">
                                            <button className="btn btn-sm btn-primary me-2 px-3 py-2" aria-label={`Edit ${user.name}`}>
                                                <i className="lni lni-pencil"></i>
                                            </button>
                                            <button className="btn btn-sm btn-danger  px-3 py-2" aria-label={`Delete ${user.name}`}>
                                                <i className="lni lni-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Applications Table */}
                <div className="card mb-4 shadow border-0 rounded-4">
                    <div className="card-header bg-white border-bottom rounded-top-4 d-flex align-items-center py-2">
                        <i className="bi bi-ui-checks-grid text-success fs-5 me-2"></i>
                        <h6 className="mb-0 fw-semibold text-secondary">Applications</h6>
                    </div>
                    <div className="table-responsive">
                        <table className="table align-middle mb-0 table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Applicant</th>
                                    <th>Job Title</th>
                                    <th className="d-none d-sm-table-cell">Status</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>
                                        <img
                                            src="/assets/img/default-avatar.png"
                                            alt="Alice Green"
                                            className="rounded-circle me-2"
                                            width={36}
                                            height={36}
                                            style={{ objectFit: "cover", border: "2px solid #eee" }}
                                        />
                                        Alice Green
                                    </td>
                                    <td>Frontend Developer</td>
                                    <td className="d-none d-sm-table-cell">
                                        <span className="badge bg-warning text-dark">Pending</span>
                                    </td>
                                    <td className="text-end">
                                        <button className="btn btn-sm btn-primary me-2 px-3 py-2" aria-label="Edit Application">
                                            <i className="lni lni-pencil"></i>
                                        </button>
                                        <button className="btn btn-sm btn-danger px-3 py-2" aria-label="Delete Application">
                                            <i className="lni lni-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Jobs Table */}
                <div className="card shadow border-0 rounded-4">
                    <div className="card-header bg-white border-bottom rounded-top-4 d-flex align-items-center py-2">
                        <i className="bi bi-briefcase-fill text-info fs-5 me-2"></i>
                        <h6 className="mb-0 fw-semibold text-secondary">Jobs</h6>
                    </div>
                    <div className="table-responsive">
                        <table className="table align-middle mb-0 table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Job Title</th>
                                    <th className="d-none d-sm-table-cell">Department</th>
                                    <th className="d-none d-md-table-cell">Posted On</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Backend Engineer</td>
                                    <td className="d-none d-sm-table-cell">IT</td>
                                    <td className="d-none d-md-table-cell">2025-09-01</td>
                                    <td className="text-end">
                                        <button className="btn btn-sm btn-primary me-2 px-3 py-2" aria-label="Edit Job">
                                            <i className="lni lni-pencil"></i>
                                        </button>
                                        <button className="btn btn-sm btn-danger px-3 py-2" aria-label="Delete Job">
                                            <i className="lni lni-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div >
    );
}
