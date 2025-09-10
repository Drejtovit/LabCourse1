'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'
import { signOut } from "next-auth/react";

export default function NavBarClient({ session }) {

    console.log("NavClient", session);
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(open => !open);

    const pages = ["/about", "/findjob", "/jobdetails", "/resume", "/privacy-policy"];
    const candidates = ["/browsejobs", "/categories", "/resume/create", "/manageresumes", "/jobalerts"];
    const employers = ["/postjob", "/managejobs", "/manageapplications", "/browseresumes"];

    return (
        <nav className="navbar navbar-expand-lg fixed-top scrolling-navbar">
            <div className="container">
                <div className="theme-header clearfix">
                    {/* Brand and toggle get grouped for better mobile display */}
                    <div className="navbar-header">
                        <button
                            className="navbar-toggler"
                            type="button"
                            aria-controls="main-navbar"
                            aria-expanded={isOpen}
                            aria-label="Toggle navigation"
                            onClick={toggle}
                        >
                            <span className="lni-menu"></span>
                        </button>
                        <Link href="/" className="navbar-brand"><Image src="/assets/img/logo.png" alt="logo" loading='eager' width={160} height={32} /></Link>
                    </div>
                    <div className={"collapse navbar-collapse" + (isOpen ? " show" : "")} id="main-navbar">
                        <ul className="navbar-nav mr-auto w-100 justify-content-end">
                            <li className={`nav-item ${pathname === '/' ? 'active' : undefined}`}>
                                <Link className="nav-link" href="/">Home</Link>
                            </li>
                            <li className={`nav-item dropdown ${pages.includes(pathname) ? 'active' : undefined}`}>
                                <Link className="nav-link dropdown-toggle" href="#" onClick={(e) => e.preventDefault()} aria-haspopup="true" aria-expanded="false">
                                    Pages
                                </Link>
                                <ul className="dropdown-menu">
                                    {/*FIX THE LINKS*/}
                                    <li><Link className="dropdown-item" href="/about">About</Link></li>
                                    <li><Link className="dropdown-item" href="/findjob">Job Page</Link></li>
                                    <li><Link className="dropdown-item" href="/jobdetails">Job Details</Link></li>
                                    <li><Link className="dropdown-item" href="/resume">Resume Page</Link></li>
                                    <li><Link className="dropdown-item" href="/privacy-policy">Privacy Policy</Link></li>
                                </ul>
                            </li>
                            <li className={`nav-item dropdown ${candidates.includes(pathname) ? 'active' : undefined}`} >
                                <a className="nav-link dropdown-toggle " href="#" onClick={(e) => e.preventDefault()} aria-haspopup="true" aria-expanded="false">
                                    Candidates
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" href="/browsejobs">Browse Jobs</Link></li>
                                    <li><Link className="dropdown-item" href="/categories">Browse Categories</Link></li>
                                    <li><Link className="dropdown-item" href="/resume/create">Add Resume</Link></li>
                                    <li><Link className="dropdown-item" href="/manageresumes">Manage Resumes</Link></li>
                                    <li><Link className="dropdown-item" href="/jobalerts">Job Alerts</Link></li>
                                </ul>
                            </li>
                            <li className={`nav-item dropdown ${employers.includes(pathname) ? 'active' : undefined}`}>
                                <a className="nav-link dropdown-toggle" href="#" onClick={(e) => e.preventDefault()} aria-haspopup="true" aria-expanded="false">
                                    Employers
                                </a>
                                <ul className="dropdown-menu ">
                                    <li><Link className="dropdown-item" href="/postjob">Add Job</Link></li>
                                    <li><Link className="dropdown-item" href="/managejobs">Manage Jobs</Link></li>
                                    <li><Link className="dropdown-item" href="/manageapplications">Manage Applications</Link></li>
                                    <li><Link className="dropdown-item" href="/browseresumes">Browse Resumes</Link></li>
                                </ul>
                            </li>
                            <li className={`nav-item ${pathname === '/contact' ? 'active' : undefined}`}>
                                <Link className="nav-link" href="/contact">Contact</Link>
                            </li>
                            {!session?.user ? (
                                <li className={`nav-item ${pathname === '/signin' ? 'active' : undefined}`}>
                                    <Link className="nav-link" href="/signin">Sign In</Link>
                                </li>) : (
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle d-flex align-items-center"
                                        href="#"
                                        onClick={(e) => e.preventDefault()}
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="lni lni-user me-2"></i>
                                        {session.user.name || "Account"}
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link className="dropdown-item" href="/settings">
                                                <i className="lni lni-user me-2"></i> Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={async () => {
                                                    await signOut({ callbackUrl: "/" });
                                                }}
                                                className="dropdown-item text-danger"
                                            >
                                                <i className="lni lni-exit me-2" style={{ marginLeft: '-3px' }}></i> Sign Out
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            )
                            }
                            <li className="button-group">
                                <Link className="button btn btn-common" href="/postjob" >Post a Job</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* <DropDownMenu></DropDownMenu> */}
            {/* <div className="mobile-menu" data-logo="assets/img/logo-mobile.png"></div> */}
        </nav >
    )
}