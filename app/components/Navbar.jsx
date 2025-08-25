'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(open => !open);

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
                            <li className="nav-item active">
                                <Link className="nav-link" href="/">Home</Link>
                            </li>
                            <li className="nav-item dropdown">
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
                                    <li><Link className="dropdown-item" href="/contact">Contact</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" onClick={(e) => e.preventDefault()} aria-haspopup="true" aria-expanded="false">
                                    Candidates
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/browsejobs">Browse Jobs</a></li>
                                    <li><a className="dropdown-item" href="/categories">Browse Categories</a></li>
                                    <li><a className="dropdown-item" href="/resume/create">Add Resume</a></li>
                                    <li><a className="dropdown-item" href="manage-resumes.html">Manage Resumes</a></li>
                                    <li><a className="dropdown-item" href="job-alerts.html">Job Alerts</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" onClick={(e) => e.preventDefault()} aria-haspopup="true" aria-expanded="false">
                                    Employers
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="post-job.html">Add Job</a></li>
                                    <li><a className="dropdown-item" href="manage-jobs.html">Manage Jobs</a></li>
                                    <li><a className="dropdown-item" href="manage-applications.html">Manage Applications</a></li>
                                    <li><a className="dropdown-item" href="browse-resumes.html">Browse Resumes</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/contact">Contact</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/register">Sign In</a>
                            </li>
                            <li className="button-group">
                                <a href="post-job.html" className="button btn btn-common">Post a Job</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* <DropDownMenu></DropDownMenu> */}
            {/* <div className="mobile-menu" data-logo="assets/img/logo-mobile.png"></div> */}
        </nav>
    )
}