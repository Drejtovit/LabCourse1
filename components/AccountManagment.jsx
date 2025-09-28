"use client"
import Link from "next/link"
import { useSession } from "next-auth/react";

export default function AccountManagment({ type }) {

    const { data: session } = useSession();

    return (
        <div className="right-sidebar">
            <h4>Manage Account</h4>
            <ul className="list-item">
                {(session?.user?.role === "CANDIDATE" || session?.user?.role === "ADMIN") && (
                    <>
                        <li>
                            <Link className={type == 'resume' ? 'active' : ''} href="/resume">
                                My Resume
                            </Link>
                        </li>
                        <li>
                            <Link href="/resume/manage" className={type == 'resumes' ? 'active' : ''}>
                                Manage Resumes
                            </Link>
                        </li>
                        <li>
                            <Link href="/applications/candidateapplications" className={type == 'applicationsCandidate' ? 'active' : ''}>
                                Your Applications
                            </Link>
                        </li>
                    </>
                )}
                {(session?.user?.role === "EMPLOYER" || session?.user?.role === "ADMIN") && (
                    <>
                        <li>
                            <Link href="/job/manage" className={type == 'jobs' ? 'active' : ''}>
                                Manage Jobs
                            </Link>
                        </li>
                        <li>
                            <Link href="/applications/manageapplications" className={type == 'applicationsEmployer' ? 'active' : ''}>
                                Manage Applications
                            </Link>
                        </li>
                    </>)}
                <li>
                    <a href="/change-password" className={type == 'password' ? 'active' : ''}>
                        Change Password
                    </a>
                </li>
            </ul>
        </div>
    )
}