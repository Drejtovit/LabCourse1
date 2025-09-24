"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from 'next/navigation'


export default function SideBar() {
    const [showSidebar, setShowSidebar] = useState(false);
    const pathname = usePathname();

    return (
        <>
            <div className="d-none d-md-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{ width: "280px", borderRight: "2px solid #dee2e6" }}>
                <Link href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none mt-5">
                    <span className="fs-4">Dashboard</span>
                </Link>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <Link href="/dashboard" className={`nav-link ${pathname === "/dashboard" ? "active" : "link-body-emphasis"}`} >
                            Overview
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/users" className={`nav-link ${pathname.startsWith("/dashboard/users") ? "active" : "link-body-emphasis"}`} >
                            Users
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/jobs" className={`nav-link ${pathname.startsWith("/dashboard/jobs") ? "active" : "link-body-emphasis"}`} >
                            Jobs
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/applications" className={`nav-link ${pathname.startsWith("/dashboard/applications") ? "active" : "link-body-emphasis"}`} >
                            Applications
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/contact" className={`nav-link ${pathname.startsWith("/dashboard/contact") ? "active" : "link-body-emphasis"}`} >
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
                    <h5 className="offcanvas-title fs-4">Dashboard</h5>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowSidebar(false)}></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                            <Link href="#" className={`nav-link ${pathname === "/dashboard" ? "active" : "link-body-emphasis"}`} onClick={() => setShowSidebar(false)}>
                                Overview
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className={`nav-link ${pathname.startsWith("/dashboard/users") ? "active" : "link-body-emphasis"}`} onClick={() => setShowSidebar(false)}>
                                Users
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className={`nav-link ${pathname.startsWith("/dashboard/jobs") ? "active" : "link-body-emphasis"}`} onClick={() => setShowSidebar(false)}>
                                Jobs
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className={`nav-link ${pathname.startsWith("/dashboard/applications") ? "active" : "link-body-emphasis"}`} onClick={() => setShowSidebar(false)}>
                                Applications
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className={`nav-link ${pathname.startsWith("/dashboard/contact") ? "active" : "link-body-emphasis"}`} onClick={() => setShowSidebar(false)}>
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>

    );
}