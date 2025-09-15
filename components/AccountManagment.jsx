import Link from "next/link"
import { auth } from "@/lib/auth.js";

export default async function AccountManagment({ type }) {

    const session = await auth();

    return (
        <div className="right-sidebar">
            <h4>Manage Account</h4>
            <ul className="list-item">
                {session?.user?.role === "CANDIDATE" && (
                    <>
                        <li>
                            <Link className={type == 'resume' ? 'active' : ''} href="/resume">
                                My Resume
                            </Link>
                        </li>
                        <li>
                            <Link href="/bookmarkedjobs" className={type == 'bookmarked' ? 'active' : ''}>
                                Bookmarked Jobs
                            </Link>
                        </li>

                        <li>
                            <a href="/resume/manage" className={type == 'resumes' ? 'active' : ''}>
                                Manage Resumes
                            </a>
                        </li>
                        <li>
                            <a href="/jobalerts" className={type == 'jobalerts' ? 'active' : ''}>
                                Job Alerts
                            </a>
                        </li>
                    </>
                )}
                {session?.user?.role === "EMPLOYER" && (
                    <>
                        <li>
                            <Link href="/managejobs" className={type == 'jobs' ? 'active' : ''}>
                                Manage Jobs
                            </Link>
                        </li>
                        <li>
                            <Link href="/manageapplications" className={type == 'applications' ? 'active' : ''}>
                                Manage Applications
                            </Link>
                        </li>
                    </>)}

                <li>
                    <Link href="/notifications" className={type == 'notifications' ? 'active' : ''} >
                        Notifications <span className="notinumber">2</span>
                    </Link>
                </li>

                <li>
                    <a href="/change-password" className={type == 'password' ? 'active' : ''}>
                        Change Password
                    </a>
                </li>
            </ul>
        </div>
    )
}