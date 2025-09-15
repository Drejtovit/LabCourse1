'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'
import { signOut } from "next-auth/react";

export default function NavBarClient({ session }) {
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
                                <Link className="nav-link" href="/" onClick={() => setIsOpen(false)}>Home</Link>
                            </li>
                            <li className={`nav-item dropdown ${pages.includes(pathname) ? 'active' : undefined}`}>
                                <Link className="nav-link dropdown-toggle" href="#" onClick={(e) => e.preventDefault()} aria-haspopup="true" aria-expanded="false">
                                    Pages
                                </Link>
                                <ul className="dropdown-menu">
                                    {/*FIX THE LINKS*/}
                                    <li><Link className="dropdown-item" href="/about" onClick={() => setIsOpen(false)}>About</Link></li>
                                    <li><Link className="dropdown-item" href="/findjob" onClick={() => setIsOpen(false)}>Job Page</Link></li>
                                    <li><Link className="dropdown-item" href="/jobdetails" onClick={() => setIsOpen(false)}>Job Details</Link></li>
                                    <li><Link className="dropdown-item" href="/resume" onClick={() => setIsOpen(false)}>Resume Page</Link></li>
                                    <li><Link className="dropdown-item" href="/privacy-policy" onClick={() => setIsOpen(false)}>Privacy Policy</Link></li>
                                </ul>
                            </li>
                            {session?.user.role === 'CANDIDATE' && (
                                <li className={`nav-item dropdown ${candidates.includes(pathname) ? 'active' : undefined}`} >
                                    <a className="nav-link dropdown-toggle " href="#" onClick={(e) => e.preventDefault()} aria-haspopup="true" aria-expanded="false">
                                        Candidates
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" href="/browsejobs" onClick={() => setIsOpen(false)}>Browse Jobs</Link></li>
                                        <li><Link className="dropdown-item" href="/categories" onClick={() => setIsOpen(false)}>Browse Categories</Link></li>
                                        <li><Link className="dropdown-item" href="/resume/create" onClick={() => setIsOpen(false)}>Add Resume</Link></li>
                                        <li><Link className="dropdown-item" href="/manageresumes" onClick={() => setIsOpen(false)}>Manage Resumes</Link></li>
                                        <li><Link className="dropdown-item" href="/jobalerts" onClick={() => setIsOpen(false)}>Job Alerts</Link></li>
                                    </ul>
                                </li>
                            )}
                            {session?.user.role === 'EMPLOYER' && (
                                <li className={`nav-item dropdown ${employers.includes(pathname) ? 'active' : undefined}`}>
                                    <a className="nav-link dropdown-toggle" href="#" onClick={(e) => e.preventDefault()} aria-haspopup="true" aria-expanded="false">
                                        Employers
                                    </a>
                                    <ul className="dropdown-menu ">
                                        <li><Link className="dropdown-item" href="/postjob" onClick={() => setIsOpen(false)}>Add Job</Link></li>
                                        <li><Link className="dropdown-item" href="/managejobs" onClick={() => setIsOpen(false)}>Manage Jobs</Link></li>
                                        <li><Link className="dropdown-item" href="/manageapplications" onClick={() => setIsOpen(false)}>Manage Applications</Link></li>
                                        <li><Link className="dropdown-item" href="/browseresumes" onClick={() => setIsOpen(false)}>Browse Resumes</Link></li>
                                    </ul>
                                </li>
                            )}
                            <li className={`nav-item ${pathname === '/contact' ? 'active' : undefined}`}>
                                <Link className="nav-link" href="/contact" onClick={() => setIsOpen(false)}>Contact</Link >
                            </li>
                            {!session?.user ? (
                                <li className={`nav-item ${pathname === '/signin' ? 'active' : undefined}`}>
                                    <Link className="nav-link" href="/signin" onClick={() => setIsOpen(false)} >Sign In</Link>
                                </li>) : (
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle d-flex align-items-center"
                                        href="#"
                                        onClick={(e) => e.preventDefault()}
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    > {session?.user.image ? (
                                        <Image
                                            src={session.user.image}
                                            alt="profile-avatar"
                                            width={30}
                                            height={30}
                                            className="rounded-circle me-2"
                                            style={{ objectFit: "cover" }}
                                        />) : (
                                        <i className="lni lni-user me-2"></i>)}
                                        {session?.user.name || "Account"}
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link className="dropdown-item" href="/profile" onClick={() => setIsOpen(false)}>
                                                <i className="lni lni-user me-2"></i> Profile
                                            </Link>
                                        </li>

                                        {session?.user?.role === "CANDIDATE" && <li>
                                            <Link className="dropdown-item" href="/resume" onClick={() => setIsOpen(false)}>
                                                <i className="lni lni-briefcase me-2"></i> Resume
                                            </Link>
                                        </li>}
                                        {session?.user?.role === "EMPLOYER" && <li>
                                            <Link className="dropdown-item" href="/managejobs" onClick={() => setIsOpen(false)}>
                                                <i className="lni lni-briefcase me-2"></i> Manage Jobs
                                            </Link>
                                        </li>}

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
                            {session?.user?.role === "EMPLOYER" && <li className="button-group">
                                <Link className="button btn btn-common" href="/postjob" >Post a Job</Link>
                            </li>}

                        </ul>
                    </div>
                </div>
            </div>
            {/* <DropDownMenu></DropDownMenu> */}
            {/* <div className="mobile-menu" data-logo="assets/img/logo-mobile.png"></div> */}
        </nav >
    )
}