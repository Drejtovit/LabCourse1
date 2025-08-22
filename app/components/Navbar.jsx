'use client';
import { useState } from 'react';

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
                        <a href="index.html" className="navbar-brand"><img src="/assets/img/logo.png" alt="logo" /></a>
                    </div>
                    <div className={"collapse navbar-collapse" + (isOpen ? " show" : "")} id="main-navbar">
                        <ul className="navbar-nav mr-auto w-100 justify-content-end">
                            <li className="nav-item active">
                                <a className="nav-link" href="index.html">Home</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" onClick={(e) => e.preventDefault()} aria-haspopup="true" aria-expanded="false">
                                    Pages
                                </a>
                                <ul className="dropdown-menu">
                                    {/*FIX THE LINKS*/}
                                    <li><a className="dropdown-item" href="">About</a></li>
                                    <li><a className="dropdown-item" href="job-page.html">Job Page</a></li>
                                    <li><a className="dropdown-item" href="job-details.html">Job Details</a></li>
                                    <li><a className="dropdown-item" href="resume.html">Resume Page</a></li>
                                    <li><a className="dropdown-item" href="privacy-policy.html">Privacy Policy</a></li>
                                    <li><a className="dropdown-item" href="contact.html">Contact</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" onClick={(e) => e.preventDefault()} aria-haspopup="true" aria-expanded="false">
                                    Candidates
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="browse-jobs.html">Browse Jobs</a></li>
                                    <li><a className="dropdown-item" href="browse-categories.html">Browse Categories</a></li>
                                    <li><a className="dropdown-item" href="add-resume.html">Add Resume</a></li>
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
                                <a className="nav-link" href="contact.html">Contact</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="login.html">Sign In</a>
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