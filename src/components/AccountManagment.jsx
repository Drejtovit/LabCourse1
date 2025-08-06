export default function AccountManagment() {
    return (
        <div className="right-sideabr">
            <h4>Manage Account</h4>
            <ul className="list-item">
                {/* Fix active class to change */}
                <li><a className="active" href="resume.html">My Resume</a></li>
                <li><a href="bookmarked.html">Bookmarked Jobs</a></li>
                <li><a href="notifications.html">Notifications <span className="notinumber">2</span></a></li>
                <li><a href="manage-applications.html">Manage Applications</a></li>
                <li><a href="job-alerts.html">Job Alerts</a></li>
                <li><a href="change-password.html">Change Password</a></li>
                <li><a href="index.html">Sing Out</a></li>
            </ul>
        </div>
    )
}