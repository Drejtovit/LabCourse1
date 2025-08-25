import Link from "next/link"

export default function AccountManagment({ type }) {

    return (
        <div className="right-sidebar">
            <h4>Manage Account</h4>
            <ul className="list-item">
                {/* Fix active class to change */}
                <li>
                    <Link className={type == 'resume' ? 'active' : ''} href="/resume">
                        My Resume
                    </Link>
                </li>
                <li>
                    <Link href="/bookmarked" className={type == 'bookmarked' ? 'active' : ''}>
                        Bookmarked Jobs
                    </Link>
                </li>
                <li>
                    <Link href="/notifications" className={type == 'notifications' ? 'active' : ''} >
                        Notifications <span className="notinumber">2</span>
                    </Link>
                </li>
                <li>
                    <Link href="manage-applications.html" className={type == 'applications' ? 'active' : ''}>
                        Manage Applications
                    </Link>
                </li>
                {/* Make this so only the employee can see his resumes otherwise there is no manage resumes */}
                <li>
                    <a href="manage-resumes.html" className={type == 'resumes' ? 'active' : ''}>
                        Manage Resumes
                    </a>
                </li>
                <li>
                    <a href="job-alerts.html" className={type == 'jobalerts' ? 'active' : ''}>
                        Job Alerts
                    </a>
                </li>
                <li>
                    <a href="/change-password" className={type == 'password' ? 'active' : ''}>
                        Change Password
                    </a>
                </li>
                <li>
                    <a href="index.html">
                        Sign Out
                    </a>
                </li>
            </ul>
        </div>
    )
}