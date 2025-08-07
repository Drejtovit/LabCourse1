export default function AccountManagment({ type }) {

    return (
        <div className="right-sideabr">
            <h4>Manage Account</h4>
            <ul className="list-item">
                {/* Fix active class to change */}
                <li>
                    <a className={type == 'resume' ? 'active' : ''} href="resume.html">
                        My Resume
                    </a>
                </li>
                <li>
                    <a href="bookmarked.html" className={type == 'bookmarked' ? 'active' : ''}>
                        Bookmarked Jobs
                    </a>
                </li>
                <li>
                    <a href="notifications.html" className={type == 'notifications' ? 'active' : ''} >
                        Notifications <span className="notinumber">2</span>
                    </a>
                </li>
                <li>
                    <a href="manage-applications.html" className={type == 'applications' ? 'active' : ''}>
                        Manage Applications
                    </a>
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
                    <a href="change-password.html" className={type == 'password' ? 'active' : ''}>
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